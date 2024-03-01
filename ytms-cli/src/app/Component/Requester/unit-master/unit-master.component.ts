import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import Swal from 'sweetalert2';
import { TrainingReqComponent } from '../training-req/training-req.component';

@Component({
  selector: 'app-unit-master',
  templateUrl: './unit-master.component.html',
  styleUrls: ['./unit-master.component.css']
})
export class UnitMasterComponent {
 
  unitMatserForm!: FormGroup;
  @Output() dialogClosed = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder,public dialog: MatDialog,private ser:TrainingRequestService,
    private trfcomponent:TrainingReqComponent){
  }
  ngOnInit(): void {
    this.unitMatserForm = this.formBuilder.group({
      name: ['', [Validators.required]]});
    }

    submit(){
      if (this.unitMatserForm.valid) {
        console.log("befor service "+JSON.stringify(this.unitMatserForm.value));
        this.ser.saveUnit(this.unitMatserForm.value).subscribe();
        Swal.fire('Success', 'Unit Added Successfully', 'success');
        this.unitMatserForm.reset();
        this.closeDialog();
        //window.location.reload();
        this.trfcomponent.loadUnit();
      }
  
    }

    public closeDialog(): void {
      this.dialogClosed.emit({ data: this.unitMatserForm.value });
      this.dialog.closeAll();
      // this.matDialogReference.close([]);
  }
}
