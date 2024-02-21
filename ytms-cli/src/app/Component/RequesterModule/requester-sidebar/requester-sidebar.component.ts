import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-requester-sidebar',
  templateUrl: './requester-sidebar.component.html',
  styleUrls: ['./requester-sidebar.component.css']
})
export class RequesterSidebarComponent {
  @Input() sideNavStatus: boolean = false;

  list = [
    {
      number: 1,
      name: 'My Schedule',
      icon: 'fa-solid fa-calendar',
      routing: 'requester-calendar'

    },
    {
      number: 2,
      name: 'Analytics',
      icon: 'fa-solid fa-chart-line',
      routing: 'requester/requester-calendar'

    },
    {
      number: 3,
      name: 'Products',
      icon: 'fa-solid fa-box',
      routing: 'requester/requester-calendar'

    },
    {
      number: 4,
      name: 'Order  ',
      icon: 'fa-solid fa-cart-shopping',
      routing: 'requester/requester-calendar'

    },
    {
      number: 5,
      name: 'Settings',
      icon: 'fa-solid fa-gear',
      routing: 'requester/requester-calendar'

    },
    {
      number: 6,
      name: 'About',
      icon: 'fa-solid fa-circle-info',
      routing: 'requester/requester-calendar'

    },
    {
      number: 7,
      name: 'Contact',
      icon: 'fa-solid fa-phone',
      routing: 'requester/requester-calendar'

    },
  ]
}
