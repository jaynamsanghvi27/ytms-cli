import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  reg!: User[];
  userLoginForm!: FormGroup;
  emailpattern = "^(.+)@(.+)$";
  
 
  constructor(private formBuilder: FormBuilder){
 
  }
 
  ngOnInit(): void {
    this.userLoginForm = this.formBuilder.group(
      {
        emailId: ['', [Validators.required, Validators.pattern(this.emailpattern)]],
        password: ['', [Validators.required, Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        )]]
      })
  }
 
  submit(): void {
    if (this.userLoginForm.valid) {
      console.log(this.userLoginForm.value);
    } else {
      this.userLoginForm.markAllAsTouched();
    }
  }

}

