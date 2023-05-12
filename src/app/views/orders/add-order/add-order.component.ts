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
    private currencyPipe: CurrencyPipe) { }
  Regions: IdAndName[] = []
  Countries: any[] = []
  OrderTypes: IdAndName[] = []
  Order: AddOrder = new AddOrder
  OrderItem: OrderItem = new OrderItem
  Phone = ""
  client: UserLogin = JSON.parse(localStorage.getItem('kokazClient'))
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
  tempOrderTypes
  getOrderType() {
    this.settingservice.orderType().subscribe(res => {
      this.OrderTypes = res
      this.tempOrderTypes = res
    })
  }
  onSearch($event) {
    this.OrderItem.OrderTypeName = $event.term
  }
  AddOrderItem() {
    if (!this.OrderItem.Count || !this.OrderItem.OrderTypeName) return
    var orderTypeName = this.OrderItem.OrderTypeName;
    var find = this.OrderTypes.find(o => o.name == orderTypeName)
    if (!find) {
      {
        this.OrderItem.OrderTypeId = null

      }
    } else {
      this.OrderItem.OrderTypeId = find.id
    }
    this.OrderTypes = this.OrderTypes.filter(o => o.name != this.OrderItem.OrderTypeName)
    this.OrderItem.Count = (Number)(this.OrderItem.Count)
    this.OrderItem.OrderTypeName = orderTypeName;
    this.Order.OrderItem.push(this.OrderItem)
    this.OrderItem = new OrderItem
  }
  RemoveOrderItem(order) {
    var find = this.OrderTypes.find(o => o.name == order.OrderTypeName)
    if (!find)
      this.OrderTypes.push({ name: order.OrderTypeName, id: order.OrderTypeId })
    this.Order.OrderItem = this.Order.OrderItem.filter(o => o != order)
    this.Order.OrderItem.forEach(item => {
      this.OrderTypes = this.OrderTypes.filter(o => o.name != item.OrderTypeName)
    })
  }
  errorPhone = false
  errorRepeatPhone = false

  checkphone(phone, index?) {
    if (phone.length < 11 && phone) {
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
  buttonDisabled = false
  errors: string = "";
  AddOrder() {
    this.buttonDisabled = true
    if (this.Phone && !this.errorPhone) {
      this.Order.RecipientPhones.push(this.Phone)
      this.Phone = ""
    }
    if (!this.Order.Code || this.Order.RecipientPhones.length == 0
      || !this.Order.Cost
      || !this.Order.CountryId || !this.Order.Address || this.codeError || this.errorPhone) {
      this.errorMessage = true
      this.buttonDisabled = false
      return
    }
    else
      this.errorMessage = false
    this.Order.Cost = this.Order.Cost.replace(/,/g, "") * 1;
    this.AddOrderItem()
    this.Order.Date = new Date
    this.orderServies.Add(this.Order).subscribe(res => {
      this.buttonDisabled = false
      this.toasterService.pop('success', '', 'تمت اضافة الطلب بنجاح');
      this.Order = new AddOrder
      this.Order.RecipientPhones = []
      this.Order.OrderItem = []
      this.errorMessage = false
      this.GetSettings()
    }, err => {
      this.buttonDisabled = false;
      this.currency();
      if (err?.error?.messages) {
        err.error.messages.forEach(error => {
          this.errors += error + " , ";
        });
        this.toasterService.pop('error', '', this.errors);
      }else
      this.toasterService.pop('error', '','يجب التأكد من الحقول المدخلة');
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
  keyPressNumbers(event, cost) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 45 && cost == 0) {
      return true
    }
    else
      // Only Numbers 0-9
      if ((charCode < 48 || charCode > 57)) {
        event.preventDefault();
        return false;
      } else {
        return true;
      }
  }
}
