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
  CStatics: CStatics = new CStatics;
  data: any;
  data1: any;
  ngOnInit(): void {
    this.getStatics()
  }
  getStatics() {
    this.staticsService.get().subscribe(res => {
      this.CStatics = res as CStatics;
      this.data = {
        datasets: [{
          data: [
            this.CStatics?.orderInWat,
          ],
          backgroundColor: [
            "rgba(0, 17, 56, 1)"

          ],
        }],
        labels: [
          "  الطلبات التي في الطريق ",

        ]
      }
      this.data1 = {
        datasets: [{
          data: [
            this.CStatics?.orderInStore ?? 0,
          ],
          backgroundColor: [
            "rgba(239, 0, 0, 1)",
          ],
        }],
        labels: [
          "  الطلبات التي في المخزن ",

        ]
      }
    })
  }
}
