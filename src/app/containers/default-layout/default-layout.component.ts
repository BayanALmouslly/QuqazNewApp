import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { environment } from '../../../environments/environment';
import { Notifcation } from '../../Models/notifcation.model';
import { Paging } from '../../Models/paging';
import { OrderService } from '../../services/order/order.service';
import { SignalRService } from '../../services/signal-r.service';
import { StaticsService } from '../../services/statics.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  constructor(private router: Router, private orderService: OrderService,
    private toasterService: ToasterService, private SinglarService: SignalRService,
    private staticsService: StaticsService,) { }
  titleAR = environment.appNameAR
  titleEN = environment.appNameEN
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout() {
    this.router.navigate(['/login'])
  }
  @ViewChild('navdrop') navdrop: ElementRef;

  count
  showbadge: boolean = false
  ngOnInit() {
    this.staticsService.GetNo().subscribe();

  }

  pageNumber = 1
  Notfiactions: Notifcation[] = []
  oldNotfiactions: Notifcation[] = []

  style(seen) {
    if (seen)
      return "white"
    else {
      setTimeout(() => {
        //  this.getNotfiaction()
      }, 1000);
      return "rgb(233, 231, 231)"
    }
  }
  getNotfiaction() {
    console.log(this.SinglarService.data)
  }
  SeeNotifaction() {
    if (this.Notfiactions.length != 0)
      this.orderService.SeeNotifaction(this.Notfiactions.map(n => n.id)).subscribe(res => {
      })
  }
  totalItems
  paging: Paging = new Paging
  // pageChanged(event: PageChangedEvent): void {
  //   this.paging.allItemsLength = this.totalItems
  //   this.paging.RowCount = event.itemsPerPage
  //   this.paging.Page = event.page
  //   this.getNotfiaction()
  // }
  showSpinner: boolean
  // @HostListener('scroll', ['$event'])
  // onScroll(event: any) {
  //     if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight&&this.Notfiactions.length==10) {
  //       this.MoreNotfiaction()
  //     }
  // }
}
