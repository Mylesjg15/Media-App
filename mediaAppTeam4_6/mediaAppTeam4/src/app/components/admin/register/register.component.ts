import { Component, OnInit } from '@angular/core';
import {User} from 'src/app/models/user';
import {AdminService} from 'src/app/services/admin.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User()
  
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.reset()
  }

  register(){
    // if(this.user.name ==='admin'){
    //   this.user.active = true
    // }
    // else{
    //   this.user.active = false
    // }
  
    console.log(this.user)
    this.adminService.register(this.user).subscribe(()=>{
      this.router.navigate(['/login'])
    })
  }

  reset(){
    this.user.name = ''
    this.user.password = ''
    this.user.email = ''
  }
}
