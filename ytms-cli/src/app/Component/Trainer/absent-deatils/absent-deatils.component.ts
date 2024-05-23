import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TrainingRequestService } from 'src/app/services/training-request.service';

@Component({
  selector: 'app-absent-deatils',
  templateUrl: './absent-deatils.component.html',
  styleUrls: ['./absent-deatils.component.css']
})
export class AbsentDeatilsComponent {

  trainingId:any;
  employeeId:any;
  employeeName:any;
  absentDetailsData:any;

  constructor(public dialogRef: MatDialogRef<AbsentDeatilsComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private ser:TrainingRequestService,private router: Router,public dialog: MatDialog){
    
    this.trainingId = data.traningId;
    this.employeeId=data.empidId;
    this.employeeName=data.empName;
    this.loadAbsentDataList();
   
  }

  loadAbsentDataList(){
    this.ser.getAbsentData(this.trainingId,this.employeeId).subscribe((resp:any)=>{
      console.log(resp)
    this.absentDetailsData=resp;
    })


   }

}
