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
    })
  }
  GetCountryPoint() {
    this.settingsService.Countries().subscribe(res => {
      this.countriesPoints = res
    })
  }
  money: number=0
  Rest: number=0
  moneypoint(): number {
    return this.money
  }
}
