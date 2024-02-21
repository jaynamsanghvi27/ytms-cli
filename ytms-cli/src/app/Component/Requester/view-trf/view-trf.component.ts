import { Component } from '@angular/core';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { TrainingReqForm } from 'src/app/Model/TrainingRequestForm';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-trf',
  templateUrl: './view-trf.component.html',
  styleUrls: ['./view-trf.component.css'],
})
export class ViewTrfComponent {
  bodyText = 'This text can be updated in modal 1';
  id!:number;
  sideNavStatus: boolean = false;
  trainingReqForms : TrainingReqForm[]=[];
  trainingReqForm!: FormGroup;
  userRole:string="";
  
  constructor(private ser:TrainingRequestService,private auth:AuthService, 
    private jwtServ:JwtService,public dialog: MatDialog,private formBuilder: FormBuilder,
    ){
    let token = auth.getToken();
    this.userRole = jwtServ.getRoleFromToken(token);
  }
  ngOnInit(): void {
    this.loadList();
    this.trainingReqForm = this.formBuilder.group({
      id:['', [Validators.required]],
      actualStartDate: ['', [Validators.required]],
      actualEndDate: ['', [Validators.required]]});
  }

  loadList(){
    this.ser.getTraining().subscribe((resp:any)=>{(this.trainingReqForms=resp)});
  }
  openDialog(templateRef:any) {
    let dialogRef = this.dialog.open(templateRef, {
     width: '80%',
     height: '50%'
   });
  }
  setId(id:any){
    this.id=id;
  }
  public closeDialog(): void {
    this.dialog.closeAll();
    // this.matDialogReference.close([]);
}
  submit(): void {
    if (this.trainingReqForm.valid) {
      console.log("befor service "+JSON.stringify(this.trainingReqForm.value));
      let obj:any=this.trainingReqForm.value;
      this.ser.updateTraining(obj).subscribe();
      Swal.fire('Success', 'Training Approved', 'success');
      this.trainingReqForm.reset();
      this.closeDialog();
      this.loadList();
    } else {
      this.trainingReqForm.markAllAsTouched();
    }
  }

}
