import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from "../../Core/services/login.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  //reg!: User[];
  signUpForm: FormGroup = this.formBuilder.group(
    {
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      emailId: ['', [Validators.required, Validators.pattern(/^[^\s@]+@yash\.com$/)]],
      password: ['', [Validators.required, Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      )]],
      confirmPassword: ['', [Validators.required]]
    })

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit(): void {

  }

  submit(): void {
    if (this.signUpForm.valid) {
      this.router.navigate(['/register']);
      console.log(this.signUpForm.value);
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }

  validateSubmit() {
    if (this.signUpForm.controls['password'].value != this.signUpForm.controls['confirmPassword'].value) {
      return true;
    } else {
      return false;
    }
  }

}
