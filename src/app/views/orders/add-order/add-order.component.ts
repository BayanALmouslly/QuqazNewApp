import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { IdAndName } from '../../../Models/id-and-name.model';
import { AddOrder, OrderItem, orderTpye } from '../../../Models/order/add-order.model';
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
    private currencyPipe: CurrencyPipe) { }
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
    this.deliveryCost = country.deliveryCost
    this.Regions = country.regions
  }
  getOrderType() {
    this.settingservice.orderType().subscribe(res => {
      this.OrderTypes = res
    })
  }
  AddOrderItem() {
    if (!this.OrderItem.Count) return
    var find = this.OrderTypes.find(o => o.name == this.OrderItem.OrderTypeName)
    if (!find) {
      this.OrderItem.OrderTypeId = null
      //  this.OrderTypes.push({ id: this.OrderItem.OrderTypeId, name: this.OrderItem.OrderTypeName.label })
    } else {
      this.OrderItem.OrderTypeId = find.id
    }
    this.OrderTypes=this.OrderTypes.filter(o=>o.name!=this.OrderItem.OrderTypeName )
    this.OrderItem.Count = (Number)(this.OrderItem.Count)
    this.Order.OrderItem.push(this.OrderItem)
    this.OrderItem = new OrderItem
  }
  RemoveOrderItem(order) {
    this.Order.OrderItem = this.Order.OrderItem.filter(o => o != order)
  }
  errorPhone = false
  errorRepeatPhone = false

  checkphone(phone, index?) {
    console.log(index)
    if (phone.length < 11 || !phone) {
      this.errorPhone = true
    }
    else {
      this.errorPhone = false
    }
    if (index) {
      if (this.Order.RecipientPhones.filter(p => p == phone && this.Order.RecipientPhones.indexOf(p) != index).length > 0) {
        this.errorRepeatPhone = true
      }
      else {
        this.errorRepeatPhone = false
      }
    }
    else if (index == undefined) {
      if (this.Order.RecipientPhones.filter(p => p == phone).length > 0) {
        this.errorRepeatPhone = true
      } else {
        this.errorRepeatPhone = false
      }
    }

  }
  AddPhone() {
    if (!this.Phone || this.errorPhone || this.errorRepeatPhone) {
      return
    }
    this.Order.RecipientPhones.push(this.Phone)
    this.Phone = ""
  }
  RemovePhone(phone) {
    this.Order.RecipientPhones = this.Order.RecipientPhones.filter(o => o != phone)
  }
  onTrackBy(index) {
    return index;
  }
  AddOrder() {
    if (this.Phone && !this.errorPhone) {
      this.Order.RecipientPhones.push(this.Phone)
      this.Phone = ""
    }
    if (!this.Order.Code || this.Order.RecipientPhones.length == 0
      || !this.Order.RecipientName || !this.Order.Cost
      || !this.Order.CountryId || !this.Order.Address || this.codeError || this.errorPhone) {
      this.errorMessage = true
      return
    }
    else
      this.errorMessage = false
    this.Order.Cost = this.Order.Cost.replace(/,/g, "") * 1;

    // if (isNaN(this.Order.RegionId)) {
    //   this.Order.RegioName = this.Order.RegionId.label;
    //   this.Order.RegionId = null;
    // }

    this.Order.DateTime = new Date
    this.orderServies.Add(this.Order).subscribe(res => {
      this.toasterService.pop('success', '', 'تمت اضافة الطلب بنجاح');
      this.Order = new AddOrder
      this.Order.RecipientPhones = []
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
  currency() {
    this.formattedAmount = this.currencyPipe.transform(this.Order.Cost, ' ');
    this.Order.Cost = this.formattedAmount.split('.00')[0];
  }
}
