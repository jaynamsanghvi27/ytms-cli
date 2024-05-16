import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Core/services/users.service';

@Component({
  selector: 'app-approved-user-detail',
  templateUrl: './approved-user-detail.component.html',
  styleUrls: ['./approved-user-detail.component.css']
})
export class ApprovedUserDetailComponent {
  activeUserDetails: any = [];
  listOfActiveUserCount: number=0;

  constructor(private usersService: UsersService) {
      
}
  ngOnInit(): void {
    this.getAllActiveUsers();
  }
  getAllActiveUsers(){
    this.usersService.getAllActiveUsers().subscribe(res => {
      this.activeUserDetails = res;
      this.listOfActiveUserCount = this.activeUserDetails.length; 
      for(let i=0;i<this.activeUserDetails.length;i++){
        this.activeUserDetails[i]['roleType']="";
      }
    })
  }
}
