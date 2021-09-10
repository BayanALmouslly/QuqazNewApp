import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { OrderplacedEnum } from '../../../Models/Enum/OrderplacedEnum';
import { OrderDontFinishFilter } from '../../../Models/order/OrderDontFinishFilter';
import { OrderService } from '../../../services/order/order.service';
import { UserLogin } from '../../auth/userlogin.model';

@Component({
  selector: 'app-orders-report',
  templateUrl: './orders-report.component.html',
  styleUrls: ['./orders-report.component.scss']
})
export class OrdersReportComponent implements OnInit {

  constructor(private service: OrderService,
    public sanitizer: DomSanitizer,) { }
  orderDontFinishFilter: OrderDontFinishFilter = new OrderDontFinishFilter();
  IsClientDeleviredMoney: boolean=false;
  ClientDoNotDeleviredMoney: boolean=false;
  orderPlace: any[] = [
    { id: 3, name: "في الطريق" },
    { id: 4, name: "تم التسليم" },
    { id: 5, name: "مرتجع كلي" },
    { id: 6, name: "مرتجع جزئي" },
    { id: 7, name: "مرفوض" },
  ]
  client
  dateOfPrint = new Date()
  userName: any = JSON.parse(localStorage.getItem('kokazClient')) as UserLogin
  printnumber
  address = environment.Address
  companyPhone = environment.companyPhones[0]+" - "+ environment.companyPhones[1]
  orders: any[] = []
  ngOnInit(): void {
    // this.GetData()
  }
  GetData() {
    this.orderDontFinishFilter.ClientDoNotDeleviredMoney = this.ClientDoNotDeleviredMoney
    this.orderDontFinishFilter.IsClientDeleviredMoney = this.IsClientDeleviredMoney
    this.orderDontFinishFilter.OrderPlacedId = this.orderPlace.filter(o => o.checked == true).map(c => c.id);
    if(this.orderDontFinishFilter.OrderPlacedId.length!=0&&( this.orderDontFinishFilter.ClientDoNotDeleviredMoney ||
      this.orderDontFinishFilter.IsClientDeleviredMoney))
    this.service.OrdersDontFinished(this.orderDontFinishFilter).subscribe(res => {
      this.orders = res as []
      this.orders = this.orders.sort((a, b) => a.code - b.code)
      // console.log(this.orders)
      this.Report()
      this.sumCost();
    });
    else return
  }
  clientCalc = 0
  payForCleint(element): number {

    if (!element.isClientDiliverdMoney) {
      if (element.orderplaced.id == 5)
        return 0;
      return element.cost - element.deliveryCost;

    }
    else {

      //مرتجع كلي
      if (element.orderplaced.id == 5)
        return element.deliveryCost - element.oldCost;
      //مرفوض
      else if (element.orderplaced.id == 7)
        return (-element.oldCost);
      //مرتجع جزئي
      else if (element.orderplaced.id == 6)
        return element.cost - element.oldCost;
    }

  }
  deliveryCostCount=0
  count=0
  reports: any[] = []

  sumCost() {
    this.count = 0
    this.deliveryCostCount = 0
    this.clientCalc = 0
    if (this.orders)
      this.orders.forEach(o => {
        this.count += o.cost
        this.deliveryCostCount += o.deliveryCost
        if (!o.isClientDiliverdMoney) {
          if (o.orderplaced.id == OrderplacedEnum.CompletelyReturned) {
            this.clientCalc += 0
            return 0;
          }
          else if (o.orderplaced.id == OrderplacedEnum.Unacceptable) {
            this.clientCalc += o.deliveryCost
            return o.deliveryCost;
          }
          this.clientCalc += o.cost - o.deliveryCost
          return o.cost - o.deliveryCost;

        }
        else {
          //مرتجع كلي
          if (o.orderplaced.id == OrderplacedEnum.CompletelyReturned) {
            this.clientCalc += o.deliveryCost - o.cost
            return o.deliveryCost - o.cost;
          }
          //مرفوض
          else if (o.orderplaced.id == OrderplacedEnum.Unacceptable) {
            this.clientCalc += (-o.cost)
            return (-o.cost);
          }
          //مرتجع جزئي
          else if (o.orderplaced.id == OrderplacedEnum.PartialReturned) {
            this.clientCalc += o.cost - o.oldCost;
            return o.cost - o.oldCost;
          }
        }
      })

    return this.count
  }
  temporderPlace
  reportstotal=0

  Report() {
    this.temporderPlace=this.orderPlace.filter(op => this.orders.filter(o=>o.orderplaced.id==op.id).length>0)
    if (this.temporderPlace.filter(o => o.id == OrderplacedEnum.Way || o.id == OrderplacedEnum.PartialReturned
      || o.id == OrderplacedEnum.Delivered).length > 0) {
        this.service.UnPaidRecipt().subscribe(res => {
          this.reports = res
          this.reports.forEach(r => {
            this.reportstotal += r.amount
          })
          // console.log(res)
        })
      }else return
   
  }
  print() {
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
