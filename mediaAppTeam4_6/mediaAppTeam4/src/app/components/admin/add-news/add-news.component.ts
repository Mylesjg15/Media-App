import { Component, OnInit } from '@angular/core';
import {News} from 'src/app/models/news'
import {NewsService} from 'src/app/services/news.service';
import {AdminService} from 'src/app/services/admin.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  news: News = new News()
  date: Date = new Date()
  name = ''
  email = ''
  constructor(
    private newsService: NewsService,
    private router: Router,
    private adminService: AdminService
    ) { }

  ngOnInit(): void {
    const user =this.adminService.getUserDetails()
    this.name = user.name
    this.email = user.email
  }

  add(){ 
    this.news.publishedAt = this.date
    this.newsService.addNews(this.news).subscribe((data)=>{
      this.router.navigate(['/dataViewList'])
    })
  }

  reset(){
    this.news = null
  }
}
