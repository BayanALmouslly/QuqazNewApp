import { Component, OnInit } from '@angular/core';
import { CountyPoints } from '../../Models/county-points.model';
import { Points } from '../../Models/points.model';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit {

  constructor() { }
  points: Points[] = []
  countriesPoints:CountyPoints[]=[]
  ngOnInit(): void {
  }

}
