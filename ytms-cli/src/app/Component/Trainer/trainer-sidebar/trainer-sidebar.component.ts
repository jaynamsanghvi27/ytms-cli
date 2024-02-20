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
      icon: 'fa-solid fa-calendar',
      routing:'trainer-calendar'

    },
    {
      number: 2,
      name: 'Analytics',
      icon: 'fa-solid fa-chart-line',
      routing:'trainer/trainer-calendar'

    },
    {
      number: 3,
      name: 'Products',
      icon: 'fa-solid fa-box',
      routing:'trainer/trainer-calendar'

    },
    {
      number: 4,
      name: 'Order  ',
      icon: 'fa-solid fa-cart-shopping',
      routing:'trainer/trainer-calendar'

    },
    {
      number: 5,
      name: 'Settings',
      icon: 'fa-solid fa-gear',
      routing:'trainer/trainer-calendar'

    },
    {
      number: 6,
      name: 'About',
      icon: 'fa-solid fa-circle-info',
      routing:'trainer/trainer-calendar'

    },
    {
      number: 7,
      name: 'Contact',
      icon: 'fa-solid fa-phone',
      routing:'trainer/trainer-calendar'

    },
  ]
}
