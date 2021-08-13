import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { IdAndName } from '../../../Models/id-and-name.model';
import { OrderFiltering } from '../../../Models/order/order-filtering.model';
import { Paging } from '../../../Models/paging';
import { OrderService } from '../../../services/order/order.service';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss']
})
export class ShowOrdersComponent implements OnInit {

  constructor(private orderServies: OrderService,
    private settingservice: SettingsService,
    private router:Router) { }
  paging: Paging = new Paging
  orderFilter: OrderFiltering = new OrderFiltering
  orders: any[] = []
  Regions: IdAndName[] = []
  Countries: IdAndName[] = []
  MoenyPlaced: IdAndName[] = []
  OrderPlaced: IdAndName[] = []

  ngOnInit(): void {
    this.GetOrders()
    this.GetSettings()
  }
  totalItems: number = 0;
  GetOrders() {
    this.orderServies.get(this.paging, this.orderFilter).subscribe(res => {
      this.orders = res.data
      this.totalItems = res.total
      // console.log(res)
    })
  }
  GetSettings() {
    this.getRegion()
    this.getOrderPlaces()
    this.getCountries()
    this.getMonyplaces()
  }
  getRegion() {
    this.settingservice.Regions().subscribe(res => {
      this.Regions = res
    })
  }
  getCountries() {
    this.settingservice.Countries().subscribe(res => {
      this.Countries = res
    })
  }
  getMonyplaces() {
    this.settingservice.MoenyPlaced().subscribe(res => {
      this.MoenyPlaced = res
    })
  }
  getOrderPlaces() {
    this.settingservice.OrderPlaced().subscribe(res => {
      this.OrderPlaced = res
    })
  }
  showBoundaryLinks: boolean = true;
  showDirectionLinks: boolean = true;
  pageChanged(event: PageChangedEvent): void {
    this.paging.allItemsLength = this.totalItems
    this.paging.RowCount = event.itemsPerPage
    this.paging.Page = event.page 
    this.GetOrders()
  }
  edit(element){
    this.router.navigate(['/orders/edit',element.id])

  }
}
