import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { addDays, addMonths, addYears, differenceInDays, eachDayOfInterval, format, isAfter, isBefore, isSameDay, isWeekend, parseISO } from 'date-fns';
import { Subject, filter } from 'rxjs';
import { CalendarService } from 'src/app/Core/services/calendar.service';
import { InjectionToken } from '@angular/core';
@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {


  constructor(private eventService:CalendarService,private fb: FormBuilder,private datePipe: DatePipe,@Inject(MAT_DIALOG_DATA) public data:any,public addEvents:MatDialogRef<EventFormComponent>,private router: Router) { }

  events:any[]=[]
  recursiveDays:number=0
  user_id=1    
  recurssion:boolean=false
  day:boolean=false
  week:boolean=false
  month:boolean=false
  year:boolean=false
    
    day_value:number=0
    week_value:number=0
    month_value:number=0
    year_value:number=0

  disableDay:boolean=false
  disableWeek:boolean=false
  disableMonth:boolean=false
  disableYear:boolean=false 
 
  holidays:any[]=[]

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
 
  setDayvalue(event:any)
 {
  const input = event.target as HTMLInputElement;
  this.day_value=Number(input.value);
  console.log(this.day_value)
}
setWeekvalue(event:any)
{
 const input = event.target as HTMLInputElement;
 this.week_value=Number(input.value);
 console.log(this.week_value)
}
setMonthvalue(event:any)
{
 const input = event.target as HTMLInputElement;
 this.month_value=Number(input.value);
 this.data.change= !this.data.change;
 console.log(this.month_value)
}

setYearvalue(event:any)
{
 const input = event.target as HTMLInputElement;
 this.year_value=Number(input.value);
 console.log(this.year_value)
}
  checkRecurssion()
  {
    this.recurssion=!this.recurssion
    console.log(this.recurssion);
  }
  byDay()
  {
    this.day=!this.day  
    this.disableWeek=!this.disableWeek  
    this.disableMonth=!this.disableMonth
    this.disableYear=!this.disableYear
    console.log(this.day);
  }
  byWeek()
  {
    this.week=!this.week
    this.disableYear=!this.disableYear
    this.disableDay=!this.disableDay
    this.disableMonth=!this.disableMonth
    console.log(this.week)
  }
  byMonth()
  {
    this.month=!this.month
    this.disableYear=!this.disableYear
    this.disableDay=!this.disableDay
    this.disableWeek=!this.disableWeek
    console.log(this.month)
  }
  byYear()
  {
   this.year=!this.year
   this.disableMonth=!this.disableMonth
   this.disableDay=!this.disableDay
   this.disableWeek=!this.disableWeek
   console.log(this.year)
  }
  StartDate = new Date(this.data.date);
  
  eventForm: FormGroup=this.fb.group({
    title: ['', Validators.required], 
    start_date: [this.datePipe.transform(this.StartDate, 'yyyy-MM-dd'),Validators.required],
    start_time: ['',Validators.required],
    end_date: [this.datePipe.transform(this.StartDate, 'yyyy-MM-dd'),Validators.required],   
    end_time: ['',Validators.required],
    number_of_week_days:[1,Validators.required]
  });

  minDate:Date=this.eventForm.get("start_date")?.value;

  ngOnInit(): void {
    this.eventForm.get('start_date')?.valueChanges
  .subscribe((newStartDate) => {
      this.minDate = newStartDate;
      this.eventForm.get('end_date')?.setValue(this.minDate);
  });
  this.eventForm.get('start_time')?.valueChanges
  .subscribe((newStartTime) => {
      this.eventForm.get('end_time')?.setValue(newStartTime);
  });
  this.eventService.getALLHolidays().subscribe((data)=>{this.holidays=data})
  }

  isOptionalHoliday(date:Date):any
  {
    for(const event of this.holidays)
    {
      if(isSameDay(parseISO(event.start),date))
      {
        return true
      }
  }
  return false
  }


  countWeekdaysBetweenMonths(startDate: Date, months: number): number {
    const endDate = addMonths(startDate, months); 
    let totalDays = differenceInDays(endDate, startDate); 
    let weekdaysCount = 0;
  
    for (let i = 0; i <= totalDays; i++) {
      const day = addDays(startDate, i); 
      if (!isWeekend(day)) {
        weekdaysCount++;
      }
    }
  
    return weekdaysCount;
  }  
  countWeekdaysInYear(startDate: Date,year:number): number {
    const endDate = addYears(startDate, year);
  
    let totalDays = differenceInDays(endDate, startDate);
    let weekdaysCount = 0;
  
    for (let i = 0; i <= totalDays; i++) {
      const day = addDays(startDate, i);
      if (!isWeekend(day)) {
        weekdaysCount++;
      }
    }
  
    return weekdaysCount;
  }

 

event:any={};
error:any={error:false,message:' '};
message:String='';
compareTimes(t1: string, t2: string): number {
  const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
  const match1 = timeRegex.exec(t1);
  const match2 = timeRegex.exec(t2);

  if (!match1 || !match2) {
    console.error('Invalid time format:', t1, t2);
    return 0; 
  }

  const hours1 = parseInt(match1[1], 10);
  const minutes1 = parseInt(match1[2], 10);
  const hours2 = parseInt(match2[1], 10);
  const minutes2 = parseInt(match2[2], 10);
  if (hours1 < hours2 || (hours1 === hours2 && minutes1 < minutes2)) {
    if(isAfter(new Date(this.eventForm.get("start_date")?.value),new Date(new Date(this.eventForm.get("end_date")?.value)))||this.isOptionalHoliday(new Date(this.eventForm.get("start_date")?.value))||(this.isOptionalHoliday(new Date(this.eventForm.get("start_date")?.value))))
    {
     if(this.isOptionalHoliday(new Date(this.eventForm.get("start_date")?.value))||(this.isOptionalHoliday(new Date(this.eventForm.get("start_date")?.value))))  
     {
      return 4;
     } 
     else{
     return 2;}
    }
    else
    {
    return -1; // t1 is equal to t2
    }  
 
  } else if (hours1 === hours2 && minutes1 === minutes2) {
  if(isSameDay(new Date(this.eventForm.get("start_date")?.value),new Date(new Date(this.eventForm.get("end_date")?.value)))|| isAfter(new Date(this.eventForm.get("start_date")?.value),new Date(new Date(this.eventForm.get("end_date")?.value)))||this.isOptionalHoliday(new Date(this.eventForm.get("start_date")?.value))||(this.isOptionalHoliday(new Date(this.eventForm.get("start_date")?.value))))
  {
    if(this.isOptionalHoliday(new Date(this.eventForm.get("start_date")?.value))||(this.isOptionalHoliday(new Date(this.eventForm.get("start_date")?.value))))
  {
    return 4;
  }
  else
  {
    return 2;
  
  }  
  }
  else
  {
    if(this.isOptionalHoliday(new Date(this.eventForm.get("start_date")?.value))||(this.isOptionalHoliday(new Date(this.eventForm.get("start_date")?.value))))
  {
    return 4;
  }
  else{
    return -1
  }
     ; // t1 is equal to t2 
}
  
  } else {if(isSameDay(new Date(this.eventForm.get("start_date")?.value),new Date(new Date(this.eventForm.get("end_date")?.value)))||isAfter(new Date(this.eventForm.get("start_date")?.value),new Date(new Date(this.eventForm.get("end_date")?.value)))||this.isOptionalHoliday(new Date(this.eventForm.get("start_date")?.value))||(this.isOptionalHoliday(new Date(this.eventForm.get("start_date")?.value))))
  {
    if(this.isOptionalHoliday(new Date(this.eventForm.get("start_date")?.value))||(this.isOptionalHoliday(new Date(this.eventForm.get("start_date")?.value))))
  {
    return 4;
  }
  else
  {
  return 3;
  }
  }
  else
  {
    return 1; // t1 is after t2
  }
  }
}
createEvent()
{
  if (this.eventForm.invalid || this.compareTimes(this.eventForm.get("start_time")?.value,this.eventForm.get("end_time")?.value)>0) {
    const missingFields: string[] = [];
     if(this.compareTimes(this.eventForm.get("start_time")?.value,this.eventForm.get("end_time")?.value)===3)
    {
      missingFields.push("StartDate and Endate Cannot Be Same")
    }
    if(this.compareTimes(this.eventForm.get("start_time")?.value,this.eventForm.get("end_time")?.value)===4)
    {
      missingFields.push("StartDate or EndDate is a Holiday")
    }
  
    if(this.compareTimes(this.eventForm.get("start_time")?.value,this.eventForm.get("end_time")?.value)===1)
    {
      missingFields.push("EndTime should be After StartTime")
    }
    if(this.compareTimes(this.eventForm.get("start_time")?.value,this.eventForm.get("end_time")?.value)===2)
    {
      missingFields.push("Endate should be after StartDate ")
    }
  
    else{
    for (const controlName in this.eventForm.controls) {
      if (this.eventForm.get(controlName)?.invalid) {
        switch (controlName) {
          case 'title':
            missingFields.push("Task");
            break;
          case 'start_time':
            missingFields.push("Start-Time");
            break;
          case 'end_time':
            missingFields.push("End-Time");
            break;
          case 'start_date':
            missingFields.push("Start-Date");
            break;
          case 'end_date':
            missingFields.push("End-Date");
            break;
        }
      }
      }
    }
    console.error('Form is invalid, missing fields:', missingFields.join(', '));
    this.message='Missing:'+missingFields.join(', ');
    this.error={error:true,message:this.message}
    return;
  }
  else{
 if(this.recurssion)
{
if(this.day)
{
  this.event =this.eventForm.value
  console.log(this.event)
  this.eventService.addEvent(this.event).subscribe((success)=>console.log(success))
}
else if(this.week)
{   
    this.eventForm.get('number_of_week_days')?.setValue(((this.eventForm.value.number_of_week_days-1)*5) );
    this.event =this.eventForm.value
    console.log(this.event)
    this.eventService.addEvent(this.event).subscribe((success)=>console.log(success))
  }
else if(this.month)
{   
  
   this.eventForm.get('number_of_week_days')?.setValue(this.countWeekdaysBetweenMonths(this.eventForm.value.start,this.eventForm.value.number_of_week_days)) 
   this.event =this.eventForm.value
    console.log(this.event)
    this.eventService.addEvent(this.event).subscribe((success)=>console.log(success)) 
}
}
else if(this.year)
{ 
  // this.eventForm.get('number_of_week_days')?.setValue(this.countWeekdaysInYear(this.eventForm.value.start,this.eventForm.value.number_of_week_days))
  // console.log(this.eventForm.value)
} 
else
{
  this.event =this.eventForm.value
  console.log(this.event)
  this.eventService.addEvent(this.event).subscribe((success)=>console.log(success)) 
}
this.addEvents.close();
window.location.reload()
}
}  
closeEvents()
{
  this.addEvents.close()
}
}
