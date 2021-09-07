import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-sendorders',
  templateUrl: './sendorders.component.html',
  styleUrls: ['./sendorders.component.scss']
})
export class SendordersComponent implements OnInit {
  @ViewChild('infoModal') public infoModal: ModalDirective;

  constructor(private orderService: OrderService,
    private toasterService: ToasterService,) { }
  orders: any[] = []
  NotFoundMessage: boolean=true
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
        this.NotFoundMessage = false
    })
  }
  canSend() {
    if (this.orders.length == 1 || this.orders.length == 2)
      this.showinfoModal()
      else
      this.Send()
  }
  Send() {
    this.orderService.Sned(this.orders.map(o => o.id)).subscribe(res => {
      this.hideinfoModal()
      this.NotFoundMessage = true
      this.toasterService.pop('success', '', 'تم  الارسال بنجاح');

    })
  }
  delete(id){
    this.orderService.Delete(id).subscribe(res => {
      this.toasterService.pop('success', '', 'تم  الحذف بنجاح');
      this.GetOrders()
    })
  }
}
