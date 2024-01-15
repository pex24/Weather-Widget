import { Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { WeatherModel } from '../models/WeatherModel';


@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})

export class TimeComponent implements OnInit, OnChanges {
  date? : Date;
  dateUTCString? : string;
  time? : any;
  dateDisplay! : string;
  timeDisplay! : string;
  @Input() weatherTimeDate!: WeatherModel;
  offset = 0;
  constructor(){}
  isDaylight = false;

  ngOnInit(): void {
    this.updateTime();   
    this.checkForSunrise();
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    this.updateTime();
    this.checkForSunrise();
  }

  buildDate(){
    this.dateDisplay = this.dateUTCString!.slice(0,16);
  }

  buildTime(){
    //AM and PM not working, time is diplayed in 24 hr
    this.timeDisplay = this.dateUTCString!.slice(16,26);
    
    // if(this.date!.getUTCHours() < 12){
    //   this.timeDisplay = this.timeDisplay.concat(" AM");
    // }
    // else {
    //   this.timeDisplay = this.timeDisplay.concat(" PM");
    // }
  }

  checkForSunrise(){
    //dividing date by 1000 changes milliseconds to seconds
    console.log("Now " + (Date.now() / 1000));
    if(this.weatherTimeDate.sys.sunrise < Date.now()/1000 && this.weatherTimeDate.sys.sunset > Date.now()/1000){
      this.isDaylight = true;
      console.log("will be sunset in - " + (this.weatherTimeDate.sys.sunset - Date.now()/1000)/60);
    }
    else {
      this.isDaylight = false;
      console.log("will be sunrise in - " + (this.weatherTimeDate.sys.sunrise - Date.now()/1000)/60);
    }
    
  }

  updateTime(){
    //runs a continues clock, updating time every second
    this.date = new Date((Date.now() + (this.weatherTimeDate.timezone * 1000)));
    this.dateUTCString = this.date.toUTCString();
    this.buildDate();
    this.buildTime();
    setInterval( () => this.updateTime(), 1000);
  }
}
