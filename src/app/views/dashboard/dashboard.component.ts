import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { StaticsService } from '../../services/statics.service';
import { CStatics } from '../../Models/cstatics.model';
import { OrderService } from '../../services/order/order.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  constructor(private staticsService: StaticsService,) { }
  CStatics: CStatics = new CStatics
  ngOnInit(): void {
    
    this.getStatics() 
    // this.staticsService.GetNo().subscribe();
  }
  getStatics() {
    this.staticsService.get().subscribe(res => {
      this.CStatics = res as CStatics
    })
  }
}
