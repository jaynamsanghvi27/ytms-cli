import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Nomination } from 'src/app/Model/Nomination';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import { ViewAttendanceComponent } from '../view-attendance/view-attendance.component';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-add-score',
  templateUrl: './add-score.component.html',
  styleUrls: ['./add-score.component.css']
})
export class AddScoreComponent {
  
  role:string = 'ROLE_TRAINER';
  trainingId:any;
  attendsData:any;
  employees: Nomination[] = [];
  constructor(public dialogRef: MatDialogRef<ViewAttendanceComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private ser:TrainingRequestService,private router: Router,public dialog: MatDialog){
  
    this.trainingId = data?.id;
    this.role = data?.role;
    this.getNominationListByTrainingId(this.trainingId);
   
  }

  submit(){
    console.log("Submit Clicked : "+JSON.stringify(this.employees));
    this.ser.savefinalScore(this.employees).subscribe((resp:any)=>{
      this.dialogRef.close();
    })
  }

  async exportToExcel(): Promise<void>{
    console.log("Export To Excel  : ");
    
    const data:any[] = this.modifiedData(this.employees);

     const workbook = new ExcelJS.Workbook();
     const worksheet = workbook.addWorksheet('My Sheet');
 
     worksheet.addRow(['Employee Id', 'Employee Email', 'Employee Name', 'Final Score'], 'n');
 
     worksheet.columns = [
       { header: 'Employee Id', key: 'Employee Id', width: 10 },
       { header: 'Employee Email', key: 'Employee Email', width: 10 },
       { header: 'Employee Name', key: 'Employee Name', width: 10 },
       { header: 'Final Score', key: 'Final Score', width: 10 }
     ];
 
     data.forEach(item => {
       worksheet.addRow(item);
     });
 
     worksheet.getRow(1).font = { bold: true, size: 12 };
 
     const buffer = await workbook.xlsx.writeBuffer();
     const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
     FileSaver.saveAs(blob, 'Final_Result.xlsx');
  }
  modifiedData(nominee: Nomination[]):any[]{
    return nominee.map(nomination => (
      { 'Employee Id': nomination.emp_id,
       'Employee Email': nomination.emp_name,
        'Employee Name':nomination.emp_name,
        'Final Score':nomination.finalScore,
      })
      );
  }

  checkNumber(value:any){

    if(isNaN(value)){
    return "0"
    }
    return value;
  }

  loadTranieeAttedanceList(trainingId:any){
    this.ser.getAllTranieeAttendanceViewDateData(trainingId).subscribe((resp:any)=>{
      console.log(resp)
      this.attendsData=resp['value'];
    })
   }

   getNominationListByTrainingId(trainingId:any){
    if(trainingId != null && trainingId >0)
    this.ser.getNominationListByTrainingId(trainingId).subscribe(resp => {
      console.log(JSON.stringify( resp));
      this.employees = this.processEmployeeData(resp);
    });
  }

  isSubmitDisabled(employee:any): boolean {
    if(this.role !== 'ROLE_TRAINER'){
      return true;
    }else{
      return employee.finalScore !== null;
    }

  }

  processEmployeeData(data:any[]): Nomination[] {
    return data.map(employee => ({
      ...employee,      
      disableFeedback: !employee.finalScore == null
    }));
  }
}
