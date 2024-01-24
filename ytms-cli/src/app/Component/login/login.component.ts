import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {User} from 'src/app/Model/User';
import {AuthService} from "../../Core/services/auth.service";
import {JwtService} from "../../Core/services/jwt.service";
import {Router} from "@angular/router";
import {LoginService} from "../../Core/services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  reg!: User[];
  emailpattern = "^(.+)@(.+)$";
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
        if (res.token != null) {
          this.authService.storeToken(res.token);
          this.routeUserDashboard();
        }
      },
      err => {
        this.authService.removeToken();
      });
  }

  private routeUserDashboard() {
    const token = this.authService.getToken();
    const role = this.jwtService.getRoleFromToken(token);
    if (role == 'ROLE_ADMIN_USER')
      this.router.navigateByUrl('/adminDashboard');

    if (role == 'ROLE_NORMAL_USER')
      this.router.navigateByUrl('/userDashboard');
  }

}

