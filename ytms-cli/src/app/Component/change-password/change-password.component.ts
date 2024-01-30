import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm!:FormGroup;
  constructor(private formbuilder:FormBuilder,private router:Router){

  }

  ngOnInit(): void {
    this.changePasswordForm = this.formbuilder.group(
      {
        oldPassword: ['', [Validators.required, Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        )]],
        newPassword: ['', [Validators.required, Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        )]],
        confirmPassword: ['', [Validators.required, Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        )]]
      },{
        validator: this.passwordMatchValidator
      }
      )
  }
   // Custom validator for password match
   private passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
 
    if (newPassword !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
 
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }
  changePassword(changePasswordForm:any){
    console.log("Password is sent to your registered email"+JSON.stringify(changePasswordForm.value)  );
    

  }





}
