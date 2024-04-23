import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {AuthService} from "../../Core/services/auth.service";
import {JwtService} from "../../Core/services/jwt.service";
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timegrid from '@fullcalendar/timegrid';
import { CalendarService } from 'src/app/Core/services/calendar.service';
import { UsersService } from 'src/app/Core/services/users.service';
import { MatSelectChange } from '@angular/material/select';
import { addDays, eventTupleToStore } from '@fullcalendar/core/internal';
import { MatDialog } from '@angular/material/dialog';
import { DayComponentComponent } from './Calendar Component/day-component/day-component.component';
import isSameDay from 'date-fns/isSameDay';
import { EventComponentComponent } from './Calendar Component/event-component/event-component.component';
import { EventFormComponent } from './Calendar Component/event-form/event-form.component';
import { isWeekend, format, isAfter, isBefore, parseISO } from 'date-fns';
import  dayCellDidMount  from '@fullcalendar/daygrid';
import { OptionalHolidayComponent } from './Optional Holiday/optional-holiday/optional-holiday.component';
import { SelectionChange } from '@angular/cdk/collections';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit{
  @Input() sideNavStatus: boolean = false;
  selectedValue:String='Month';

  constructor(private dialog:MatDialog,private calendarService:CalendarService,private authService:AuthService,private jwtService:JwtService,private userService:UsersService){}

  events :any[]=[]
  allEvents:any[]=[];
  emailEvents:any[]=[];
  users:any[]=[];
  holidays:any[]=[];
  searchFilter:boolean=false;
  userRole:String='';
  actionCss:String='actions'


  calendarEvents:any[]=[]
  recusingDay=0;
  
  async getAllEvents()
  {  
   this.calendarOptions.initialDate=new Date();
    this.calendarService.getALLEvents().subscribe((data:any[]) => 
    { 
      console.log(data),this.allEvents = data.map(event => ({
      id:event.id,
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      scheduleUser:event.scheduleUser
    })),
      this.events= data.map(event => ({
      id:event.id,
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      scheduleUser:event.scheduleUser,
      number_of_week_days:event.number_of_week_days   
    }))
    ,console.log(this.events),   
    this.calendarService.getALLHolidays().subscribe((data)=>
    {
      console.log(data)
      this.holidays=data     
      this.calendarOptions.events = this.allEvents.concat(data),
      this.calendarOptionsWeek.events =  this.allEvents.concat(data),
      this.calendarOptionsDay.events =this.allEvents.concat(data)
     
     
      })
     
  })
  }


  async getEventByTrainer(email:any)
  {
  this.calendarService.getEventsByTrainer(email).subscribe((data:any[]) => 
  { console.log(data),this.allEvents = data.map(event => ({
    id:event.id,
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
    scheduleUser:event.scheduleUser 
  })),
    this.events= data.map(event => ({
    id:event.id,
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
    scheduleUser:event.scheduleUser,
    number_of_week_days:event.number_of_week_days   

  }))
  ,  this.calendarService.getALLHolidays().subscribe((data)=>
  {
     this.holidays=data
     this.calendarOptions.events = this.allEvents.concat(data),
     this.calendarOptionsWeek.events =  this.allEvents.concat(data),
     this.calendarOptionsDay.events =this.allEvents.concat(data)
    })
  });
  }
  
 
  switchUser({ value }: MatSelectChange) {
    if (value === "All") {
 this.calendarOptions.events=[];
      this.getAllEvents();
    } else {
 this.calendarOptions.events=[];
      this.getEventByTrainer(value);
    }
  }

isOptionalHoliday(events:any,date:Date):any
{
  for(const event of events)
  {
    if(isSameDay(parseISO(event.start),date))
    {
      return true
    }
}
return false
}
  
  ngOnInit(): void 
  {
    const token = this.authService.getToken();
    const role = this.jwtService.getRoleFromToken(token);
    const email = this.jwtService.getUserNameFromToken(token);
    this.userRole=role;
    console.log(role,email);

    if (role === 'ROLE_TECHNICAL_MANAGER' ) 
    {
    this.getAllEvents();
    this.searchFilter=true;  
    }
    else if(role === 'ROLE_COMPETENCY_MANAGER')
    {
    this.getAllEvents();
    this.searchFilter=true;  
    this.actionCss='competency-action'  
  }

    else if (role == 'ROLE_TRAINER')
    {    
    
        this.actionCss='trainer-action'

      this.searchFilter=false;  
      this.getEventByTrainer(email);
      
    }

      this.userService.getAllTrainers().subscribe((data)=>{this.users=data,console.log(data)})

  }
  customButtons=
  {
  Month:
    {
      text:'Month',
      click:()=>{   this.selectedValue='Month'},
      
    }
  ,Week:
 {
   text:'Week',
   click:()=>{   this.selectedValue='Week'},
 },
Day:
 {
  text:'Day',
  click:()=>{   this.selectedValue='Day'},
 },
 Search: {
  text: 'Search',

 },
}
calendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin,interactionPlugin,timegrid],
  dateClick: (info)=>
  {
    if(!isWeekend(info.date) && !this.isOptionalHoliday(this.holidays,info.date))
    {
      this.handleDateClick(info)}
      else{
      }
    },
  initialView:'dayGridMonth',
  eventClick:this.handelEventClickedDay.bind(this),
  // this.handleEventClickMonthWeek.bind(this),
  headerToolbar:{
    right: 'Month,Week,Day',
    center:'title',
    left:'prev,today,next'
  }, 
    height:"800px",
    customButtons:this.customButtons,
     
 };

 calendarOptionsWeek : CalendarOptions = {
  plugins: [dayGridPlugin,interactionPlugin,timegrid], 
  dateClick: (info)=>
  {
    if(!isWeekend(info.date))
    {
      this.handleDateClick(info)}
    },

  eventClick:this.handelEventClickedDay.bind(this),
  // this.handleEventClickMonthWeek.bind(this)
  initialView:'timeGridWeek',  
  headerToolbar:{
    right: 'Month,Week,Day',
    center:'title',
    left:'prev,today,next'
    
  },
  customButtons:this.customButtons
};
calendarOptionsDay : CalendarOptions = {
  plugins: [dayGridPlugin,interactionPlugin,timegrid], 
  dateClick: (info)=>
  {
    if(!isWeekend(info.date))
    {
      this.handleDateClick(info)}

    },
  eventClick:this.handelEventClickedDay.bind(this),
  initialView:'timeGridDay',  
  headerToolbar:{
    right: 'Month,Week,Day',
    center:'title',
    left:'prev,today,next'
  },
  customButtons:this.customButtons
  
};

