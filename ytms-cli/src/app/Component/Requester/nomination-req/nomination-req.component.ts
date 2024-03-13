import { ActivatedRoute } from '@angular/router';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Nomination } from 'src/app/Model/Nomination';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import { TrainingReqComponent } from '../training-req/training-req.component';

@Component({
  selector: 'app-nomination-req',
  templateUrl: './nomination-req.component.html',
  styleUrls: ['./nomination-req.component.css']
})
export class NominationReqComponent {

  sideNavStatus: boolean = false;
  nominationReqForm!: FormGroup;
  trainingNm = "";
  nomination!: Nomination;
  nominationId:any;
  locations:any;
  grades:any;

    ngOnInit(): void {
    this.nominationReqForm = this.formBuilder.group(
      {
        id:[],
        emp_id: ['', [Validators.required]],
        emp_name: ['', [Validators.required]],
        emp_mail_id: ['', [Validators.required]],
        grade: ['', [Validators.required]],
        skill: ['', [Validators.required]],
        current_allocation: ['', [Validators.required]],
        project: ['', [Validators.required]],
        current_location: ['', [Validators.required]],
        trainingId:[]
      })

      this.nominationReqForm.controls['current_location'].setValue(0, { onlySelf: true });
      this.nominationReqForm.controls['grade'].setValue(0, { onlySelf: true });

  }
  constructor(private formBuilder: FormBuilder, private ser: TrainingRequestService, private trf: TrainingReqComponent, public dialog: MatDialog,private activatedRoute: ActivatedRoute) {
    // this.nominationReqForm.controls['trainingName']?.patchValue(this.service.trainingName$.subscribe());
    this.loadLocation();
    this.loadGrade();
    this.ser.nominationId$.subscribe((resp: any) => {
      this.nominationId=resp;
    });
    if(this.nominationId!=null&&this.nominationId>0){
      this.ser.getNominationById(this.nominationId).subscribe((resp:any)=>{
        this.nominationReqForm.patchValue(resp);
      })
    }
    this.ser.trainingName$.subscribe((resp: any) => {
      this.trainingNm = resp;
    })
  }

  loadLocation() {
    this.ser.getLocationMasterList().subscribe((resp: any) => { this.locations = resp });
  }
  loadGrade() {
    this.ser.getGradeMasterList().subscribe((resp: any) => { this.grades = resp });
  }
  submit(): void {
    let trainingId: any = this.activatedRoute.snapshot.paramMap.get('id');
    
    if (this.nominationReqForm.valid) {

      console.log(this.nominationReqForm.value);
      this.nomination = this.nominationReqForm.value;
      if(this.nominationId>0){
        this.updateNominationById();
      }
      else if(trainingId!=null && trainingId >0){
        this.nominationReqForm.controls['trainingId'].setValue(trainingId);
        this.ser.saveNomination(this.nominationReqForm.value).subscribe();
        //this.trf.reloadComponent();
      }
      else{
        this.trf.addNominationData(this.nomination);
      }
      
      this.closeDialogue();
      //this.trf.nomination.push(this.nomination);
    } else {
      this.nominationReqForm.markAllAsTouched();
    }
  }
  updateNominationById(){
    if (this.nominationReqForm.valid) {
      this.ser.updateNominationById(this.nominationReqForm.value).subscribe();
      this.trf.reloadComponent();
      //this.trf.getNominationListByTrainingId(this.nominationReqForm.value.trainingId);
    }
  }

  closeDialogue(){
    this.ser.nominationDataSubject.next(new Number());
    this.nominationReqForm.reset();
    this.dialog.closeAll();
  }
}
