import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-show-order-files',
  templateUrl: './show-order-files.component.html',
  styleUrls: ['./show-order-files.component.scss']
})
export class ShowOrderFilesComponent implements OnInit {

  constructor(private orderService: OrderService,
    private settingservice: SettingsService,) { }
  filelist: any[] = []
  Countries: any[] = []

  ngOnInit(): void {
    this.get()
    this.getCountries()
  }
  get() {
    this.orderService.OrdersNeedToRevision().subscribe(res => {
      this.filelist = res
      console.log(res)
    })
  }
  getCountries() {
    this.settingservice.Countries().subscribe(res => {
      this.Countries = res
    })
  }
  send(){

  }
}
