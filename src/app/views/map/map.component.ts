import { Component, Input, OnInit } from '@angular/core';
import { SelectedCountry } from './map';
import { Country } from '../dashboard/country';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() selectedCountries?: SelectedCountry[] = [];
  @Input() hideCountriesName?: boolean;
  country = Country;
  constructor() { }

  ngOnInit(): void {
  }
  fillCountry(id): string {
    let country = this.selectedCountries.find(c => c.id === id)?.color;
    if (country)
      return country;
    return '#D9D9D9';
  }
  colorCountry(id): string {
    let country = this.selectedCountries.find(c => c.id === id);
    if (country)
      return 'white';
    return 'black';
  }
  hasCountry(id): boolean {
    return this.selectedCountries.some(c => c.id === id);
  }
}
