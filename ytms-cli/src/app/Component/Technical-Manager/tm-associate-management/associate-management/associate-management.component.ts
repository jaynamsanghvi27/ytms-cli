import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { TrainingReqForm } from 'src/app/Model/TrainingRequestForm';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import { UploadExcelService } from 'src/app/services/upload-excel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-associate-management',
  
  templateUrl: './associate-management.component.html',
  styleUrls: ['./associate-management.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AssociateManagementComponent {
  
  sideNavStatus: boolean = false; 
  pagination = true;
  paginationPageSize = 100;
  paginationPageSizeSelector = [200, 500, 1000];
  rowData = [
    {
      "SNo": "1",
      "Emp ID": "101101",
      "Name": "abc",
      "EmailID": "abc@yash.com",
      "Grade": "E2",
      "Resource Type": "Perment",
      "Training Stack": "Java ",
      "Training Name": "Spring boot",
      "Purpose to attend training": "Skill Enchancement",
      "Training Duration(Days)": "20",
      "Training Start Date": "14/2/24",
      "Training End Date": "4/3/24",
      "Current Skillsame": "Java",
      "Upgraded Skills": "Java",
      "Pre Assessment score": "4",
      "Final Score": "9",
      "Current Allocation": "Java",
      "Project": "YTMS",
      "Current location": "Pune",
      "Status": "Non billable",
      "Feedback /Remarks": "Not Good"
  }
  ];
  colDefs: any[] = [
    { field: "SNo" ,filter: true,sortable: true,resizable: true,suppressSizeToFit: true,width: 100,pinned: 'left',sort: 'asc' },
    { field: "Emp ID" ,filter: true,sortable: true,resizable: true ,suppressSizeToFit:true,width: 100,pinned: 'left'},
    { field: "Name" ,filter: true,sortable: true,resizable: true ,suppressSizeToFit:true,pinned: 'left'},
    { field: "EmailID",filter: true ,sortable: true,resizable: true,suppressSizeToFit:true ,},
    { field: "Grade",filter: true ,sortable: true,resizable: true,suppressSizeToFit:true },
    { field: "Resource Type",filter: true ,sortable: true,resizable: true,suppressSizeToFit:true },
    { field: "Training Stack",filter: true ,sortable: true,resizable: true,suppressSizeToFit:true },
    { field: "Training Name",filter: true ,sortable: true,resizable: true,suppressSizeToFit:true },
    { field: "Purpose to attend training",filter: true ,sortable: true,resizable: true,suppressSizeToFit:true },
    { field: "Training Duration(Days)",filter: true ,sortable: true,resizable: true,suppressSizeToFit:true },
    { field: "Training Start Date",filter: true ,sortable: true,resizable: true,suppressSizeToFit:true },
    { field: "Training End Date",filter: true ,sortable: true,resizable: true,suppressSizeToFit:true },
    { field: "Current Skills",filter: true ,sortable: true,resizable: true,suppressSizeToFit:true },
    { field: "Upgraded Skills",filter: true ,sortable: true,resizable: true,suppressSizeToFit:true },
    { field: "Pre Assessment score",filter: true ,sortable: true,resizable: true,suppressSizeToFit:true },
    { field: "Final Score",filter: true ,sortable: true,resizable: true,suppressSizeToFit:true },
    { field: "Current Allocation",filter: true ,sortable: true,resizable: true,suppressSizeToFit:true },
    { field: "Project",filter: true ,sortable: true,resizable: true,suppressSizeToFit:true },
    { field: "Current location",filter: true ,sortable: true,resizable: true,suppressSizeToFit:true },
    { field: "Status",filter: true ,sortable: true,resizable: true,suppressSizeToFit:true },
    { field: "Feedback /Remarks",filter: true ,sortable: true,resizable: true,suppressSizeToFit:true }

  ];

  constructor(private ser:TrainingRequestService,private auth:AuthService,
    private jwtServ:JwtService,public dialog: MatDialog,private formBuilder: FormBuilder,private router: Router
    , private uploadService:UploadExcelService
    ){
    }
  ngOnInit(): void {
  
    for(var i=0;i<1000;i++){
      let num=i+2;
    
      this.rowData.push(

        {
          "SNo": num.toString(),
          "Emp ID": "101101",
          "Name": "abc",
          "EmailID": "abc@yash.com",
          "Grade": "E2",
          "Resource Type": "Perment",
          "Training Stack": "Java ",
          "Training Name": "Spring boot",
          "Purpose to attend training": "Skill Enchancement",
          "Training Duration(Days)": "20",
          "Training Start Date": "14/2/24",
          "Training End Date": "4/3/24",
          "Current Skillsame": "Java",
          "Upgraded Skills": "Java",
          "Pre Assessment score": "4",
          "Final Score": "9",
          "Current Allocation": "Java",
          "Project": "YTMS",
          "Current location": "Pune",
          "Status": "Non billable",
          "Feedback /Remarks": "Not Good"
      }
    
      )


  // this.rowData.push({ make: "Toyota"+i, model: "Corolla", price: 29600, electric: false })
    }

  }

  onGridReady(params:any) {
    params.api.sizeColumnsToFit();
  }

  
}
