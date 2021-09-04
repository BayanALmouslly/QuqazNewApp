import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { IdAndName } from '../../../Models/id-and-name.model';
import { AddOrder, OrderItem } from '../../../Models/order/add-order.model';
import { UpdateOrder } from '../../../Models/order/Update-order';
import { OrderService } from '../../../services/order/order.service';
import { SettingsService } from '../../../services/settings.service';
import { UserLogin } from '../../auth/userlogin.model';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.scss']
})
export class ShowOrderComponent implements OnInit {

  constructor(private orderServies: OrderService,
    private settingservice: SettingsService,
    private toasterService: ToasterService,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private getroute: ActivatedRoute,) { }
  Regions: IdAndName[] = []
  Countries: any[] = []
  OrderTypes: IdAndName[] = []
  Order: UpdateOrder = new UpdateOrder;
  OrderItem: OrderItem = new OrderItem
  Phone = ""
  // client: UserLogin = JSON.parse(localStorage.getItem('kokazClient'))
  errorMessage: boolean = false
  deliveryCost
  ngOnInit(): void {
    this.GetSettings()
    this.Order.OrderItem = []
    this.Order.RecipientPhones = []
    localStorage.removeItem('printnumber')

  }
  id: number;
  CanEdit: boolean
  printOrder
  GetOrder() {
    this.getroute.params.subscribe(par => {
      this.id = par['id'] as number;
      this.Order.id = Number(this.id);
    });
    this.orderServies.getById(this.id).subscribe(res => {
      // console.log(res)
      this.printOrder=res
      this.printOrder.recipientPhones =   this.printOrder.recipientPhones.split(',')
      this.Order.clientPrint = res.clientPrint
      this.Order.Address = res.address
      this.Order.ClientNote = res.clientNote
      this.Order.Code = res.code
      this.tempCode = this.Order.Code
      this.Order.Cost = res.cost
      this.currency()
      this.deliveryCost=res.deliveryCost
      this.Order.CountryId = res.country.id
      this.Order.DateTime = res.date
      this.Order.OrderItem = res.orderItems
      this.Order.OrderItem.forEach(item => {
        item.OrderTypeName = item.orderTpye.name
        item.OrderTypeId = item.orderTpye.id
        item.Count = item.count
        this.OrderTypes = this.OrderTypes.filter(o => o.name != item.orderTpye.name)
      })
      this.Order.RecipientName = res.recipientName
      this.Order.RecipientPhones =  this.printOrder.recipientPhones
      this.Order.monePlaced = res.monePlaced
      this.Order.orderplaced = res.orderplaced
      this.Order.isSend = res.isSend
      if (this.Order.isSend == false)
        this.CanEdit = false
      else
        this.CanEdit = true

    })
  }
  GetSettings() {
    this.getRegion()
    this.getCountries()
    this.getOrderType()
    this.GetOrder()

  }
  getRegion() {
    this.settingservice.Regions().subscribe(res => {
      this.Regions = res
    })
  }
  getCountries() {
    this.settingservice.Countries().subscribe(res => {
      this.Countries = res
      // if (this.client.country) {
      //   this.Order.CountryId = this.client.country.id
      // }
      // this.CountryChanged()
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
  changeOrderType() {
    if (this.Order.OrderItem.length == 0)
      this.OrderTypes = this.tempOrderTypes
    else {
      console.log(this.Order.OrderItem)
      this.Order.OrderItem.forEach(item => {
        this.OrderTypes = this.tempOrderTypes.filter(o => o.name != item.OrderTypeName)
      })
    }
  }
  onSearch($event) {
    this.OrderItem.OrderTypeName = $event.term
  }
  AddOrderItem() {
    if (!this.OrderItem.Count || !this.OrderItem.OrderTypeName) return
    // console.log(this.OrderItem.OrderTypeName)
    // if (this.OrderItem.OrderTypeName.label)
    //   var orderTypeName = this.OrderItem.OrderTypeName.label;
    // else
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
    // console.log(order)
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
  EditOrder() {
    this.buttonDisabled = true
    if (this.Phone && !this.errorPhone) {
      this.Order.RecipientPhones.push(this.Phone)
      this.Phone = ""
    }
    if (!this.Order.Code || this.Order.RecipientPhones.length == 0
      || !this.Order.RecipientName || !this.Order.Cost
      || !this.Order.CountryId || !this.Order.Address || this.codeError || this.errorPhone) {
      this.errorMessage = true
      this.buttonDisabled = false
      return
    }
    else
      this.errorMessage = false
    this.Order.Cost = this.Order.Cost.replace(/,/g, "") * 1;

    // if (isNaN(this.Order.RegionId)) {
    //   this.Order.RegioName = this.Order.RegionId.label;
    //   this.Order.RegionId = null;
    // }
    this.AddOrderItem()
    this.Order.Date = new Date
    console.log(this.Order);
    this.orderServies.edit(this.Order).subscribe(res => {
      this.toasterService.pop('success', '', 'تم تعديل الطلب بنجاح');
      this.buttonDisabled = false

      // this.Order = new AddOrder
      // this.Order.RecipientPhones = []
      this.errorMessage = false
      // this.router.navigate(['/orders/sendorder'])
    }, err => {
      this.toasterService.pop('error', '', 'يجب التأكد من ادخال جميع الحقول بشكل صحيح');
      //this.toasterService.pop('error', '',"اسم المستخدم او كلمة المرور غير صحيحة");
      this.buttonDisabled = false

    })

  }
  codeError: boolean
  tempCode
  checkCode() {
    if (this.Order.Code == this.tempCode) {
      this.codeError = false
      return
    }
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
  print(printNumber) {
    localStorage.setItem('printnumber', printNumber)
    this.router.navigate(['/orders/clientPrint'])
  }
  printorder() {
    var divToPrint = document.getElementById('contentToConvert');
    var css = '@page { size: A4 landscape }',
      style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';
    style.appendChild(document.createTextNode(css));
    divToPrint.appendChild(style);
    var newWin = window.open('', 'Print-Window');
    newWin?.document.open();
    newWin?.document.write('<html dir="rtl"><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></head><body onload="window.print()">' + divToPrint?.innerHTML + '</body></html>');
    newWin?.document.close();
    setTimeout(function () {
      newWin?.close();
      // location.reload();

    }, 1000);
  }
}
