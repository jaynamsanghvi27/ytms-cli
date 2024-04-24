import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { en } from '@fullcalendar/core/internal-common';
import {  addDays, differenceInBusinessDays, differenceInMinutes, format, isAfter, isBefore, isWeekend, parseISO } from 'date-fns';
import * as FileSaver from 'file-saver';
import { AuthService } from 'src/app/Core/services/auth.service';
import { CalendarService } from 'src/app/Core/services/calendar.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { UsersService } from 'src/app/Core/services/users.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() sideNavStatus: boolean = false;
  
  datasource:any[]=[]; 
  dateRange: any[] = [];
  displayedColumns = ['user', 'task', 'date-range',"TotalDays", 'freeHours'];
  events :any[]=[];
  searchFilter:boolean=false;
  userRole:String='';
  users:any[]=[]  
  downloadfile:any[]=[];
  totalTasks:any;
  
  constructor(private calendarService:CalendarService,private authService:AuthService,private jwtService:JwtService,private userService:UsersService){};
  getAllEvents():any
  {
    this.calendarService.getALLEvents().subscribe((data:any[]) => 
    { console.log(data),
      this.events= data.map(event => ({
      id:event.id,
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      scheduleUser:event.scheduleUser,
      number_of_week_days:event.number_of_week_days   
    })),this.datasource = this.calculateDuration(this.transformDateRange(this.transformData(data))),console.log(this.datasource),this.totalTasks = this.getUniqueTitles(this.datasource)
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
   scheduleUser:event.scheduleUser,
   number_of_week_days:event.number_of_week_days   

 })),this.datasource = this.calculateDuration(this.transformDateRange(this.transformData(data))),console.log(this.datasource)
,this.totalTasks = this.getUniqueTitles(this.datasource)});
}



getUniqueTitles(data:any) {
  const titleSet = new Set(); // Set to store unique titles
  for (const item of data) {
    titleSet.add(item.title.split(',').join(' ')); // Combine titles, remove commas, and add to set
  }
  return titleSet.size; // Return the size of the set (number of unique titles)
}

diffDays(endDate: any, startDate: any) {
  const adjustedEndDate = addDays(new Date(endDate), 1);
  return differenceInBusinessDays(adjustedEndDate, new Date(startDate));
}
exportExcel(): void {
// let i =0;
 this.datasource.forEach((file)=>{ 
  // i++;
  const subtasks = file.title.trim() ? file.title.split(',') : [];
  const durations = file.currentRangeDuration.split(',');
  const totalTasks = subtasks.length;
  if(file.end_date!=null)
  {
    
    const totalDays=differenceInBusinessDays(addDays(new Date(file.end_date),1),new Date(file.start_date))
    file.start_date= new Date(file.start_date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
    // file.start_date= addDays(new Date(file.start_date),1).toISOString().slice(0, 10)   
    file.end_date= new Date(file.end_date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })  

    // file.end_date= addDays(new Date(file.end_date),1).toISOString().slice(0, 10)   
  this.downloadfile.push({
    Trainer:file.scheduleUser.fullName,
    Task: subtasks.map((subtask: string, index: number) => `${index + 1}. ${subtask.trim()}`).join('\n'),
    // Task:`${i})${file.title}`,
    Unavailable_Slots: durations.map((duration:string)=>`${duration.trim()}`).join('\n'),
    // Unavailable_Slots:file.currentRangeDuration,
    Total_Tasks:totalTasks,
    Start:file.start_date,
    End:file.end_date,
    TotalDays:totalDays,
    FreeHours:file.freeHours})
  }
  else
  {
    file.start_date= addDays(new Date(file.start_date),1).toISOString().slice(0, 10)   
    this.downloadfile.push({
      Trainer:file.scheduleUser.fullName,
      Task: subtasks.map((subtask: string, index: number) => `${index + 1}. ${subtask.trim()}`).join('\n'),
    // Task:`${i})${file.title}`,
    Unavailable_Slots: durations.map((duration:string)=>`${duration.trim()}`).join('\n'),
    // Unavailable_Slots:file.currentRangeDuration,
    Total_Tasks:totalTasks,
    Start:file.start_date,
      End:file.start_date,
      TotalDays:1,
      FreeHours:file.freeHours})
  } 
})
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.downloadfile);
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = XLSX.write(workbook, { bookType: 'csv', type: 'string' }).replace('\uFEFF', '');
  const blob: Blob = new Blob([excelBuffer], { type: 'text/csv;charset=utf-8' }); 
  FileSaver.saveAs(blob, 'Summary.csv');
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

