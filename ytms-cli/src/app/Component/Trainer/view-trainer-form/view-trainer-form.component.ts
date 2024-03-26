import { Component } from '@angular/core';
import { TrainingRequestService } from 'src/app/services/training-request.service';

@Component({
  selector: 'app-view-trainer-form',
  templateUrl: './view-trainer-form.component.html',
  styleUrls: ['./view-trainer-form.component.css']
})
export class ViewTrainerFormComponent {

  trainingReqForms : any[]=[];
  constructor(private ser:TrainingRequestService){
  this.loadList();
}
 
loadList(){
  this.ser.getTraining().subscribe((resp:any)=>{
    console.log(resp);
    (this.trainingReqForms=resp)});
}
}
