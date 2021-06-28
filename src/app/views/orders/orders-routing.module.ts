import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrderComponent } from './add-order/add-order.component';
import { OrdersReportComponent } from './orders-report/orders-report.component';
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
        path: 'report',
        component: OrdersReportComponent,
        data: {
          title: 'كشف الطلبات '
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
