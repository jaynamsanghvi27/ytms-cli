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
        const temp:any = this.trfcomponent.competencies?.map(competency=>competency.name);
        if((temp?.indexOf(this.competencyMatserForm.value.name)) < 0){
          this.ser.saveCompetency(this.competencyMatserForm.value).subscribe();
          Swal.fire('Success', 'Competency Added Successfully', 'success');
          this.trfcomponent.pushCompetency(this.competencyMatserForm.value);
          this.competencyMatserForm.reset();
        }else{
          Swal.fire('Error', 'Competency Already Exist', 'error');
          this.competencyMatserForm.reset();
        }
        this.closeDialog();
      }
  
    }

    public closeDialog(): void {
      //this.dialogClosed.emit({ data: this.competencyMatserForm.value });
      
      this.dialog.closeAll();
      // this.matDialogReference.close([]);
  }
}
