import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {News} from 'src/app/models/news'
import {Observable} from 'rxjs'
import {AdminService} from './admin.service'

const url = "http://localhost:3000/news"
const latestNewsUrl = "http://localhost:3000/news/latestNews"
const trendingNewsUrl = "http://localhost:3000/news/trendingNews"

const sportsNewsUrl = "http://localhost:3000/news/sportsNews"

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient, private adminService: AdminService) { }

  addNews(news): Observable<News>{
    return this.http.post<News>(url, news, {
      headers:{
        authorization: 'Bearer '+this.adminService.getUserDetails().token
      }
    })
  }

  getNews(): Observable<News[]>{
    return this.http.get<News[]>(url)
  }

  deleteNews(id): Observable<any>{
    return this.http.delete<any>(url +'/'+id, {
      headers:{
        authorization: 'Bearer '+this.adminService.getUserDetails().token
      }
    })
  }

  updateNews(id, news): Observable<News>{
    return this.http.patch<News>(url+'/'+id, news, {
      headers:{
        authorization: 'Bearer '+this.adminService.getUserDetails().token
      }
    })
  }

  getLatestNews(): Observable<News[]>{
    return this.http.get<News[]>(latestNewsUrl)
  }

  
  getSportsNews(): Observable<News[]>{
    return this.http.get<News[]>(sportsNewsUrl)
  }

  getTrendingNews(): Observable<News[]>{
    return this.http.get<News[]>(trendingNewsUrl)
  }
}
