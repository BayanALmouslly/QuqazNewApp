import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { UserLogin } from '../auth/userlogin.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor( private toasterService: ToasterService) { }

  user = JSON.parse(localStorage.getItem('kokazClient')) as UserLogin
  Order
  showEdit=false
  ngOnInit(): void {
    console.log(this.user.address==' ')
  }
CanEdit(){
  this.showEdit=true
  this.toasterService.pop('success', '', 'تم طلب التعديل بنجاح سيظهر لك  اشعار في حال تم الموافقة على طلبك');

}
saveEdit(){
  this.showEdit=false
}
}
