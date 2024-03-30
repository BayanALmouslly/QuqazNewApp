import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { OrderService } from '../../../services/order/order.service';
import { Paging } from '../../../Models/paging';

@Component({
  selector: 'app-sendorders',
  templateUrl: './sendorders.component.html',
  styleUrls: ['./sendorders.component.scss']
})
export class SendordersComponent implements OnInit {
  @ViewChild('DeleteModal') public DeleteModal: ModalDirective;

  constructor(private orderService: OrderService,
    private toasterService: ToasterService,) { }
  orders: any[] = []
  NotFoundMessage: boolean = true;
  totalItems: number;
  showBoundaryLinks: boolean = true
  showDirectionLinks: boolean = true;
  paging: Paging = new Paging();
  ngOnInit(): void {
    this.GetOrders()
  }
  showDeleteModal(): void {
    this.DeleteModal.show();
  }

  hideDeleteModal(): void {
    this.DeleteModal.hide();
  }
  GetOrders() {
    this.orderService.NonSendOrder(this.paging).subscribe(res => {
      this.orders = res.data;
      this.totalItems = res.total;
      if (this.orders.length == 0)
        this.NotFoundMessage = true
      else
        this.NotFoundMessage = false
    })
  }
  pageChanged(event): void {
    this.paging.allItemsLength = this.totalItems
    this.paging.RowCount = event.itemsPerPage
    this.paging.Page = event.page
    this.GetOrders()
  }
  Send() {
    this.orderService.Send(this.orders.map(o => o.id)).subscribe(res => {
      this.NotFoundMessage = true
      this.toasterService.pop('success', '', 'تم  الارسال بنجاح');
      this.GetOrders()

    })
  }
  deleteid
  canDelete(id) {
    this.showDeleteModal()
    this.deleteid = id
  }
  delete() {
    this.orderService.Delete(this.deleteid).subscribe(res => {
      this.toasterService.pop('success', '', 'تم  الحذف بنجاح');
      this.GetOrders()
      this.hideDeleteModal()
    })
  }
}
