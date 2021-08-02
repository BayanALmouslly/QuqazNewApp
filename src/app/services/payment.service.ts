import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(public http: HttpClient) { }
  controler = environment.baseUrl + "api/CPaymentRequest/"
  Add(payment) {
    return this.http.post(this.controler, payment)
  }
  Get() {
    return this.http.get<any>(this.controler)
  }
  GetPaymentWay() {
    return this.http.get<any>(this.controler+"GetPaymentWay")

  }
  CanRequest(){
    return this.http.get<any>(this.controler+"CanRequest")
  }
}
