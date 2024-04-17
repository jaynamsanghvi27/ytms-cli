import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Nomination } from 'src/app/Model/Nomination';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import { ViewAttendanceComponent } from '../view-attendance/view-attendance.component';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent {

  trainingId:any;
  attendsData:any;
  employees: Nomination[] = [];
  showTooltip:Boolean=false;
  constructor(public dialogRef: MatDialogRef<ViewAttendanceComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private ser:TrainingRequestService,private router: Router,public dialog: MatDialog){
    
    this.trainingId = data;
    this.getNominationListByTrainingId(this.trainingId);
   
  }

  submit(){
    console.log("Submit Clicked : "+JSON.stringify(this.employees));
    this.ser.saveEmployeeFeedbackByTrainer(this.employees).subscribe((resp:any)=>{
      console.log(resp)
      this.dialogRef.close();
    })
  }

  checkNumber(value:any){

    if(isNaN(value)){
    return "0"
    }
    return value;
  }

  loadTranieeAttedanceList(trainingId:any){
    this.ser.getAllTranieeAttendanceViewDateData(trainingId).subscribe((resp:any)=>{
      console.log(resp)
      this.attendsData=resp['value'];
    })
   }

   getNominationListByTrainingId(trainingId:any){
    if(trainingId != null && trainingId >0)
    this.ser.getNominationListByTrainingId(trainingId).subscribe(resp => {
      this.employees = this.processEmployeeData(resp);
    });
  }

  processEmployeeData(data:any[]): Nomination[] {
    return data.map(employee => ({
      ...employee,
      disableFeedback: employee.feedback!=null
    }));
  }
}
