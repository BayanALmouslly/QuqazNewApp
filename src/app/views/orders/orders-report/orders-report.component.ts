import { Component, OnInit } from '@angular/core';
import { OrderDontFinishFilter } from '../../../Models/order/OrderDontFinishFilter';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-orders-report',
  templateUrl: './orders-report.component.html',
  styleUrls: ['./orders-report.component.scss']
})
export class OrdersReportComponent implements OnInit {

  constructor(private service :OrderService) { }
  orderDontFinishFilter:OrderDontFinishFilter= new OrderDontFinishFilter();
  IsClientDeleviredMoney:boolean;
  ClientDoNotDeleviredMoney:boolean;
  orderPlace: any[]  = [
    { id: 3, name: "في الطريق" },
    { id: 4, name: "تم التسليم" },
    { id: 5, name: "مرتجع كلي" },
    { id: 6, name: "مرتجع جزئي" },
    { id: 7, name: "مرفوض" },
  ]
  ngOnInit(): void {
  }
  GetData(){
    this.service.OrdersDontFinished(this.orderDontFinishFilter).subscribe(res=>{
      console.log(res);
    });
  }  

}
