import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';

@Component({
  selector: 'app-trainer-sidebar',
  templateUrl: './trainer-sidebar.component.html',
  styleUrls: ['./trainer-sidebar.component.css']
})
export class TrainerSidebarComponent {
  @Input() sideNavStatus: boolean = false;
  role:any;
  list:any;
  
  constructor(private auth:AuthService, private jwtserv:JwtService){
    let token = auth.getToken();
     this.role= jwtserv.getRoleFromToken(token);
    console.log(this.role);
    this.list  = [
    {
      number: 1,
      name: 'Dashboard',
     icon: 'fa-solid fa-home',
     routing: ''
    },
    {
      number: 2,
      name: 'My Schedule',
      icon: 'fa-solid fa-calendar-days',
      routing:'/trainer/trainer-calendar'

    },
    {
      number: 3,
      name: 'Training Request',
      icon: 'fa-solid fa-person-chalkboard',
      routing: '/trainer/training-req'
    },
    {
      number: 4,
      name: 'View Training Request',
      icon: 'fa-regular fa-rectangle-list',
      routing: '/trainer/view-trf'
    },
    {
      number: 5,
      name: this.getViewName(this.role),
      icon: 'fa fa-eye',
      routing: '/trainer/view-trainer-form'
    },
    {
      number: 6,
      name: 'Order  ',
      icon: 'fa-solid fa-cart-shopping',
      routing: '/requester/calendar'

    },
    {
      number: 7,
      name: 'Settings',
      icon: 'fa fa-id-card-o',
      routing: '/requester/calendar'

    },
    {
      number: 8,
      name: 'About',
      icon: 'fa-solid fa-circle-info',
      routing: '/trainer/about-us'

    },
    {
      number: 9,
      name: 'Contact',
      icon: 'fa-solid fa-phone',
      routing: '/requester/calendar'
    },
    
  ]
}

  getViewName(role: string) {

    if ('ROLE_TECHNICAL_MANAGER' === role) {
      return "All Trainings";
    }

    else if ('ROLE_REQUESTER' === role) {
      return "Training Status Reports";
    }

    else return "View My Trainings"

  }

}
