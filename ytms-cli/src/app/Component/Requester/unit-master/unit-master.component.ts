import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unit-master',
  templateUrl: './unit-master.component.html',
  styleUrls: ['./unit-master.component.css']
})
export class UnitMasterComponent {
 
  unitMatserForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,public dialog: MatDialog,private ser:TrainingRequestService){

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
      }
  
    }

    public closeDialog(): void {
      this.dialog.closeAll();
      // this.matDialogReference.close([]);
  }
}
