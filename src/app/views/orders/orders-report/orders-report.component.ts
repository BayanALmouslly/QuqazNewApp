import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { retry, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { OrderplacedEnum } from '../../../Models/Enum/OrderplacedEnum';
import { OrderDontFinishFilter } from '../../../Models/order/OrderDontFinishFilter';
import { OrderService } from '../../../services/order/order.service';
import { UserLogin } from '../../auth/userlogin.model';
import { Paging } from '../../../Models/paging';
import { BranchDetailsService } from '../../../services/branch-details.service';

@Component({
  selector: 'app-orders-report',
  templateUrl: './orders-report.component.html',
  styleUrls: ['./orders-report.component.scss']
})
export class OrdersReportComponent implements OnInit {

  constructor(private service: OrderService,
    public sanitizer: DomSanitizer,
    private activeBranchDetais: BranchDetailsService) { }
  orderDontFinishFilter: OrderDontFinishFilter = new OrderDontFinishFilter();
  IsClientDeleviredMoney: boolean = false;
  ClientDoNotDeleviredMoney: boolean = false;
  orderPlace: any[] = [
    { id: 3, name: "في الطريق" },
    { id: 4, name: "تم التسليم" },
    { id: 5, name: "مرتجع كلي" },
    { id: 6, name: "مرتجع جزئي" },
    { id: 7, name: "مرفوض" },
  ]
  client
  dateOfPrint = new Date()
  userName: any = JSON.parse(localStorage.getItem('kokazClient')) as UserLogin
  printnumber
  address;
  companyPhone;
  orders: any[] = [];
  paging: Paging = new Paging
  totalItems: number
  ngOnInit(): void {
    this.paging.RowCount = 10;
    this.activeBranchDetais.getBranch().pipe(
      tap(data => {
        this.address = data.address;
        this.companyPhone = data.phoneNumber;
      })).subscribe();
  }
  GetData() {
    this.orderDontFinishFilter.ClientDoNotDeleviredMoney = this.ClientDoNotDeleviredMoney
    this.orderDontFinishFilter.IsClientDeleviredMoney = this.IsClientDeleviredMoney
    if (this.orderDontFinishFilter.OrderPlacedId?.length != 0 && (this.orderDontFinishFilter.ClientDoNotDeleviredMoney ||
      this.orderDontFinishFilter.IsClientDeleviredMoney))
      this.service.OrdersDontFinished(this.orderDontFinishFilter, this.paging).subscribe(res => {
        this.orders = res.data as [];
        this.totalItems = res.total
        if (this.orders.length > 0) {
          this.orders = this.orders.sort((a, b) => a.code - b.code)
          this.Report()
          this.sumCost();
        }
      });
    else return
  }
  showBoundaryLinks: boolean = true;
  showDirectionLinks: boolean = true;
  pageChanged(event): void {
    this.paging.allItemsLength = this.totalItems
    this.paging.RowCount = event.rows
    this.paging.Page = event.page
    this.GetData()
  }
  clientCalc = 0
  deliveryCostCount = 0
  count = 0
  reports: any[] = []

  sumCost() {
    this.count = 0;
    this.deliveryCostCount = 0;
    this.clientCalc = 0;
    if (this.orders)
      this.orders.forEach(o => {
        this.count += o.cost
        this.deliveryCostCount += o.deliveryCost
        this.clientCalc += o.payForClient
      })

    return this.count
  }
  temporderPlace
  reportstotal = 0

  Report() {
    this.reportstotal = 0
    this.temporderPlace = this.orderPlace.filter(op => this.orders.filter(o => o.orderplaced.id == op.id).length > 0)
    if (this.temporderPlace.filter(o => o.id == OrderplacedEnum.Way || o.id == OrderplacedEnum.PartialReturned
      || o.id == OrderplacedEnum.Delivered).length > 0) {
      this.service.UnPaidRecipt().subscribe(res => {
        this.reports = res
        this.reports.forEach(r => {
          this.reportstotal += r.amount
        })
      })
    } else return

  }
  print() {
    this.service.DownloadOrdersDontFinished(this.orderDontFinishFilter).subscribe((res) => {
      let blob = new Blob([res as any], { type: 'application/pdf' });
      var downloadURL = window.URL.createObjectURL(blob);
      window.open(downloadURL, '_blank');

      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = " وصل" + ".pdf";
      link.click();
    })
    // var divToPrint = document.getElementById('contentToConvert');
    // var css = '@page { size: A4 landscape }',
    //   style = document.createElement('style');
    // style.type = 'text/css';
    // style.media = 'print';
    // style.appendChild(document.createTextNode(css));
    // divToPrint.appendChild(style);
    // var newWin = window.open('', 'Print-Window');
    // newWin?.document.open();
    // newWin?.document.write('<html dir="rtl"><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></head><body onload="window.print()">' + divToPrint?.innerHTML + '</body></html>');
    // newWin?.document.close();
    // setTimeout(function () {
    //   newWin?.close();
    // }, 1000);
  }
}
