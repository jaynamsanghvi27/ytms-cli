import { Component, OnInit } from '@angular/core';
import * as Constants from '../../Core/application_constant/constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Messages } from '../../Core/application_constant/message_constants';
import { ApiService } from 'src/app/Core/services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  MESSAGE_CONSTANTS: any = Messages;
  submitted: boolean = false;
  resetPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(Constants.EMAIL_PATTERN)]]
  });

  constructor(private fb: FormBuilder,
    public toastr: ToastrService, public apiservice: ApiService) {

  }
  ngOnInit(): void {

  }

  //THIS METHOD IS RESPONSIBLE TO RETURN ALL THE CONTROLS OF FORM
  get f() {
    return this.resetPasswordForm.controls;
  }

  // SUBMIT RESET PASSWORD FORM 
  submitResetPasswordForm() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    }
    else {
      let formdata = new FormData();
      formdata.set("email", this.f['email'].value);
      this.apiservice.putapi(formdata,"dashboard/forgetPassword").subscribe({
        next: (data: any) => {
          this.resetPasswordForm.reset();
          this.showSuccess(data.msg);
          this.submitted = false;
          console.log(data)
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  //SUCCESS MESSAGE IF EMAIL SEND SUCCESSFULLY
  showSuccess(message: string) {
    this.toastr.success(message, 'Success', {
      timeOut: 5000,
    });
  }
}
