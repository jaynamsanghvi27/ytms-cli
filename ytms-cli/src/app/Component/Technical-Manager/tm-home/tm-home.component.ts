import {Component} from '@angular/core';
import {UsersService} from "../../../Core/services/users.service";

@Component({
  selector: 'app-tm-home',
  templateUrl: './tm-home.component.html',
  styleUrls: ['./tm-home.component.css']
})
export class TmHomeComponent {

  sideNavStatus: boolean = false;
  userDetails: any = [];
  status: boolean = false;

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.getAllPendingUsers();
  }

  getAllPendingUsers() {
    this.usersService.getAllPendingUsers().subscribe(res => {
      this.userDetails = res;
    })
  }

  approveUser(user: any) {
    console.log(user);
    this.usersService.approvePendingUser(user.emailAdd).subscribe(res => {
      this.status = res;
    })
    window.location.reload();
  }

  declineUser(user: any) {

  }
}
