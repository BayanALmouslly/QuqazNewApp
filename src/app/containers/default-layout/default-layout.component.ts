import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Notifcation } from '../../Models/notifcation.model';
import { Paging } from '../../Models/paging';
import { OrderService } from '../../services/order/order.service';
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
    private toasterService: ToasterService,) { }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout() {
    this.router.navigate(['/login'])
  }
  @ViewChild('navdrop') navdrop: ElementRef;

  count
  ngOnInit() {
    this.orderService.NewNotfiaction().subscribe(res => {
      if (res != 0) {
        this.count = res
        this.toasterService.pop('info', '', 'لديك ' + res + ' من الاشعارات');
      }
    })
    setInterval(() => {
      this.orderService.NewNotfiaction().subscribe(res => {
        if (res != 0 && this.count != res) {
          this.toasterService.pop('info', '', 'لديك ' + res + ' من الاشعارات');
          //  this.pageNumber=1
          //  this.getNotfiaction()
        }
        this.count = res
        // console.log(res)
      })
    }, 10000);
  }
  pageNumber = 1
  Notfiactions: Notifcation[] = []
  NewNotfiaction() {
    this.orderService.NewNotfiaction().subscribe(res => {
      if (res != 0) {
        this.count = res
      }
    })
  }
  getNotfiaction() {
    this.paging.RowCount = 10
    this.paging.Page =1
    this.orderService.Notifcation(this.paging).subscribe(res => {
      console.log(res)
      this.Notfiactions = res.data
      this.totalItems = res.total
      this.SeeNotifaction()
    })
  }
  MoreNotfiaction() {
    this.paging.RowCount = 10
    this.paging.Page +=1
    if (this.navdrop)
      this.navdrop.nativeElement.classList.toggle("visibility");
    this.orderService.Notifcation(this.paging).subscribe(res => {
      console.log(res)
      this.Notfiactions = res.data
      this.totalItems = res.total
      this.SeeNotifaction()
    })
  }
  SeeNotifaction() {
    // console.log(this.Notfiactions.map(n => n.id))
    this.orderService.SeeNotifaction(this.Notfiactions.map(n => n.id)).subscribe(res => {
      this.NewNotfiaction()
    })
  }
  totalItems
  paging: Paging = new Paging

  pageChanged(event: PageChangedEvent): void {
    this.paging.allItemsLength = this.totalItems
    this.paging.RowCount = event.itemsPerPage
    this.paging.Page = event.page
    this.getNotfiaction()
  }
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    console.log(event);
  }
}
