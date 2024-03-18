import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import Swal from 'sweetalert2';
import { TrainingReqComponent } from '../training-req/training-req.component';

@Component({
  selector: 'app-training-type-master',
  templateUrl: './training-type-master.component.html',
  styleUrls: ['./training-type-master.component.css']
})
export class TrainingTypeMasterComponent {
  
 
  trainingMatserForm!: FormGroup;
  //@Output() dialogClosed = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder,public dialog: MatDialog,private ser:TrainingRequestService,
    private trfcomponent:TrainingReqComponent){
  }
  ngOnInit(): void {
    this.trainingMatserForm = this.formBuilder.group({
      name: ['', [Validators.required]]});
    }

    submit(){
      if (this.trainingMatserForm.valid) {
        console.log("befor service "+JSON.stringify(this.trainingMatserForm.value));
        const temp:any = this.trfcomponent.trainingTypes?.map(trainingType=>trainingType.name);
        if((temp?.indexOf(this.trainingMatserForm.value.name)) < 0){
          this.ser.saveTrainingType(this.trainingMatserForm.value).subscribe();
          Swal.fire('Success', 'Training Type Added Successfully', 'success');
          console.log("this.trainingMatserForm.value.name "+this.trainingMatserForm.value.name);
          this.trfcomponent.pushTrainingTypes(this.trainingMatserForm.value);
          this.trainingMatserForm.reset();
        }else{
          Swal.fire('Error', 'Training Type Already Exist', 'error');
          this.trainingMatserForm.reset();
        }
        this.closeDialog();
        //this.trfcomponent.loadTrainingTypes();
      }
 
    }

    public closeDialog(): void {
      //this.dialogClosed.emit({ data: this.trainingMatserForm.value });
      this.dialog.closeAll();
      // this.matDialogReference.close([]);
  }
}
