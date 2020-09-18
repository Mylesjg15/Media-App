import { Component, OnInit } from '@angular/core';
import { SportsService } from 'src/app/services/sports.service';
import { NewsService } from 'src/app/services/news.service';
import { WeatherService } from 'src/app/services/weather.service';
import { Router } from '@angular/router';
import { News } from 'src/app/models/news';
import { Weather } from 'src/app/models/weather';

@Component({
  selector: 'app-sports-news',
  templateUrl: './sports-news.component.html',
  styleUrls: ['./sports-news.component.css']
})
export class SportsNewsComponent implements OnInit {

  trendingNews: News[] = []
  sportsNews: News[] = []
  latestNews: News[] = []
  dateTime: Date
  weather: any = {}

  constructor(
    private sportsService: SportsService,
    private newsService: NewsService,
    private router: Router,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.fetchSportsNews();
    this.fetchLatestNews();
    this.fetchTrendingNews();
    // this.getWeatherDetails('New Jersey');

    navigator.geolocation.getCurrentPosition((position) => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      this.getWeatherDetails(latitude, longitude)
    },
      error => {
        this.getWeatherDetails(40.522964, -74.411674)
      })

    this.dateTime = new Date();
  }

  fetchSportsNews(){
    this.newsService.getSportsNews().subscribe((data: News[]) => {
      this.sportsNews = data
    })
  }

  fetchLatestNews(){
    this.newsService.getLatestNews().subscribe((data: News[]) => {
      this.latestNews = data
    })
  }

  fetchTrendingNews(){
    this.newsService.getTrendingNews().subscribe((data: News[]) => {
      this.trendingNews = data
    })
  }

  // getWeatherDetails(city){
  //   this.weatherService.getWeatherDataByCity(city).subscribe((data: Weather) => {
  //     let currentWeather: Weather = new Weather()
  //     currentWeather.city = data['name']
  //     currentWeather.temperature = Math.round((data['main'].temp - 273.15)*1.8 +32)
  //     currentWeather.description = data['weather'][0].description
  //     currentWeather.icon = data['weather'][0].icon
  //     currentWeather.weatherType = data['weather'][0].main
  //     this.weather = currentWeather
  //   })
  // }
  getWeatherDetails(lat, long) {
    this.weatherService.getWeatherDataByLocation(lat, long).subscribe((data: Weather) => {
      this.displayWeatherDetals(data)
    })
  }

  displayWeatherDetals(data) {
    let currentWeather: Weather = new Weather()
    currentWeather.city = data['name']
    currentWeather.temperature = Math.round((data['main'].temp - 273.15) * 1.8 + 32)
    currentWeather.description = data['weather'][0].description
    currentWeather.icon = data['weather'][0].icon
    currentWeather.weatherType = data['weather'][0].main
    this.weather = currentWeather
  }

}
