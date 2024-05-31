import { Component } from '@angular/core';
import { TrainingReqForm } from 'src/app/Model/TrainingRequestForm';
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
  userRole: any;
  listOfRequestersCount: number = 0;
  listOfTrainingsCount: number = 0;
  trainers: TrainingReqForm[] = [];
  constructor(private trainerAttendanceService: TrainerAttendanceService, private trainingRequestService: TrainingRequestService) {

  }

  ngOnInit(): void {
    this.loadPendingLeaves();
  }

  loadPendingLeaves() {
    this.trainerAttendanceService.getAllTranierAttendData().subscribe((response: TrainerAttendance[]) => {
      this.pendingLeaves = response;
      console.log(JSON.stringify(response));
    })
  }

  onNativeChange(e:any,leave:any) { // here e is a native event
    console.log(e.target.checked)
    if(e.target.checked){
      leave.leave_impact_on_traning="No"
    }
    else{
      leave.leave_impact_on_traning="Yes"
    }
  }


  submitResult(trainerAttendance: TrainerAttendance) {
  
    Swal.fire({
        title: 'Approve',
        text: "Are you sure you want approve the leave ?  training end date will get extended few more days",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
          trainerAttendance.leave_status = 'APPROVED';
          this.trainerAttendanceService.approvePendingLeave(trainerAttendance).subscribe(res => {
            if(trainerAttendance.leave_impact_on_traning=="Yes"){
              this.postLeaveData(trainerAttendance.leave_Start_date, trainerAttendance.leave_End_date, trainerAttendance.training_id);
            }
            this.loadPendingLeaves();
          })
            Swal.fire(
                'Approved!',
                'Leave has been approved.',
                'success'
            ).then((result) => {
            window.location.reload();
            })
        }
    })
}

  approve(trainerAttendance: TrainerAttendance) {
    this.submitResult(trainerAttendance);
  }

  postLeaveData(convertedStartdate: any, convertedEndDate: any, traingIds: any) {

    console.log("postLeaveData");
    this.trainingRequestService.postLeaveData(convertedStartdate, convertedEndDate, traingIds).subscribe((resp: any) => {
      console.log(resp);

    })
  }

  decline(trainerAttendance: TrainerAttendance) {
    trainerAttendance.leave_status = 'DECLINED';

    this.trainerAttendanceService.approvePendingLeave(trainerAttendance).subscribe(res => {

      this.loadPendingLeaves();
    })
  }

  getTrainers(leave: TrainerAttendance) {

    const trainingReqForm: any = {

      actualStartDate: leave.leave_Start_date,
      actualEndDate: leave.leave_End_date,
      actualStartTime: leave.leave_Start_time,
      actualEndTime: leave.leave_End_time,
      trainer: leave.tranier_name
    };
    this.trainingRequestService.getTrainers(trainingReqForm).subscribe((resp: any) => {
      console.log(resp);

    })
  }

}
