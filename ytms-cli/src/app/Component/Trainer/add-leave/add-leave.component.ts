import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatCalendarCellClassFunction, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TrainingRequestService } from 'src/app/services/training-request.service';

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.css']
})
export class AddLeaveComponent {

  isSubmitbuttonDisable=true;
  todayDate:Date = new Date();
  holidayAndOptionalHoliday:any;
  absentDays:any;
  traninglist: any[]=[];
  isChecked:any;
  range : any;
  leaveStartDate:any;
  leaveEndDate:any;
  isLoading=false;

  constructor(public dialogRef: MatDialogRef<AddLeaveComponent>,private dateAdapter: DateAdapter<Date>,private ser:TrainingRequestService,private router: Router,public dialog: MatDialog){
    this.getTraninerAttendacedate(); 
    this.loadOptionaHoliday();
    // this.getTrainerTrainingList();
     this.traninglist=[];

     this.range=new FormGroup({
      start: new FormControl<'' | null>(null),
      end: new FormControl<''| null>(null),
    });
  }

  getTrainerTrainingList(leavStarDate:any,leaveEndDate:any){
    this.ser.getTrainerTrainingList().subscribe((resp:any)=>{
      console.log(resp);
      this.isSubmitbuttonDisable=false;
      let taringList=resp;
      for(let i=0;i<taringList.length;i++){
        let endDate=taringList[i]['actualEndDate'];
        let starDate=taringList[i]['actualStartDate'];
        let result= this.validateDate(starDate,endDate,leavStarDate,leaveEndDate);
        if(result){
          taringList[i]['isApplyleave']=false;
          this.traninglist.push( taringList[i]);
        }
      }
   //this.traninglist=resp;
    });
      // </ngIf>
  }

  
  validateDate(startDate:any,endDate:any,leavStarDate:any,leaveEndDate:any):boolean{
    
    //const startDatevValue = startDate;
    var date = (new Date()).toISOString().split('T')[0];
      
    if(((Date.parse(startDate) <= Date.parse(leaveEndDate)) && (Date.parse(endDate) >= Date.parse(leaveEndDate)) || (((Date.parse(startDate) >= Date.parse(leavStarDate)) && (Date.parse(endDate) <= Date.parse(leaveEndDate)))))){
     return true;
    }
   return false;

  }

  getTraninerAttendacedate(){
    this.ser.getTrainerAttendanceData().subscribe((resp:any)=>{
      console.log("getTraninerAttendacedate :"+resp)
      this.absentDays=resp['absentDates'];     
    })
  }

  loadOptionaHoliday(){
    this.ser.getOptionalHoilday().subscribe((resp:any)=>{
      console.log(resp)
      this.holidayAndOptionalHoliday=resp;     
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
      const tempdate=this.convert(cellDate);
      if(this.holidayAndOptionalHoliday.includes(tempdate)){
        console.log(tempdate)
        return 'custom-date-class-optionalholiday';
      }
      
      if(this.absentDays.includes(tempdate)){
        return 'custom-date-class-optionalholiday1';
      }
    }

    return '';
  };

  public convert(str:any):any {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
 
  clickHeaderCheckBox(event: any,idetifer:any){
    console.log(event.currentTarget.checked);
    console.log(this.traninglist)
    for(let i=0;i<this.traninglist.length;i++){
      this.traninglist[i]['isApplyleave']=event.currentTarget.checked;

    }
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    console.log(dateRangeStart.value);
    console.log(dateRangeEnd.value);
     
    if(dateRangeStart.value!=null && dateRangeStart.value!=undefined  && dateRangeStart.value!='' && dateRangeEnd.value!=null && dateRangeEnd.value!=undefined && dateRangeEnd.value!='' ){
      this.traninglist=[];
      var parts =dateRangeEnd.value.split('/');
      let LeaveendDateEndString=parts[2]+"-"+parts[1]+"-"+parts[0];
      var parts2 =dateRangeStart.value.split('/');
      let LeaveStarDateEndString=parts2[2]+"-"+parts2[1]+"-"+parts2[0];
      this.getTrainerTrainingList(LeaveStarDateEndString,LeaveendDateEndString)
    }
  }

 getDates(startDate:any, stopDate:any):any {
  for(var arr=[],dt=new Date(startDate); dt<=new Date(stopDate); dt.setDate(dt.getDate()+1)){
    arr.push(new Date(dt));
}
return arr;
}

submitLeave(){
  this.isLoading=true;
  this.isSubmitbuttonDisable=true;
  console.log("submitLeave")
 let start= this.range.get("start")?.value;
 let end= this.range.get("end")?.value;
 let convertedStartdate = this.convert(start);
 let convertedEndDate = this.convert(end);;
 //let traingIds=[];
 var traingIds:string[] = []
 console.log("submitLeave1")
 for(let i=0;i<this.traninglist.length;i++){
  if(this.traninglist[i]['isApplyleave']){
    traingIds.push(this.traninglist[i]['id'])
  }  
 } 
 console.log("submitLeave2")
  this.ser.postTranierLeaveData(convertedStartdate,convertedEndDate,traingIds).subscribe((resp:any)=>{
    console.log(resp);
    this.postLeaveData(convertedStartdate,convertedEndDate,traingIds);
  })

}
postLeaveData(convertedStartdate:any,convertedEndDate:any,traingIds:any){

  console.log("postLeaveData");
  this.ser.postLeaveData(convertedStartdate,convertedEndDate,traingIds).subscribe((resp:any)=>{
    console.log(resp);
    this.isSubmitbuttonDisable=true;
    this.isLoading=false;
    this.dialogRef.close();
  })
}


}
