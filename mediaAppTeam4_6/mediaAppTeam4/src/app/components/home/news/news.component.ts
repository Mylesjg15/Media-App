import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Router } from '@angular/router';
import { News } from 'src/app/models/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  latestNews: News[] = []

  constructor(
    private newsService: NewsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchLatestNews();
  }

  fetchLatestNews(){
    this.newsService.getLatestNews().subscribe((data: News[]) => {
      this.latestNews = data
    })
  }

}
