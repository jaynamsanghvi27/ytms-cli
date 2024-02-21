import { Component, Input } from '@angular/core';

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
      name: 'home',
      icon: 'fa-solid fa-house',
      link: ''
    },
    {
      number: 2,
      name: 'Training Request',
      icon: 'fa-solid fa-chart-line',
      link: '/training-req'
    },
    {
      number: 3,
      name: 'Products',
      icon: 'fa-solid fa-box',
      link: ''
    },
    {
      number: 4,
      name: 'Order  ',
      icon: 'fa-solid fa-cart-shopping',
      link: ''
    },
    {
      number: 5,
      name: 'Settings',
      icon: 'fa-solid fa-gear',
      link: ''
    },
    {
      number: 6,
      name: 'About',
      icon: 'fa-solid fa-circle-info',
      link: ''
    },
    {
      number: 7,
      name: 'Contact',
      icon: 'fa-solid fa-phone',
      link: ''
    },
  ]
}
