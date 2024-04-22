import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';

@Component({
  selector: 'app-requester-sidebar',
  templateUrl: './requester-sidebar.component.html',
  styleUrls: ['./requester-sidebar.component.css']
})
export class RequesterSidebarComponent {
  @Input() sideNavStatus: boolean = false;
  role:any;
  list:any;
  constructor(private auth:AuthService, private jwtserv:JwtService){
    let token = auth.getToken();
    let r1= jwtserv.getRoleFromToken(token);
    console.log(this.role);
    this.list = [
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
        routing: (r1=='ROLE_TECHNICAL_MANAGER')?'/book-calendar':'/trainer/trainer-calendar'
       },
      {
        number: 3,
        name: 'Training Request',
        icon: 'fa-solid fa-person-chalkboard',
        routing: (r1=='ROLE_TECHNICAL_MANAGER')?'/tm-training-req':'/re-training-req'
      },
      {
        number: 4,
        name: 'View Training Request',
        icon: 'fa-regular fa-rectangle-list',
        routing: (r1=='ROLE_TECHNICAL_MANAGER')?'/tm-view-trf':'/re-view-trf'
  
      },
      {
        number: 5,
        name: 'Training Status Reports',
        icon: 'fa fa-eye',
        routing: (r1=='ROLE_TECHNICAL_MANAGER')? '/tm-view-trainer-form':'/requester/view-trainer-form'
      },
      {
        number: 6,
        name: 'Associate Summary',
        icon: 'fa-solid fa-users',
        routing: '/tm-associate-summary'
  
      },
      {
        number: 6,
        name: 'Manage Associate',
        icon: 'fa fa-id-card-o',
        routing: '/tm-manage-associate'
  
      },
      {
        number: 8,
        name: 'About',
        icon: 'fa-solid fa-circle-info',
        routing: (r1=='ROLE_TECHNICAL_MANAGER')?'/tm-about-us':'/requester/about-us'
  
      },
      {
        number: 9,
        name: 'Contact',
        icon: 'fa-solid fa-phone',
        routing: '/requester/calendar'
      },
      // {
      //   number: 9,
      //   name: 'Associate Management',
      //   icon: 'fa-solid fa-address-book',
      //   routing: '/tm-associate-management'
      // },
    ]
  }
  

}
