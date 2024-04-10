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
    { field: "sNo" ,quickFilter:true,filter: true,sortable: true,width: 100,pinned: 'left',sort: 'asc',cellRenderer : function (params:any) {
      return params.rowIndex +1;
    } },
    { field: "emp_id" ,headerName:"Employee Id",quickFilter:true,filter: true,sortable: true,width: 100,pinned: 'left'},
    { field: "emp_name" ,quickFilter:true,filter: true,sortable: true,width: 100,pinned: 'left'},
    { field: "emp_mail_id",quickFilter:true,filter: true ,sortable: true,width: 100},
    { field: "grade",quickFilter:true,filter: true ,sortable: true,width: 100},
    { field: "trainingName",quickFilter:true,filter: true ,sortable: true,width: 100},
    { field: "trainingDescription",quickFilter:true,filter: true ,sortable: true,width: 100},
    { field: "noOfDays",quickFilter:true,filter: true ,sortable: true,width: 100},
    { field: "actualStartDate",quickFilter:true,filter: true ,sortable: true,width: 100},
    { field: "actualEndDate",quickFilter:true,filter: true ,sortable: true,width: 100},
    { field: "skill",quickFilter:true,filter: true ,sortable: true,width: 100},
    { field: "upgradedSkills",quickFilter:true,filter: true ,sortable: true,width: 100},
    { field: "current_allocation",quickFilter:true,filter: true ,sortable: true,width: 100},
    { field: "project",quickFilter:true,filter: true ,sortable: true,width: 100},
    { field: "current_location",quickFilter:true,filter: true ,sortable: true,width: 100},
    { field: "trainingStatus",quickFilter:true,filter: true ,sortable: true,width: 100},

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

  downloadAssociates() {
    let rowData: AssociateManagement[] = this.filteredAssociatesData.length > 0 ? this.filteredAssociatesData : this.associatesData;
    this.downloadService.ExportAssociateMgmtExcelFile(rowData);
  }

}

