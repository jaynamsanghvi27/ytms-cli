import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import { AbsentDeatilsComponent } from '../absent-deatils/absent-deatils.component';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.css']
})
export class ViewAttendanceComponent {
  trainingId:any;
  attendsData:any;
  constructor(public dialogRef: MatDialogRef<ViewAttendanceComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private ser:TrainingRequestService,private router: Router,public dialog: MatDialog){
    
    this.trainingId = data;
    this.loadTranieeAttedanceList(this.trainingId);
   
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

   

   viewAbsentDeatils(empidId:any,empName:any){
    const dialogRef =this.dialog.open(AbsentDeatilsComponent,{
      data:{'empidId':empidId,'traningId':this.trainingId ,'empName':empName},
      width: '100%',
      height: '90%'
    } );
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The viewAttendance dialog was closed');
     // this.getTrainerTrainingList();
    });
  }
  

}
