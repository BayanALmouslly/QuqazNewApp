import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StaticsService {

  constructor(public http:HttpClient) { }
  controler=environment.baseUrl+"api/CStatics/"
  get(){
   return this.http.get(this.controler)
  }
}
