import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { an } from '@fullcalendar/core/internal-common';
import { TrainingRequestService } from 'src/app/services/training-request.service';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.css']
})
export class AddAttendanceComponent {
  errorMsg:String="Selected date is greater than current date"
  isError:boolean=false;
  trainingDatesValue?: any[];
  trainingDataList!: any;
  trainingId:any;
  isAttenceDataPresnt=false;
  isChecked:any;
  presentNoOfCandidate:any=0;
  absentNoOfCandiate:any=0;;
  constructor(public dialogRef: MatDialogRef<AddAttendanceComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private ser:TrainingRequestService,private router: Router,public dialog: MatDialog){
    
    this.trainingId = data;
    this.loadDropDownDateList(this.trainingId);
   
  }

  public onOptionsSelectedFromDateDropDown(event:any) {
    this.isChecked=false;
    this.absentNoOfCandiate=0;
    this.presentNoOfCandidate=0;  
    
    const value = event.target.value;
    var date = (new Date()).toISOString().split('T')[0];
    this.isError=false;
    if(Date.parse(date) < Date.parse(value)){
      this.isError=true;
      this.trainingDataList=[];
    }
    else{
      this.getSelectedDateData(value);
    }

   // this.selected = value;
    console.log(value);
    setTimeout(()=>{ this.countAbsentAndPresentTrainee(); },1000);
 }

 countAbsentAndPresentTrainee(){
  
  this.absentNoOfCandiate=0;
  this.presentNoOfCandidate=0;
 
  if(this.trainingDataList!=null && this.trainingDataList!=undefined){
    for(let i=0;i<this.trainingDataList.length;i++){
      if(this.trainingDataList[i].attendance_status){
       this.presentNoOfCandidate=this.presentNoOfCandidate+1;
      }
      else{
      this.absentNoOfCandiate=this.absentNoOfCandiate+1;
      }
      
  }

    }
 }

  loadDropDownDateList(trainingId:any){
    this.ser.getAttendanceDatesList(trainingId).subscribe((resp:any)=>{
      console.log(resp)
      this.trainingDatesValue=resp;     
    })
  }


  getSelectedDateData(selecteddate:any){
    this.ser.getselectedDateTranieeData(selecteddate,this.trainingId).subscribe((resp:any)=>{
      console.log(resp)
      this.trainingDataList=resp;
     
    })
  }
  clickRowCheckBox(){
    setTimeout(()=>{ this.countAbsentAndPresentTrainee(); },1000);
     //this.findCount();  
  }
  clickHeaderCheckBox(event: any,idetifer:any){
    console.log(event.currentTarget.checked);
    
    for(let i=0;i<this.trainingDataList.length;i++){
      this.trainingDataList[i].attendance_status=event.currentTarget.checked;

    }
    this.countAbsentAndPresentTrainee();
 }

  submit(){
    console.log(this.trainingDataList)
    this.ser.saveselectedDateTranieeData(this.trainingDataList).subscribe((resp:any)=>{
      console.log(resp)
      this.dialogRef.close();
     // this.trainingDataList=resp;
    })
    
  }


  // sideNavStatus: boolean = false; 
  // pagination = true;
  // paginationPageSize = 100;
  // paginationPageSizeSelector = [200, 500, 1000];
  // rowData = [
  //   {
  //     "SNo": "1",
  //     "Emp ID": "101101",
  //     "Name": "abc",
  //     "EmailID": "abc@yash.com",
      
  // }
  // ];
  // colDefs: any[] = [
  //   { field: "SNo" ,filter: true,sortable: true,resizable: true,suppressSizeToFit: true,width: 100,pinned: 'left',sort: 'asc' },
  //   { field: "Emp ID" ,filter: true,sortable: true,resizable: true ,suppressSizeToFit:true,width: 100,pinned: 'left'},
  //   { field: "Name" ,filter: true,sortable: true,resizable: true ,suppressSizeToFit:true,pinned: 'left'},
  // ];

  // onGridReady(params:any) {
  //   params.api.sizeColumnsToFit();
  // }
}
