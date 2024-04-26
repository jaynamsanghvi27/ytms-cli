import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Nomination } from 'src/app/Model/Nomination';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import { ViewAttendanceComponent } from '../view-attendance/view-attendance.component';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent {

  role:string = 'ROLE_TRAINER';
  trainingId:any;
  attendsData:any;
  employees: Nomination[] = [];
  showTooltip:Boolean=false;
  finalFeedback:any[]=[];

  constructor(public dialogRef: MatDialogRef<ViewAttendanceComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private ser:TrainingRequestService,private router: Router,public dialog: MatDialog){
    
    this.trainingId = data?.id;
    this.role = data?.role;
    this.getNominationListByTrainingId(this.trainingId);
   
  }

  submit(){
    console.log("Submit Clicked : "+JSON.stringify(this.employees));
    this.ser.saveEmployeeFeedbackByTrainer(this.employees).subscribe((resp:any)=>{
      console.log(resp)
      this.dialogRef.close();
    })
  }

  async exportToExcel(): Promise<void>{
    console.log("Export To Excel  : ");
    
    const data:any[] = this.modifiedData(this.employees);

     const workbook = new ExcelJS.Workbook();
     const worksheet = workbook.addWorksheet('My Sheet');
 
     worksheet.addRow(['EMPID', 'Employee Email', 'Employee Name', 'Feedback'], 'n');
 
     worksheet.columns = [
       { header: 'EMPID', key: 'EMPID', width: 10 },
       { header: 'Employee Email', key: 'Employee Email', width: 10 },
       { header: 'Employee Name', key: 'Employee Name', width: 10 },
       { header: 'Feedback', key: 'Feedback', width: 10 }
     ];
 
     data.forEach(item => {
       worksheet.addRow(item);
     });
 
     worksheet.getRow(1).font = { bold: true, size: 12 };
 
     const buffer = await workbook.xlsx.writeBuffer();
     const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
     FileSaver.saveAs(blob, 'Feedback.xlsx');
  }

  modifiedData(nominee: Nomination[]):any[]{
    return nominee.map(nomination => (
      { 'EMPID': nomination.emp_id,
       'Employee Email': nomination.emp_name,
        'Employee Name':nomination.emp_name,
        'Feedback':nomination.feedback,
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
      this.employees = this.processEmployeeData(resp);
    });
  }

  isSubmitDisabled(employee:any): boolean {
    if(this.role !== 'ROLE_TRAINER'){
      return true;
    }else{
      return employee.disableFeedback ? employee.disableFeedback : false;
    }

  }

  processEmployeeData(data:any[]): Nomination[] {
    return data.map(employee => ({
      ...employee,
      disableFeedback: employee.feedback!=null
    }));
  }

  onFileChange(event: any) {
    const input = event.target;
    const reader = new FileReader();
  
    reader.readAsArrayBuffer(input.files[0]);
  
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result;
      const data = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = data.SheetNames[0];
      const worksheet = data.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
  
      console.log(jsonData);
      this.finalFeedback = jsonData
      for (const employee of this.employees) {
        const matchingFeedback = this.finalFeedback.find((feedback: any) => Number(feedback.EMPID) == Number(employee.emp_id));
        console.log("Matching Score for EMPID:", employee.emp_id, matchingFeedback);
        if (matchingFeedback) {
          employee.feedback = matchingFeedback.Feedback;
        }
      }
      console.log(this.employees);
    };
  }
}
