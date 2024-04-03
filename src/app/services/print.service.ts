import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(public http: HttpClient) { }
  controler = environment.baseUrl + "api/Print/"
  Get(printNumber) {
    return this.http.get<any>(this.controler + printNumber)
  }
  GetAll(code, number, paging) {
    let params = new HttpParams();
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append("RowCount", paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append("Page", paging.Page);
    if (code != undefined || code != null)
      params = params.append("code", code);
    if (number != undefined || number != null)
      params = params.append("number", number);
    return this.http.get<any>(this.controler, { params: params })
  }
  GetOrders(printId, paging) {
    let params = new HttpParams();
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append("RowCount", paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append("Page", paging.Page);
    return this.http.get<any>(this.controler + 'Orders/' + printId, { params: params })
  }
  DownloadReceipt(printId) {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get<any>(this.controler + 'DownloadReceipt?printId=' + printId, httpOptions)
  }
}
