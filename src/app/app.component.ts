import { Component, Input, OnInit } from '@angular/core';
import { WeatherModel } from './models/WeatherModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{  
  @Input() weatherData!: WeatherModel;
  title: any;

  constructor (){ }

  ngOnInit(): void {
  }

  getWeatherData(newModel : WeatherModel){
    this.weatherData = newModel;
    console.log(this.weatherData);
  } 

}
