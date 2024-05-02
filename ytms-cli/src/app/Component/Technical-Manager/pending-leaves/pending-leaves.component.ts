import { Component } from '@angular/core';
import { TrainerAttendance } from 'src/app/Model/trainer-attendance';
import { TrainerAttendanceService } from 'src/app/services/trainer-attendance.service';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-leaves',
  templateUrl: './pending-leaves.component.html',
  styleUrls: ['./pending-leaves.component.css']
})
export class PendingLeavesComponent {

  
  pendingLeaves: TrainerAttendance[] = [];
  status: boolean = false;
  selectedRoleType: any;
  userRole:any;
  listOfRequestersCount: number = 0;
  listOfTrainingsCount: number = 0;

  constructor(private trainerAttendanceService: TrainerAttendanceService,private trainingRequestService:TrainingRequestService) {
             
  }

  ngOnInit(): void {
   this.loadPendingLeaves();
  }

  loadPendingLeaves() {
    this.trainerAttendanceService.getAllTranierAttendData().subscribe((response:TrainerAttendance[])=>{
        this.pendingLeaves =response;
    })
  }

  
  approveUser(trainerAttendance: TrainerAttendance) {
    this.trainerAttendanceService.approvePendingLeave(trainerAttendance).subscribe(res => {
      //this.status = res;
      this.postLeaveData(trainerAttendance.leave_Start_date,trainerAttendance.leave_End_date,trainerAttendance.training_id);
      this.loadPendingLeaves();
    })
  }
  
  postLeaveData(convertedStartdate: any, convertedEndDate: any, traingIds: any) {

    console.log("postLeaveData");
    this.trainingRequestService.postLeaveData(convertedStartdate, convertedEndDate, traingIds).subscribe((resp: any) => {
      console.log(resp);
     
    })
  }

  declineUser(user: any) {
    
  }

}
