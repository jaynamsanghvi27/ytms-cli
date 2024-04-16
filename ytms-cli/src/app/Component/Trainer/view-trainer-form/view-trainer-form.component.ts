import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import { ViewTraninerComponent } from '../view-traniner/view-traniner.component';
import { EditNominationComponent } from '../edit-nomination/edit-nomination.component';
import { AddAttendanceComponent } from '../add-attendance/add-attendance.component';
import { ViewAttendanceComponent } from '../view-attendance/view-attendance.component';
import Swal from 'sweetalert2';
import { AddTranierAttendanceComponent } from '../add-tranier-attendance/add-tranier-attendance.component';

@Component({
  selector: 'app-view-trainer-form',
  templateUrl: './view-trainer-form.component.html',
  styleUrls: ['./view-trainer-form.component.css']
})
export class ViewTrainerFormComponent {

  sideNavStatus: boolean = false;
  trainingReqForms : any[]=[];
  constructor(private ser:TrainingRequestService,private router: Router,public dialog: MatDialog){
  //this.loadList();
  this.getTrainerTrainingList();
}

downLoadExcel(id:any,trainingName:any){
  this.ser.downLoadAttendaceExcelReport(id,trainingName);
   
}

downloadFile(data: any) {
  const blob = new Blob([data], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.setAttribute('style', 'display: none');
  a.setAttribute('target', 'blank');
  a.href = url;
  a.download = "Associates.xlsx";
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}


 
getTrainerTrainingList(){
  this.ser.getTrainerTrainingList().subscribe((resp:any)=>{
    console.log(resp);
    (this.trainingReqForms=resp)});
}

editTranierAttendance(id:any){
  
  const dialogRef =this.dialog.open(AddTranierAttendanceComponent,{
    data:id,
    width: '100%',
    height: '90%'
  } );
  
  dialogRef.afterClosed().subscribe(result => {
    console.log('The editAttendance dialog was closed');
    this.getTrainerTrainingList();
  });  

}

viewAttendance(id:any){
  const dialogRef =this.dialog.open(ViewAttendanceComponent,{
    data:id,
    width: '100%',
    height: '90%'
  } );
  
  dialogRef.afterClosed().subscribe(result => {
    console.log('The viewAttendance dialog was closed');
    this.getTrainerTrainingList();
  });
}

editAttendance(id:any,staus:any){

  if((staus!="" || staus==null) && staus!="In Progress"){
    Swal.fire("Please check status is in In progress.");
  }
  else{

    const dialogRef =this.dialog.open(AddAttendanceComponent,{
      data:id,
      width: '100%',
      height: '90%'
    } );
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The editAttendance dialog was closed');
      this.getTrainerTrainingList();
    });  

  }

  

  
}

editViewTraniner(id:any){
//  this.router.navigate(['view-trainer']);
const dialogRef =this.dialog.open(ViewTraninerComponent,{
  data:id,
  width: '35%',
  height: '30%'
} );

dialogRef.afterClosed().subscribe(result => {
  console.log('The ViewTraninerComponent dialog was closed');
  //this.loadList();
  this.getTrainerTrainingList();
});
}


openDialog(trainingId:any){

  const dialogRef =this.dialog.open(EditNominationComponent,{
    data:trainingId
  } );
  
  dialogRef.afterClosed().subscribe(result => {
    console.log('The EditNominationComponent dialog was closed');
    //this.loadList();
    this.getTrainerTrainingList();
  });

}


}





