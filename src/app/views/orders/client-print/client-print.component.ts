import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment.prod';
import { Print } from '../../../Models/print.model';
import { PrintService } from '../../../services/print.service';

@Component({
  selector: 'app-client-print',
  templateUrl: './client-print.component.html',
  styleUrls: ['./client-print.component.scss']
})
export class ClientPrintComponent implements OnInit {

  constructor(private printService: PrintService,
    public sanitizer: DomSanitizer,) { }
  printNumber
  printOrders: Print = new Print()
  address = environment.Address
  companyPhone = environment.companyPhones[0]+" - "+ environment.companyPhones[1]
  ngOnInit(): void {
    this.printOrders.orders = []
    this.printOrders.receipts = []
    var number = localStorage.getItem('printnumber')
    if (number) {
      this.printNumber = number
      this.Get()
    }
  }
  Get() {
    this.printService.Get(this.printNumber).subscribe(res => {
      if(res!=null)
      this.printOrders = res
       this.printOrders.orders = this.printOrders.orders.sort((a, b) => a.code - b.code)
      console.log(res)
    })
  }
  print() {
    var divToPrint = document.getElementById('contentToConvert');
    var css = '@page { size: A4 landscape }',
      style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';
    style.appendChild(document.createTextNode(css));
    divToPrint.appendChild(style);
    var newWin = window.open('', 'Print-Window');
    newWin?.document.open();
    newWin?.document.write('<html dir="rtl"><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></head><body onload="window.print()">' + divToPrint?.innerHTML + '</body></html>');
    newWin?.document.close();
    setTimeout(function () {
      newWin?.close();
      // location.reload();

    }, 10);
  }
}
