import {Component, TemplateRef, ViewChild} from '@angular/core';
import {isSameDay, isSameMonth} from 'date-fns';
import {debounceTime, distinctUntilChanged, Subject, switchMap} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView,} from 'angular-calendar';
import {EventColor} from 'calendar-utils';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {CalendarService} from 'src/app/Core/services/calendar.service';
import {UsersService} from 'src/app/Core/services/users.service';
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

  @ViewChild('modalContent', {static: true}) modalContent!: TemplateRef<any>;
  trainerSearchTerm: string = '';
  selectedTrainer!: any;
  allTrainers: any = [];
  emailpattern = /^[^\s@]+@yash\.com$/;
  event!: CalendarEvent;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData!: {
    action: string;
    event: CalendarEvent;
  };
  refresh = new Subject<void>();
  selectedDate: string = '';
  editedEvent: any = {
    title: '',
    start: new Date(),
    end: new Date(),
    color: colors['']
  };
  trainer: any;
  events: CalendarEvent[] = [];
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  activeDayIsOpen: boolean = true;
  newEventForm = this.formBuilder.group(
    {
      title: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      trainerEmail: ['', [Validators.required, Validators.pattern(this.emailpattern)]],
    })
  private searchTerms = new Subject<string>();

  constructor(private formBuilder: FormBuilder,
              private modal: NgbModal,
              private calendarService: CalendarService,
              private userService: UsersService) {
  }

  onDateSelect(date: string) {
    this.selectedDate = date;
  }

  getPrimaryColor(event: CalendarEvent): string {
    return event?.color?.primary || '#1e90ff';
  }

  getSecondaryColor(event: CalendarEvent): string {
    return event?.color?.secondary || '#1e90ff';
  }

  getSecondaryTextColor(event: CalendarEvent): string {
    return event?.color?.secondaryText || '#1e90ff';
  }

  ngOnInit() {
    console.log("Fetching all events");
    this.fetchAllEvents();
    this.fetchAllTrainers();
    console.log(" this.fetchAllTrainers(): ", JSON.stringify(this.fetchAllTrainers()));
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.calendarService.searchByTrainer(term))
    )
      .subscribe((events) => {
        this.events = events;
      })
  }

  onTrainerSearchChange(): void {
    this.searchTerms.next(this.trainerSearchTerm);
  }

  ngOnDestroy() {
    this.searchTerms.unsubscribe();
  }

  fetchAllEvents() {
    console.log("Fetching all events");
    this.calendarService.getAllEvents().subscribe(
      (response: any) => {
        console.log("Response from server:", response);
        if (response) {
          this.events = response.map((event: any) => ({
            ...event,
            start: new Date(event.start[0], event.start[1] - 1, event.start[2], event.start[3], event.start[4]),
            end: new Date(event.end[0], event.end[1] - 1, event.end[2], event.end[3], event.end[4])
          }));
          console.log("this events from server ", JSON.stringify(this.events))
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
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
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  updateEvent(editedEvent: any) {

    this.calendarService.updateEvent(editedEvent.eventId, editedEvent).subscribe((res) => {

      Swal.fire('SUCESS', "Event Updated Successfully", 'success');
      console.log("Event updated successfully in update event");

    })
    this.modal.dismissAll();
  }

  eventModal(content: any, eventToEdit: any) {
    this.calendarService.getEventById(eventToEdit.eventId).subscribe(
      (previousEvent: any) => {
        this.editedEvent = {
          ...previousEvent,
          trainerEmail: previousEvent.scheduleUser.emailAdd,
          start: previousEvent.start,
          end: previousEvent.end
        };
        this.modal.open('editEventModal', {size: 'lg'});
        console.log("start date value ", JSON.stringify(this.editedEvent));
      }, (error) => {
        console.error("error fetching previous event details", error);
      }
    )
    this.modal.open(content, {size: 'lg'});
  }

  formatDate(date: string): string {
    // Check if the date string is valid
    if (!date || isNaN(Date.parse(date))) {
      return '';
    }

    // Convert the date string to a Date object
    const parsedDate = new Date(date);
    console.log(" Date modified", parsedDate);
    // Check if the date object is valid
    if (isNaN(parsedDate.getTime())) {
      return '';
    }

    // Format the date to ISO string format suitable for datetime-local input
    const isoString = parsedDate.toISOString();

    // Remove milliseconds and the 'Z' (indicating UTC time)
    return isoString.slice(0, 16); // Slice to remove the seconds and milliseconds
  }

  deleteEvent(eventToDelete: any) {
    if (eventToDelete !== undefined) {
      this.events = this.events.filter((event) => event !== eventToDelete);
      this.calendarService.deleteEvent(eventToDelete.eventId).subscribe(
        (res) => {
          console.log('event deleted successfully !')
        }, (error) => {
          console.error('Error deliting event ', error);
        }
      )
    }

  }

  searchEventsByTrainer(trainer: any): void {
    console.log("TrainerEmail id is ::: ", JSON.stringify(trainer));
    this.calendarService.searchByTrainer(trainer).subscribe(
      (response: any) => {
        console.log("Response from server:", response);
        if (response) {
          this.events = response.data.map((event: any) => ({
            ...event,
            start: new Date(event.start[0], event.start[1] - 1, event.start[2], event.start[3], event.start[4]),
            end: new Date(event.end[0], event.end[1] - 1, event.end[2], event.end[3], event.end[4])
          }));
          console.log("this events from server ", JSON.stringify(this.events))
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching events:', error);
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
    this.modal.open(content, {size: 'lg'});
  }

  addNewEvent(newEventForm: NgForm) {
    // Validate and add the new event to the events array
    if (newEventForm.valid) {
      const newEvent: any = {
        title: newEventForm.value.title,
        start: new Date(newEventForm.value.startDate),
        end: new Date(newEventForm.value.endDate),
        color: newEventForm.value?.primaryColor,
        trainerEmail: newEventForm.value?.trainerEmail

      };

      this.calendarService.createEvent(newEvent).subscribe(
        (res) => {
          Swal.fire('Info', "Event Created Successfully", 'success');
          console.log("res in create ", res);
          this.events = [
            ...this.events, res];
          console.log('Event created successfully! ', this.events);
        }, (error) => {
          console.error('Error createing event ', error);
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
        console.log("this.allTrainers : ", this.allTrainers);
      },
      (error) => {
        console.error('Error fetching trainers', error);
      }
    );
  }
}
