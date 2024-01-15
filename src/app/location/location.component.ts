import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { LocationModel } from '../models/LocationModel';
import { WeatherModel } from '../models/WeatherModel';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})

export class LocationComponent {
  newLocationZip! : string;
  location! : LocationModel;
  datainF!: WeatherModel;
  datainC!: WeatherModel;
  showLocation = false;
  isfahrenheit = true;
  currentlyDisplayedData? : WeatherModel;

  @Output() weatherModelEvent = new EventEmitter<WeatherModel>();

  constructor(private weatherService : WeatherService,
    private snackBar: MatSnackBar){}

  ngOnInit(){
    this.getUserInitialLocation();
  }

  setLocation(zipCode : string){
    this.newLocationZip = zipCode;
    this.getLocation();
  }

  getLocation(){
    this.weatherService.getLocationFromZip(this.newLocationZip!).subscribe(
      {
      next: response => this.location = response,
      error : err => this.openSnackBar("Zip Code Not Recongized", "Close"),
      complete: () => {console.log(this.location), this.getWeather()}
      }
    );
  }

  getWeather(){
    this.weatherService.getWeatherData(this.location?.lat, this.location?.lon).subscribe(
      {
        next: response => this.datainF = response,
        error : err => console.error(err),
        complete: () => {
          this.currentlyDisplayedData = this.datainF,
          this.showLocation = false,
          this.calculateCelsius(),
          this.weatherModelEvent.emit(this.datainF);
        }
      }
    )
  }

  getUserInitialLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.weatherService.getWeatherData(position.coords.latitude, position.coords.longitude).subscribe({
        next : repsonse => this.datainF = repsonse,
        error: err => console.error(err),
        complete: () => {
          this.calculateCelsius(), 
          this.currentlyDisplayedData = this.datainF,
          this.weatherModelEvent.emit(this.datainF);
        }
      })
    });    
  }

  calculateCelsius(){
    //converts temps to celsius
    this.datainC = JSON.parse(JSON.stringify(this.datainF));
    this.datainC!.main.feels_like = (this.datainF!.main.feels_like - 32) * (5/9);
  }

  changeUnits(){
    //checks current state of this.curretnlyDisplayed data
    //changes from current unit to new unit, F -> C or C -> F
    if (this.isfahrenheit){
      this.currentlyDisplayedData = this.datainC
      this.isfahrenheit = false;
    } else {
      this.currentlyDisplayedData = this.datainF
      this.isfahrenheit = true;
    }
  }

  openUserLocation(){
    this.showLocation = true;
  }

  closeUserLocation(){
    if(this.showLocation){
      this.showLocation = false;
    }
  }

  openSnackBar(message : string , close : string){   
    this.snackBar.openFromComponent(SnackBarAnnotatedComponent,  {duration: 2500})
  }
}

@Component({
  selector: 'snackBar',
  templateUrl: 'snackBar.html',
  styles: [
    `
    :host {
      display: flex;
    }

    .zip-code {
      font-size: 1.2em;
      text-align: center;
      color: hotpink;
    }
  `,
  ],
  standalone: true,
  imports: [MatButtonModule, MatSnackBarModule],
})
export class SnackBarAnnotatedComponent {
  snackBarRef = inject(MatSnackBarRef);
}
