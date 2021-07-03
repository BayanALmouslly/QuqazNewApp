import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { ShowOrdersComponent } from './show-orders/show-orders.component';
import { OrdersReportComponent } from './orders-report/orders-report.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ShowOrderComponent } from './show-order/show-order.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NotificationsRoutingModule } from '../notifications/notifications-routing.module';


@NgModule({
  declarations: [
    ShowOrdersComponent,
    OrdersReportComponent,
    AddOrderComponent,
    ShowOrderComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    PaginationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NotificationsRoutingModule,
    AlertModule.forRoot(),

  ]
})
export class OrdersModule { }
