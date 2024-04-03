import { Component, OnInit, ViewChild } from '@angular/core';
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
<<<<<<< HEAD
import { DownloadService } from 'src/app/Core/services/download.service';
=======
>>>>>>> 8e88149bb3c58ed16e0b9fa0e5562079171a0077


@Component({
  selector: 'app-associate-summary',
  templateUrl: './associate-summary.component.html',
  styleUrls: ['./associate-summary.component.css']
})
export class AssociateSummaryComponent implements OnInit {

  sideNavStatus: boolean = false;
  pagination = true;
  paginationPageSize = 100;
  paginationPageSizeSelector = [200, 500, 1000];
  associatesData: AssociateSummaryModel[] = [];
  filteredAssociatesData: AssociateSummaryModel[] = [];
  gridApi!: GridApi;
  searchValue: any;
  actionCss: String = 'actions'
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  colDefs: any[] = [
    { field: "sNo", quickFilter: true, filter: true, sortable: true, width: 100, sort: 'asc' },
    { field: "emp_id", quickFilter: true, filter: true, sortable: true, width: 100 },
    { field: "emp_name", quickFilter: true, filter: true, sortable: true, width: 100 },
    { field: "emp_mail_id", quickFilter: true, filter: true, sortable: true, width: 100 },
    {
      field: "noOfTrainingsAttended", quickFilter: true, filter: true, sortable: true, width: 100, onCellClicked: (emp_name: any) => {
        console.log('Cell clicked:', emp_name.value);
      },
    },

  ];

  constructor(private ser: TrainingRequestService, private auth: AuthService,
    private jwtServ: JwtService, public dialog: MatDialog, private formBuilder: FormBuilder, private router: Router
    , private uploadService: UploadExcelService, private downloadService: DownloadService, private form: FormsModule
  ) {
  }
  ngOnInit(): void {
    this.getAllAssociateData();
  }

  downloadAssociates() {
    let rowData: AssociateSummaryModel[] = this.filteredAssociatesData.length > 0 ? this.filteredAssociatesData : this.associatesData;
    this.downloadService.ExportExcelFile(rowData);
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
  }
  onQuickFilter(event: any) {
    this.gridApi.setQuickFilter(event.target.value);
    this.getAllRows();
  }

  getAllRows() {
    let rowData: AssociateSummaryModel[] = [];
    this.gridApi.forEachNodeAfterFilter(node => rowData.push(node.data));
    this.filteredAssociatesData = rowData;
  }

  getAllAssociateData() {
    console.log("getAllAssociateData Calling.......")
    this.ser.getAssociateData().subscribe(resp => {
      this.associatesData = resp;
      console.log(JSON.stringify(this.associatesData))
    });
  }

}

