import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { th } from 'date-fns/locale';
import { TrainingRequestService } from 'src/app/services/training-request.service';

@Component({
  selector: 'app-view-traniner',
  templateUrl: './view-traniner.component.html',
  styleUrls: ['./view-traniner.component.css']
})
export class ViewTraninerComponent {
  trainingReqForm!: any;
   trainingId:any;
   responseData:any;
   trainingStatusValue?: any[];
  constructor(public dialogRef: MatDialogRef<any>,private datepipe: DatePipe,private ser: TrainingRequestService, @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute){
   this.trainingStatusValue=['Planned','In Progress','Hold','Complete']
    
    this.trainingId = data;
   console.log(data)
  }

  ngOnInit(): void {
    this.trainingReqForm = this.formBuilder.group({
      id: [],
      actualStartDate: [''],
      actualEndDate: [''],
      createdAt:[],
      declinedMessage:[],
      endDate:[],
      fileName:[],
      noOfActualParticipant:[],
      noOfParticipant:[],
      startDate:[],
      status:[],
      trainingDescription:[],
      trainingIdentifierName:[],
      trainingName:[],
      updatedAt:[],
      userName:[],
      trainingStatus:['']
      })
      
    this.ser.getTrainingById(this.trainingId).subscribe((resp: any) => {
    console.log(resp)
    console.log(resp.actualStartDate)
    console.log(resp.actualEndDate)
    this.responseData=resp;
    
    this.trainingReqForm.patchValue({
      id: resp.id,
      actualStartDate:this.datepipe.transform(resp.actualEndDate, 'yyyy-MM-dd'),
      actualEndDate:this.datepipe.transform(resp.actualEndDate, 'yyyy-MM-dd'),
      createdAt:this.datepipe.transform(resp.createdAt, 'yyyy-MM-dd'),
      declinedMessage:resp.declinedMessage,
      endDate:this.datepipe.transform(resp.endDate, 'yyyy-MM-dd'),
      fileName:resp.fileName,
      noOfActualParticipant:resp.noOfActualParticipant,
      noOfParticipant:resp.noOfParticipant,
      startDate:this.datepipe.transform(resp.startDate, 'yyyy-MM-dd'),
      status:resp.status,
      trainingDescription:resp.trainingDescription,
      trainingIdentifierName:resp.trainingIdentifierName,
      trainingName:resp.trainingName,
      updatedAt:this.datepipe.transform(resp.updatedAt, 'yyyy-MM-dd'),
      userName:resp.userName,
     trainingStatus:""
    })
    this.trainingReqForm.get('trainingStatus').setValue(resp?.trainingStatus);
    })   
  }


  cancle(){
    this.dialogRef.close();
  }
    submit(){
      let obj: any = this.trainingReqForm.value;
      console.log("befor service " + JSON.stringify(this.trainingReqForm.value));
      this.ser.editTraining(obj).subscribe(data=>{
        this.dialogRef.close();
      });
    }
}
