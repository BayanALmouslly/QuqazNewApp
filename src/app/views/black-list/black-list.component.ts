import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-black-list',
  templateUrl: './black-list.component.html',
  styleUrls: ['./black-list.component.scss']
})
export class BlackListComponent implements OnInit {
  blackList = [];
  selectedNumber
  constructor() { }

  ngOnInit(): void {
    this.blackList = [
      { name: '+9646582744092', code: 'RM' },
      { name: '+9646582744092', code: 'RM' },
      { name: '+9646582744092', code: 'RM' },
      { name: '+9646582744092', code: 'RM' },
      { name: '+9646582744092', code: 'RM' },
    ];
  }

}
