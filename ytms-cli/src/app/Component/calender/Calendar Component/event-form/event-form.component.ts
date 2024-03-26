import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { addDays, addMonths, addYears, differenceInDays, eachDayOfInterval, format, isWeekend } from 'date-fns';
import { filter } from 'rxjs';
import { CalendarService } from 'src/app/Core/services/calendar.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {


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
    title: ['', Validators.required], // Required title
    start_date: this.datePipe.transform(this.StartDate, 'yyyy-MM-dd'),
    start_time: [''],
    end_date: this.datePipe.transform(this.StartDate, 'yyyy-MM-dd'),
    end_time: [''],
    number_of_week_days:0
  });


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

//RECURSE BY DAY
  // recurseByDay(day: number, event: any): void {
  //   let addedCount = 0;
  
  // for (let i = 1; i <= day; i++) {
  // let newStartDate = addDays(new Date(event.start_date as (number | Date)), i - 1);
  // let skippedWeekends = 0;

  // while (addedCount < day && skippedWeekends < day) {
  //   if (!isWeekend(newStartDate)) {
  //     this.events.push({
  //       ...event,
  //       start_date: format(newStartDate, 'yyyy-MM-dd'),
  //       start_time: event.start_time,
  //       title: event.title,
  //       end_date: format(newStartDate, 'yyyy-MM-dd'),
  //       end_time: event.end_time,
  //       userid: event.userid,
  //     });
  //     addedCount++;
  //   } else {
  //     skippedWeekends++;
  //   }
  //   newStartDate = addDays(newStartDate, 1);
  //   }
  //   }
  
  //   console.log(this.events);
  //   this.eventService.addEvent(this.events).subscribe(
  //     (success) => console.log(success),
  //     (error) => console.log(error)
  //   );
  // } 
 

event:any={};
createEvent()
{
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
    this.eventForm.get('number_of_week_days')?.setValue((this.eventForm.value.number_of_week_days*5) );
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
  
closeEvents()
{
  this.addEvents.close()
}
}
