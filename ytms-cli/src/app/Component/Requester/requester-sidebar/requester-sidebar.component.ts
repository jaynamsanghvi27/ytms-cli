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
         name: 'My Schedule',
        icon: 'fa-solid fa-calendar-days',
        routing: (r1=='ROLE_TECHNICAL_MANAGER')?'/book-calendar':'/trainer/trainer-calendar'
        
  
       },
      {
        number: 2,
        name: 'Training Request',
        icon: 'fa-solid fa-person-chalkboard',
        routing: (r1=='ROLE_TECHNICAL_MANAGER')?'/tm-training-req':'/re-training-req'
      },
      {
        number: 3,
        name: 'View Training Request',
        icon: 'fa-regular fa-rectangle-list',
        routing: (r1=='ROLE_TECHNICAL_MANAGER')?'/tm-view-trf':'/re-view-trf'
  
      },
      {
        number: 4,
        name: 'Associate Summary',
        icon: 'fa-solid fa-address-book',
        routing: '/tm-associate-summary'
  
      },
      {
        number: 5,
        name: 'Manage Associate',
        icon: 'fa-solid fa-gear',
        routing: '/tm-manage-associate'
  
      },
      {
        number: 6,
        name: 'About',
        icon: 'fa-solid fa-circle-info',
        routing: '/requester/calendar'
  
      },
      {
        number: 7,
        name: 'Contact',
        icon: 'fa-solid fa-phone',
        routing: '/requester/calendar'
      },
      {
        number: 8,
        name: 'Associate Management',
        icon: 'fa-solid fa-address-book',
        routing: '/tm-associate-management'
      },
    ]
  }
  

}
