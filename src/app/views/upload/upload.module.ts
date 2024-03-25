import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';
import { ToasterModule } from 'angular2-toaster';
import { ShowOrderFilesComponent } from './show-order-files/show-order-files.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng-lts/button';


@NgModule({
  declarations: [
    UploadComponent,
    ShowOrderFilesComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    ToasterModule.forRoot(),
    NgSelectModule,
    FormsModule,
    ButtonModule
  ]
})
export class UploadModule { }
