import { Component } from '@angular/core';
import * as FileSaver from 'file-saver';
import { TrainerAttendance } from 'src/app/Model/trainer-attendance';
import { TrainerAttendanceService } from 'src/app/services/trainer-attendance.service';
import * as ExcelJS from 'exceljs';

@Component({
  selector: 'app-leavedetails',
  templateUrl: './leavedetails.component.html',
  styleUrls: ['./leavedetails.component.css']
})
export class LeavedetailsComponent {
  sideNavStatus: boolean = false; 
  approvedLeaves: TrainerAttendance[]=[];
  constructor(private trainerAttendanceService: TrainerAttendanceService) {
             this.approvedRejectedLeaves();
  }

  approvedRejectedLeaves() {
    this.trainerAttendanceService.approvedLeaves().subscribe(res => {
      this.approvedLeaves=res;
    })
  }
  modifiedData(nominee: TrainerAttendance[]):any[]{
    return nominee.map(nomination => (
      { 'Trainer': nomination.tranier_mail_id,
       'Training Name': nomination.tranining_name,
        'Leave Start Date':nomination.leave_Start_date,
        'Leave End Date':nomination.leave_End_date,
        'Leave Status':nomination.leave_status,
      })
      );
  }
  async exportToExcel(): Promise<void>{
    console.log("Export To Excel  : ");
    
    const data:any[] = this.modifiedData(this.approvedLeaves);

     const workbook = new ExcelJS.Workbook();
     const worksheet = workbook.addWorksheet('My Sheet');
 
     worksheet.addRow(['Employee Id', 'Employee Email', 'Employee Name', 'Final Score'], 'n');
 
     worksheet.columns = [
       { header: 'Trainer', key: 'Trainer', width: 30 },
       { header: 'Training Name', key: 'Training Name', width: 30 },
       { header: 'Leave Start Date', key: 'Leave Start Date', width: 20 },
       { header: 'Leave End Date', key: 'Leave End Date', width: 20 },
       { header: 'Leave Status', key: 'Leave Status', width: 20 }
     ];
 
     data.forEach(item => {
       worksheet.addRow(item);
     });
 
     worksheet.getRow(1).font = { bold: true, size: 12 };
 
     const buffer = await workbook.xlsx.writeBuffer();
     const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
     FileSaver.saveAs(blob, 'Final_Result.xlsx');
  }
}
