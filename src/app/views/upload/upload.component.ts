import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private toasterService: ToasterService,) { }
  canUpload: boolean
  ngOnInit(): void {
  }
  upload() {
    let fData: FormData = new FormData;
    for (var i = 0; i < this.files.length; i++) {
      fData.append("file", this.files[i]);
    }
    var _data = {
      filename: 'Sample File',
      id: '0001'
    }

    fData.append("data", JSON.stringify(_data));

  }
  files
  selectFile(event: any) {
    this.files = event.target.files;
    if (!this.validateFile(this.files[0].name)) {
      this.toasterService.pop('error', '', 'الملف المحدد ليس ملف excel');
      this.canUpload = false;
      return false;
    }
    else {
      this.canUpload = true;
      return true;
    }
  }
  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'xlsx' || ext.toLowerCase() == 'xlsm' || ext.toLowerCase() == 'xlsb'
      || ext.toLowerCase() == 'xltx' || ext.toLowerCase() == 'xltm' || ext.toLowerCase() == 'xls'
      || ext.toLowerCase() == 'xlt' || ext.toLowerCase() == 'xml' || ext.toLowerCase() == 'xlam'
      || ext.toLowerCase() == 'xla' || ext.toLowerCase() == 'xlw' || ext.toLowerCase() == 'xlr') {
      return true;
    }
    else {
      return false;
    }
  }
}
