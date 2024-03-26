import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Core/services/auth.service';
import { Nomination } from 'src/app/Model/Nomination';
import { TrainingRequestService } from 'src/app/services/training-request.service';

@Component({
  selector: 'app-edit-nomination',
  templateUrl: './edit-nomination.component.html',
  styleUrls: ['./edit-nomination.component.css']
})
export class EditNominationComponent {
  nomination: Nomination[] = [];
  constructor(public dialogRef: MatDialogRef<EditNominationComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder, private router: Router, private ser: TrainingRequestService,
    private activatedRoute: ActivatedRoute, public dialog: MatDialog,private auth:AuthService,){
     // this.trainingId = data;
      this.getNominationListByTrainingId(data);
  }
  ngOnInit(): void {

  }

  getNominationListByTrainingId(trainingId:any){
    if(trainingId != null && trainingId >0)
    this.ser.getNominationListByTrainingId(trainingId).subscribe(resp => {
      this.nomination = resp;
    });
  }

  deleteNominationById(nominationId: any){
    confirm("Are You Sure Want Delete Nomination "+nominationId)
    this.ser.deleteNominationById(nominationId).subscribe(data=>{
      console.log(data)
      this.dialogRef.close();
    });
    //this.getNominationListByTrainingId(this.id);
    //this.reloadComponent();
  }


}
