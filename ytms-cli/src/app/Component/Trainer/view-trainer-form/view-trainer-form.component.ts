import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import { ViewTraninerComponent } from '../view-traniner/view-traniner.component';
import { EditNominationComponent } from '../edit-nomination/edit-nomination.component';

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
 
loadList(){
  this.ser.getTraining().subscribe((resp:any)=>{
    console.log(resp);
    (this.trainingReqForms=resp)});
}

getTrainerTrainingList(){
  this.ser.getTrainerTrainingList().subscribe((resp:any)=>{
    console.log(resp);
    (this.trainingReqForms=resp)});
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





