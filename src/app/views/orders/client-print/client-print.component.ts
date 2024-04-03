import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment.prod';
import { Print } from '../../../Models/print.model';
import { PrintService } from '../../../services/print.service';
import { Paging } from '../../../Models/paging';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-client-print',
  templateUrl: './client-print.component.html',
  styleUrls: ['./client-print.component.scss']
})
export class ClientPrintComponent implements OnInit {
  printOrders: Print = new Print();
  address = environment.Address;
  companyPhone = environment.companyPhones[0] + " - " + environment.companyPhones[1];
  count = 0;
  deliveryCostCount = 0;
  clientCalc = 0;
  reportstotal = 0;
  showPrintByPrintNumber: boolean;

  totalItems
  paging: Paging = new Paging();
  prints
  code
  number
  printNumber
  orders
  printId
  constructor(private printService: PrintService,
    public sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
    this.printOrders.orders = []
    this.printOrders.receipts = []
    // var number = localStorage.getItem('printnumber')
    // if (number) {
    //   this.printNumber = number
    //   this.Get()
    // }
    this.GetAll();
  }
  pageChanged(event: PageChangedEvent): void {
    this.paging.allItemsLength = this.totalItems
    this.paging.RowCount = event.itemsPerPage
    this.paging.Page = event.page
    this.GetAll();
  }
  GetAll() {
    this.printService.GetAll(this.code, this.number, this.paging).subscribe(data => {
      this.prints = data.data;
      this.totalItems = data.total;
    })
  }
  Get(printNumber) {
    this.count = 0
    this.deliveryCostCount = 0
    this.clientCalc = 0
    this.printService.Get(printNumber).subscribe(res => {
      if (res != null)
        this.printOrders = res
      this.printOrders.orders = this.printOrders.orders.sort((a, b) => a.code - b.code)
      this.printOrders.orders.forEach(item => {
        this.count += item.total
        this.deliveryCostCount += item.deliveCost
        this.clientCalc += item.payForClient
      })
      this.reportstotal = 0
      this.printOrders.receipts.forEach(r => {
        this.reportstotal += r.amount
      })
      // console.log(res)
    })
  }
  getOrders(printId) {
    this.printService.GetOrders(printId, this.paging).subscribe(data => {
      this.orders = data.data;
      this.totalItems = data.total;
    })
  }
  showPrintOrder(printNumber, printId) {
    this.showPrintByPrintNumber = true;
    this.printNumber = printNumber;
    this.printId = printId;
    this.Get(printNumber);
    this.getOrders(printId);
  }
  printOrder(printId) {
    this.printService.DownloadReceipt(printId).subscribe(data => {
      let blob = new Blob([data as any], { type: 'application/pdf' });
      var downloadURL = window.URL.createObjectURL(blob);
      window.open(downloadURL, '_blank');

      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = printId + ".pdf";
      link.click();
    })
  }
}
