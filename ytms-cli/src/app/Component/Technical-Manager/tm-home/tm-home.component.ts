import {Component} from '@angular/core';
import {UsersService} from "../../../Core/services/users.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import { TrainingRequestService } from 'src/app/services/training-request.service';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';

@Component({
  selector: 'app-tm-home',
  templateUrl: './tm-home.component.html',
  styleUrls: ['./tm-home.component.css']
})
export class TmHomeComponent {

  sideNavStatus: boolean = false;
  userDetails: any = [];
  status: boolean = false;
  listOfRequester: boolean = true;
  requesterTable: boolean = false;
  roles:any=[];
  selectedRoleType: any;
  userRole:any;
  listOfRequestersCount: number = 0;
  listOfTrainingsCount: number = 0;

  constructor(private usersService: UsersService,private trainingRequestService:TrainingRequestService,
              private router: Router,private auth: AuthService, private jwtServ: JwtService) {
                let token = auth.getToken();
                this.userRole = jwtServ.getRoleFromToken(token);
  }

  ngOnInit(): void {
    this.getAllPendingUsers();
    this.getUpcomingTrainings();
    this.getAllRoles();
  }

  getAllRoles(){
    this.usersService.getAllRoles().subscribe(res => {
      this.roles = res;
    })
  }

  getAllPendingUsers() {
    this.usersService.getAllPendingUsers().subscribe(res => {
      this.userDetails = res;
      this.listOfRequestersCount = this.userDetails.length; 
    })
  }

  getUpcomingTrainings(){
    this.trainingRequestService.getUpcomingTrainings().subscribe((resp:any)=>{ this.listOfTrainingsCount = resp.length });
  }

  approveUser(user: any) {
    if(!this.selectedRoleType)
      {
        Swal.fire('Oops!','Please Assign Role','error');
      }
    else{
      this.usersService.approvePendingUser(user.emailAdd,this.selectedRoleType).subscribe(res => {
       this.status = res;
     })
    window.location.reload();
    }
  }

  declineUser(user: any) {
    this.usersService.declinePendingUser(user.emailAdd).subscribe(res => {
        this.status = res;
        if (this.status) {
          Swal.fire('Success', "User Decline Successfully !", 'success');
          this.router.navigate(['']);
        } else {
          Swal.fire('Failed', "User Decline Failed !", 'error');
          this.router.navigate(['']);
        }
      },
      error => {
        Swal.fire('Failed', "Something went wrong !", 'error');
      });
  }
  openList(val:any){
    if("requesterList"==val){
      this.listOfRequester=true;
      this.requesterTable=true;
    }
    else{
      this.listOfRequester=false;
    }
    }
}
