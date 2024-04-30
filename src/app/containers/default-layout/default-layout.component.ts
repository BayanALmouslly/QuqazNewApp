import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { environment } from '../../../environments/environment';
import { Notifcation } from '../../Models/notifcation.model';
import { Paging } from '../../Models/paging';
import { OrderService } from '../../services/order/order.service';
import { SignalRService } from '../../services/signal-r.service';
import { StaticsService } from '../../services/statics.service';
import { navItems } from '../../_nav';
import { BranchDetailsService } from '../../services/branch-details.service';
import { AuthService } from '../../views/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  constructor(private router: Router, private orderService: OrderService,
    private toasterService: ToasterService, private signalRService: SignalRService,
    private staticsService: StaticsService,
    private activeBranchDetais: BranchDetailsService, private authService: AuthService) { }
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
  showbadge: boolean = false;
  display: boolean;
  ngOnInit() {

    this.Notfiaction()
    // setTimeout(() => {
    //   this.staticsService.GetNo().subscribe(res=>{
    //     this.Notfiaction()  
    //   });

    // }, 1000);
    this.activeBranchDetais.setBranch(this.authService.getUser().branch)

  }

  pageNumber = 1
  Notfiactions: any[] = []
  oldNotfiactions: Notifcation[] = []

  style(seen) {
    var color = "white"
    if (seen)
      color = "white"
    else {
      // setTimeout(() => {
      color = "rgb(233, 231, 231)"
      // }, 1000);
      // color="white"
    }
    return color
  }
  Notfiaction() {
    this.signalRService.startConnection();
    // this.signalRService.addTransferChartDataListener();
    this.signalRService.hubConnection.on('RM', (data) => {
      data = JSON.parse(data);
      console.log(data);
      data.notifications.forEach(element => {
        this.Notfiactions.unshift(element)
      });
      this.count = this.Notfiactions.length;
      // console.log(this.count);
      if (this.count != 0) {
        this.showbadge = true
      }
      else
        this.showbadge = false
      if (data.notifications.length > 0)
        this.toasterService.pop('info', '', 'لديك ' + data.notifications.length + ' من الاشعارات الجديدة');
    });
    setTimeout(() => {
      this.staticsService.GetNo().subscribe();
    }, 1000);

  }
  getNotfiaction() {
    this.SeeNotifaction();
    this.display = true;
  }
  SeeNotifaction() {
    if (this.Notfiactions.length != 0)
      this.orderService.SeeNotifaction(this.Notfiactions.map(n => n.Id)).subscribe(res => {
        // this.signalRService.data = this.signalRService.data.filter(d => this.Notfiactions.indexOf(d) > 0)
        setTimeout(() => {
          // this.Notfiactions=[]
          this.Notfiactions.forEach(n => {
            n.IsSeen = true
          })
        }, 1000);
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
