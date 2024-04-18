import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticsService {

  constructor(public http: HttpClient) { }
  controler = environment.baseUrl + "api/CStatics/"
  get() {
    return this.http.get(this.controler)
  }
  GetNo() {
    return this.http.get(this.controler + "GetNo");
  }
  AccountReport(start, end) {
    let params = new HttpParams();
    if (start)
      params = params.append('Start', start);
    if (end)
      params = params.append('End', end);

    return this.http.get(this.controler + 'AccountReport', { params: params });

  }
  GetOrderStaticsReport(start, end) {
    let params = new HttpParams();
    if (start)
      params = params.append('Start', start);
    if (end)
      params = params.append('End', start);

    return this.http.get(this.controler + 'GetOrderStaticsReport', { params: params });

  }
}
