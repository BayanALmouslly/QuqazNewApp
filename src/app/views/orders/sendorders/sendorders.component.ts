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
  @ViewChild('DeleteModal') public DeleteModal: ModalDirective;

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
  showDeleteModal(): void {
    this.DeleteModal.show();
  }

  hideDeleteModal(): void {
    this.DeleteModal.hide();
  }
  GetOrders() {
    this.orderService.NonSendOrder().subscribe(res => {
      this.orders = res
      // console.log(res)
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
  deleteid
  canDelete(id){
    this.showDeleteModal()
    this.deleteid=id
  }
  delete(){
    this.orderService.Delete(this.deleteid).subscribe(res => {
      this.toasterService.pop('success', '', 'تم  الحذف بنجاح');
      this.GetOrders()
      this.hideDeleteModal()
    })
  }
}
