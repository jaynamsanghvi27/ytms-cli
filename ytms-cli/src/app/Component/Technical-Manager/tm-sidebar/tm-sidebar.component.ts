import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tm-sidebar',
  templateUrl: './tm-sidebar.component.html',
  styleUrls: ['./tm-sidebar.component.css']
})
export class TmSidebarComponent {
  @Input() sideNavStatus: boolean = false;

  list = [
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
    },
    // {
    //   number: 9,
    //   name: 'Associate Management',
    //   icon: 'fa-solid fa-address-book',
    //   routing: '/tm-associate-management'
    // },
  ]
}
