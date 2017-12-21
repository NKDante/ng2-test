import {Component, OnInit} from '@angular/core';
import {MainBackendService} from "./backend/main_backend_service/main-backend.service";
import {IUser} from "./interfaces/user.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public user: IUser = {};
  public gotUser: boolean = false;
  public userPromise: Promise<any>;
  public cities: Array<any>;
  public currentCity: any;
  public citySearchText: string = "";

  public templateForPopover: string = `
    <div style="color: black; width: 300px;">
      <h1>it works</h1>
      <p>lol</p>
    </div>`;

  constructor(private backendService: MainBackendService) {
  }

  ngOnInit() {
    this.backendService.authorize();
  }

  getUser(year: string, seed = null) {
    if (isNaN(parseInt(year, 10)) || year.length < 4 || parseInt(year, 10) < 0) {
      return;
    }

    this.userPromise = this.backendService.getUser(seed);

    this.userPromise
      .then(response => {
        if (parseInt(response.results[0].dob.substr(0, 4)) > parseInt(year)) {
          return this.getUser(year, response.results[0].email);
        } else {
          this.user = {
            fullName: `${response.results[0].name.title} ${response.results[0].name.first} ${response.results[0].name.last}`,
            email: response.results[0].email,
            phone: response.results[0].phone,
            pictureUrl: response.results[0].picture.large
          };

          this.gotUser = true;
        }
      });
  }

  getCities(searchStr: string) {
    this.backendService.getCities(searchStr)
      .subscribe(resp => {
        this.cities = resp.response.cities;
      });
  }

  setCity(city) {
    this.currentCity = city;
    console.log(this.citySearchText)
  }

  submitForm(form: any) {
    console.log(form);
  }
}
