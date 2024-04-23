import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { Nomination } from 'src/app/Model/Nomination';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.css']
})
export class TrainerDashboardComponent {
  userName: any;
  trainingReqForms : any[]=[];
  sideNavStatus:any;
  file!: File;
  fTraingData:any;
  nomination: Nomination[] = [];
  id: any;
  viewSideNavBar: boolean = true;
  role: string = '';
  trainingActualParticipants:any;

  constructor(private ser:TrainingRequestService,public authService: AuthService,public dialog: MatDialog,
    private jwtService: JwtService,
    private router: Router) {
      let token = authService.getToken();
      this.userName = jwtService.getFullNameFromToken(token);
      this.loadList();
}



 loadList(){
    this.ser.getUpcomingTrainings().subscribe((resp:any)=>{(this.trainingReqForms=resp)});
  }

  bulkUploadNominationData(event: any): void {
    this.id=this.fTraingData.id;
    this.trainingActualParticipants=this.fTraingData.noOfActualParticipant;
      this.file = event.target.files[0]
      console.log(this.file);
      let nomData: Nomination[] = [];
      this.ser.saveNominationDataOnFrontend(this.file).subscribe((resp: Nomination[]) => {
        nomData = resp;
        let maxLimit=nomData.length+this.trainingActualParticipants;
        if(maxLimit>60){
          Swal.fire('Oops...', 'Nomination Should not be greated then 60', 'error')
        }
        else{
          for (let i = 0; i < nomData.length; i++) {
            if(this.id!=null&&this.id>0){
                nomData[i].trainingId=this.id;
              this.ser.saveNomination(nomData[i]).subscribe((resp:Nomination)=>{
                nomData[i]=resp;
              });
            }
            this.nomination.push(nomData[i]);
          }
        }
        
        
        if(this.id!=null&&this.id>0){
          //this.reloadComponent();
          }
        if (this.nomination.length > 0) {
         // this.showNomination = true;
        }
      });
    }
  openDialog(templateRef:any,traningData:any) {

    if(this.fTraingData==undefined){
      this.fTraingData=traningData;
    }

    let dialogRef = this.dialog.open(templateRef, {
     width: '60%',
     height: '50%',
     data:this.fTraingData
   });
  }
}
