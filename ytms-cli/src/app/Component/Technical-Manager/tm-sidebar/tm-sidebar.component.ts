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
      icon: 'fa-solid fa-calendar',
      routing: '/book-calendar'

    },
    {
      number: 2,
      name: 'Training Request',
      icon: 'fa-solid fa-chart-line',
      routing: '/training-req'
    },
    {
      number: 3,
      name: 'View Training Request',
      icon: 'fa-solid fa-box',
      routing: '/view-trf'
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
  ]
}
