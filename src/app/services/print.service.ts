import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(public http: HttpClient) { }
  controler = environment.baseUrl + "api/Print/"
  Get(printNumber){
    return this.http.get<any>(this.controler+printNumber)
  }
}
