import { Component, OnInit } from '@angular/core';
import { CountyPoints } from '../../Models/county-points.model';
import { Points } from '../../Models/points.model';
import { PointsService } from '../../services/points.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit {

  constructor(private pointservice: PointsService,
    private settingsService: SettingsService) { }
  points: Points[] = []
  countriesPoints: CountyPoints[] = []
  pointCount: number = 0
  ngOnInit(): void {
    this.mypoint()
    this.getPoints()
    this.GetCountryPoint()
  }
  mypoint() {
    this.pointservice.MyPoints().subscribe(res => {
      this.pointCount = res
    })
  }
  getPoints() {
    this.pointservice.getPoints().subscribe(res => {
      this.points = res
      this.points = this.points.sort((a, b) => (a.points > b.points) ? 1 : ((b.points > a.points) ? -1 : 0));
    })
  }
  GetCountryPoint() {
    this.settingsService.Countries().subscribe(res => {
      this.countriesPoints = res
    })
  }
  money: number = 0
  Rest: number = 0
  moneypoint(): number {
    var clientPoint = this.pointCount;
    var lessOne = this.points[0].points;
    this.money = 0;
    while (clientPoint > lessOne) {
      var lastPonit = this.points.filter(c => c.points <= clientPoint)[this.points.filter(c => c.points < clientPoint).length - 1];
      clientPoint -= lastPonit.points;
      this.money+=lastPonit.money;
    }
    this.Rest = clientPoint;
    return this.money
  }
}
