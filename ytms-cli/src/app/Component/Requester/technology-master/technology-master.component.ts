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
  @Output() dialogClosed = new EventEmitter<any>();
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
        const temp:any = this.trfcomponent.technologies?.map(technology=>technology.name);
        if((temp?.indexOf(this.technologyMatserForm.value.name)) < 0){
          this.ser.saveTechnology(this.technologyMatserForm.value).subscribe();
          this.trfcomponent.pushTechnology(this.technologyMatserForm.value);
          Swal.fire('Success', 'Technology Added Successfully', 'success');
          this.technologyMatserForm.reset();
        }else{
          Swal.fire('Error', 'Technology Already Exist', 'error');
          this.technologyMatserForm.reset();
        }
        this.closeDialog();
       
      }
 
    }

    public closeDialog(): void {
      this.dialogClosed.emit({ data: this.technologyMatserForm.value });
      this.dialog.closeAll();
      // this.matDialogReference.close([]);
  }
}
