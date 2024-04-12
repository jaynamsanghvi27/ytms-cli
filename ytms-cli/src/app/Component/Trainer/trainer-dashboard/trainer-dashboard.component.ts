import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { TrainingRequestService } from 'src/app/services/training-request.service';

@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.css']
})
export class TrainerDashboardComponent {
  userName: any;
  trainingReqForms : any[]=[];
  sideNavStatus:any;
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
  openDialog(templateRef:any) {
    let dialogRef = this.dialog.open(templateRef, {
     width: '60%',
     height: '50%'
   });
  }

}
