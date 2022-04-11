import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';
import { ToasterModule } from 'angular2-toaster';
import { ShowOrderFilesComponent } from './show-order-files/show-order-files.component';


@NgModule({
  declarations: [
    UploadComponent,
    ShowOrderFilesComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    ToasterModule.forRoot(),
  ]
})
export class UploadModule { }
