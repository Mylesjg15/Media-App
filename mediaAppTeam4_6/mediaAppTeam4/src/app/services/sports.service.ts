import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {News} from 'src/app/models/news'
import {Observable} from 'rxjs'

const apiUrl = 'http://localhost:3000/news'

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  constructor(
    private http: HttpClient
  ) { }

  getNews(): Observable<News[]>{
    return this.http.get<News[]>(apiUrl)
  }
}
