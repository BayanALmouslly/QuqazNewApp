import { Component, Input, OnInit } from '@angular/core';
import { SelectedCountry } from './map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() selectedCountries?: SelectedCountry[] = [];
  constructor() { }

  ngOnInit(): void {
  }
  fillCountry(id): string {
    var country = this.selectedCountries.find(c => c.id == id).color;
    if (country)
      return country;
    return '#D9D9D9';
  }
  hasCountry(id): boolean {
    return this.selectedCountries.filter(c => c.id === id).length > 0;
  }
}
