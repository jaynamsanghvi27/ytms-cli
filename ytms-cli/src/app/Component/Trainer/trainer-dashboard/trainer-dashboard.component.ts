import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';

@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.css']
})
export class TrainerDashboardComponent {
  userName: any;
  constructor(public authService: AuthService,
    private jwtService: JwtService,
    private router: Router) {
      let token = authService.getToken();
      this.userName = jwtService.getFullNameFromToken(token);
}

}
