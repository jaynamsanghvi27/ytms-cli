import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatCalendarCellClassFunction, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { th } from 'date-fns/locale';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.css']
})
export class AddLeaveComponent {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  sideNavStatus: boolean = false;
  role: string = '';
  isSubmitbuttonDisable = true;
  todayDate: Date = new Date();
  holidayAndOptionalHoliday: any;
  absentDays: any;
  idVsLeaveDates: any;
  traninglist: any[] = [];
  isChecked: any;
  range: any;
  leaveStartDate: any;
  leaveEndDate: any;
  isLoading = false;
  waringObject: any[] = [];;
  isTraningImpact: boolean = false;

  constructor( private dateAdapter: DateAdapter<Date>, private ser: TrainingRequestService, private router: Router, public dialog: MatDialog,private authService:AuthService,
    private jwtService:JwtService,) {
    this.getTraninerAttendacedate();
    this.loadOptionaHoliday();
    // this.getTrainerTrainingList();
    this.traninglist = [];

    this.range = new FormGroup({
      start: new FormControl<'' | null>(null),
      end: new FormControl<'' | null>(null),
    });
  }
  
ngOnInit(): void {
  const token = this.authService.getToken();
  this.role = this.jwtService.getRoleFromToken(token);
}

  getTrainerTrainingList(leavStarDate: any, leaveEndDate: any) {
    this.ser.getTrainerTrainingList().subscribe((resp: any) => {
      console.log(resp);
      this.isSubmitbuttonDisable = false;
      let taringList = resp;
      for (let i = 0; i < taringList.length; i++) {
        let endDate = taringList[i]['actualEndDate'];
        let starDate = taringList[i]['actualStartDate'];
        let result = this.validateDate(starDate, endDate, leavStarDate, leaveEndDate);
        if (result) {
          taringList[i]['isApplyleave'] = false;
          this.traninglist.push(taringList[i]);
        }
      }
      //this.traninglist=resp;
    });
    // </ngIf>
  }


  validateDate(startDate: any, endDate: any, leavStarDate: any, leaveEndDate: any): boolean {

    //const startDatevValue = startDate;
    var date = (new Date()).toISOString().split('T')[0];

    if (((Date.parse(startDate) <= Date.parse(leaveEndDate)) && (Date.parse(endDate) >= Date.parse(leaveEndDate)) || (((Date.parse(startDate) >= Date.parse(leavStarDate)) && (Date.parse(endDate) <= Date.parse(leaveEndDate)))))) {
      return true;
    }
    return false;

  }

  getTraninerAttendacedate() {
    this.ser.getTrainerAttendanceData().subscribe((resp: any) => {
      console.log("getTraninerAttendacedate :" + resp)
      this.absentDays = resp['absentDates'];
      this.idVsLeaveDates = resp['idvsdate'];
    })
  }

  loadOptionaHoliday() {
    this.ser.getOptionalHoilday().subscribe((resp: any) => {
      console.log(resp)
      this.holidayAndOptionalHoliday = resp;
    })
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();
      const day = cellDate.getDay();
      const tempdate = this.convert(cellDate);
      if (this.holidayAndOptionalHoliday.includes(tempdate)) {
        console.log(tempdate)
        return 'custom-date-class-optionalholiday';
      }

      if (this.absentDays.includes(tempdate)) {
        return 'custom-date-class-optionalholiday1';
      }
    }

    return '';
  };

  public convert(str: any): any {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  clickHeaderCheckBox(event: any, idetifer: any) {
    this.waringObject = []
    console.log(event.currentTarget.checked);
    console.log(this.traninglist)
    for (let i = 0; i < this.traninglist.length; i++) {
      this.traninglist[i]['isApplyleave'] = event.currentTarget.checked;

    }
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    console.log(dateRangeStart.value);
    console.log(dateRangeEnd.value);
    this.waringObject = [];
    if (dateRangeStart.value != null && dateRangeStart.value != undefined && dateRangeStart.value != '' && dateRangeEnd.value != null && dateRangeEnd.value != undefined && dateRangeEnd.value != '') {
      this.traninglist = [];
      var parts = dateRangeEnd.value.split('/');
      let LeaveendDateEndString = parts[2] + "-" + parts[1] + "-" + parts[0];
      var parts2 = dateRangeStart.value.split('/');
      let LeaveStarDateEndString = parts2[2] + "-" + parts2[1] + "-" + parts2[0];
      this.getTrainerTrainingList(LeaveStarDateEndString, LeaveendDateEndString)
    }
  }

  getDates(startDate: any, stopDate: any): any {
    for (var arr = [], dt = new Date(startDate); dt <= new Date(stopDate); dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;
  }

  getDaysArray = function (start: any, end: any) {
    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;
  };
  clickRowCheckBox() {
    this.waringObject = [];
  }
  submitLeave() {
    this.isLoading = true;
    this.isSubmitbuttonDisable = true;
    
    let start = this.range.get("start")?.value;
    let end = this.range.get("end")?.value;
    let convertedStartdate = this.convert(start);
    let convertedEndDate = this.convert(end);;
    let leavedates: any[] = [];
    let cleavedates: any[] = [];

    if (start != end) {
      leavedates = this.getDaysArray(convertedStartdate, convertedEndDate);
      //leavedates.map((v)=>v.toISOString().slice(0,10));
      leavedates.map((v) => this.convert(v));
    }
    if (leavedates.length > 0) {
      for (let i = 0; i < leavedates.length; i++) {
        cleavedates.push(this.convert(leavedates[i]))
      }
    }




    //let traingIds=[];
    var traingIds: string[] = []
    console.log("submitLeave1")
    for (let i = 0; i < this.traninglist.length; i++) {
      if (this.traninglist[i]['isApplyleave']) {
        traingIds.push(this.traninglist[i]['id'])
      }
    }
    let tlIds = Object.keys(this.idVsLeaveDates);



    for (let i = 0; i < traingIds.length; i++) {
      let id = traingIds[i].toString();
      if (tlIds.includes(id)) {
        for (var key in this.idVsLeaveDates) {

          if (id == key) {
            let leaveDates = this.idVsLeaveDates[key]
            for (let j = 0; j < leaveDates.length; j++) {
              let t = leaveDates[j];
              if (cleavedates.includes(t)) {
                let obj = { 'id': id, 'date': t };
                this.waringObject.push(obj);
              }
            }
          }
        }
      }
    }

    

    if (this.waringObject.length == 0) {

      this.ser.postTranierLeaveData(convertedStartdate, convertedEndDate, traingIds,this.isTraningImpact).subscribe((resp: any) => {
        console.log(resp);
        
          console.log(resp);
          this.isSubmitbuttonDisable = true;
          this.isLoading = false;
          Swal.fire('Success', 'Leave Applied successfully !', 'success');

      })
    }
    else {
      this.isLoading = false;
    }

  }
  


}
