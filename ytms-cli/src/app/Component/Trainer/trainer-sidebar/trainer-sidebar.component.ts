import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import MenuItems from 'src/app/Model/SideNavMenuItems';

@Component({
  selector: 'app-trainer-sidebar',
  templateUrl: './trainer-sidebar.component.html',
  styleUrls: ['./trainer-sidebar.component.css']
})
export class TrainerSidebarComponent {
  @Input() sideNavStatus: boolean = false;
  userRole:any;
  list:any;
  
  constructor(private auth:AuthService, private jwtserv:JwtService){
    let token = auth.getToken();
    this.userRole= jwtserv.getRoleFromToken(token);
    if(this.userRole==='ROLE_TECHNICAL_MANAGER'){
      this.list = MenuItems.sideNavForTechnicalManager;
    }
    else if(this.userRole==='ROLE_COMPETENCY_MANAGER'){
      this.list = MenuItems.sideNavForCompetencyManager;
    }
    else if(this.userRole==='ROLE_TRAINER'){
      this.list = MenuItems.sideNavForTrainer;
    }
    else{
      this.list=MenuItems.sideNavForRequester;
    }
 }
}