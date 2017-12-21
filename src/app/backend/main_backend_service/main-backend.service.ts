import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class MainBackendService {

  private usersUrl: string = "https://randomuser.me/api/";
  private authorizeUrl: string = "https://hotelbook.ru/api/v1/ru/user/me";
  private citiesUrl: string = "https://hotelbook.ru/api/v1/ru/location/autocomplete";
  private token: string;
  private headers: HttpHeaders = new HttpHeaders;

  constructor(private http: HttpClient) {
  }

  getUser(seed: string): Promise<any> {
    return this.http
      .get<any>(this.usersUrl, {params: seed ? {seed} : null})
      .toPromise();
  }

  authorize() {
    this.http.get<any>(this.authorizeUrl).subscribe(response => {
      this.token = response.response.token;
    });
  }

  getCities(searchStr: string): Observable<any> {
    const headers = this.headers.set("X-HB-Token", this.token);

    const params = {
      params: {
        expanded: "0",
        term: searchStr
      },
      headers
    };

    return this.http.get<any>(this.citiesUrl, params);
  }

}
