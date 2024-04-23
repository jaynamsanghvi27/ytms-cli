import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { differenceInMinutes } from 'date-fns';
import { UpdateEventFormComponent } from '../update-event-form/update-event-form.component';
import { DeleteComponent } from '../delete/delete.component';
import { CalendarService } from 'src/app/Core/services/calendar.service';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { UsersService } from 'src/app/Core/services/users.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-event-component',
  templateUrl: './event-component.component.html',
  styleUrls: ['./event-component.component.css']
})
export class EventComponentComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialog : MatDialog,private calendarService:CalendarService,private authService:AuthService,private jwtService:JwtService,private userService:UsersService){}
 name:string=''
 userRole:string=''
ngOnInit(): void {
  console.log(this.data.event.title)
  console.log(this.data.event.id)
  const token = this.authService.getToken();
  this.name = this.jwtService.getFullNameFromToken(token);  
  const role = this.jwtService.getRoleFromToken(token);
  this.userRole=role;
}
checkEndTime(events:any[])
{
if (events.some(event => event.end)) {
    return true; 
 } 
 else 
 {
 return false;
 }
}

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

hasEndtime= this.checkEndTime(this.dataSourceEvents);

displayedColumnsEvents: string[] = [ 'Start', 'End','Duration'];

  updateEvent()
  {
    const addEvent= this.dialog.open(UpdateEventFormComponent,{width:"400px",height:"90vh",data:{event:this.data.event,id:this.data.event.id}})       
  }
  deleteEvent()
  {
    const deletes = this.dialog.open(DeleteComponent,{width:"300px",height:"20vh",data:{event:this.data.event,id:this.data.event.id}})       
    const events={id:this.data.event.id,start:new Date(this.data.event.start).toISOString(),end:new Date(this.data.event.end).toLocaleDateString(),title:this.data.event.title}
    this.calendarService.deleteEvent(events).subscribe((success)=>console.log(success));    
  }
  deleteOneTask()
  {
    const deletes = this.dialog.open(DeleteComponent,{width:"300px",height:"20vh",data:{event:this.data.event,id:this.data.event.id}})       
    const events={id:this.data.event.id,start:new Date(this.data.event.start).toISOString(),end:new Date(this.data.event.end).toLocaleDateString(),title:this.data.event.title}
    this.calendarService.deleteTask(events).subscribe((success)=>console.log(success));    
  }


  // processData:any[]=[];
  // nominations:any[]=[];
  // associates:any[]=[];
  // training:any[]=[];
  
  // onFileChange(event:any) {
  //   const reader = new FileReader();
  //   if (event.target.files && event.target.files[0]) {
  //     reader.readAsArrayBuffer(event.target.files[0]);
  //     reader.onload = (e) => {
  //       const data = e.target?.result;
  //       this.convertExcelToJson(data);
  //     };
  //   }
  // }
  
  // convertExcelToJson(excelData:any) {
  //   const workbook = XLSX.read(excelData, { type: 'array'  ,dateNF:"yyyy-mm-dd"});
  //   const worksheet = workbook.Sheets['Consolidated_24']; 
  //   this.processData = XLSX.utils.sheet_to_json(worksheet,{raw:false});
  //   console.log("All :",this.processData)
  //   this.processData.forEach((element:any) => {
  //   this.nominations.push({emp_id:element.Emp_ID,current_allocation:element.Current_Allocation,current_location:element.Current_location,emp_mail_id:element.EmailID,emp_name:element.Name,grade:element.Grade,project:element.Project,skill:element.Current_Skills});
  //   this.associates.push({current_allocation:element.Current_Allocation,current_location:element.Current_location,current_skill:element.Current_Skills,emp_email:element.EmailID,emp_id:element.Emp_ID,emp_name:element.Name,feedback:element.Remarks,final_score:element.Final_Score,grade:element.Grade,pre_assessment:element.Pre_Asessment_Score,project:element.Project,purpose_to_attend_training:element.Purpose_to_attend_training
  //   ,resource_type:element.Resource_Type,status:element.Status,training_duration:element.Training_Duration,training_end_date:element.Training_End_Date,training_name:element.Trainin_Name,training_stack:element.Training_Stack,training_start_date:element.Upgraded_Skills,Upgraded_Skills
  //   :element.Upgraded_Skills});
    
  //   });
  //   this.processData.forEach((element: any) => {
  //     const existingIndex = this.training.findIndex(item => item.training_name === element.Trainin_Name);
  //     if (existingIndex === -1) {
  //       this.training.push({
  //         actual_end_date: element.Training_End_Date,
  //         actual_start_date: element.Training_Start_Date,
  //         end_date: element.Training_End_Date,
  //         start_date: element.Training_Start_Date,
  //         training_status: element.Status,
  //         training_description: element.Purpose_to_attend_training,
  //         training_name: element.Trainin_Name,
  //         user_name: "jaynam.sanghvi@yash.com",
  //         no_of_days: element.Training_Duration,
  //         upgraded_skills: element.Upgraded_Skills
  //       });
  //     }
  //   });
  //   console.log("Nominations :",this.nominations)
  //   console.log("Assosiates :",this.associates)
  //   console.log("Training :",this.training)
  //   }





}


