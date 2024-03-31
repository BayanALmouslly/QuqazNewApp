import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { PrimeIcons } from 'primeng-lts/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng-lts/dynamicdialog';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {

  constructor(private orderService: OrderService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }
  orderId: string;
  trakOrder
  ngOnInit(): void {

    this.orderId = this.config.data?.id;
    this.trackOrdrer();
  }
  trackOrdrer() {
    this.orderService.trackOrder(this.orderId).subscribe(res => {
      this.trakOrder = res;
    })
  }
  close() {
    this.ref.close();
  }
}
