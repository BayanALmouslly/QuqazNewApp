import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(public http:HttpClient) { }
  controler=environment.baseUrl+"api/CPoints/"
  get(){
   return this.http.get(this.controler)
  }
  getPoints(){
    return this.http.get(this.controler)
   }
}
