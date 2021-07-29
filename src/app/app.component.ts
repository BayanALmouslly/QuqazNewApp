import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';
import { OrderService } from './services/order/order.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<toaster-container></toaster-container><router-outlet></router-outlet>',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    public iconSet: IconSetService,
    private orderService:OrderService,
    private toasterService: ToasterService,
  ) {
    // iconSet singleton
    iconSet.icons = { ...freeSet };
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  //   setInterval(() => {
  // this.orderService.NewNotfiaction().subscribe(res=>{
  //   if(res!=0)
  //   this.toasterService.pop('info', '', 'لديك '+res+' من الاشعارات');
  //   console.log(res)
  // })
  // }, 10000);
  }
}
