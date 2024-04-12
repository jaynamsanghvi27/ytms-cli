import { Component, Inject } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatCalendarCellClassFunction, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TrainingRequestService } from 'src/app/services/training-request.service';

@Component({
  selector: 'app-add-tranier-attendance',
  templateUrl: './add-tranier-attendance.component.html',
  styleUrls: ['./add-tranier-attendance.component.css']
})
export class AddTranierAttendanceComponent {
  errorMsg:String="Selected date is greater than current date";
  hoidayErrorMsg:String="Selected date is Holiday/Optional Holiday";
  isShowcalender=false;
  holidayAndOptionalHoliday:any;
  listOfAttendanceMarkDates:any;
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
  constructor(private dateAdapter: DateAdapter<Date>,public dialogRef: MatDialogRef<AddTranierAttendanceComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private ser:TrainingRequestService,private router: Router,public dialog: MatDialog){
    this.dateAdapter.setLocale('en-GB'); 
    const currentYear = new Date().getFullYear();
    // this.maxDate = new Date(currentYear , 3, 25);
    // this.minDate = new Date(currentYear , 3, 25);

    this.maxDate = new Date();
    this.minDate = new Date();
    this.trainingId = data;
    this.getAllTranierAttendData(this.trainingId);
   
  }

  clickRowCheckBox(value:any){
    
     //this.findCount();  
  }

  clickHeaderCheckBox(event: any,idetifer:any){
  }

  getAllTranierAttendData(trainingId:any){
    this.ser.getAllTranierAttendData(trainingId).subscribe((resp:any)=>{
      console.log(resp)
      this.trainingDataList=resp;
    })
  }

  getStartAndEndDateAndHoliday(trainingId:any){
    this.ser.getStartDateEndDate(trainingId).subscribe((resp:any)=>{
      console.log(resp)
     // this.trainingDatesValue=resp; 
      this.listOfAttendanceMarkDates=resp['listOfMarkAttendanceDate'];
       this.holidayAndOptionalHoliday=resp['optionalHoliday'];
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

  public onDateChange(event: MatDatepickerInputEvent<any>): void {
    this.isError=false;
    this.isHolidayError=false;
 this.validateDate(this.convert(event.value))
 
}

validateDate(dateValue:any){
  this.isChecked=false;
    const value = dateValue;
  var date = (new Date()).toISOString().split('T')[0];
  this.isError=false;
  
  if(Date.parse(date) < Date.parse(value)){
    this.isError=true;
    //this.trainingDataList=[];
  }
  else{
    // this.checkHolidayAndOptionalHoilday(value);
    }

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
else if(this.listOfAttendanceMarkDates.includes(tempdate)){
  console.log(tempdate)
      return 'custom-date-class-mark-attendance';
    }
    else{
      if(this.starDate <= tempdate && this.endDate >= tempdate && day!=0 && day!=6 ){
        return 'custom-date-class-not-mark-attendance';
      }
     
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
  submit(){

    console.log(this.trainingDataList)
    console.log(this.trainingDataList)
    this.ser.saveselectedDateTranierAttendanceData(this.trainingDataList,this.trainingId).subscribe((resp:any)=>{
      console.log(resp)
      this.dialogRef.close();
     // this.trainingDataList=resp;
    })

  }

}
