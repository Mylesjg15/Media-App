import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {News} from 'src/app/models/news';
import {AdminService} from 'src/app/services/admin.service'
import {NewsService} from 'src/app/services/news.service'

@Component({
  selector: 'app-data-view-list',
  templateUrl: './data-view-list.component.html',
  styleUrls: ['./data-view-list.component.css']
})
export class DataViewListComponent implements OnInit {
  @ViewChild('row', { static: true }) row: ElementRef;
  selected: number
  notEdited: boolean = true;
  entries: number = 10
  newsList: News[] = []
  query = ''
  name = ''
  email = ''
  constructor(private newsService: NewsService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchNews()
    const user =this.adminService.getUserDetails()
    this.name = user.name
    this.email = user.email
  }

  edit(i){
    this.selected = i
    this.notEdited = false;
  }

  update(news){
    this.notEdited = true;
    this.selected = null
    this.newsService.updateNews(news._id, news).subscribe(()=>this.fetchNews())
  }

  delete(news){
    this.newsService.deleteNews(news._id).subscribe(()=>this.fetchNews())
  }
  fetchNews(){
  this.newsService.getNews().subscribe((data)=>{
    data.forEach(function(item, index){
      data[index].publishedAt = new Date(item.publishedAt.toString())
    })
    this.newsList = data
  })
}

}