handleEventClickMonthWeek(info:any)
{
if(!this.isOptionalHoliday(this.holidays,info.event.start)){
const events = info.event.start
this.selectedValue='Day';
this.calendarOptionsDay.initialDate=info.event.start 
console.log(events)
}
}

handelEventClickedDay(info:any) 
 {
  const clickedEvent = info.event
  var id :any;
  let date
  var number_of_week_days:any;
  for(const event of this.events)
  {  
  
    date=event.start
   if (event.start) 
   {
    if (event.end) 
    {
      if(event.title===clickedEvent.title)
      {
        id=event.id
      }     
    }  
  } 
  } 
  console.log(clickedEvent+id)    
  const EventDialog = this.dialog.open(EventComponentComponent,{width:"425px",height:"305px",data:{event:clickedEvent,id:id,number_of_week_days:number_of_week_days}})
}
handleDateClick(info:any) {
  const clickedDateObject = info.date;
    this.calendarOptionsWeek.initialDate=clickedDateObject;
  this.calendarOptionsDay.initialDate=clickedDateObject;
  if(!this.isOptionalHoliday(this.holidays,info.date)){
  const viewDate=this.dialog.open(DayComponentComponent,{width:"800px",data:{date:clickedDateObject,events:this.events.filter(event => {
    if (event.start) {
      return isSameDay(event.start, clickedDateObject);
    } else {
      return false; 
    }
   })  ,initialView:this.selectedValue}},)
  viewDate.afterClosed().subscribe(result=>(this.selectedValue=result.initialView,this.calendarOptions.initialDate=clickedDateObject))      
 console.log(this.events),
  
 console.log(this.events.filter(event => {
  if (event.start) {
    return isSameDay(event.start, clickedDateObject);
  } else {
    return false; 
  }
}))
}
 }
addEvent()
{
 this.dialog.open(EventFormComponent,{width:"400px",height:"90vh",data:{date:new Date()}})
 }
addOptionalHoliday()
{
  this.dialog.open(OptionalHolidayComponent,{width:"600px",height:"30vh"})
}

}

