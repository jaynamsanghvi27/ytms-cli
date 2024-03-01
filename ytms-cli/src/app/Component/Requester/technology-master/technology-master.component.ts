import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import Swal from 'sweetalert2';
import { TrainingReqComponent } from '../training-req/training-req.component';

@Component({
  selector: 'app-technology-master',
  templateUrl: './technology-master.component.html',
  styleUrls: ['./technology-master.component.css']
})
export class TechnologyMasterComponent {
  
 
  technologyMatserForm!: FormGroup;
  //@Output() dialogClosed = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder,public dialog: MatDialog,private ser:TrainingRequestService,
    private trfcomponent:TrainingReqComponent){
  }
  ngOnInit(): void {
    this.technologyMatserForm = this.formBuilder.group({
      name: ['', [Validators.required]]});
    }

    submit(){
      if (this.technologyMatserForm.valid) {
        console.log("befor service "+JSON.stringify(this.technologyMatserForm.value));
        this.ser.saveTechnology(this.technologyMatserForm.value).subscribe();
        Swal.fire('Success', 'Technology Added Successfully', 'success');
        this.technologyMatserForm.reset();
        this.closeDialog();
        //window.location.reload();
        this.trfcomponent.loadTechnology();
      }
  
    }

    public closeDialog(): void {
      //this.dialogClosed.emit({ data: this.technologyMatserForm.value });
      this.dialog.closeAll();
      // this.matDialogReference.close([]);
  }
}
