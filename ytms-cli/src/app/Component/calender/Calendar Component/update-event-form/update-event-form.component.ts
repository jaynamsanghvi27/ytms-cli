import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarService } from 'src/app/Core/services/calendar.service';

@Component({
  selector: 'app-update-event-form',
  templateUrl: './update-event-form.component.html',
  styleUrls: ['./update-event-form.component.css']
})
export class UpdateEventFormComponent implements OnInit{
  constructor(private eventService:CalendarService,private fb: FormBuilder,private datePipe: DatePipe,@Inject(MAT_DIALOG_DATA) public data:any,public addEvents:MatDialogRef<UpdateEventFormComponent>,private router: Router) { }
eventById:any={};
ngOnInit(): void {
  this.eventService.getEventsById(this.data.id).subscribe((data)=>{console.log(data),this.eventById=data,console.log(this.eventById.number_of_week_days),     this.eventForm.get('number_of_week_days')?.setValue(this.eventById.number_of_week_days );})  ;
} 
  events:any[]=[]
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
    this.eventForm.get('number_of_week_days')?.setValue(this.eventById.number_of_week_days/5);
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
    id:this.data.id,
    title: this.data.event.title, 
    start_date: this.datePipe.transform(this.data.event.start, 'yyyy-MM-dd'),
    start_time: this.datePipe.transform(this.data.event.start, 'HH:mm'),
    end_date: this.datePipe.transform(this.data.event.end, 'yyyy-MM-dd'),
    end_time: this.datePipe.transform(this.data.event.end,'HH:mm'),
    number_of_week_days:0
  }); 

event:any={title:''};
updateEvent()
{
  if(this.recurssion)
 {
 if(this.day)
 {
  console.log(this.eventById)
  //  this.weekDay=this.eventById.number_of_week_days
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
  
 else
 {
   this.event =this.eventForm.value
   console.log(this.event)
   this.eventService.addEvent(this.event).subscribe((success)=>console.log(success)) 
 }
 this.addEvents.close();
 window.location.reload()
 }}
  
closeEvents()
{
  this.addEvents.close()
}
}
