import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from "../../../Core/services/auth.service";
import {JwtService} from "../../../Core/services/jwt.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tm-header',
  templateUrl: './tm-header.component.html',
  styleUrls: ['./tm-header.component.css']
})
export class TmHeaderComponent {

  isLoggedIn = false;
  username: string = '';
  userRole:String ="";
  unit: string = '';

  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  constructor(public authService: AuthService,
              private jwtService: JwtService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      const token = this.authService.getToken();
      this.username = this.jwtService.getFullNameFromToken(token);
      this.userRole = this.jwtService.getRoleFromToken(token).substring(5).replace("_"," ");
      this.unit = this.jwtService.getUnitFromToken(token);
    }
  }

  sideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  logout() {
    this.authService.removeToken();
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }
}
