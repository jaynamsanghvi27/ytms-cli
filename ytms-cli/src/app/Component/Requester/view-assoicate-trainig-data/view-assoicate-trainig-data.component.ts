import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { AssociateManagement } from 'src/app/Model/AssociateManagement';
import { AssociateTrainingDataModel } from 'src/app/Model/AssociateTrainingDataModel';
import { TrainingRequestService } from 'src/app/services/training-request.service';

@Component({
  selector: 'app-view-assoicate-trainig-data',
  templateUrl: './view-assoicate-trainig-data.component.html',
  styleUrls: ['./view-assoicate-trainig-data.component.css']
})
export class ViewAssoicateTrainigDataComponent {
  associateTrainingData:AssociateManagement[]=[];
  userRole:string="";
  sideNavStatus: boolean = false;
  ngOnInit(): void {

  }
  constructor(private ser: TrainingRequestService,
    private activatedRoute: ActivatedRoute, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any){
      console.log("Employee Email ID  : "+data);
      this.getTrainingListByEmpId(data);
  }
  getTrainingListByEmpId(emailId:any){
    if(emailId != null){
      this.ser.getTrainingDataByEmpId(emailId).subscribe(resp => {
        this.associateTrainingData = resp;
      });
    }
  }
}
