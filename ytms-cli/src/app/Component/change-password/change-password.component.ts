import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Core/services/api.service';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  isLoggedIn = false;
  changePasswordForm!: FormGroup;
  password: any;
  oldPassword: any;
  email: any;
  userRole:any;
  sideNavStatus: boolean = false;
  constructor(private auth: AuthService,
    private jwtServ: JwtService, public dialog: MatDialog, private formBuilder: FormBuilder, private router: Router
    , private formbuilder: FormBuilder, private route: ActivatedRoute, private apiService: ApiService
  ) {
    let token = auth.getToken();
    this.userRole = jwtServ.getRoleFromToken(token);
  }


  ngOnInit(): void {
    this.isLoggedIn = this.auth.isAuthenticated();
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
      }, {
      validator: this.passwordMatchValidator
    }
    )
  }
  // Custom validator for password match
  private passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    const oldPassword = formGroup.get('oldPassword')?.value;
    if(oldPassword==newPassword){
      formGroup.get('oldPassword')?.setErrors({ passwordMatched: true });
    }
    else{
      formGroup.get('oldPassword')?.setErrors({ passwordMatched: false });
    }

    if (newPassword !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }

    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }
  changePassword(changePasswordForm: any) {
    this.password = changePasswordForm.get('newPassword')?.value;
    this.oldPassword = changePasswordForm.get('oldPassword')?.value;
    const data = { 'oldPassword': this.oldPassword, 'password': this.password };
    if(this.isNotBlank(this.password) && this.isNotBlank(this.oldPassword)){
      this.apiService.changePassword(data).subscribe((res: any) => {
        console.log("res here : " + JSON.stringify(res));
        if (res.status != 'SUCCESS') {
          Swal.fire('Failed', 'Oops! It seems like the old password you entered doesnt match our records. Please double-check and try again.', 'error')
        } else
          Swal.fire('Success', 'Password changed successfully !', 'success');
          this.logout();
      },
        error => Swal.fire('Error', 'Server not responding, please try again later ☺', 'error')
          .then(r => window.location.reload())
      );
    }
    else{
      Swal.fire('Error', 'Password And Old Password Should Not Be Blank', 'error');
    }
  }
   isBlankOrNull(password: string | null): boolean {
    return password === null || password.trim().length === 0;
  }
  isNotBlank(password: string | null): boolean {
    return !this.isBlankOrNull(password);
  }
  logout() {
    this.auth.removeToken();
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }




}
