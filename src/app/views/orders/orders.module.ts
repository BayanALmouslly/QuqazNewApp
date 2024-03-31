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
import { ToasterModule } from 'angular2-toaster';
import { SendordersComponent } from './sendorders/sendorders.component';
import { PaymentOrdersComponent } from './payment-orders/payment-orders.component';
import { ClientPrintComponent } from './client-print/client-print.component';
import { PrintOrderComponent } from './print-order/print-order.component';
import { InputTextModule } from 'primeng-lts/inputtext';
import { CardModule } from 'primeng-lts/card';
import { DropdownModule } from 'primeng-lts/dropdown';
import { InputTextareaModule } from 'primeng-lts/inputtextarea';
import { PanelModule } from 'primeng-lts/panel';
import { DividerModule } from 'primeng-lts/divider';
import { RadioButtonModule } from 'primeng-lts/radiobutton';
import { TabMenuModule } from 'primeng-lts/tabmenu';
import { CheckboxModule } from 'primeng-lts/checkbox';
import { ButtonModule } from 'primeng-lts/button';
import { CalendarModule } from 'primeng-lts/calendar';
import { TrackOrderComponent } from './track-order/track-order.component';
import { TimelineModule } from 'primeng-lts/timeline';
import { DialogService, DynamicDialogModule } from 'primeng-lts/dynamicdialog';

@NgModule({
  declarations: [
    ShowOrdersComponent,
    OrdersReportComponent,
    AddOrderComponent,
    ShowOrderComponent,
    SendordersComponent,
    PaymentOrdersComponent,
    ClientPrintComponent,
    PrintOrderComponent,
    TrackOrderComponent
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
    InputTextModule,
    CardModule,
    DropdownModule,
    InputTextareaModule,
    PanelModule,
    DividerModule,
    RadioButtonModule,
    TabMenuModule,
    CheckboxModule,
    ButtonModule,
    CalendarModule,
    TimelineModule,
    DynamicDialogModule
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [CurrencyPipe, DialogService],
})
export class OrdersModule { }
