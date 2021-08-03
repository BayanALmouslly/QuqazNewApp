import { Component, OnInit } from '@angular/core';
import { Print } from '../../../Models/print.model';
import { PrintService } from '../../../services/print.service';

@Component({
  selector: 'app-client-print',
  templateUrl: './client-print.component.html',
  styleUrls: ['./client-print.component.scss']
})
export class ClientPrintComponent implements OnInit {

  constructor(private printService: PrintService) { }
  printNumber=1094
  printOrders: Print=new Print()
  address = "أربيل - شارع 40 - قرب تقاطع كوك"
  companyPhone = "07514550880 - 07700890880"
  ngOnInit(): void {
    this.printOrders.orders=[]
    this.printOrders.receipts=[]
    this.Get()
  }
  Get() {
    this.printService.Get(this.printNumber).subscribe(res => {
      this.printOrders = res
      console.log(res)
    })
  }
}
