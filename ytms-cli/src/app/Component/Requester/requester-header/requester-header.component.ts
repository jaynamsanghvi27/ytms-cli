import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-requester-header',
  templateUrl: './requester-header.component.html',
  styleUrls: ['./requester-header.component.css']
})
export class RequesterHeaderComponent {

  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  ngOnInit(): void {

  }

  sideNavToggle() {
    this.menuStatus = !this.menuStatus;

    this.sideNavToggled.emit(this.menuStatus);
  }
}
