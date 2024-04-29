import { Component } from '@angular/core';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  sideNavStatus: boolean = false;
  userRole:String='';
  constructor(private authService:AuthService,private jwtService:JwtService){}

  ngOnInit(): void 
  {
    const token = this.authService.getToken();
    const role = this.jwtService.getRoleFromToken(token);
    const email = this.jwtService.getUserNameFromToken(token);
    this.userRole=role;
  }
}
