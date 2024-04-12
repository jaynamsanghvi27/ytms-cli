import { DatePipe } from '@angular/common';

import { Component, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { addDays, differenceInBusinessDays, isAfter, isBefore, isEqual, isWeekend, parseISO } from 'date-fns';
import { AuthService } from 'src/app/Core/services/auth.service';
import { CalendarService } from 'src/app/Core/services/calendar.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { Nomination } from 'src/app/Model/Nomination';
import { TrainingReqForm } from 'src/app/Model/TrainingRequestForm';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-training-req',
  templateUrl: './training-req.component.html',
  styleUrls: ['./training-req.component.css']
})
export class TrainingReqComponent {
  userName: String = "";
  selectedTechnology = "";
  sideNavStatus: boolean = false;
  //reg!: User[];
  trainingReqForm!: FormGroup;
  emailpattern = "^(.+)@(.+)$";
  upattern="[^0]+";
  trainingArray: any[] = ["", "", "", ""];
  completeTrainingName: any = "";
  units?: any[];
  technologies?: any[];
  competencies?: any[];
  trainingTypes?: any[];
  trainingRequestObject?: TrainingReqForm;

  monthYr: any;
  userRole: any;
  id: any;
  file!: File;
  nomination: Nomination[] = [];
  showNomination = false;
  holiday:any[]=[];



  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private ser: TrainingRequestService,
    private auth: AuthService, private jwtServ: JwtService, private datepipe: DatePipe,
    private activatedRoute: ActivatedRoute, public dialog: MatDialog, private calService:CalendarService,
    private _location: Location) {

    let token = auth.getToken();
    this.userName = jwtServ.getUserNameFromToken(token);
    this.userRole = this.jwtServ.getRoleFromToken(token);
    let trainingId = this.activatedRoute.snapshot.paramMap.get('id');
    
   this.editTrainingForm(trainingId);

  }

  backClicked() {
    this._location.back();
  }
  loadTechnology() {
    this.ser.getTechnologyMasterList().subscribe((resp: any) => { this.technologies = resp });
  }
  pushTechnology(technology:any) {
    this.technologies?.push(technology);
  }
  loadUnit() {
    this.ser.getUnitMasterList().subscribe((resp: any) => { this.units = resp });
  }
  pushUnit(unit:any) {
    this.units?.push(unit);
  }
  loadCompetency() {
    this.ser.getCompetencyMasterList().subscribe((resp: any) => { this.competencies = resp });
  }
  pushCompetency(competencie:any) {
    this.competencies?.push(competencie);
  }
  loadTrainingTypes() {
    this.ser.getTrainingTypesMasterList().subscribe((resp: any) => { this.trainingTypes = resp });
  }
  pushTrainingTypes(training:any) {
    this.trainingTypes?.push(training);
  }

  ngOnInit(): void {
    this.loadTechnology();
    this.loadUnit();
    this.loadCompetency();
    this.loadTrainingTypes();
    this.calService.getALLHolidays().subscribe((resp:any)=>{ this.holiday = resp});
    this.trainingReqForm = this.formBuilder.group(
      {
        id: [],
        unit: ['', [Validators.required,Validators.pattern(this.upattern)]],
        upgradedSkills: ['', [Validators.required]],
        competency: ['', [Validators.required,Validators.pattern(this.upattern)]],
        trainingType: ['', [Validators.required,Validators.pattern(this.upattern)]],
        monthAndYear: ['', [Validators.required]],
        trainingName: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        startTime: ['', [Validators.required]],
        // endDate: ['', [Validators.required]],
        endDate: new FormControl({ value: null, disabled: true}),
        endTime: ['', [Validators.required]],
        noOfDays : [],
        trainingDescription: ['', [Validators.required]],
        userName: ['', [Validators.required]],
        noOfParticipant: ['', [Validators.required]],
        bulkUploadFile: []
      })

    this.trainingReqForm.controls['unit'].setValue(0, { onlySelf: true });
    this.trainingReqForm.controls['upgradedSkills'].setValue(0, { onlySelf: true });
    this.trainingReqForm.controls['competency'].setValue(0, { onlySelf: true });
    this.trainingReqForm.controls['trainingType'].setValue(0, { onlySelf: true });
  }

  onUnitChange(unit: any) {
    console.log("unit "+unit)
    let option = unit;
    if (option == unit.name) {
      this.trainingReqForm.controls['unit'].setValidators([
        Validators.required,
        Validators.maxLength(8),
       ]);
     }
    this.trainingArray[0] = unit;
    this.creatTrainingName();
  }
  onCompetencyChange(competency: any) {
    this.trainingArray[1] = competency.target.value;
    this.creatTrainingName();
  }

  onTrainingChange(training: any) {
    this.trainingArray[2] = training.target.value;
    this.creatTrainingName();
  }
  onTechnologychange(technology: any) {
    this.trainingArray[3] = this.selectedTechnology;
    this.creatTrainingName();
  }
  onMonthYearchange(monthYear: any) {
    this.trainingArray[4] = this.datepipe.transform(monthYear.target.value, 'MMM-yyyy');
    this.creatTrainingName();
  }

  creatTrainingName() {
    this.completeTrainingName = "";
    this.trainingArray.forEach(function (value) {
      // message=value
    });
    if (this.trainingArray[0] != "") {
      this.completeTrainingName = this.trainingArray[0] + "-";
    }
    if (this.trainingArray[1] != "") {
      this.completeTrainingName += this.trainingArray[1] + "-";
    }
    if (this.trainingArray[2] != "") {
      this.completeTrainingName += this.trainingArray[2] + "-";
    }
    if (this.trainingArray[3] != "") {
      this.completeTrainingName += "(" + this.trainingArray[3] + ")-";
    }
    if (this.trainingArray[4] != "" && this.trainingArray[4] != undefined) {
      this.completeTrainingName += this.trainingArray[4];
    }
    if (this.completeTrainingName != "") {
      this.ser.setTrainingName(this.completeTrainingName);
      this.completeTrainingName = this.completeTrainingName;
    }
  }

  submit(): void {
    console.log("In Submit");
    this.submitted = true;
    this.trainingReqForm.get('upgradedSkills')?.setValue(this.trainingReqForm.value.upgradedSkills+"");
    console.log("befor service " + JSON.stringify(this.trainingReqForm.value));
    if (this.trainingReqForm.valid) {
      console.log("befor service " + JSON.stringify(this.trainingReqForm.value));
      console.log("Nomination Array : "+JSON.stringify(this.nomination));
      if (this.id != null) {
        let obj: any = this.trainingReqForm.value;
        this.ser.editTraining(obj).subscribe();
        Swal.fire('Success', 'Request updated and submitted to admin for approval', 'success');
        this.trainingReqForm.reset();
      }
      else {
        let obj: any = this.trainingReqForm.value;
        this.ser.saveTraining(obj, this.nomination).subscribe();
        this.nomination = [];
        Swal.fire('Success', 'Request has been submitted to admin for approval', 'success');
        this.trainingReqForm.reset();
      }
    } else {
      console.log("invalid");
     this.trainingReqForm.markAllAsTouched();
    //  this.trainingReqForm.controls['unit'].markAsTouched();
    //  this.trainingReqForm.controls['trainingType'].markAsTouched();
    //  this.trainingReqForm.controls['trainingName'].markAsTouched(); 
    
    //alert("Invaild Unit");
    //return; 
          
    }
  }

  redirectComponent() {
    this.router.navigate(['/nomination-req']);
  }
  openDialog(templateRef: any) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '50%',
      height: '50%'
    });

    /* dialogRef.afterClosed().subscribe(() => {
     this.ser.getUnitMasterList().subscribe((resp:any)=>{this.units=resp});
   }); */
  }

  editTrainingForm(trainingId: any) {
    console.log("TrainingID : "+trainingId);
    if (trainingId != null) {
      this.ser.getTrainingById(trainingId).subscribe((resp: any) => {
        console.log(resp);
        this.trainingRequestObject = resp;
        this.id = trainingId;
        this.trainingReqForm.get('id')?.setValue(trainingId);
        let localTrainingArray: string[] | undefined = this.trainingRequestObject?.trainingName.split("-") as string[];
        let unit: string = localTrainingArray[0] + "-" + localTrainingArray[1];
        this.trainingArray[0] = unit;
        let competency: string = localTrainingArray[2];
        this.trainingArray[1] = competency;
        if (localTrainingArray.length < 8) {
          let trainingType: string = localTrainingArray[3];
          this.trainingArray[2] = trainingType;
          let upgradedSkills: string = localTrainingArray[4];
          this.trainingArray[3] = upgradedSkills.replace("(", "").replace(")", "");
          let monthAndYear: string = localTrainingArray[5] + "-" + localTrainingArray[6];
          this.trainingArray[4] = monthAndYear;
          this.trainingRequestObject?.trainingName;
          this.trainingRequestObject?.startDate;
          this.trainingRequestObject?.endDate;
          this.trainingReqForm.patchValue(resp);
          this.trainingReqForm.get('unit')?.setValue(unit);
          this.trainingReqForm.get('competency')?.setValue(competency);
          this.trainingReqForm.get('trainingType')?.setValue(trainingType);
          this.trainingReqForm.get('upgradedSkills')?.setValue(upgradedSkills);
          this.trainingReqForm.get('monthAndYear')?.setValue(this.datepipe.transform(monthAndYear, 'yyyy-MM'));
        } else {
          let trainingType: string = localTrainingArray[3] + "-" + localTrainingArray[4];
          this.trainingArray[2] = trainingType;
          let upgradedSkills: string = localTrainingArray[5].replace("(", "").replace(")", "");
          this.trainingArray[3] = upgradedSkills;
          let monthAndYear: string = localTrainingArray[6] + "-" + localTrainingArray[7];
          this.trainingArray[4] = monthAndYear;
          this.trainingRequestObject?.trainingName;
          this.trainingRequestObject?.startDate;
          this.trainingRequestObject?.endDate;
          this.trainingReqForm.patchValue(resp);
          this.trainingReqForm.get('unit')?.setValue(unit);
          this.trainingReqForm.get('competency')?.setValue(competency);
          this.trainingReqForm.get('trainingType')?.setValue(trainingType);
          this.trainingReqForm.get('upgradedSkills')?.setValue(upgradedSkills);
          this.trainingReqForm.get('monthAndYear')?.setValue(this.datepipe.transform(monthAndYear, 'yyyy-MM'));
        }
        this.trainingReqForm.get('startDate')?.setValue(this.datepipe.transform(this.trainingRequestObject?.startDate, 'yyyy-MM-dd'));
        this.trainingReqForm.get('endDate')?.setValue(this.datepipe.transform(this.trainingRequestObject?.endDate, 'yyyy-MM-dd'))

      });
    }
    this.getNominationListByTrainingId(trainingId);
  }

  getNominationListByTrainingId(trainingId:any){
    if(trainingId != null && trainingId >0)
    this.ser.getNominationListByTrainingId(trainingId).subscribe(resp => {
      this.nomination = resp;
    });
  }


  bulkUploadNominationData(event: any): void {
    this.file = event.target.files[0]
    console.log(this.file);
    let nomData: Nomination[] = [];
    this.ser.saveNominationDataOnFrontend(this.file).subscribe((resp: Nomination[]) => {
      nomData = resp;
      for (let i = 0; i < nomData.length; i++) {
        if(this.id!=null&&this.id>0){
          nomData[i].trainingId=this.id;
          this.ser.saveNomination(nomData[i]).subscribe((resp:Nomination)=>{
            nomData[i]=resp;
          });
        }
        this.nomination.push(nomData[i]);
      }
      if(this.id!=null&&this.id>0){
        this.reloadComponent();
        }
      if (this.nomination.length > 0) {
        this.showNomination = true;
      }
    });
  }

  setNominationArray(nomData: Nomination) {
    this.nomination.push(nomData);
  }

  hideShowNomination() {
    this.showNomination = (!this.showNomination);
  }

  addNominationData(nomination: any) {
    this.nomination.push(nomination);
  }

  setNominationId(nominationId: any) {
    this.ser.setNominationId(nominationId);
    //this.nominationReq.nominationId=nominationId;
  }
  reloadComponent(){
    window.location.reload();
  }

  deleteNominationById(nominationId: any){
    confirm("Are You Sure Want Delete Nomination "+nominationId)
    this.ser.deleteNominationById(nominationId).subscribe();
    this.getNominationListByTrainingId(this.id);
  }
  gethasDropDownError() {
    return (
      this.trainingReqForm.get('unit')?.touched &&
      this.trainingReqForm.get('unit')?.errors &&
      this.trainingReqForm.get('unit')?.errors?.['required']
    )
  }

  dateToday(): Date {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    return new Date(year, month, day, hour, minute);
  }

  minEndDate():Date{
    return this.trainingReqForm.value.startDate;
  }

  diff:any=0;
  calculateDays():void{
    let count=0;
    if(this.trainingReqForm.value.endDate != null && this.trainingReqForm.value.startDate != null){
      let endDate = addDays(new Date(this.trainingReqForm.value.endDate),1);
      let startDate = new Date(this.trainingReqForm.value.startDate);
      for(const date of this.holiday)
      {
        if(isBefore( parseISO(date.start),endDate) && isAfter(parseISO(date.start),startDate))
          {
            if(!isWeekend(parseISO(date.start)))
            {
              count++;
            }
          }
      }
      this.diff = differenceInBusinessDays(endDate,startDate)-count;
    }
  }
  enableInputField(fieldName: string) {
    const control = this.trainingReqForm.get(fieldName) as FormControl;
    let startDate = new Date(this.trainingReqForm.value.startDate);
    for(const date of this.holiday){
      if(isEqual(parseISO(date.start),startDate)){
        Swal.fire('Error', 'Training Can not start on OH/Holiday', 'error');
      }
    }
    if (control) {
      control.enable();
    }
  }
}