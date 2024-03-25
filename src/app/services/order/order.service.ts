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
  NonSendOrder(paging) {
    let params = new HttpParams();
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append("RowCount", paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append("Page", paging.Page);
    return this.http.get<any>(this.controler + "NonSendOrder", { params: params })
  }
  Send(ids) {
    return this.http.post(this.controler + "Send", { ids: ids })
  }
  OrdersDontFinished(orderDontFinishFilter: OrderDontFinishFilter, paging) {
    return this.http.post<any>(this.controler + `OrdersDontFinished?Page=${paging.Page}&RowCount=${paging.RowCount}`, orderDontFinishFilter)
  }
  UnPaidRecipt() {
    return this.http.get<any>(this.controler + "UnPaidRecipt")

  }
  getById(id) {
    return this.http.get<any>(this.controler + id)
  }
  edit(order) {
    return this.http.put(this.controler, order)
  }
  NewNotfiaction() {
    return this.http.get<any>(this.controler + "NewNotfiaction")
  }
  Notifcation() {
    // let params = new HttpParams();
    // if (paging.RowCount != undefined || paging.RowCount != null)
    //   params = params.append("RowCount", paging.RowCount);
    // if (paging.Page != undefined || paging.Page != null)
    //   params = params.append("Page", paging.Page);
    return this.http.get<any>(this.controler + "Notifcation")
  }
  SeeNotifaction(ids) {
    // let params = new FormData();
    // params.append('ids', ids);
    return this.http.put(this.controler + "SeeNotifactions", ids)
  }
  Delete(id) {
    return this.http.delete(this.controler + id)
  }
  UploadExcel(file, date) {
    let params = new FormData();
    params.append("file", file);
    params.append("dateTime", date);
    return this.http.post(this.controler + "UploadExcel", params)
  }
  OrdersNeedToRevision() {
    return this.http.get<any>(this.controler + "OrdersNeedToRevision")
  }
  CorrectOrderCountry(orders) {
    return this.http.put(this.controler + "CorrectOrderCountry", orders)
  }
  DownloadReceipt(orderId) {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get<any>(this.controler + "DownloadReceipt/" + orderId, httpOptions);
  }
  DownloadOrdersDontFinished(parametars) {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.post<any>(this.controler + "DownloadOrdersDontFinished", parametars, httpOptions);
  }
}

