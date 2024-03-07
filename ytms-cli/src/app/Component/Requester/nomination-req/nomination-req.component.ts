import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Nomination } from 'src/app/Model/Nomination';
import { TrainingReqForm } from 'src/app/Model/TrainingRequestForm';
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
  ngOnInit(): void {
    this.nominationReqForm = this.formBuilder.group(
      {
        emp_id: ['', [Validators.required]],
        emp_name: ['', [Validators.required]],
        emp_mail_id: ['', [Validators.required]],
        grade: ['', [Validators.required]],
        skill: ['', [Validators.required]],
        current_allocation: ['', [Validators.required]],
        project: ['', [Validators.required]],
        current_location: ['', [Validators.required]],
      })

  }

  constructor(private formBuilder: FormBuilder, private ser: TrainingRequestService, private trf: TrainingReqComponent, public dialog: MatDialog) {
    // this.nominationReqForm.controls['trainingName']?.patchValue(this.service.trainingName$.subscribe());
    console.log(this.ser.trainingName$.subscribe());
    
    console.log("$$$$$$$$$$$$$$$$$$$$$"+this.ser.nominationId$.subscribe());
    this.ser.trainingName$.subscribe((resp: any) => {
      this.trainingNm = resp;
    })
  }


  submit(): void {
    if (this.nominationReqForm.valid) {
      console.log(this.nominationReqForm.value);
      this.nomination = this.nominationReqForm.value;
      this.trf.addNominationData(this.nomination);
      this.closeDialog();
      //this.trf.nomination.push(this.nomination);
    } else {
      this.nominationReqForm.markAllAsTouched();
    }
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }

}
