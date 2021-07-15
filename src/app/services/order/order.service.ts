import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { OrderFiltering } from '../../Models/order/order-filtering.model';
import { OrderDontFinishFilter } from '../../Models/order/OrderDontFinishFilter';
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
  codeExist(code) {
    // let formData = new HttpParams();
    // formData.append("code", code);
    return this.http.get(this.controler + "codeExist?code=" + code)
  }
  NonSendOrder() {
    return this.http.get<any>(this.controler + "NonSendOrder")
  }
  Sned(ids) {
    return this.http.post(this.controler + "Sned", ids)
  }
  OrdersDontFinished(orderDontFinishFilter: OrderDontFinishFilter) {
    let params = new HttpParams();
   params=params.append("IsClientDeleviredMoney",orderDontFinishFilter.IsClientDeleviredMoney);
   params=params.append("ClientDoNotDeleviredMoney",orderDontFinishFilter.ClientDoNotDeleviredMoney);
   let index = 0
   orderDontFinishFilter.OrderPlacedId.forEach(element => {
        var key = "OrderPlacedId[" + index + "]"
        params = params.append(key, element);
        index++;
      });
    return this.http.get(this.controler+"OrdersDontFinished",{params:params})
  }
  UnPaidRecipt(){
    return this.http.get<any>(this.controler+"UnPaidRecipt")

  }
}
