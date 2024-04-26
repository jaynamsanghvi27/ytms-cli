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
  userRole:any;
  list:any;
  constructor(private auth:AuthService, private jwtserv:JwtService){
    let token = auth.getToken();
    this.userRole= jwtserv.getRoleFromToken(token);
    if(this.userRole==='ROLE_TECHNICAL_MANAGER'){
      this.list = this.list1;
    }
    else if(this.userRole==='ROLE_COMPETENCY_MANAGER'){
      this.list = this.list2;
    }
    else if(this.userRole==='ROLE_TRAINER'){
      this.list = this.list3;
    }
    else{
      this.list=this.list4;
    }
  }

    list1 = [
      {
        number: 1,
        name: 'Dashboard',
       icon: 'fa-solid fa-home',
       routing: ''
      },
      {
        number: 2,
        name: 'Schedule',
        icon: 'fa-solid fa-calendar-days',
        routing: '/book-calendar'
  
      },
      {
        number: 3,
        name: 'Training Request',
        icon: 'fa-solid fa-person-chalkboard',
        routing: '/tm-training-req'
      },
      {
        number: 4,
        name: 'View Training Request',
        icon: 'fa-regular fa-rectangle-list',
        routing: '/tm-view-trf'
      },
      
      {
        number: 5,
        name: 'All Trainings',
        icon: 'fa fa-eye',
        routing: '/tm-view-trainer-form'
      },
      {
        number: 6,
        name: 'Associate Summary',
        icon: 'fa-solid fa-users',
        routing: '/tm-associate-summary'
      },
      {
        number: 7,
        name: 'Manage Associate',
        icon: 'fa fa-id-card-o',
        routing: '/tm-manage-associate'
  
      }
    ]
  
    list2 = [
      {
        number: 1,
        name: 'Dashboard',
       icon: 'fa-solid fa-home',
       routing: ''
      },
      {
        number: 2,
        name: 'Schedule',
        icon: 'fa-solid fa-calendar-days',
        routing: '/book-calendar'
  
      },
      {
        number: 3,
        name: 'View Training Request',
        icon: 'fa-regular fa-rectangle-list',
        routing: '/tm-view-trf'
      },
      
      {
        number: 4,
        name: 'All Trainings',
        icon: 'fa fa-eye',
        routing: '/tm-view-trainer-form'
      },
      {
        number: 5,
        name: 'Associate Summary',
        icon: 'fa-solid fa-users',
        routing: '/tm-associate-summary'
      },
      {
        number: 6,
        name: 'Manage Associate',
        icon: 'fa fa-id-card-o',
        routing: '/tm-manage-associate'
  
      }
    ]
    list3 = [
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
        name: 'View My Trainings',
        icon: 'fa fa-eye',
        routing: '/trainer/view-trainer-form'
      }
    ]
    list4 = [
      {
        number: 1,
        name: 'Dashboard',
       icon: 'fa-solid fa-home',
       routing: ''
      },
      {
        number: 2,
        name: 'Training Request',
        icon: 'fa-solid fa-person-chalkboard',
        routing: '/re-training-req'
      },
      {
        number: 3,
        name: 'View Training Request',
        icon: 'fa-regular fa-rectangle-list',
        routing: '/re-view-trf'
  
      },
      {
        number: 4,
        name: 'Training Status Reports',
        icon: 'fa fa-eye',
        routing: '/requester/view-trainer-form'
  
      },
      {
        number: 5,
        name: 'Associate Summary',
        icon: 'fa-solid fa-users',
        routing: '/re-associate-summary'
  
      },
      {
        number: 6,
        name: 'Manage Associate',
        icon: 'fa fa-id-card-o',
        routing: '/re-manage-associate'
  
      }
    ]
  

}

