import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { Nomination } from 'src/app/Model/Nomination';
import { TrainingRequestService } from 'src/app/services/training-request.service';

@Component({
  selector: 'app-view-nomination',
  templateUrl: './view-nomination.component.html',
  styleUrls: ['./view-nomination.component.css']
})
export class ViewNominationComponent {
  nomination: Nomination[] = [];
  id:any;
  userRole:string="";
  sideNavStatus: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private ser: TrainingRequestService,
    private activatedRoute: ActivatedRoute, public dialog: MatDialog,private auth:AuthService,
    private jwtServ:JwtService){
      let token = auth.getToken();
      this.userRole = jwtServ.getRoleFromToken(token);
      let trainingId = this.activatedRoute.snapshot.paramMap.get('id');
      this.id=trainingId;
      this.getNominationListByTrainingId(trainingId);
  }
  ngOnInit(): void {

  }

  getNominationListByTrainingId(trainingId:any){
    if(trainingId != null && trainingId >0)
    this.ser.getNominationListByTrainingId(trainingId).subscribe(resp => {
      this.nomination = resp;
    });
  }

  reloadComponent(){
    window.location.reload();
  }

  deleteNominationById(nominationId: any){
    confirm("Are You Sure Want Delete Nomination "+nominationId)
    this.ser.deleteNominationById(nominationId).subscribe();
    //this.getNominationListByTrainingId(this.id);
    this.reloadComponent();
  }

  openNominationDialog(templateRef: any) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '50%',
      height: '50%'
    });
  }
  setNominationId(nominationId: any) {
    this.ser.setNominationId(nominationId);
    //this.nominationReq.nominationId=nominationId;
  }

    
}
