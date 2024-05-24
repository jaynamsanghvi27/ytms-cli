import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import { ViewTraninerComponent } from '../view-traniner/view-traniner.component';
import { EditNominationComponent } from '../edit-nomination/edit-nomination.component';
import { AddAttendanceComponent } from '../add-attendance/add-attendance.component';
import { ViewAttendanceComponent } from '../view-attendance/view-attendance.component';
import Swal from 'sweetalert2';
import { AddTranierAttendanceComponent } from '../add-tranier-attendance/add-tranier-attendance.component';
import { AddFeedbackComponent } from '../add-feedback/add-feedback.component';
import { AddScoreComponent } from '../add-score/add-score.component';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { DownloadService } from 'src/app/Core/services/download.service';
import { AddLeaveComponent } from '../add-leave/add-leave.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-view-trainer-form',
  templateUrl: './view-trainer-form.component.html',
  styleUrls: ['./view-trainer-form.component.css']
})
export class ViewTrainerFormComponent {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  sideNavStatus: boolean = false;
  trainingReqForms : any[]=[];
  role: string = '';
  searchText = '';
  constructor(private authService:AuthService,
    private jwtService:JwtService,
    private ser:TrainingRequestService,private downloadService: DownloadService,
    private router: Router,public dialog: MatDialog){
  //this.loadList();
  this.getTrainerTrainingList();
}
search() {
  console.log("--->"+this.searchText)
}

ngOnInit(): void {
  const token = this.authService.getToken();
  this.role = this.jwtService.getRoleFromToken(token);
}

downLoadExcel(id:any,trainingName:any){
  this.ser.downLoadAttendaceExcelReport(id,trainingName);
 
}


sideNavToggle() {
 // this.menuStatus = !this.menuStatus;
  this.sideNavToggled.emit(true);
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
    // < *ngIf ="resp.trainingStatus=='In Progress'"
    (this.trainingReqForms=resp)});
    // </ngIf>
}

applyLeave(){
  const dialogRef =this.dialog.open(AddLeaveComponent,{
    //data:id,
    width: '100%',
    height: '90%'
  } );
  
  dialogRef.afterClosed().subscribe(result => {
    this.getTrainerTrainingList();
  }); 

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

editViewTraniner(id:any,tstatus:any){
//  this.router.navigate(['view-trainer']);
const dialogRef =this.dialog.open(ViewTraninerComponent,{
  
  data:{trainingId:id,
    status:tstatus},
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
    data:trainingId,
    width: '100%',
    height: '90%'
  } );
  
  dialogRef.afterClosed().subscribe(result => {
    console.log('The EditNominationComponent dialog was closed');
    //this.loadList();
    this.getTrainerTrainingList();
  });

}

addEditFeedBack(id:any){
  const dialogRef =this.dialog.open(AddFeedbackComponent,{
    data:{'id':id,'role':this.role},
    width: '100%',
    height: '90%'
  } );
  
  dialogRef.afterClosed().subscribe(result => {
    console.log('The viewAttendance dialog was closed');
    this.getTrainerTrainingList();
  });
}

updateFinalScore(id:any){
  const dialogRef =this.dialog.open(AddScoreComponent,{
    data:{'id':id,'role':this.role},
    width: '100%',
    height: '90%'
  } );
  
  dialogRef.afterClosed().subscribe(result => {
    console.log('The viewAttendance dialog was closed');
    this.getTrainerTrainingList();
  });
}

downloadAssociates() {
  this.downloadService.ExporTrainingstExcelFile(this.trainingReqForms).subscribe((res: any) => {
    this.downloadFile2(res);
  });;
}

downloadFile2(data: any) {
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


}





