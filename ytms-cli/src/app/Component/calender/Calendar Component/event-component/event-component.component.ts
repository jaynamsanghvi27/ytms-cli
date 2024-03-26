import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { differenceInMinutes } from 'date-fns';
import { UpdateEventFormComponent } from '../update-event-form/update-event-form.component';
import { DeleteComponent } from '../delete/delete.component';
import { CalendarService } from 'src/app/Core/services/calendar.service';

@Component({
  selector: 'app-event-component',
  templateUrl: './event-component.component.html',
  styleUrls: ['./event-component.component.css']
})
export class EventComponentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialog : MatDialog,private calendarService:CalendarService){}


  durationMin= differenceInMinutes(this.data.event.end,this.data.event.start)
   minutesToHHMM(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}`;
  }

  durationhh= this.minutesToHHMM(this.durationMin)
  
  dataSourceEvents=[{
    start:this.data.event.start,
    end:this.data.event.end,
    duration:this.durationhh
}];
  displayedColumnsEvents: string[] = [ 'Start', 'End','Duration'];

  updateEvent()
  {
    const addEvent= this.dialog.open(UpdateEventFormComponent,{width:"400px",height:"90vh",data:{event:this.data.event,id:this.data.id}})       
  }
  deleteEvent()
  {
    const deletes = this.dialog.open(DeleteComponent,{width:"300px",height:"20vh",data:{event:this.data.event,id:this.data.id}})       
    const events={id:this.data.id,start:this.data.event.start,end:this.data.event.end,title:this.data.event.title}
    console.log(events)
    this.calendarService.deleteEvent(events).subscribe((success)=>console.log(success));    

  }
  
}
