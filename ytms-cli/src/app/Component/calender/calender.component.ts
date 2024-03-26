import { Component, Input, OnInit } from '@angular/core';
import {AuthService} from "../../Core/services/auth.service";
import {JwtService} from "../../Core/services/jwt.service";
import { CalendarOptions } from '@fullcalendar/core';
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
import { isWeekend, format } from 'date-fns';



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
  emailEvents:any[]=[];
  users:any[]=[]  
  searchFilter:boolean=false;
  userRole:String='';
  // sidebarClass:String='display-area p-3';
  calendarEvents:any[]=[]
  recusingDay=0;
  getAllEvents()
  {
    this.calendarService.getALLEvents().subscribe((data:any[]) => 
    { console.log(data),
      this.events= data.map(event => ({
      id:event.id,
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      scheduleUser:event.scheduleUser
    }))
    ,console.log(this.events), 
      this.calendarOptions.events = data.map(event => ({
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
        scheduleUser:event.scheduleUser
      })),
      this.calendarOptionsWeek.events = data.map(event => ({
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
      })),      
      this.calendarOptionsDay.events = data.map(event => ({
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
      }))
  
    });
      
      
  }
  getEventByTrainer(email:any)
  {
  this.calendarService.getEventsByTrainer(email).subscribe((data:any[]) => 
  { console.log(data),
    this.events= data.map(event => ({
    id:event.id,
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
    scheduleUser:event.scheduleUser
  }))
  ,console.log(this.events), 
    this.calendarOptions.events = data.map(event => ({
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
    })),
    this.calendarOptionsWeek.events = data.map(event => ({
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
    })),      
    this.calendarOptionsDay.events = data.map(event => ({
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
    }))

  });
  }
  

  

 switchUser(event: MatSelectChange)
 {
  if(event.value==="All")
  {
    this.getAllEvents();
  }
  else
  {
  this.getEventByTrainer(event.value)
  }
 }

  
  ngOnInit(): void 
  {
    const token = this.authService.getToken();
    const role = this.jwtService.getRoleFromToken(token);
    const email = this.jwtService.getUserNameFromToken(token);
    this.userRole=role;
    console.log(role,email);
    if (role === 'ROLE_TECHNICAL_MANAGER') 
    {
    this.getAllEvents();
    this.searchFilter=true;  
    }
      else if (role == 'ROLE_TRAINER')
      {
      // this.sidebarClass='display-area-ns p-3';    
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
 dateClick: this.handleDateClick.bind(this),
 initialView:'dayGridMonth',
 eventClick:this.handleEventClickMonthWeek.bind(this),
 headerToolbar:{
   right: 'Month,Week,Day',
   center:'title',
   left:'prev,today,next'
 }, 
   height:"700px",
   customButtons:this.customButtons 
};
calendarOptionsWeek : CalendarOptions = {
  plugins: [dayGridPlugin,interactionPlugin,timegrid], 
  dateClick: this.handleDateClick.bind(this),
  eventClick:this.handleEventClickMonthWeek.bind(this),
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
  dateClick: this.handleDateClick.bind(this),
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
const events = info.event.start
this.selectedValue='Day';
this.calendarOptionsDay.initialDate=info.event.start 
console.log(events)
}

handelEventClickedDay(info:any) 
 {
  const clickedEvent = info.event
  var id :any;
  for(const event of this.events)
  {  
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
  const EventDialog = this.dialog.open(EventComponentComponent,{width:"425px",height:"305px",data:{event:clickedEvent,id:id}})
}
handleDateClick(info:any) {
  const clickedDateObject = info.date;
    this.calendarOptionsWeek.initialDate=clickedDateObject;
  this.calendarOptionsDay.initialDate=clickedDateObject;
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
addEvent()
{
 this.dialog.open(EventFormComponent,{width:"400px",height:"90vh",data:{date:new Date()}})
 }


}

