import { Component, Inject } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatCalendarCellClassFunction, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { an } from '@fullcalendar/core/internal-common';
import { TrainingRequestService } from 'src/app/services/training-request.service';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.css']
})
export class AddAttendanceComponent {
  errorMsg:String="Selected date is greater than current date";
  hoidayErrorMsg:String="Selected date is Holiday/Optional Holiday";
  isShowcalender=false;
  holidayAndOptionalHoliday:any;
  isTraninerAbsent=false;
  trainerAbsentDates:any;
  listOfAttendanceMarkDates:any;
  absentDays:any;
  starDate:any
  endDate:any
  minDate:any;
  maxDate: any;
  isError:boolean=false;
  isHolidayError:boolean=false;
  trainingDatesValue?: any[];
  trainingDataList!: any;
  trainingId:any;
  isAttenceDataPresnt=false;
  isChecked:any;
  presentNoOfCandidate:any=0;
  absentNoOfCandiate:any=0;;
  constructor(private dateAdapter: DateAdapter<Date>,public dialogRef: MatDialogRef<AddAttendanceComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private ser:TrainingRequestService,private router: Router,public dialog: MatDialog){
    this.dateAdapter.setLocale('en-GB'); 
    const currentYear = new Date().getFullYear();
    // this.maxDate = new Date(currentYear , 3, 25);
    // this.minDate = new Date(currentYear , 3, 25);

    this.maxDate = new Date();
    this.minDate = new Date();
    this.trainingId = data;
    this.loadDropDownDateList(this.trainingId);
    this.getStartAndEndDateAndHoliday(this.trainingId);
   
  }
  public onDateChange(event: MatDatepickerInputEvent<any>): void {
       this.isError=false;
       this.isHolidayError=false;
    this.validateDate(this.convert(event.value))
    
  }

  public convert(str:any):any {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  validateDate(dateValue:any){
    this.isChecked=false;
    this.isTraninerAbsent=false;
    this.absentNoOfCandiate=0;
    this.trainingDataList=[];
    this.presentNoOfCandidate=0;  
    const value = dateValue;
    var date = (new Date()).toISOString().split('T')[0];
    this.isError=false;
    
    if(Date.parse(date) < Date.parse(value)){
      this.isError=true;
      this.trainingDataList=[];
    }
    else if(this.trainerAbsentDates.includes(dateValue)){
      this.isTraninerAbsent=true;
    }
    else{
      this.checkHolidayAndOptionalHoilday(value);
      }

  }

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
  else if(this.listOfAttendanceMarkDates.includes(tempdate)){
    console.log(tempdate)
        return 'custom-date-class-mark-attendance';
      }
      else if(this.trainerAbsentDates.includes(tempdate)){
        return 'custom-date-class-optionalholiday1';
      }
      else{
        if(this.starDate <= tempdate && this.endDate >= tempdate && day!=0 && day!=6 ){
          return 'custom-date-class-not-mark-attendance';
        }
       
      }
      
    }
    

