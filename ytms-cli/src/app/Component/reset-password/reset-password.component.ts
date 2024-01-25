import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Core/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm!:FormGroup;
  email!:any;
  password?:any="";

  constructor(private formbuilder:FormBuilder,private router:Router, private route: ActivatedRoute,
    private apiService:ApiService){

  }

  ngOnInit(): void {
  this.email= this.route.snapshot.queryParamMap.get('email');
  this.password="";
  console.log("Console email "+this.email);
    //const secondParam: string = this.route.snapshot.queryParamMap.get('secondParamKey');
    this.resetPasswordForm = this.formbuilder.group(
      {
        newPassword: ['', [Validators.required, Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        )]],
        confirmPassword: ['', [Validators.required, Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        )]]
      }
      ,{
        validator: this.passwordMatchValidator
      })
  }

  resetPassword(resetPasswordForm:any){
    
      const data = {'email': this.email, 'password': this.password};
      this.password=resetPasswordForm.get('newPassword')?.value;
      if(this.password!=null){
      //console.log("Password is sent to your registered email" + JSON.stringify(resetPasswordForm));
      this.apiService.resetPassword(data).subscribe(res=>{
        console.log("Response from reset api : "+JSON.stringify(res));
        Swal.fire('Success','Password changed successfully ','success');
        this.router.navigateByUrl("");
      })
    }



  }
  private passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
   
 
    if (newPassword !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      //this.password=formGroup.get('newPassword')?.value;
      formGroup.get('confirmPassword')?.setErrors(null);
    }
 
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }




}
