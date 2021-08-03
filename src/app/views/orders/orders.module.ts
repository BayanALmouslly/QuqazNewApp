import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

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
import { NgSelectModule } from '@ng-select/ng-select';
import {ToasterModule} from 'angular2-toaster';
import { SendordersComponent } from './sendorders/sendorders.component';
import { PaymentOrdersComponent } from './payment-orders/payment-orders.component';
import { ClientPrintComponent } from './client-print/client-print.component';

@NgModule({
  declarations: [
    ShowOrdersComponent,
    OrdersReportComponent,
    AddOrderComponent,
    ShowOrderComponent,
    SendordersComponent,
    PaymentOrdersComponent,
    ClientPrintComponent
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
    NgSelectModule,
    ToasterModule.forRoot(),
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[CurrencyPipe]
})
export class OrdersModule { }
