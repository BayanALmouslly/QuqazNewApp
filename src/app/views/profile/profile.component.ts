import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UpdateClient } from '../../Models/update-client.model';
import { ClientService } from '../../services/client.service';
import { UserLogin } from '../auth/userlogin.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private toasterService: ToasterService,
    private clientService: ClientService) { }
  @ViewChild('infoModal') public infoModal: ModalDirective;

  user = JSON.parse(localStorage.getItem('kokazClient')) as UserLogin
  Order
  showEdit = false
  tempName
  tempUserName
  tempPassword
  errorName: boolean
  errorUserName: boolean
  errorPassword: boolean
  errorRequierd: boolean

  ngOnInit(): void {
    this.tempName = this.user.name
    this.tempUserName = this.user.userName
  }
  CheckUserName() {
    if (this.user.userName == this.tempUserName) return
    this.clientService.CheckUserName(this.user.userName).subscribe(res => {
      if (res) {
        this.errorUserName = true
      }
      else
        this.errorUserName = false
    })
  }
  CheckName() {
    if (this.user.name == this.tempName) return
    this.clientService.CheckName(this.user.name).subscribe(res => {
      if (res) {
        this.errorName = true
      }
      else
        this.errorName = false
    })
  }
  CanEdit() {
    this.showEdit = true
  }
  client: UpdateClient = new UpdateClient
  saveEdit() {
    if (this.user.password && this.user.password != this.tempPassword)
      this.errorPassword = true
    else
      this.errorPassword = false
    if (!this.user.userName || !this.user.name || this.user.phones.length == 0 || this.errorPassword) {
      this.errorRequierd = true
      return
    }
    else
      this.errorRequierd = false
    this.client.Mail = this.user.mail
    this.client.Name = this.user.name
    this.client.UserName = this.user.userName
    this.client.Password = this.user.password
    this.client.Phones = this.user.phones.map(ph => ph.phone)
    this.clientService.updateInformation(this.client).subscribe(res => {
      this.showEdit = false
      if (this.user.name != this.tempName || this.user.userName != this.tempUserName)
        this.toasterService.pop('success', '', 'تم طلب التعديل بنجاح سيظهر لك  اشعار في حال تم الموافقة على طلبك');
      else
        this.toasterService.pop('success', '', 'تم التعديل بنجاح');
      this.user.name = this.tempName
      this.user.userName = this.tempUserName
      this.clientService.GetByToken().subscribe(res=>{
        this.user=res
      })
    })
  }
  Phone
  errorPhone: boolean
  errorRepeatPhone: boolean
  checkphone(phone, index?) {
    if (phone.length < 11 && phone) {
      this.errorPhone = true
    }
    else {
      this.errorPhone = false
    }
    if (index) {
      if (this.user.phones.filter(p => p == phone && this.user.phones.indexOf(p) != index).length > 0) {
        this.errorRepeatPhone = true
      }
      else {
        this.errorRepeatPhone = false
      }
    }
    else if (index == undefined) {
      if (this.user.phones.filter(p => p == phone).length > 0) {
        this.errorRepeatPhone = true
      } else {
        this.errorRepeatPhone = false
      }
    }

  }
  AddPhone() {
    if (!this.Phone || this.errorPhone || this.errorRepeatPhone) {
      return
    }
    this.user.phones.push({ phone: this.Phone, id: null })
    this.Phone = ""

  }
  RemovePhone(phone) {
    this.user.phones = this.user.phones.filter(o => o != phone)
  }
}
