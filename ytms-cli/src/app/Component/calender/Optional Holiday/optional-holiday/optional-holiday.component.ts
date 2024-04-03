import { Component, Input } from '@angular/core';
import { addDays } from 'date-fns';
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
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.sampleData);
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = XLSX.write(workbook, { bookType: 'csv', type: 'string' }).replace('\uFEFF', '');
  const blob: Blob = new Blob([excelBuffer], { type: 'text/csv;charset=utf-8' }); 
  FileSaver.saveAs(blob, 'Holiday.csv');
}

}
