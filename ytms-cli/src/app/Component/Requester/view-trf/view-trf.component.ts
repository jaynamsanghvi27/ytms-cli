import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { TrainingReqForm } from 'src/app/Model/TrainingRequestForm';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UploadExcelService } from 'src/app/services/upload-excel.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { addDays, differenceInBusinessDays, differenceInMinutes, isAfter, isBefore, isWeekend, parseISO } from 'date-fns';
import { Location } from '@angular/common';
import { CalendarService } from 'src/app/Core/services/calendar.service';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-view-trf',
  templateUrl: './view-trf.component.html',
  styleUrls: ['./view-trf.component.css'],
})
export class ViewTrfComponent {
  bodyText = 'This text can be updated in modal 1';
  id!: number;
  sideNavStatus: boolean = false;
  trainingReqForms: TrainingReqForm[] = [];
  trainingReqForm!: FormGroup;
  trainingReqForm1!: FormGroup;
  userRole: string = "";
  document: Document | undefined;
  files?: any[];
  trainers?: any[];

  selectedFiles?: FileList;
  enableUploadButton = false;
  currentFile?: File;
  progress = 0;
  message = '';
  holiday: any[] = [];

  fileInfos?: Observable<any>;


  constructor(private ser: TrainingRequestService, private auth: AuthService,
    private jwtServ: JwtService, public dialog: MatDialog, private formBuilder: FormBuilder, private router: Router
    , private uploadService: UploadExcelService, private _location: Location, private calService: CalendarService
  ) {
    let token = auth.getToken();
    this.userRole = jwtServ.getRoleFromToken(token);
    this.uploadService.getFileName().subscribe((resp: any) => { this.files = resp })
  }
  ngOnInit(): void {
    this.loadList();
    this.loadTrainner();
    this.calService.getALLHolidays().subscribe((resp: any) => { this.holiday = resp })
    this.trainingReqForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      actualStartDate: ['', [Validators.required]],
      actualEndDate: ['', [Validators.required]],
      fileName: ['', [Validators.required]],
      trainer: ['', [Validators.required]],
      actualStartTime: ['', [Validators.required]],
      actualEndTime: ['', [Validators.required]],
      noOfDays: [],
    });


    this.trainingReqForm1 = this.formBuilder.group({
      id: ['', [Validators.required]],
      declinedMessage: ['', [Validators.required]],

    });
  }

  backClicked() {
    this._location.back();
  }

  loadList() {
    this.ser.getTraining().subscribe((resp: any) => { (this.trainingReqForms = resp) });
  }
  loadTrainner() {
    this.ser.getTrainerMasterList().subscribe((resp: any) => { this.trainers = resp });
  }
  pushTrainer(trainer: any) {
    this.trainers?.push(trainer);
  }
  declineDialog(templateRef1: any) {
    let dialogRef = this.dialog.open(templateRef1, {
      width: '80%',
      height: '50%'
    });
  }
  openDialog(templateRef: any) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '80%',
      height: '50%'
    });
  }
  setId(id: any) {
    this.id = id;
  }
  public closeDialog(): void {
    this.dialog.closeAll();
    // this.matDialogReference.close([]);
  }
  decline() {
    if (this.trainingReqForm1.valid) {
      console.log("befor service " + JSON.stringify(this.trainingReqForm1.value));
      let obj: any = this.trainingReqForm1.value;
      this.ser.declinetrf(obj).subscribe();
      Swal.fire('Success', 'Training Declined', 'success');
      this.trainingReqForm1.reset();
      this.closeDialog();
      this.loadList();
      window.location.reload();
    } else {
      this.trainingReqForm1.markAllAsTouched();
    }
  }
isLoading:boolean=false;
  submit(): void {
    if (this.trainingReqForm.valid) {
      this.isLoading=true;
      console.log("befor service " + JSON.stringify(this.trainingReqForm.value));
      this.trainingReqForm.get('trainer')?.setValue(this.trainingReqForm.value.trainer + "");
      let obj: any = this.trainingReqForm.value;
      this.ser.updateTraining(obj).subscribe((resp: any) => {
        Swal.fire('Success', 'Training Approved', 'success');
        this.isLoading=false;
        this.trainingReqForm.reset();
        this.closeDialog();
        this.loadList();
        window.location.reload();
      });

    } else {
      this.trainingReqForm.markAllAsTouched();
    }
  }

  showMessage(message: any) {
    Swal.fire('Reason for Decline', message, 'error');
  }

  editTrf(trainingId: any) {
    if (this.userRole == 'ROLE_TECHNICAL_MANAGER')
      this.router.navigate(['/tm-training-req', trainingId]);
    else if (this.userRole == 'ROLE_TRAINER')
      this.router.navigate(['/trainer/training-req', trainingId]);
    else
      this.router.navigate(['/training-req', trainingId]);
  }
  display = false;
  onPress() {
    console.log("clicked");
    //document.querySelector('#comp-render').innerHTML='<object type="text/html" data="app-upload-excel.html" ></object>';
    this.display = true;
  }
  openNominationData(id: any) {

    if (this.userRole == 'ROLE_TECHNICAL_MANAGER')
      this.router.navigate(['/tm-view-nomination', id]);
    else if (this.userRole == 'ROLE_TRAINER')
      this.router.navigate(['/trainer/view-nomination', id]);
    else
      this.router.navigate(['/view-nomination', id]);
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            this.enableUploadButton = true;
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              // this.fileInfos = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
  }

  onFileChange(event: any) {
    let fileNameSpan: any = document.getElementById('file-name');
    const file = event.target.files[0];
    fileNameSpan.textContent = file.name;

    const temp: any = this.files?.map(competency => competency);
    if ((temp?.indexOf(file.name.substring(0, file.name.indexOf('.')))) >= 0) {
      Swal.fire('File Name Already Exist', 'Upload Another File or Rename You File', 'error');
      this.enableUploadButton = false;
    } else {
      this.enableUploadButton = true;
    }
  }

  diff: any = 0;
  timeDiff: any = 0;
  calculateDays(): void {
    let count = 0;
    if (this.trainingReqForm.value.actualEndDate != "" && this.trainingReqForm.value.actualStartDate != "") {
      let endDate = addDays(new Date(this.trainingReqForm.value.actualEndDate), 1);
      let startDate = new Date(this.trainingReqForm.value.actualStartDate);
      for (const date of this.holiday) {
        if (isBefore(parseISO(date.start), endDate) && isAfter(parseISO(date.start), startDate)) {
          if (!isWeekend(parseISO(date.start))) {
            count++;
          }
        }
      }
      this.diff = differenceInBusinessDays(endDate, startDate) - count;
    }
  }
  calculateTime():void{
    let startDate = new Date("2024-01-01 "+this.trainingReqForm.value.actualEndTime);
    console.log("hello "+startDate);
    
    if(this.trainingReqForm.value.actualEndTime != "" && this.trainingReqForm.value.actualStartTime != ""){
      
      let endTime = new Date("2024-01-01 "+this.trainingReqForm.value.actualEndTime);
      let startTime = new Date("2024-01-01 "+this.trainingReqForm.value.actualStartTime);
      console.log("endtime "+endTime+"  startTime : "+startTime);
        if(isBefore( startTime,endTime))
          {
            this.timeDiff = (differenceInMinutes(endTime,startTime)/60).toFixed(2);
          }
      
    }
  }
}