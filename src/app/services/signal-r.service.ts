import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ToasterService } from 'angular2-toaster';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  controler = environment.baseUrl + "NotificationHub"
  // countdata:number
  data: any[];
  private hubConnection: signalR.HubConnection
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44333/NotificationHub', { accessTokenFactory: () => localStorage.getItem('token') })
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  public addTransferChartDataListener = () => {
    this.hubConnection.on('RM', (data) => {
      data = JSON.parse(data);
      // this.data = data;
      console.log(data);
      this.data.push(data);
      // this.countdata=JSON.parse(data).length
      // // console.log(this.countdata)
      // this.toasterService.pop('info', '', 'لديك ' + this.countdata + ' من الاشعارات الجديدة');
    });
  }
  constructor(public toasterService: ToasterService) { }
}
