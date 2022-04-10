import { Component, HostListener, OnInit } from '@angular/core';
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
    this.dragAreaClass = "dragarea";
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
    if (this.files.length > 0)
      if (!this.validateFile(this.files[0].name)) {
        this.toasterService.pop('error', '', 'الملف المحدد ليس ملف excel');
        this.canUpload = false;
        return false;
      }
      else {
        this.canUpload = true;
        this.onFileChange(event)
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
  error: string;
  dragAreaClass: string;
  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files);
  }

  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    console.log(event)
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      if (!this.validateFile(files[0].name)) {
        this.toasterService.pop('error', '', 'الملف المحدد ليس ملف excel');
        this.canUpload = false;
        return false;
      }
      else {
        this.saveFiles(files);
      }

    }
  }
  fileName: string = ""
  saveFiles(files: FileList) {

    if (files.length > 1) {
      this.error = "يسمح بملف واحد فقط";
      this.toasterService.pop('error', '', this.error);
    }
    else {
      this.error = "";
      this.fileName = files[0].name + ""
      console.log(files[0].size, files[0].name, files[0].type);
    }
  }
}
