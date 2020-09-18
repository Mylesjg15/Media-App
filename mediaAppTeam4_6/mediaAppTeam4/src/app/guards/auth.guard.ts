import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AdminService} from 'src/app/services/admin.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private adminService: AdminService, private router: Router){}
  canActivate(){
    const user = this.adminService.getUserDetails()
    if(user!=null && user.active == true){
      return true
    }
    else{
      this.router.navigate(['/home'])
    }
  }
    


  
}