    return '';
  };

  checkHolidayAndOptionalHoilday(value:any){
    if(this.holidayAndOptionalHoliday.includes(value)){
      this.isHolidayError=true;
    }
    else{
      this.getSelectedDateData(value);
    }
  }

  public onOptionsSelectedFromDateDropDown(event:any) {
    this.isChecked=false;
    this.absentNoOfCandiate=0;
    this.presentNoOfCandidate=0;  
    
    const value = event.target.value;
    
    var date = (new Date()).toISOString().split('T')[0];
    this.isError=false;
    if(Date.parse(date) < Date.parse(value)){
      this.isError=true;
      this.trainingDataList=[];
    }
    else{
      this.getSelectedDateData(value);
    }

   // this.selected = value;
    console.log(value);
    setTimeout(()=>{ this.countAbsentAndPresentTrainee(); },1000);
 }

 countAbsentAndPresentTrainee(){
  
  this.absentNoOfCandiate=0;
  this.presentNoOfCandidate=0;
 
  if(this.trainingDataList!=null && this.trainingDataList!=undefined){
    for(let i=0;i<this.trainingDataList.length;i++){
      if(this.trainingDataList[i].attendance_status){
       this.presentNoOfCandidate=this.presentNoOfCandidate+1;
      }
      else{
      this.absentNoOfCandiate=this.absentNoOfCandiate+1;
      }
      
  }

    }
 }

  loadDropDownDateList(trainingId:any){
    this.ser.getAttendanceDatesList(trainingId).subscribe((resp:any)=>{
      console.log(resp)
      this.trainingDatesValue=resp;     
    })
  }

  getTraninerAttendacedate(){
    this.ser.getTrainerAttendanceData().subscribe((resp:any)=>{
      console.log("getTraninerAttendacedate :"+resp)
      this.absentDays=resp['absentData'];     
    })
  }
  getStartAndEndDateAndHoliday(trainingId:any){
    this.ser.getStartDateEndDate(trainingId).subscribe((resp:any)=>{
      console.log(resp)
     // this.trainingDatesValue=resp; 
      this.listOfAttendanceMarkDates=resp['listOfMarkAttendanceDate'];
       this.holidayAndOptionalHoliday=resp['optionalHoliday'];
       this.trainerAbsentDates=resp['trainerAbsentDates'];
      let starDate=resp['starendDate'][0];
      this.starDate=starDate;
      let endDate=resp['starendDate'][1];
      this.endDate=endDate;
      let fStartDate = new Date(starDate);
      let fEndDate = new Date(endDate);
      //console.log(myDate.getDate()+" : "+myDate.getDay()+" : "+myDate.getFullYear())
      this.minDate = new Date(fStartDate.getFullYear() , fStartDate.getMonth(), fStartDate.getDate());
      this.maxDate = new Date(fEndDate.getFullYear() , fEndDate.getMonth(), fEndDate.getDate());
      this.isShowcalender=true;
      //this.maxDate = new Date(fStartDate.getFullYear() , fStartDate.getMonth()-1, fStartDate.getDate());

      //this.maxDate = new Date(currentYear , 3, 25);
    })
  }


  getSelectedDateData(selecteddate:any){
    this.ser.getselectedDateTranieeData(selecteddate,this.trainingId).subscribe((resp:any)=>{
      console.log(resp)
      this.trainingDataList=resp;
     
    })
  }
  clickRowCheckBox(){
    setTimeout(()=>{ this.countAbsentAndPresentTrainee(); },1000);
     //this.findCount();  
  }
  clickHeaderCheckBox(event: any,idetifer:any){
    console.log(event.currentTarget.checked);
    
    for(let i=0;i<this.trainingDataList.length;i++){
      this.trainingDataList[i].attendance_status=event.currentTarget.checked;

    }
    this.countAbsentAndPresentTrainee();
 }

  submit(){
    console.log(this.trainingDataList)
    this.ser.saveselectedDateTranieeData(this.trainingDataList).subscribe((resp:any)=>{
      console.log(resp)
      this.dialogRef.close();
     // this.trainingDataList=resp;
    })
    
  }


  // sideNavStatus: boolean = false; 
  // pagination = true;
  // paginationPageSize = 100;
  // paginationPageSizeSelector = [200, 500, 1000];
  // rowData = [
  //   {
  //     "SNo": "1",
  //     "Emp ID": "101101",
  //     "Name": "abc",
  //     "EmailID": "abc@yash.com",
      
  // }
  // ];
  // colDefs: any[] = [
  //   { field: "SNo" ,filter: true,sortable: true,resizable: true,suppressSizeToFit: true,width: 100,pinned: 'left',sort: 'asc' },
  //   { field: "Emp ID" ,filter: true,sortable: true,resizable: true ,suppressSizeToFit:true,width: 100,pinned: 'left'},
  //   { field: "Name" ,filter: true,sortable: true,resizable: true ,suppressSizeToFit:true,pinned: 'left'},
  // ];

  // onGridReady(params:any) {
  //   params.api.sizeColumnsToFit();
  // }
}
