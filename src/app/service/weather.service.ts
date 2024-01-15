import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { WeatherModel } from '../models/WeatherModel'; 
import { LocationModel } from'../models/LocationModel';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

    apiKey = "fcd357bb134494f9e327408d14dee76f";
    lat = 42.99;
    lon = -71.45;
    units = "&units=imperial";
    baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
    
    constructor (private http : HttpClient){}

    getWeatherData(lat : number, lon: number) : Observable<WeatherModel> {
        let latString = lat.toString();
        let lonString = lon.toString();
        let url = `${this.baseUrl}lat=${latString}&lon=${lonString}&appid=${this.apiKey}&units=imperial`;
        return this.http.get<WeatherModel>(url)
    }   

    getLocationFromZip(zipCode : string) : Observable<LocationModel>{
      let url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=fcd357bb134494f9e327408d14dee76f`;
      return this.http.get<LocationModel>(url)
    }
}
