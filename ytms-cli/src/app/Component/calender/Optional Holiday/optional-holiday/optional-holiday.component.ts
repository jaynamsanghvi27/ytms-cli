import { Component, Input } from '@angular/core';
import { addBusinessDays, addDays } from 'date-fns';
import * as FileSaver from 'file-saver';
import { CalendarService } from 'src/app/Core/services/calendar.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-optional-holiday',
  templateUrl: './optional-holiday.component.html',
  styleUrls: ['./optional-holiday.component.css']
})
export class OptionalHolidayComponent {
  constructor(private calendarService:CalendarService){}
   processedData:any
   InputData:any[] =[]
   sampleData: any = [{title: "Test Holiday", start_date: new Date("2024-04-04") }]
  
  
   onFileChange(event:any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      reader.readAsArrayBuffer(event.target.files[0]);
      reader.onload = (e) => {
        const data = e.target?.result;
        this.convertExcelToJson(data);
      };
    }
  }
  convertExcelToJson(excelData:any) {
  const workbook = XLSX.read(excelData, { type: 'array' ,dateNF:"yyyy-mm-dd"});
  const worksheet = workbook.Sheets['Sheet1']; 
  this.processedData = XLSX.utils.sheet_to_json(worksheet,{raw:false});
  this.processedData.forEach((holiday:any) => {
    holiday.start_date= addDays(new Date(holiday.start_date),1).toISOString().slice(0, 10) 
    this.InputData.push({title:holiday.title,start_date:holiday.start_date})    
  })
  console.log(this.InputData)
}
addHolidays()
{  
  this.calendarService.addHoliday(this.InputData).subscribe((data)=>(console.log(data)));
  window.location.reload()
}

exportExcel(): void {
  // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.sampleData);
  // const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  // XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  // const excelBuffer = XLSX.write(workbook, { bookType: 'csv', type: 'string' }).replace('\uFEFF', '');
  // const blob: Blob = new Blob([excelBuffer], { type: 'text/csv;charset=utf-8' }); 
  // FileSaver.saveAs(blob, 'Holiday.csv');
this.exportAsExcelFile(this.sampleData,"Holiday")

}
 EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
 EXCEL_EXTENSION = '.xlsx';
 public exportAsExcelFile(data: any[], excelFileName: string): void {
  const formattedData = this.formatDataForExcel(data);
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcel(excelBuffer, excelFileName);
}

private formatDataForExcel(data: any[]): any[] {
  return data.map(item => ({
    title: item.title,
    start_date: this.formatDate(item.start_date) // Call formatDate function
  }));
}

private formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Zero-pad month
  const day = String(date.getDate()).padStart(2, '0'); // Zero-pad day

  return `${year}-${month}-${day}`;
}

private saveAsExcel(buffer: any, fileName: string): void {
  const blob = new Blob([buffer], { type: this.EXCEL_TYPE });
  FileSaver.saveAs(blob, fileName + this.EXCEL_EXTENSION);
}
}








