import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';

const messageUrl = "http://localhost:3000/messages"

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  sendEmail(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(messageUrl, data)
  }
}
