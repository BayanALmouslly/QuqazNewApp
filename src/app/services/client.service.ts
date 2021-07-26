import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(public http: HttpClient) { }
  controler = environment.baseUrl + "api/CClient/"
  CheckUserName(username) {
    return this.http.get(this.controler + "CheckUserName/" + username)
  }
  CheckName(name) {
    return this.http.get(this.controler + "CheckName/" + name)
  }
  updateInformation(client) {
    return this.http.put(this.controler + "updateInformation",client)
  }
  deletePhone(id) {
    let fromdata=new FormData
    fromdata.append("id",id)
    return this.http.put(this.controler + "deletePhone/"+id,fromdata)
  }
  addPhone(phone) {
    let fromdata=new FormData
    fromdata.append("phone",phone)
    return this.http.put(this.controler + "addPhone/"+phone,fromdata)
  }
}
