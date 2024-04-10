import {Component} from '@angular/core';
import {AuthService} from "../../../Core/services/auth.service";
import {JwtService} from "../../../Core/services/jwt.service";
import {Router} from "@angular/router";
import { TrainingReqForm } from 'src/app/Model/TrainingRequestForm';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import { MatDialog } from '@angular/material/dialog';
import { Nomination } from 'src/app/Model/Nomination';

@Component({
  selector: 'app-requester-home',
  templateUrl: './requester-home.component.html',
  styleUrls: ['./requester-home.component.css']
})
export class RequesterHomeComponent {

  trainingReqForms : TrainingReqForm[]=[];
  sideNavStatus: boolean = false;
  username: string = '';
  isLoggedIn = false;
  file!: File;
  nomination: Nomination[] = [];
  id: any;
  constructor(public authService: AuthService,public dialog: MatDialog,
              private jwtService: JwtService,private ser:TrainingRequestService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      const token = this.authService.getToken();
      this.username = this.jwtService.getFullNameFromToken(token);
    }
    this.loadList();
  }
  loadList(){
    this.ser.getUpcomingTrainings().subscribe((resp:any)=>{(this.trainingReqForms=resp)});
  }
  bulkUploadNominationData(event: any): void {
    this.file = event.target.files[0]
    console.log(this.file);
    let nomData: Nomination[] = [];
    this.ser.saveNominationDataOnFrontend(this.file).subscribe((resp: Nomination[]) => {
      nomData = resp;
      for (let i = 0; i < nomData.length; i++) {
        if(this.id!=null&&this.id>0){
          nomData[i].trainingId=this.id;
          this.ser.saveNomination(nomData[i]).subscribe((resp:Nomination)=>{
            nomData[i]=resp;
          });
        }
        this.nomination.push(nomData[i]);
      }
      if(this.id!=null&&this.id>0){
        //this.reloadComponent();
        }
      if (this.nomination.length > 0) {
       // this.showNomination = true;
      }
    });
  }


  openDialog(templateRef:any) {
    let dialogRef = this.dialog.open(templateRef, {
     width: '60%',
     height: '50%'
   });
  }
}
