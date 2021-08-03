import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { CreatePayment } from '../../../Models/order/create-payment.model';
import { Payment } from '../../../Models/order/payment.model';
import { Paging } from '../../../Models/paging';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-payment-orders',
  templateUrl: './payment-orders.component.html',
  styleUrls: ['./payment-orders.component.scss']
})
export class PaymentOrdersComponent implements OnInit {

  constructor(private paymentService: PaymentService,
    private toasterService: ToasterService,) { }
  PaymentWay: Payment[] = []
  createPayment: CreatePayment = new CreatePayment
  Payments: Payment[] = []
  paging: Paging = new Paging

  ngOnInit(): void {
    this.GetPaymentWay()
    this.GetPayment()
  }
  GetPaymentWay() {
    this.paymentService.GetPaymentWay().subscribe(res => {
      this.PaymentWay = res
    })
  }
  AddPayment() {
    if (!this.createPayment.PaymentWayId) {
      this.toasterService.pop('error', '', 'يجب اختيار طريقة الدفع');
      return
    } else
      this.createPayment.PaymentWayName = this.PaymentWay.find(p => p.id == this.createPayment.PaymentWayId).name
    this.createPayment.Date = new Date
    this.paymentService.CanRequest().subscribe(res => {
      if (res) {
        this.paymentService.Add(this.createPayment).subscribe(res => {
          this.createPayment = new CreatePayment()
          this.toasterService.pop('success', '', 'تمت الاضافة  بنجاح');
           this.GetPayment()
        })
      } else {
        this.toasterService.pop('error', '', 'لايمكن الإضافة');
      }
    })

  }
  GetPayment() {
    this.paymentService.Get(this.paging).subscribe(res => {
      console.log(res)
      this.Payments=res.dto
      this.totalItems=res.total
    })
  }
  showBoundaryLinks: boolean = true;
  showDirectionLinks: boolean = true;
  totalItems
  pageChanged(event: PageChangedEvent): void {
    this.paging.allItemsLength = this.totalItems
    this.paging.RowCount = event.itemsPerPage
    this.paging.Page = event.page 
    this.  GetPayment() 
  }
  onSearch($event) {
    // this.createPayment.PaymentWayName = $event.term
  }
}
