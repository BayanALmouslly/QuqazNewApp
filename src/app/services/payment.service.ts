import { HttpClient, HttpParams } from '@angular/common/http';
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
  Get(paging) {
    let params = new HttpParams();
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append("RowCount", paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append("Page", paging.Page);
    return this.http.get<any>(this.controler, { params: params })
  }
  GetPaymentWay() {
    return this.http.get<any>(this.controler + "GetPaymentWay")

  }
  CanRequest() {
    return this.http.get<any>(this.controler + "CanRequest")
  }
}
