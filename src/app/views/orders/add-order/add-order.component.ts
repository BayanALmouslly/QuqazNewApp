import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
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
    private settingservice: SettingsService,
    private toasterService: ToasterService,
    private router: Router,
    private currencyPipe : CurrencyPipe) { }
  Regions: IdAndName[] = []
  Countries: any[] = []
  OrderTypes: IdAndName[] = []
  Order: AddOrder = new AddOrder
  OrderItem: OrderItem = new OrderItem
  Phone = ""
  client: UserLogin = JSON.parse(localStorage.getItem('kokazUser'))
  errorMessage: boolean = false
  deliveryCost
  ngOnInit(): void {
    this.GetSettings()
    this.Order.OrderItem = []
    this.Order.RecipientPhones = []
    

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
      if (this.client.country) {
        this.Order.CountryId = this.client.country.id
        this.CountryChanged()
      }
    })
  }
  CountryChanged() {
    var country = this.Countries.find(c => c.id == this.Order.CountryId)
    this.deliveryCost=country.deliveryCost
    this.Regions = country.regions
  }
  getOrderType() {
    this.settingservice.orderType().subscribe(res => {
      this.OrderTypes = res
    })
  }
  AddOrderItem() {
    if (!this.OrderItem.Count) return
    if (isNaN(this.OrderItem.OrderTypeId)) {
      this.OrderItem.OrderTypeName = this.OrderItem.OrderTypeId.label;
      this.OrderItem.OrderTypeId = null;
    }
    this.OrderItem.Count = (Number)(this.OrderItem.Count)
    this.Order.OrderItem.push(this.OrderItem)
    this.OrderItem = new OrderItem
  }
  RemoveOrderItem(order) {
    this.Order.OrderItem = this.Order.OrderItem.filter(o => o != order)
  }
  errorPhone = false
  checkphone() {
    if (this.Phone.length < 11 || !this.Phone) {
      this.errorPhone = true
      return
    }
    else
      this.errorPhone = false
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
    if (this.Phone && !this.errorPhone) {
      this.Order.RecipientPhones.push(this.Phone)
      this.Phone = ""
    }
    if (!this.Order.Code || this.Order.RecipientPhones.length == 0
       || !this.Order.RecipientName || !this.Order.Cost
      || !this.Order.CountryId || !this.Order.Address || this.codeError) {
      this.errorMessage = true
      return
    }
    else
      this.errorMessage = false
      this.Order.Cost=this.Order.Cost.replace(/,/g, "")*1;

    // if (isNaN(this.Order.RegionId)) {
    //   this.Order.RegioName = this.Order.RegionId.label;
    //   this.Order.RegionId = null;
    // }

    this.Order.DateTime = new Date
    this.orderServies.Add(this.Order).subscribe(res => {
      this.toasterService.pop('success', '', 'تمت اضافة الطلب بنجاح');
      this.Order = new AddOrder
      this.Order.RecipientPhones=[]
      this.errorMessage = false
      // this.router.navigate(['/orders/sendorder'])
    }, err => {
      this.toasterService.pop('error', '', err.message);
      console.log(err)
      //this.toasterService.pop('error', '',"اسم المستخدم او كلمة المرور غير صحيحة");

    })

  }
  codeError: boolean
  checkCode() {
    this.orderServies.codeExist(this.Order.Code).subscribe(res => {
      if (res)
        this.codeError = true
      else
        this.codeError = false
    })
  }
  formattedAmount
  currency(){
    this.formattedAmount = this.currencyPipe.transform(this.Order.Cost,' ');
    this.Order.Cost = this.formattedAmount.split('.00')[0];
}
}
