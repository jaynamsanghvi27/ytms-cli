import { Component } from '@angular/core';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { TrainingReqForm } from 'src/app/Model/TrainingRequestForm';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  trainingReqForm1!: FormGroup;
  userRole:string="";
  document: Document | undefined;

  constructor(private ser:TrainingRequestService,private auth:AuthService,
    private jwtServ:JwtService,public dialog: MatDialog,private formBuilder: FormBuilder,private router: Router
    ){
    let token = auth.getToken();
    this.userRole = jwtServ.getRoleFromToken(token);
  }
  ngOnInit(): void {
    this.loadList();
    this.trainingReqForm = this.formBuilder.group({
      id:['', [Validators.required]],
      actualStartDate: ['', [Validators.required]],
      actualEndDate: ['', [Validators.required]],
      fileName: ['', [Validators.required]]});


  this.trainingReqForm1 = this.formBuilder.group({
    id:['', [Validators.required]],
    declinedMessage:['', [Validators.required]],

});
  }

  loadList(){
    this.ser.getTraining().subscribe((resp:any)=>{(this.trainingReqForms=resp)});
  }
  declineDialog(templateRef1:any)
  {
    let dialogRef = this.dialog.open(templateRef1, {
      width: '80%',
      height: '50%'
    });
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
decline()
{
  if (this.trainingReqForm1.valid) {
    console.log("befor service "+JSON.stringify(this.trainingReqForm1.value));
    let obj:any=this.trainingReqForm1.value;
    this.ser.declinetrf(obj).subscribe();
    Swal.fire('Success', 'Training Declined', 'success');
    this.trainingReqForm1.reset();
    this.closeDialog();
    this.loadList();
    window.location.reload();
  } else {
    this.trainingReqForm1.markAllAsTouched();
  }
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
      window.location.reload();
    } else {
      this.trainingReqForm.markAllAsTouched();
    }
  }

  showMessage(message:any){
    Swal.fire('Reason for Decline',message, 'error');
  }

  editTrf(trainingId:any){
    if(this.userRole == 'ROLE_TECHNICAL_MANAGER')
      this.router.navigate(['/tm-training-req',trainingId]);
    else if(this.userRole == 'ROLE_TRAINER')
      this.router.navigate(['/trainer/training-req',trainingId]);
    else
      this.router.navigate(['/training-req',trainingId]);
  }
  display = false;
    onPress(){
      console.log("clicked");
      //document.querySelector('#comp-render').innerHTML='<object type="text/html" data="app-upload-excel.html" ></object>';
      this.display = true;
    }
    openNominationData(id:any){

      if(this.userRole == 'ROLE_TECHNICAL_MANAGER')
      this.router.navigate(['/tm-view-nomination',id]);
    else if(this.userRole == 'ROLE_TRAINER')
      this.router.navigate(['/trainer/view-nomination',id]);
    else
      this.router.navigate(['/view-nomination',id]);
    }
}
