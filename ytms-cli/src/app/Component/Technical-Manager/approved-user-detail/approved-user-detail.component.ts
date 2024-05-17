import { Component } from '@angular/core';
import { UsersService } from 'src/app/Core/services/users.service';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-approved-user-detail',
  templateUrl: './approved-user-detail.component.html',
  styleUrls: ['./approved-user-detail.component.css']
})
export class ApprovedUserDetailComponent {
  activeUserDetails: any = [];
  listOfActiveUserCount: number=0;

  constructor(private usersService: UsersService) {
      
}
  ngOnInit(): void {
    this.getAllActiveUsers();
  }
  getAllActiveUsers(){
    this.usersService.getAllActiveUsers().subscribe(res => {
      this.activeUserDetails = res;
      this.listOfActiveUserCount = this.activeUserDetails.length; 
      for(let i=0;i<this.activeUserDetails.length;i++){
        this.activeUserDetails[i]['roleType']="";
      }
    })
  }

  async exportToExcel(): Promise<void>{
    console.log("Export To Excel  : ");
    
    const data:any[] = this.modifiedData(this.activeUserDetails);

     const workbook = new ExcelJS.Workbook();
     const worksheet = workbook.addWorksheet('My Sheet');
 
     worksheet.addRow(['Employee Id', 'Employee Email', 'Employee Name', 'FeedBack'], 'n');
 
     worksheet.columns = [
       { header: 'Name', key: 'Name', width: 10 },
       { header: 'Email ID', key: 'Email ID', width: 10 },
       { header: 'Role', key: 'Role', width: 10 },
       { header: 'Unit', key: 'Unit', width: 10 }
     ];
 
     data.forEach(item => {
       worksheet.addRow(item);
     });
 
     worksheet.getRow(1).font = { bold: true, size: 12 };
 
     const buffer = await workbook.xlsx.writeBuffer();
     const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
     FileSaver.saveAs(blob, 'ActiveUserList.xlsx');
  }

  modifiedData(users: any[]):any[]{
    return users.map(user => (
      { 
        'Name': user.fullName,
       'Email ID': user.emailAdd,
        'Role':user.userRole.roleTypes,
        'Unit':user.unit?.name,
      })
      );
  }
}
