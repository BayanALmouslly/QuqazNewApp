import { Component, OnInit } from '@angular/core';
import { StaticsService } from '../../services/statics.service';
import { CStatics, ClientOrderReportDto } from '../../Models/cstatics.model';
import { DatePipe } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { CountryArray } from './country';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private staticsService: StaticsService,
    private datePipe: DatePipe,
    private settingService: SettingsService
  ) { }
  CStatics: CStatics = new CStatics;
  data: any;
  data1: any;
  start: Date = new Date();
  end: Date = new Date();
  clientReport: ClientOrderReportDto = new ClientOrderReportDto();
  progressValue: number = 0;
  progressAngle: number = 0;
  countries: any[] = CountryArray;

  ngOnInit(): void {
    this.getStatics();
    this.GetOrderStaticsReport();
    this.animateProgressBar();
  }
  animateProgressBar() {
    const targetProgress = 50; // Set the desired progress value here
    const animationDuration = 2000; // Animation duration in milliseconds
    const animationSteps = 100; // Number of animation steps

    const stepSize = targetProgress / animationSteps;
    const stepDuration = animationDuration / animationSteps;

    let currentProgress = 0;
    let currentAngle = 0;

    const interval = setInterval(() => {
      currentProgress += stepSize;
      currentAngle = (currentProgress / 100) * 360;

      this.progressValue = Math.round(currentProgress);
      this.progressAngle = Math.round(currentAngle);

      if (currentProgress >= targetProgress) {
        clearInterval(interval);
      }
    }, stepDuration);
  }
  getStatics() {
    this.staticsService.get().subscribe(res => {
      this.CStatics = res as CStatics;
      this.data = {
        datasets: [{
          data: [
            10,
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

  getCountryName(id) {
    return id ? this.countries.find(c => c.id == id)?.name : '';
  }
  GetOrderStaticsReport() {
    this.staticsService.GetOrderStaticsReport(this.datePipe.transform(this.start, 'yyyy-MM-dd'), this.datePipe.transform(this.end, 'yyyy-MM-dd')).subscribe(data => {
      this.clientReport = data as ClientOrderReportDto;
    })
  }
}
