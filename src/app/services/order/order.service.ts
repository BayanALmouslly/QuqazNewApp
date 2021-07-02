import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { OrderFiltering } from '../../Models/order/order-filtering.model';
import { Paging } from '../../Models/paging';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public http: HttpClient) { }
  controler = environment.baseUrl + "api/COrder/"
  get(paging: Paging, filter: OrderFiltering) {
    let params = new HttpParams();
    if (filter.Code != undefined || filter.Code != null)
      params = params.append("Code", filter.Code);
    if (filter.Phone != undefined || filter.Phone != null)
      params = params.append("Phone", filter.Phone);
    if (filter.CountryId != undefined || filter.CountryId != null)
      params = params.append("CountryId", filter.CountryId);
    if (filter.RegionId != undefined || filter.RegionId != null)
      params = params.append("RegionId", filter.RegionId);
    if (filter.RecipientName != undefined || filter.RecipientName != null)
      params = params.append("RecipientName", filter.RecipientName);
    if (filter.MonePlacedId != undefined || filter.MonePlacedId != null)
      params = params.append("MonePlacedId", filter.MonePlacedId);
    if (filter.OrderplacedId != undefined || filter.OrderplacedId != null)
      params = params.append("OrderplacedId", filter.OrderplacedId);
    if (filter.IsClientDiliverdMoney != undefined || filter.IsClientDiliverdMoney != null)
      params = params.append("IsClientDiliverdMoney", filter.IsClientDiliverdMoney);
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append("RowCount", paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append("Page", paging.Page);
    return this.http.get<any>(this.controler, { params: params })
  }
  Add(order) {
    return this.http.post(this.controler, order)
  }
  codeExist(code){
    
  }
}
