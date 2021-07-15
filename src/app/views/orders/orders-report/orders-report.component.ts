import { Component, OnInit } from '@angular/core';
import { OrderplacedEnum } from '../../../Models/Enum/OrderplacedEnum';
import { OrderDontFinishFilter } from '../../../Models/order/OrderDontFinishFilter';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-orders-report',
  templateUrl: './orders-report.component.html',
  styleUrls: ['./orders-report.component.scss']
})
export class OrdersReportComponent implements OnInit {

  constructor(private service: OrderService) { }
  orderDontFinishFilter: OrderDontFinishFilter = new OrderDontFinishFilter();
  IsClientDeleviredMoney: boolean;
  ClientDoNotDeleviredMoney: boolean;
  orderPlace: any[] = [
    { id: 3, name: "في الطريق" },
    { id: 4, name: "تم التسليم" },
    { id: 5, name: "مرتجع كلي" },
    { id: 6, name: "مرتجع جزئي" },
    { id: 7, name: "مرفوض" },
  ]
  orders: any[] = []
  ngOnInit(): void {
    // this.GetData()
  }
  GetData() {
    this.orderDontFinishFilter.ClientDoNotDeleviredMoney = this.ClientDoNotDeleviredMoney
    this.orderDontFinishFilter.IsClientDeleviredMoney = this.IsClientDeleviredMoney
    this.orderDontFinishFilter.OrderPlacedId = this.orderPlace.filter(o => o.checked == true).map(c => c.id);
    this.service.OrdersDontFinished(this.orderDontFinishFilter).subscribe(res => {
      this.orders = res as []
      this.sumCost();
    });
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
  Report() {
    if(this.orderPlace.filter(o=>(o.id==OrderplacedEnum.Unacceptable||
      o.id==OrderplacedEnum.CompletelyReturned)&&o.checked==true).length>0)return
    this.service.UnPaidRecipt().subscribe(res => {
      this.reports = res
    })
  }
}
