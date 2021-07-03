import { Component, OnInit } from '@angular/core';
import { IdAndName } from '../../../Models/id-and-name.model';
import { AddOrder, OrderItem } from '../../../Models/order/add-order.model';
import { OrderService } from '../../../services/order/order.service';
import { SettingsService } from '../../../services/settings.service';
import { UserLogin } from '../../auth/userlogin.model';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  constructor(private orderServies: OrderService,
    private settingservice: SettingsService) { }
  Regions: IdAndName[] = []
  Countries: IdAndName[] = []
  OrderTypes: IdAndName[] = []
  Order: AddOrder = new AddOrder
  OrderItem: OrderItem = new OrderItem
  Phone = ""
  client:UserLogin=JSON.parse(localStorage.getItem('kokazUser'))
  errorMessage:boolean=false
  ngOnInit(): void {
    this.GetSettings()
    this.Order.OrderItem = []
    this.Order.RecipientPhones = []
    if(this.client.country)
    this.Order.CountryId=this.client.country.id

  }
  GetSettings() {
    this.getRegion()
    this.getCountries()
    this.getOrderType()
  }
  getRegion() {
    this.settingservice.Regions().subscribe(res => {
      this.Regions = res
    })
  }
  getCountries() {
    this.settingservice.Countries().subscribe(res => {
      this.Countries = res
    })
  }
  getOrderType() {
    this.settingservice.orderType().subscribe(res => {
      this.OrderTypes = res
    })
  }
  AddOrderItem() {
    if (!this.OrderItem.Count || !this.OrderItem.OrderTypeId) return
    this.Order.OrderItem.push(this.OrderItem)
    this.OrderItem = new OrderItem
  }
  RemoveOrderItem(order) {
    this.Order.OrderItem = this.Order.OrderItem.filter(o => o != order)
  }
  errorPhone=false
  checkphone(){
    if (this.Phone.length < 11 || !this.Phone) {
      this.errorPhone=true
      return
    }
    else
    this.errorPhone=false
  }
  AddPhone() {
    if (!this.Phone) {
      return
    }
    this.Order.RecipientPhones.push(this.Phone)
    this.Phone = ""
  }
  RemovePhone(phone) {
    this.Order.RecipientPhones = this.Order.RecipientPhones.filter(o => o != phone)
  }
  AddOrder() {
    if (!this.Order.Code || this.Order.RecipientPhones.length == 0
      || this.Order.OrderItem.length == 0 || !this.Order.RecipientName
      || !this.Order.CountryId || !this.Order.Address) {
        this.errorMessage=true
      return
    }
    this.Order.DateTime = new Date
    this.orderServies.Add(this.Order).subscribe(res => {
      this.Order = new AddOrder
    })
  }
}
