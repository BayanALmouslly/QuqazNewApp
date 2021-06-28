import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss']
})
export class ShowOrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  totalItems: number = 64;
  currentPage: number   = 4;
  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
