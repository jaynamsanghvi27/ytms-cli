import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import Swal from 'sweetalert2';
import { TrainingReqComponent } from '../training-req/training-req.component';

@Component({
  selector: 'app-competency-master',
  templateUrl: './competency-master.component.html',
  styleUrls: ['./competency-master.component.css']
})
export class CompetencyMasterComponent {
  
 
  competencyMatserForm!: FormGroup;
  //@Output() dialogClosed = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder,public dialog: MatDialog,private ser:TrainingRequestService,
    private trfcomponent:TrainingReqComponent){
  }
  ngOnInit(): void {
    this.competencyMatserForm = this.formBuilder.group({
      name: ['', [Validators.required]]});
    }

    submit(){
      if (this.competencyMatserForm.valid) {
        console.log("befor service "+JSON.stringify(this.competencyMatserForm.value));
        this.ser.saveCompetency(this.competencyMatserForm.value).subscribe();
        
        Swal.fire('Success', 'Competency Added Successfully', 'success');
        this.competencyMatserForm.reset();
        this.closeDialog();
      }
  
    }

    public closeDialog(): void {
      //this.dialogClosed.emit({ data: this.competencyMatserForm.value });
      this.trfcomponent.loadCompetency();
      this.dialog.closeAll();
      // this.matDialogReference.close([]);
  }
}
