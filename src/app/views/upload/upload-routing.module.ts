import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowOrderFilesComponent } from './show-order-files/show-order-files.component';
import { UploadComponent } from './upload.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'add'
  },

  {
    path: 'add',
    component: UploadComponent,
    data: {
      title: 'اضافة ملف'
    },
  }
  ,
  {
    path: 'show',
    component: ShowOrderFilesComponent,
    data: {
      title: 'تصحيح الملفات'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
