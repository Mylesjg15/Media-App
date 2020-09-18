import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service'
import { News } from 'src/app/models/news'
@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {

  newsList: string[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getNews()

  }


  getNews() {
    this.newsService.getLatestNews().subscribe((data: News[]) => {
      let urlLinks = data.map(x => ({urlToImage: x.urlToImage}))
     
      console.log(urlLinks)
      
      for(let i=0; i<urlLinks.length; i++){
        this.newsList.push(urlLinks[i].urlToImage)
        // this.newsList[i] = urlLinks[i].urlToImage;
      }
      // console.log(this.newsList)

     })
  }

  

}
