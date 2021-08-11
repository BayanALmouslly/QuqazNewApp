import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserLogin } from '../../auth/userlogin.model';

@Component({
  selector: 'app-print-order',
  templateUrl: './print-order.component.html',
  styleUrls: ['./print-order.component.scss']
})
export class PrintOrderComponent implements OnInit {
  constructor(public sanitizer: DomSanitizer,) { }
  @Input() order
  orderTypes: string[] = []
  counts: number[] = []
  client: UserLogin = JSON.parse(localStorage.getItem('kokazClient'))
  ngOnInit(): void {
    // this.order.recipientPhones = this.order.recipientPhones.split(',')
    if(  this.order&&this.order.orderItems&&this.order.orderItems.length!=0){
      this.orderTypes = this.order.orderItems.map(o => o.orderTpye.name)
      this.counts = this.order.orderItems.map(o => o.count)
    }
  }

}
