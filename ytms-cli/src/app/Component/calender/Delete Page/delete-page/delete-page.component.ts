import { Component, Input, OnInit } from '@angular/core';
import { DeleteCalendarService } from 'src/app/Core/services/delete-calendar.service';

@Component({
  selector: 'app-delete-page',
  templateUrl: './delete-page.component.html',
  styleUrls: ['./delete-page.component.css']
})
export class DeletePageComponent implements OnInit {
  @Input() sideNavStatus: boolean = false;
 dataSource:any[]=[];
 displayedColumns: string[] = ['Task','Trainer','Approve','Deny']; 
 
 constructor(private deleteService:DeleteCalendarService){}

 approve(id:number)
 {
this.deleteService.approve(id).subscribe((success)=>(success));
 
window.location.reload();
}
 deny(id:number)
 {
  this.deleteService.deny(id).subscribe((success)=>(success));
  window.location.reload(); 
}

 ngOnInit(): void {
   this.deleteService.getToDelete().subscribe((data)=>{
    this.dataSource=data,console.log(data)
   })

 }
}
