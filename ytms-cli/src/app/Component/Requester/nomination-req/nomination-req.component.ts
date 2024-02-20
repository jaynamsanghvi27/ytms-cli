import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainingRequestService } from 'src/app/services/training-request.service';

@Component({
  selector: 'app-nomination-req',
  templateUrl: './nomination-req.component.html',
  styleUrls: ['./nomination-req.component.css']
})
export class NominationReqComponent {

  sideNavStatus: boolean = false;
  nominationReqForm!: FormGroup;
  trainingNm = "";
  ngOnInit(): void {
    this.nominationReqForm = this.formBuilder.group(
      {
        trainingName: ['', [Validators.required]],
        employeeMailId: ['', [Validators.required]],
        selectFileToUpload: ['', [Validators.required]]
      })
    
  }

  constructor(private formBuilder: FormBuilder,private ser:TrainingRequestService){
    // this.nominationReqForm.controls['trainingName']?.patchValue(this.service.trainingName$.subscribe());
    console.log(this.ser.trainingName$.subscribe()) ;
    this.ser.trainingName$.subscribe((resp:any)=>{
      this.trainingNm = resp;
    })
  }
  

  submit(): void {
    if (this.nominationReqForm.valid) {
      console.log(this.nominationReqForm.value);
    } else {
      this.nominationReqForm.markAllAsTouched();
    }
  }

}
