import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  //reg!: User[];
  resetPasswordForm!: FormGroup;
  emailpattern = "^(.+)@(.+)$";
  message = "";
 
  constructor(private formBuilder: FormBuilder){
 
  }
 
  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group(
      {
        // emailId: ['', [Validators.required, Validators.pattern(/^[^\s@]+@yash\.com$/)]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      })
  }
 
  submit(): void {
    if (this.resetPasswordForm.valid) {
      if((this.resetPasswordForm.value.password != this.resetPasswordForm.value.confirmPassword)){
        this.message = "Password and Confirm Password not matched";
      }
      console.log(this.resetPasswordForm.value);
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }
 
 
}
