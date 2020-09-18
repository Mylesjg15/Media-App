import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import {User} from 'src/app/models/user'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = []
  name=''
  email=''
  entries: number = 10
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchUsers()
    const user = this.adminService.getUserDetails()
    this.name = user.name
    this.email = user.email
  }

  edit(user){
    if(user.active==true){ user.active=false}
    else{ user.active=true}
    this.adminService.updateUser(user._id, user).subscribe(()=>this.fetchUsers())
  }

  fetchUsers(){
    this.adminService.getUsers().subscribe((data)=>{
      this.users = data
    })
  }

  delete(user){
    this.adminService.deleteUser(user._id).subscribe(()=>this.fetchUsers())
  }

}
