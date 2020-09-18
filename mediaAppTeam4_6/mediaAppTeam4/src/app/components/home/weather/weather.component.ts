// import { Component, OnInit } from '@angular/core';
// import { Weather } from 'src/app/models/weather'
// import { WeatherService } from 'src/app/services/weather.service'
// import { FormGroup, FormBuilder, Validators} from '@angular/forms';

// @Component({
//   selector: 'app-weather',
//   templateUrl: './weather.component.html',
//   styleUrls: ['./weather.component.css']
// })
// export class WeatherComponent implements OnInit {

//   weather: any = {}
//   cityForm:FormGroup

//   constructor(private builder:FormBuilder,  private weatherService: WeatherService) { }

//   ngOnInit(): void {
//     this.cityForm = this.builder.group({
//       city: ['', Validators.required]
//     })

//     this.getWeatherDetails('Chicago')
//   }

//   getWeatherDetails(city) {
//     this.weatherService.getWeatherDataForCity(city).subscribe((data: Weather) => {
//       console.log(data)
//       let currentWeather: Weather = new Weather()
//       currentWeather.city = data['name']
//       currentWeather.temperature = Math.round((data['main'].temp - 273.15)*1.8 + 32)
//       currentWeather.description = data['weather'][0].description
//       currentWeather.icon = data['weather'][0].icon
//       currentWeather.weatherType = data['weather'][0].main
//       this.weather = currentWeather
//     })
//   }

//   handleSubmit() {
//     this.getWeatherDetails(this.cityForm.get('city').value)
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Weather } from 'src/app/models/weather'
import { WeatherService } from 'src/app/services/weather.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weather: any = {}
  cityForm: FormGroup

  constructor(private builder: FormBuilder, private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.cityForm = this.builder.group({
      city: ['', Validators.required]
    })

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.getWeatherDetails(latitude, longitude)
      },
        error => {
          this.getWeatherDetails(40.522964, -74.411674)
        })
    } else {
      console.log("No support for geolocation")
    }

  }

  getWeatherDetails(lat, long) {
    this.weatherService.getWeatherDataByLocation(lat, long).subscribe((data: Weather) => {
      this.displayWeatherDetals(data)
    })
  }

  getWeatherForCity() {
    this.weatherService.getWeatherDataByCity(this.cityForm.get('city').value).subscribe((data: Weather) => {
      this.displayWeatherDetals(data)
      this.cityForm.reset()
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
