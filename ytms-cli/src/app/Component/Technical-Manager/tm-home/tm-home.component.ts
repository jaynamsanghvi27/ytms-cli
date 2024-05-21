import {Component} from '@angular/core';
import {UsersService} from "../../../Core/services/users.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import { TrainingRequestService } from 'src/app/services/training-request.service';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { TrainerAttendanceService } from 'src/app/services/trainer-attendance.service';
import { TrainerAttendance } from 'src/app/Model/trainer-attendance';

@Component({
  selector: 'app-tm-home',
  templateUrl: './tm-home.component.html',
  styleUrls: ['./tm-home.component.css']
})
export class TmHomeComponent {

  sideNavStatus: boolean = false;
  userDetails: any = [];
  activeUserDetails: any = [];
  status: boolean = false;
  roles:any=[];
  selectedRoleType: any;
  userRole:any;
  listOfRequestersCount: number = 0;
  listOfTrainingsCount: number = 0;
  listOfPendingLeavesCount: number = 0;
  listOfActiveUserCount: number=0;
  listOfPendingLeaves: boolean = false;
  listOfRequester: boolean = true;
  requesterTable: boolean = false;
  listOfActiveUser: boolean = false;
  pendingRequestCount:number=0;
  

  constructor(private usersService: UsersService,private trainingRequestService:TrainingRequestService,private trainerAttendanceService:TrainerAttendanceService,
              private router: Router,private auth: AuthService, private jwtServ: JwtService) {
                let token = auth.getToken();
                this.userRole = jwtServ.getRoleFromToken(token);
  }

  ngOnInit(): void {
    this.getAllPendingUsers();
    this.getUpcomingTrainings();
    this.getAllRoles();
    this.loadPendingLeaves();
    this.getAllActiveUsers();
    this.getPendingRequestCount('Pending');
  }

  getPendingRequestCount(status:String){
    this.trainingRequestService.getTrainingByStatus(status).subscribe(res => {
      console.log(JSON.stringify(res));
      this.pendingRequestCount=res.length;
    })
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
      for(let i=0;i<this.userDetails.length;i++){
        this.userDetails[i]['roleType']="";
      }
    })
  }
  getAllActiveUsers(){
    this.usersService.getAllActiveUsers().subscribe(res => {
      this.activeUserDetails = res;
      this.listOfActiveUserCount = this.activeUserDetails.length; 
      for(let i=0;i<this.activeUserDetails.length;i++){
        this.activeUserDetails[i]['roleType']="";
      }
    })
  }

  loadPendingLeaves() {
    this.trainerAttendanceService.getAllTranierAttendData().subscribe((response:TrainerAttendance[])=>{
        this.listOfPendingLeavesCount =response.length;;
    })
  }

  getUpcomingTrainings(){
    this.trainingRequestService.getUpcomingTrainings().subscribe((resp:any)=>{ this.listOfTrainingsCount = resp.length });
  }

  approveUser(user: any) {
    if(!user.roleType)
      {
        Swal.fire('Oops!','Please Assign Role','error');
      }
    else{
      this.usersService.approvePendingUser(user.emailAdd,user.roleType).subscribe(res => {
       this.status = res;
       window.location.reload();
     })
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
  openList(val: any) {
    if ("requesterList" == val) {
      this.listOfRequester = true;
      this.requesterTable = true;
      this.listOfActiveUser=false;
      this.listOfPendingLeaves =false;
    }
    else if ("pendingLeaveList" == val) {
      this.listOfRequester = false;
      this.requesterTable = false;
      this.listOfPendingLeaves =true;
      this.listOfActiveUser=false;
    }
    else if ("activeUserList" == val){
      this.listOfRequester = false;
      this.listOfPendingLeaves =false;
      this.requesterTable = false;
      this.listOfActiveUser=true;
    }
    else if("pendingRequestList"==val){
      this.router.navigate(['/tm-view-trf']);
    }
    else {
      this.listOfRequester = false;
      this.listOfPendingLeaves =false;
      this.listOfActiveUser=false;
      this.requesterTable = true;
    }
  }
}
