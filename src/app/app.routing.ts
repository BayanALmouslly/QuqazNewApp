import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { PointsComponent } from './views/points/points.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './views/register/register.component';
import { BlackListComponent } from './views/black-list/black-list.component';
const title = environment.appNameAR
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'تسجيل الدخول'
    }
  },

  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: title
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
      ,
      {
        path: 'orders',
        loadChildren: () => import('./views/orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'upload',
        loadChildren: () => import('./views/upload/upload.module').then(m => m.UploadModule)
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: ' حسابي'
        }
      },
      {
        path: 'black-list',
        component: BlackListComponent,
        data: {
          title: 'القائمة السوداء'
        }
      },
      {
        path: 'points',
        component: PointsComponent,
        data: {
          title: 'نقاطي'
        }
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
