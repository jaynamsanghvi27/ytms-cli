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
      name: 'Schedule',
      icon: 'fa-solid fa-calendar-days',
      routing: '/book-calendar'

    },
    {
      number: 2,
      name: 'Training Request',
      icon: 'fa-solid fa-person-chalkboard',
      routing: '/tm-training-req'
    },
    {
      number: 3,
      name: 'View Training Request',
      icon: 'fa-regular fa-rectangle-list',
      routing: '/tm-view-trf'
    },
    {
      number: 8,
      name: 'Associate Summary',
      icon: 'fa-solid fa-address-book',
      routing: '/tm-associate-summary'
    },
    {
      number: 5,
      name: 'Settings',
      icon: 'fa-solid fa-gear',
      routing: '/requester/calendar'

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
  ]
}
