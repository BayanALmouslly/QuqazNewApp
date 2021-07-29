import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Notifcation } from '../../Models/notifcation.model';
import { OrderService } from '../../services/order/order.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
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
  count
  ngOnInit() {
    this.orderService.NewNotfiaction().subscribe(res => {
      if(res != 0){
        this.count=res
        this.toasterService.pop('info', '', 'لديك ' + res + ' من الاشعارات'); 
      }
    })
    setInterval(() => {
      this.orderService.NewNotfiaction().subscribe(res => {
        if (res != 0&&this.count!=res) {
           this.toasterService.pop('info', '', 'لديك ' + res + ' من الاشعارات'); 
          //  this.pageNumber=1
          //  this.getNotfiaction()
          }
          this.count=res
        // console.log(res)
      })
    }, 10000);
  }
  pageNumber = 1
  Notfiactions:Notifcation[]=[]
  getNotfiaction() {
    this.pageNumber = 1
    this.orderService.Notifcation(this.pageNumber).subscribe(res => {
      console.log(res)
      this.Notfiactions=res
    })
  }
  MoreNotfiaction(){
    this.pageNumber += 1
    this.orderService.Notifcation(this.pageNumber).subscribe(res => {
      console.log(res)
      this.Notfiactions=res
    })
  }
}
