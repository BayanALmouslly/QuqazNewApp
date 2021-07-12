import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-sendorders',
  templateUrl: './sendorders.component.html',
  styleUrls: ['./sendorders.component.scss']
})
export class SendordersComponent implements OnInit {
  @ViewChild('infoModal') public infoModal: ModalDirective;

  constructor(private orderService: OrderService) { }
  orders: any[] = []
  NotFoundMessage: boolean
  ngOnInit(): void {
    this.GetOrders()
  }
  showinfoModal(): void {
    this.infoModal.show();
  }

  hideinfoModal(): void {
    this.infoModal.hide();
  }
  GetOrders() {
    this.orderService.NonSendOrder().subscribe(res => {
      this.orders = res
      if (this.orders.length == 0)
        this.NotFoundMessage = true
        else
        this.NotFoundMessage=false
    })
  }
}
