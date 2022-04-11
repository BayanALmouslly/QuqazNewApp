import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-show-order-files',
  templateUrl: './show-order-files.component.html',
  styleUrls: ['./show-order-files.component.scss']
})
export class ShowOrderFilesComponent implements OnInit {

  constructor(private orderService: OrderService) { }
  filelist: any[] = []
  ngOnInit(): void {
    this.get()
  }
  get() {
    this.orderService.OrdersNeedToRevision().subscribe(res => {
      this.filelist = res
    })
  }
}
