import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {AdminService} from 'src/app/services/admin.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = ''
  password: string = ''

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
  }

  login(){
    const creds={
      email: this.email,
      password: this.password
    }
    this.adminService.login(creds).subscribe(()=>{
      this.router.navigate(['/dataViewList'])
    })
  }

  reset(){
    this.email = ''
    this.password = ''
  }
}
