import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrderComponent } from './add-order/add-order.component';
import { ClientPrintComponent } from './client-print/client-print.component';
import { OrdersReportComponent } from './orders-report/orders-report.component';
import { PaymentOrdersComponent } from './payment-orders/payment-orders.component';
import { SendordersComponent } from './sendorders/sendorders.component';
import { ShowOrderComponent } from './show-order/show-order.component';
import { ShowOrdersComponent } from './show-orders/show-orders.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        redirectTo: 'show'
      },
    
      {
        path: 'addorder',
        component: AddOrderComponent,
        data: {
          title: 'اضافة طلب'
        }
      },
      {
        path: 'show',
        component: ShowOrdersComponent,
        data: {
          title: ' الطلبات '
        }
      },
      {
        path: 'edit/:id',
        component: ShowOrderComponent,
        data: {
          title: ' الطلبات '
        }
      },
      {
        path: 'report',
        component: OrdersReportComponent,
        data: {
          title: 'كشف الطلبات '
        }
      },
      {
        path: 'sendorder',
        component: SendordersComponent,
        data: {
          title: ' ارسال الطلبات الى المندوب '
        }
      },
      {
        path: 'Report',
        component: OrdersReportComponent,
        data: {
          title: ' طلب كشف '
        }
      },
      {
        path: 'payment',
        component: PaymentOrdersComponent,
        data: {
          title: ' طلب حساب '
        }
      },
      {
        path: 'clientPrint',
        component: ClientPrintComponent,
        data: {
          title: ' الكشوفات  '
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
