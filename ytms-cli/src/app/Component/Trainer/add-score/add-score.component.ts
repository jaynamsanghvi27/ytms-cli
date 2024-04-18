import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Nomination } from 'src/app/Model/Nomination';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import { ViewAttendanceComponent } from '../view-attendance/view-attendance.component';

@Component({
  selector: 'app-add-score',
  templateUrl: './add-score.component.html',
  styleUrls: ['./add-score.component.css']
})
export class AddScoreComponent {
  
  role:string = 'ROLE_TRAINER';
  trainingId:any;
  attendsData:any;
  employees: Nomination[] = [];
  constructor(public dialogRef: MatDialogRef<ViewAttendanceComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private ser:TrainingRequestService,private router: Router,public dialog: MatDialog){
  
    this.trainingId = data?.id;
    this.role = data?.role;
    this.getNominationListByTrainingId(this.trainingId);
   
  }

  submit(){
    console.log("Submit Clicked : "+JSON.stringify(this.employees));
    this.ser.savefinalScore(this.employees).subscribe((resp:any)=>{
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
      console.log(JSON.stringify( resp));
      this.employees = this.processEmployeeData(resp);
    });
  }

  isSubmitDisabled(employee:any): boolean {
    if(this.role !== 'ROLE_TRAINER'){
      return true;
    }else{
      return employee.finalScore !== null;
    }

  }

  processEmployeeData(data:any[]): Nomination[] {
    return data.map(employee => ({
      ...employee,      
      disableFeedback: !employee.finalScore == null
    }));
  }
}
