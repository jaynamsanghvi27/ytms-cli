import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from "../../Core/services/login.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  signUpForm: FormGroup = this.formBuilder.group(
    {
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      emailAdd: ['', [Validators.required, Validators.pattern(/^[^\s@]+@yash\.com$/)]],
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
      let user = {
        fullName: this.signUpForm.value.fullName,
        emailAdd: this.signUpForm.value.emailAdd,
        password: this.signUpForm.value.password,
        confirmPassword: this.signUpForm.value.confirmPassword,
      }

      this.loginService.register(user).subscribe(res => {
        if (res != null) {
          Swal.fire('Success', 'Request Successfully submitted to Admin for Approval', 'success');
          this.router.navigate(['']);
        } else
          Swal.fire('Error', 'Registration failed', 'error');
      })
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
