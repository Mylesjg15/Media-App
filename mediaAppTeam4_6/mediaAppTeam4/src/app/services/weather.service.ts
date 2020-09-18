// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Weather } from '../models/weather';

// const apiUrl = "https://api.openweathermap.org/data/2.5/weather"
// const apiKey = "64a466102015bc95353f1b5d1e87f470"

// @Injectable({
//   providedIn: 'root'
// })
// export class WeatherService {

//   constructor(private http: HttpClient) { }

//   getWeatherDataForCity(city: string): Observable<Weather>{
//     return this.http.get<Weather>(apiUrl + '?q=' + city + '&appid=' + apiKey)
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from '../models/weather';

const apiUrl = "https://api.openweathermap.org/data/2.5/weather"
const apiKey = "64a466102015bc95353f1b5d1e87f470"

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherDataByCity(city: string): Observable<Weather> {
    return this.http.get<Weather>(apiUrl + '?q=' + city + '&appid=' + apiKey)
  }

  getWeatherDataByLocation(lat, long): Observable<Weather> {
    return this.http.get<Weather>(apiUrl + '?lat=' + lat + '&lon=' + long + '&appid=' + apiKey)
  }
}
