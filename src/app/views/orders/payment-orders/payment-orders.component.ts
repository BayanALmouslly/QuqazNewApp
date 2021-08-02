import { Component, OnInit } from '@angular/core';
import { CreatePayment } from '../../../Models/order/create-payment.model';
import { Payment } from '../../../Models/order/payment.model';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-payment-orders',
  templateUrl: './payment-orders.component.html',
  styleUrls: ['./payment-orders.component.scss']
})
export class PaymentOrdersComponent implements OnInit {

  constructor(private paymentService:PaymentService) { }
  PaymentWay:Payment[]=[]
createPayment:CreatePayment=new CreatePayment
Payments:CreatePayment[]=[]
  ngOnInit(): void {
    this.GetPaymentWay()
    this.GetPayment()
  }
  GetPaymentWay(){
    this.paymentService.GetPaymentWay().subscribe(res=>{
      this.PaymentWay=res
    })
  }
  AddPayment(){
    this.createPayment.Date=new Date
    this.createPayment.PaymentWayName=this.PaymentWay.find(p=>p.id==this.createPayment.PaymentWayId).name
    this.paymentService.Add(this.createPayment).subscribe(res=>{
      this.Payments.push(this.createPayment)
      this.createPayment=new CreatePayment()
      // this.GetPayment()
    })
  }
  GetPayment(){
    this.paymentService.Get().subscribe(res=>{
      console.log(res)
    })
  }
}
