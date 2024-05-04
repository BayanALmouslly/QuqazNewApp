import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { IdAndName } from '../../../Models/id-and-name.model';
import { OrderFiltering } from '../../../Models/order/order-filtering.model';
import { Paging } from '../../../Models/paging';
import { OrderService } from '../../../services/order/order.service';
import { SettingsService } from '../../../services/settings.service';
import { MenuItem } from 'primeng-lts/api';
import { StaticsService } from '../../../services/statics.service';
import { DialogService } from 'primeng-lts/dynamicdialog';
import { TrackOrderComponent } from '../track-order/track-order.component';
import { DatePipe } from '@angular/common';
import { Calendar } from 'primeng-lts/calendar';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss']
})
export class ShowOrdersComponent implements OnInit {
  paging: Paging = new Paging();
  orderFilter: OrderFiltering = new OrderFiltering();
  orders: any[] = [];
  Regions: IdAndName[] = [];
  Countries: IdAndName[] = [];
  MoenyPlaced: IdAndName[] = [];
  OrderPlaced: IdAndName[] = [];
  activeTab: MenuItem;
  items: MenuItem[] = [
    {
      label: 'الطلبات',
      command: (event) => {
        this.activeTab = event.item;
      },
    },
    {
      label: 'الحسابات',
      command: (event) => {
        this.activeTab = event.item;
        this.getAccountReport();
      },
    },
  ];
  totalItems: number = 0;
  showBoundaryLinks: boolean = true;
  showDirectionLinks: boolean = true;

  //////////
  rangeDate
  tempRangeDate
  start: Date;
  end: Date;
  accountReports
  @ViewChild('calendar') calendar: Calendar;
  customLocale = {
    firstDayOfWeek: 0,
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: 'اليوم',  // Custom text for the 'Today' button
    clear: 'مسح'  // Custom text for the 'Clear' button
  };
  constructor(
    private orderServies: OrderService,
    private settingservice: SettingsService,
    private router: Router,
    private staticsService: StaticsService,
    public dialogService: DialogService,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.activeTab = this.items[0];
    this.GetOrders()
    this.GetSettings()
  }
  GetOrders() {
    this.orderServies.get(this.paging, this.orderFilter).subscribe(res => {
      this.orders = res.data
      this.totalItems = res.total
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
  pageChanged(event: PageChangedEvent): void {
    this.paging.allItemsLength = this.totalItems
    this.paging.RowCount = event.itemsPerPage
    this.paging.Page = event.page
    this.GetOrders()
  }
  edit(element) {
    this.router.navigate(['/orders/edit', element.id])

  }
  downloadReceipt(orderId) {
    this.orderServies.DownloadReceipt(orderId).subscribe((res) => {
      let blob = new Blob([res], { type: 'application/pdf' });
      var downloadURL = window.URL.createObjectURL(blob);
      window.open(downloadURL, '_blank');

      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = " وصل" + ".pdf";
      link.click();
    }, (err) => {


    })
  }
  print(printNumber) {
    localStorage.setItem('printnumber', printNumber)
    this.router.navigate(['/orders/clientPrint'])
  }
  getAccountReport() {
    this.staticsService.AccountReport(this.datepipe.transform(this.start, 'yyyy-MM-dd'), this.datepipe.transform(this.end, 'yyyy-MM-dd')).subscribe(data => {
      this.accountReports = data;
    })
  }
  changeDate() {
    if (this.rangeDate) {
      this.start = this.rangeDate[0];
      this.end = this.rangeDate[1];
    } else {
      this.start = null;
      this.end = null;
    }
    this.getAccountReport();
  }
  trackOrder(id) {
    const ref = this.dialogService.open(TrackOrderComponent, {
      width: window.innerWidth > 1000 ? '40%' : window.innerWidth > 600 ? '70%' : '100%',
      showHeader: false,
      data: {
        id: id
      },
      modal: false,
      baseZIndex: 999999
    });
  }
  closeCalender() {
    this.calendar.overlayVisible = false;

  }
}
