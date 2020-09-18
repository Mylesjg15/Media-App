import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {AdminService} from 'src/app/services/admin.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('alert', { static: true }) alert: ElementRef;
  loggedIn: boolean = true

  constructor(public adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.adminService.logout()
    this.alert.nativeElement.classList.remove('hide');
    this.router.navigate(['/login'])
  }

  closeAlert() {
    this.alert.nativeElement.classList.add('hide');
  }
}
