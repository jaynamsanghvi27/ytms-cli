import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/Core/services/auth.service';
import {JwtService} from 'src/app/Core/services/jwt.service';

@Component({
  selector: 'app-trainer-header',
  templateUrl: './trainer-header.component.html',
  styleUrls: ['./trainer-header.component.css']
})
export class TrainerHeaderComponent {
  isLoggedIn = false;
  username: string = '';
  role: string = '';
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
      this.role = this.jwtService.getRoleFromToken(token).substring(5);
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
