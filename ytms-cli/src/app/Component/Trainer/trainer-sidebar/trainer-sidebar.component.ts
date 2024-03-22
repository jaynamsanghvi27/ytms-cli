import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trainer-sidebar',
  templateUrl: './trainer-sidebar.component.html',
  styleUrls: ['./trainer-sidebar.component.css']
})
export class TrainerSidebarComponent {
  @Input() sideNavStatus: boolean = false;

  list = [
    {
      number: 1,
      name: 'My Schedule',
      icon: 'fa-solid fa-calendar-days',
      routing:'/trainer/trainer-calendar'

    },
    {
      number: 2,
      name: 'Training Request',
      icon: 'fa-solid fa-person-chalkboard',
      routing: '/trainer/training-req'
    },
    {
      number: 3,
      name: 'View Training Request',
      icon: 'fa-regular fa-rectangle-list',
      routing: '/trainer/view-trf'
    },
    {
      number: 4,
      name: 'Order  ',
      icon: 'fa-solid fa-cart-shopping',
      routing: '/requester/calendar'

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
    {
      number: 8,
      name: 'View my trainings',
      icon: 'fa fa-eye',
      routing: '/trainer/view-trainer-form'
    },
  ]
}
