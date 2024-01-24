import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {User} from 'src/app/Model/User';
import {AuthService} from "../../Core/services/auth.service";
import {JwtService} from "../../Core/services/jwt.service";
import {Router} from "@angular/router";
import {LoginService} from "../../Core/services/login.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  reg!: User[];
  emailpattern = /^[^\s@]+@yash\.com$/;
  userLoginForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.pattern(this.emailpattern)]],
      password: ['', [Validators.required, Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      )]]
    })


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private jwtService: JwtService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated())
      this.loginService.navigateByRoles();
  }

  submit(): void {
    if (!this.userLoginForm.valid) {
      return;
    }
    let user = {
      email: this.userLoginForm.value.email,
      password: this.userLoginForm.value.password,


    }
    this.loginService.login(user).subscribe(res => {

        if (res.status === 'SUCCESS') {
          this.authService.storeToken(res.token);
          this.routeUserDashboard();
        } else {
          Swal.fire('Error', res.message, 'error');
        }
      },
      err => {
        this.authService.removeToken();
      });
  }

  private routeUserDashboard() {
    const token = this.authService.getToken();
    const role = this.jwtService.getRoleFromToken(token);
    if (role == 'ROLE_TECHNICAL_MANAGER')
      this.router.navigateByUrl('/tm-dashboard');

    if (role == 'ROLE_REQUESTER')
      this.router.navigateByUrl('/requester-home');
  }

}

