import {Component} from '@angular/core';
import {MainBackendService} from "./backend/main_backend_service/main-backend.service";
import {IUser} from "./interfaces/user.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public user: IUser = {};
  public gotUser: boolean = false;

  public templateForPopover: string = `
    <div style="color: black; width: 300px;">
      <h1>it works</h1>
      <p>lol</p>
    </div>`;

  constructor(private backendService: MainBackendService) {
  }

  getUser(year: string, seed = null) {
    if (isNaN(parseInt(year, 10)) || year.length < 4 || parseInt(year, 10) < 0) {
      return;
    }

    this.backendService.getUser(seed)
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
}
