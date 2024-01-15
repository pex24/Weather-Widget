import { Component } from '@angular/core';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-upper-display',
  templateUrl: './upper.display.component.html',
  styleUrls: ['./upper.display.component.css']
})
export class UpperDisplayComponent {

  constructor(private weatherService : WeatherService){}

  
}
