import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { differenceInHours, differenceInMinutes } from 'date-fns';
import { EventFormComponent } from '../event-form/event-form.component';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { UsersService } from 'src/app/Core/services/users.service';

@Component({
  selector: 'app-day-component',
  templateUrl: './day-component.component.html',
  styleUrls: ['./day-component.component.css']
})
export class DayComponentComponent {
constructor(public ref:MatDialogRef<DayComponentComponent>,@Inject(MAT_DIALOG_DATA) public data:any,public dialog : MatDialog,private authService:AuthService,private jwtService:JwtService,private userService:UsersService){}
userRole:String='';
forManager:boolean=false;
forTrainer:boolean=false; 
freeHours:any;
name:any

minutesToHHMM(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
 
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
 
  return `${formattedHours}:${formattedMinutes}`;
 }
 

durationMin(start:any,end:any):number
{
return differenceInMinutes(end,start)
}


displayedColumnsEvents: string[] = ['Title','Start-Date', 'Start', 'End-Date','End','Duration','Trainer Name'];
dataSourceEvents=this.data.events;
displayedColumnsFreeHour: string[] = ['Trainer Name', 'FreeHour'];

sortByStart() {
    return this.data.events.sort((event1: any, event2:any) => {
      return event1.start - event2.start;
    });
  }
ngOnInit(): void {
  this.data.events = this.sortByStart();
  console.log(this.sortByStart())
  const token = this.authService.getToken();
    const role = this.jwtService.getRoleFromToken(token);
   this.userRole=role;
    
  if(this.freeHours<=0)
  {
    this.schedule=true
  }
  else
  {
    this.schedule=false
  }

  if (role === 'ROLE_TECHNICAL_MANAGER' || role === 'ROLE_COMPETENCY_MANAGER')  
  {
    this.freeHours=this.calculateFreeHoursPerUser()
    console.log(this.freeHours)
    this.forManager=true
  }
    else if (role == 'ROLE_TRAINER')
    {
      this.freeHours =this.calculateTotalDuration();
      this.forTrainer=true
    }


}

  getCurrentDate():Date
  {
    return this.data.date
  }
  calculateFreeHoursPerUser(): { userName: string; freeHours: number }[] {
    const freeHours: { userName: string; freeHours: number }[] = [];
  
    for (const event of this.data.events) {
      const userName = event.scheduleUser.fullName;
  
      const existingEntry = freeHours.find(entry => entry.userName === userName);
     if (!existingEntry) {
        freeHours.push({ userName, freeHours: 8 }); 
      }
  
      const durationInHours = differenceInHours(event.end, event.start);
      existingEntry ? (existingEntry.freeHours -= durationInHours) : (freeHours[freeHours.length - 1].freeHours -= durationInHours);
  
      freeHours[freeHours.length - 1].freeHours = Math.max(0, freeHours[freeHours.length - 1].freeHours);
    }
  
    return freeHours;
  }


    calculateTotalDuration(): number {
      let totalDuration = 0;
      
      for (const event of this.data.events) {
        
        const durationInHours = differenceInHours(event.end, event.start);
        totalDuration += durationInHours;
      }    
      if(8-totalDuration>0)
      {
        return 8-totalDuration;
      }
      else
      {
          return 0;
      }
    }


  schedule:boolean=false;
 
  openMonth()
  {
    this.data.initialView='Month';
    
  }
  openWeek()
  {
    this.data.initialView='Week';
  }
  openDay()
  {
    this.data.initialView='Day';
  }
  addEvent()
  {
    console.log(this.getCurrentDate())
    const addEvent= this.dialog.open(EventFormComponent,{width:"400px",height:"90vh",data:{date:this.getCurrentDate()}})       
  }

}