//Working
transformDateRange(data:any) {
  const events = [];
  let currentRange = null;
  let currentTitle = null;

  for (const event of data) {
    const formattedDate = new Date(event.start_date).toLocaleDateString('en-US'); // YYYY-MM-DD format
    const title = event.title;

    if (!currentRange || currentTitle !== title) {
      currentRange = {
        id: event.id,
        title,
        start_date: formattedDate,
        end_date: event.end,
        StartTime:event.startTime,
        EndTime:event.endTime,
        scheduleUser: event.scheduleUser,
        number_of_week_days: 0,
        currentRangeDuration:event.currentRangeDuration
      };
      events.push(currentRange);
      currentTitle = title;
    } else {
      // Existing event range, update end date
      currentRange.end_date = formattedDate;
    }
  }

  return events;
}

//Got There
transformData(data: any): any {
  const transformedData:any = {};

  for (const event of data) {
    const fullName = event.scheduleUser.fullName;
    
    if (!transformedData[fullName]) {
      transformedData[fullName] = [];
    }

    transformedData[fullName].push(event);
  }

  const finalData = [];
  for (const fullName in transformedData) {
    const userEvents = transformedData[fullName];
    const transformedEvents = this.transformUser(userEvents);
    finalData.push(...transformedEvents);
  }

  return finalData;
}

transformUser(data: any) {
  const events = [];
  let currentRange: any;
  let currentTitle = null;

  for (const event of data) {
    const formattedDate = format(parseISO(event.start), 'yyyy-MM-dd'); 
    const startTime = format(parseISO(event.start), 'HH:mm '); 
    const endTime = format(parseISO(event.end), 'HH:mm '); 
    const title = event.title;
    // +"("+startTime +"-"+endTime+")"
    if (!currentRange || currentTitle !== title || formattedDate !== currentRange.end_date) {
      currentRange = {
        id: event.id,
        title: title,
        start_date: formattedDate,
        end_date: formattedDate,
        scheduleUser: event.scheduleUser,
        number_of_week_days: 0,
        startTime,
        endTime,
        currentRangeDuration: `${startTime}-${endTime}`,
      };
      events.push(currentRange);
      currentTitle = title;
    } else {
      if (isAfter(parseISO(event.end), parseISO(currentRange.end_date))) { 
        currentRange.endTime = endTime;
        currentRange.end_date = formattedDate;
      }
    }

    for (const existingEvent of events.slice()) {
      if (
        existingEvent.id !== event.id &&
        existingEvent.start_date === currentRange.start_date &&
        existingEvent.end_date === currentRange.end_date
      ) {
        existingEvent.title += `,${title} `;
        existingEvent.currentRangeDuration+= `,${startTime}-${endTime}`
        events.splice(events.indexOf(currentRange), 1);

   
        existingEvent.endTime = isAfter(parseISO(event.end), parseISO(existingEvent.end_date))
          ? endTime 
           : existingEvent.endTime; 
        break;
      }
    }
  }

  return events;
}


//Finale
calculateDuration(events: any[]): any {
  return events.map((event) => {
    // Split currentRangeDuration by commas
    const durationRanges = event.currentRangeDuration.split(',');
    let totalDurationMinutes = 0;

    for (const durationRange of durationRanges) {
      const [startTimeStr, endTimeStr] = durationRange.trim().split('-');

      const startTimeParts = startTimeStr.split(':');
      const endTimeParts = endTimeStr.split(':');

      const startDate = new Date();
      startDate.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]), 0);
      const endDate = new Date();
      endDate.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]), 0);

      const durationMinutes = differenceInMinutes(endDate, startDate);
  
      totalDurationMinutes += durationMinutes;
    }

    const freeMinutes = 480 - totalDurationMinutes;

    const freeHours = this.convertMinutesToHoursMin(freeMinutes);

    return {
      ...event,
      freeHours,
    };
  });
}
convertMinutesToHoursMin(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
  return `${hours}:${formattedMinutes}`;
}


ngOnInit(): void {
  const token = this.authService.getToken();
  const role = this.jwtService.getRoleFromToken(token);
  const email = this.jwtService.getUserNameFromToken(token);
  this.userRole=role;
  console.log(role,email);
  if (role === 'ROLE_TECHNICAL_MANAGER' ||  role === 'ROLE_COMPETENCY_MANAGER') 
  {
  this.getAllEvents();
  this.searchFilter=true;  
}
    else if (role == 'ROLE_TRAINER')
    {    
    this.searchFilter=false;  
    this.getEventByTrainer(email);
    }
  this.userService.getAllTrainers().subscribe((data)=>{this.users=data,console.log(data)})


  

}

}
