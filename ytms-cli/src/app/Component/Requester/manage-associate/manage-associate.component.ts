import { Component , OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { AssociateSummaryModel } from 'src/app/Model/AssociateSummary';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/Core/services/auth.service';
import { Router } from '@angular/router';
import { UploadExcelService } from 'src/app/services/upload-excel.service';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi } from 'ag-grid-community';
import { AssociateManagement } from 'src/app/Model/AssociateManagement';
import { DownloadService } from 'src/app/Core/services/download.service';

@Component({
  selector: 'app-manage-associate',
  templateUrl: './manage-associate.component.html',
  styleUrls: ['./manage-associate.component.css']
})
export class ManageAssociateComponent implements OnInit {

  sideNavStatus: boolean = false; 
  pagination = true;
  paginationPageSize = 100;
  paginationPageSizeSelector = [200, 500, 1000];
  associatesData:AssociateManagement[]=[];
  gridApi!: GridApi;
  searchValue: any;
  actionCss: String = 'actions';
  filteredAssociatesData: AssociateManagement[] = [];

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  
  colDefs: any[] = [
    { field: "sNo" ,quickFilter:true,filter: true,suppressSizeToFit: true,sortable: true,width: 110,pinned: 'left',sort: 'asc',cellRenderer : function (params:any) {
      return params.rowIndex +1;
    } },
    { field: "emp_id" ,headerName:"Employee Id",quickFilter:true,filter: true,suppressSizeToFit: true,sortable: true,width: 150,pinned: 'left'},
    { field: "emp_name" ,quickFilter:true,filter: true,sortable: true,suppressSizeToFit: true,width: 150,pinned: 'left'},
    { field: "emp_mail_id",quickFilter:true,filter: true ,sortable: true,suppressSizeToFit: true},
    { field: "grade",quickFilter:true,filter: true ,sortable: true,suppressSizeToFit: true},
    { field: "competency",quickFilter:true,filter: true ,sortable: true,suppressSizeToFit: true},
    { field: "trainingName",quickFilter:true,filter: true ,sortable: true,suppressSizeToFit: true},
    { field: "noOfDays",quickFilter:true,filter: true ,sortable: true,suppressSizeToFit: true},
    { field: "actualStartDate",quickFilter:true,filter: true ,sortable: true,suppressSizeToFit: true},
    { field: "actualEndDate",quickFilter:true,filter: true ,sortable: true,suppressSizeToFit: true},
    { field: "skill",quickFilter:true,filter: true ,sortable: true,suppressSizeToFit: true},
    { field: "upgradedSkills",quickFilter:true,filter: true ,sortable: true,suppressSizeToFit: true},
    { field: "current_allocation",quickFilter:true,filter: true ,sortable: true,suppressSizeToFit: true},
    { field: "project",quickFilter:true,filter: true ,sortable: true,suppressSizeToFit: true},
    { field: "current_location",quickFilter:true,filter: true ,sortable: true,suppressSizeToFit: true},
    { field: "trainingStatus",quickFilter:true,filter: true ,sortable: true,suppressSizeToFit: true},
    { field: "finalScore",quickFilter:true,filter: true ,sortable: true,suppressSizeToFit: true},
    { field: "feedback",quickFilter:true,filter: true ,sortable: true,suppressSizeToFit: true},
  ];

  constructor(private ser:TrainingRequestService,private auth:AuthService,
    private jwtServ:JwtService,public dialog: MatDialog,private formBuilder: FormBuilder,private router: Router
    , private uploadService:UploadExcelService, private form:FormsModule,private downloadService: DownloadService
    ){
    }
  ngOnInit(): void {
    this.getAllAssociateData();
  }

  onGridReady(params:any) {
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
  }
  onQuickFilter(event:any) {
    this.gridApi.setQuickFilter(event.target.value);
  }
  getAllAssociateData() {
    console.log("getAllAssociateData Calling.......")
    this.ser.getAssociateManagementData().subscribe(resp => {
      this.associatesData=resp;
      console.log(JSON.stringify(this.associatesData))
    });
  }
isLoading:boolean= false
   downloadAssociates() {
    this.isLoading=true;
    let rowData: AssociateManagement[] = this.filteredAssociatesData.length > 0 ? this.filteredAssociatesData : this.associatesData;
   this.downloadService.ExportAssociateMgmtExcelFile(rowData).subscribe((res: any) => {
      this.downloadFile2(res),this.isLoading=false
    });
  }

  downloadFile2(data: any) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.setAttribute('target', 'blank');
    a.href = url;
    a.download = "Associates.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

}

