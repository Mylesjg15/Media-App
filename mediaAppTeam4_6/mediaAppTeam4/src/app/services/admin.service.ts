import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from 'src/app/models/user'
import {Observable} from 'rxjs'
import { map } from 'rxjs/operators'

const registerUrl = "http://localhost:3000/register"
const loginUrl = "http://localhost:3000/login"
const userUrl = "http://localhost:3000/users"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  register(user): Observable<User>{
    return this.http.post<User>(registerUrl, user)
  }

  login(creds: any): Observable<any>{
    return this.http.post<any>(loginUrl, creds).pipe(map((user)=>{
      localStorage.setItem('user', JSON.stringify(user))
    }))
  }

  getUserDetails(){
    return JSON.parse(localStorage.getItem('user'))
  }

  logout(){
    localStorage.removeItem('user')
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(userUrl, {
      headers:{
        authorization: 'Bearer '+this.getUserDetails().token
      }
    })
  }

  updateUser(id, user): Observable<User>{
    return this.http.patch<User>(userUrl+'/'+id, user, {
      headers:{
        authorization: 'Bearer '+this.getUserDetails().token
      }
    })
  }

  deleteUser(id): Observable<any>{
    return this.http.delete<any>(userUrl +'/'+id, {
      headers:{
        authorization: 'Bearer '+this.getUserDetails().token
      }
    })
  }
}
