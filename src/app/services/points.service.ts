import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(public http:HttpClient) { }
  controler=environment.baseUrl+"api/CPoint/"
  MyPoints(){
   return this.http.get<any>(this.controler+"MyPoints")
  }
  getPoints(){
    return this.http.get<any>(this.controler)
   }
}
