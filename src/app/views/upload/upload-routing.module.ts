import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'show'
  },

  {
    path: 'show',
    component: UploadComponent,
    data: {
      title: 'اضافة ملف'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
