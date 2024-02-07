import { parseISO} from 'date-fns';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject, debounce, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { FormBuilder, NgForm, NgModel, Validators } from '@angular/forms';
import { FlatPickrOutputOptions } from 'angularx-flatpickr/lib/flatpickr.directive';
import { CalendarService } from 'src/app/Core/services/calendar.service';
import { UsersService } from 'src/app/Core/services/users.service';
import { User } from 'src/app/Model/User';
import Swal from 'sweetalert2';
const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent {

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  trainerSearchTerm:string='';
  selectedTrainer!:any;
  allTrainers: any = [];
  emailpattern = /^[^\s@]+@yash\.com$/;
  event!: CalendarEvent;
  private searchTerms= new Subject<string>();
  
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();
selectedDate:string='';
editedEvent: CalendarEvent<any> = {
  title: '',
  start: new Date(),
  end: new Date(),
  color: colors['blue'], // You can adjust this based on your default color
  draggable: false,
  resizable: {
    beforeStart: false,
    afterEnd: false,
  },
};
trainer: any;

onDateSelect(date:string){
  this.selectedDate=date;
}
getPrimaryColor(event :CalendarEvent):string{
  return event.color?.primary|| '#1e90ff';
}
getSecondaryColor(event :CalendarEvent):string{
  return event.color?.secondary|| '#1e90ff';
}
getSecondaryTextColor(event :CalendarEvent):string{
  return event.color?.secondaryText|| '#1e90ff';
}
events: CalendarEvent[] = [];
 /*  events: CalendarEvent[] = [
     {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: { ...colors['red'] },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors['yellow'] },
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...colors['blue'] },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...colors['yellow'] },
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    }, 
  ]; */

  activeDayIsOpen: boolean = true;

  constructor(private formBuilder: FormBuilder,private modal: NgbModal, private calendarService:CalendarService,private userService:UsersService) {}
  ngOnInit(){
    console.log("Fetching all events");
// this.fetchAllEvents();
this.fetchAllTrainers();
console.log(" this.fetchAllTrainers(): ",JSON.stringify(this.fetchAllTrainers()));
this.searchTerms.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((term:string)=>this.calendarService.searchByTrainer(term))
)
.subscribe((events)=>{
  this.events=events;
})
  }

  onTrainerSearchChange():void{
    this.searchTerms.next(this.trainerSearchTerm);
  }
  ngOnDestroy(){
    this.searchTerms.unsubscribe();
  }
  fetchAllEvents(){
    this.calendarService.getAllEvents().subscribe(
      (events)=>{
        this.events=events;
        console.log('events fetched from database ',this.events);
      },
      (error)=>{
        console.log('Error Fetching Events',error);
      }
    )
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

/*   addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  } */
 updateEvent(editedEvent:CalendarEvent){
 
  this.calendarService.updateEvent(editedEvent.id,editedEvent).subscribe((res)=>{
    console.log("Event updated successfully in update event");

  })
  this.modal.dismissAll();
 }
 eventModal(content: any,eventToEdit: CalendarEvent) {
  this.calendarService.getEventById(eventToEdit.id).subscribe(
    (previousEvent:CalendarEvent)=>{
      this.editedEvent={...previousEvent};
      console.log("edited event ",this.editEvent);
      this.modal.open('editEventModal',{size:'lg'});
    },(error)=>{
      console.error("error fetching previous event details",error);
    }
  )
  this.modal.open(content, { size: 'lg' });
}
  editEvent(eventToEdit: CalendarEvent): void {
    
      console.log("edited event id is :",eventToEdit.id);
      // Implement the logic to save edited event
     
  
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    if(eventToDelete!==undefined){
      this.events = this.events.filter((event) => event !== eventToDelete);
      this.calendarService.deleteEvent(eventToDelete.id).subscribe(
        (res)=>{
          console.log('event deleted successfully !')
        },(error)=>{
          console.error('Error deliting event ',error);
        }
      )
    }
 
  }
  searchEventsByTrainer(trainer:any):void{
    console.log("TrainerEmail id is ::: ",JSON.stringify(trainer));
    this.calendarService.searchByTrainer(trainer).subscribe(
     
      (res)=>{
        console.log("res :",res);
        if(res.data=='Nil'){
          Swal.fire('info','No Events found for this Trainer','info');
          this.events=[];
        } else{
          const eventsWithoutYtmSUSer=res.data.map((event:any)=>{
       const {ytmsUser, title,start,end,color, ...rest}=event;
        return {
          title,
          start:new Date(start[0],start[1]-1,start[2],start[3],start[4]),
          end:new Date(end[0],end[1]-1,end[2],end[3],end[4]),
          color,
          draggable:true,
          resizable:{beforeStart:true,afterEnd:true},
          ...rest
        }

          });
          this.events=eventsWithoutYtmSUSer;
          console.log("this.events eventsWithoutYtmSUSer",this.events);
          console.log("this.events :::",this.events);
        }
       
      },(error)=>{
        console.error('Error searching events ',error);
      }
    )
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  openModal(content: any) {
    this.modal.open(content, { size: 'lg' });
  }
  newEventForm = this.formBuilder.group(
    {
      title:['',[Validators.required]],
      startDate:['',[Validators.required]],
      endDate:['',[Validators.required]],
      trainerEmail: ['', [Validators.required, Validators.pattern(this.emailpattern)]],
    
    })

  addNewEvent(newEventForm: NgForm) {
    // Validate and add the new event to the events array
    if (newEventForm.valid) {
      const newEvent: any = {
        title: newEventForm.value.title,
        start: new Date(newEventForm.value.startDate),
        end: new Date(newEventForm.value.endDate),
        color: newEventForm.value.primaryColor,
        trainerEmail: newEventForm.value.trainerEmail
        
      };

//this.events = [...this.events, newEvent];

this.calendarService.createEvent(newEvent).subscribe(
  (res)=>{
    Swal.fire('Info',"Event Created Successfully",'success');
    console.log("res in create ",res);
    this.events = [
      ...this.events,res];
    console.log('Event created successfully! ',this.events);
  },(error)=>{
    console.error('Error createing event ',error);
  }
)
 
      // Close the modal
      this.modal.dismissAll();
    }
  }
  fetchAllTrainers() {
    this.userService.getAllTrainers().subscribe(
      (trainers) => {
        this.allTrainers = trainers;
        console.log("this.allTrainers : ",this.allTrainers);
      },
      (error) => {
        console.error('Error fetching trainers', error);
      }
    );
  }
  

}

export interface EventDto {
  event:CalendarEvent;
  trainerEmail:string;
}