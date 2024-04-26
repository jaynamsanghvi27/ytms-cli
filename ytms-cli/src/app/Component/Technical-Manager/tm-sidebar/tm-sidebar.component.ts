import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { UsersService } from 'src/app/Core/services/users.service';
import MenuItems from 'src/app/Model/SideNavMenuItems';
import { TrainingRequestService } from 'src/app/services/training-request.service';

@Component({
  selector: 'app-tm-sidebar',
  templateUrl: './tm-sidebar.component.html',
  styleUrls: ['./tm-sidebar.component.css']
})
export class TmSidebarComponent {
  userRole:any
  list :any = []
  @Input() sideNavStatus: boolean = false;
  constructor(private usersService: UsersService,private trainingRequestService:TrainingRequestService,
    private router: Router,private auth: AuthService, private jwtServ: JwtService) {
      let token = auth.getToken();
      this.userRole = jwtServ.getRoleFromToken(token);
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