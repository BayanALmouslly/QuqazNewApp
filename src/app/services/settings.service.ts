import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(public http: HttpClient) { }
  controler = environment.baseUrl + "api/CSettingsGet/"
  Countries() {
    return this.http.get<any>(this.controler + "Countries")
  }
  Regions() {
    return this.http.get<any>(this.controler + "Regions")
  }
  orderType() {
    return this.http.get<any>(this.controler + "orderType")
  }
  OrderPlaced() {
    return this.http.get<any>(this.controler + "OrderPlaced")
  }
  MoenyPlaced() {
    return this.http.get<any>(this.controler + "MoenyPlaced")
  }
}
