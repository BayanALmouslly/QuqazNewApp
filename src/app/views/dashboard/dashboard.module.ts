import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartModule } from 'primeng-lts/chart';
import { DatePipe } from '@angular/common';
import { ProgressBarModule } from 'primeng-lts/progressbar';
import { MapModule } from '../map/map.module';


@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ChartModule,
    ProgressBarModule,
    MapModule
  ],
  declarations: [DashboardComponent],
  providers: [DatePipe]
})
export class DashboardModule { }
