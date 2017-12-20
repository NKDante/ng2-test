import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MainBackendService {

  private url = "https://randomuser.me/api/";

  constructor(private http: HttpClient) {
  }

  getUser(seed: string): Promise<any> {
    return this.http
      .get<any>(this.url, {params: seed ? {seed} : null})
      .toPromise();
  }

}
