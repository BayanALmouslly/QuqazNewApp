import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticsService {

  constructor(public http:HttpClient) { }
  controler=environment.baseUrl+"api/CStatics/"
  get(){
   return this.http.get(this.controler)
  }
  GetNo(){
    return this.http.get(this.controler+"GetNo");
  }
}
