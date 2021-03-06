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
    })
  }
  getCountries() {
    this.settingservice.Countries().subscribe(res => {
      this.Countries = res
    })
  }
  send() {
    var dto = this.filelist.map(t => ({ Key: t.id, Value: t.countryId }));
    dto = dto.filter(c => c.Value != null)
    this.orderService.CorrectOrderCountry(dto).subscribe(res => {
      this.get();
    });
  }
}
