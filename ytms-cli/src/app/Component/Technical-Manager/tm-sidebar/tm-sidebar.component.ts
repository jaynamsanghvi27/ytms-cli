import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { UsersService } from 'src/app/Core/services/users.service';
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
      if(this.userRole==='ROLE_COMPETENCY_MANAGER'){
        this.list = this.list2;
      }
      else{
        this.list=this.list1;
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

    },
    {
      number: 8,
      name: 'About',
      icon: 'fa-solid fa-circle-info',
      routing: '/tm-about-us'

    },
    {
      number: 9,
      name: 'Contact',
      icon: 'fa-solid fa-phone',
      routing: '/requester/calendar'
    }
    // {
    //   number: 9,
    //   name: 'Associate Management',
    //   icon: 'fa-solid fa-address-book',
    //   routing: '/tm-associate-management'
    // },
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

    },
    {
      number: 7,
      name: 'About',
      icon: 'fa-solid fa-circle-info',
      routing: '/tm-about-us'

    },
    {
      number: 8,
      name: 'Contact',
      icon: 'fa-solid fa-phone',
      routing: '/requester/calendar'
    }
  ]
}
