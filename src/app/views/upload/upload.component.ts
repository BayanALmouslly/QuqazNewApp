import { Component, HostListener, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import * as XLSX from 'xlsx';
import { UploadOrder } from '../../Models/upload-order.model';
import { OrderService } from '../../services/order/order.service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private toasterService: ToasterService,
    private orderService: OrderService) { }
  canUpload: boolean
  src: string = "assets/img/brand/xls.png"
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
      this.dragAreaClass = "dragarea";
      this.src = "assets/img/brand/xls.png"
      this.filelist = []
      this.fileName = ""
      return false;
    }
  }
  error: string;
  dragAreaClass: string;
  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.addfile(event, 'click');
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
    this.dragAreaClass = "droparea";
    this.src = "assets/img/brand/excel.png"
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
        this.addfile(event, 'drop');
        this.saveFiles(files);
      }

    }
  }
  fileName: string = ""
  orderFile
  saveFiles(files: FileList) {

    if (files.length > 1) {
      this.error = "يسمح بملف واحد فقط";
      this.toasterService.pop('error', '', this.error);
    }
    else {
      this.error = "";
      this.orderFile= files[0]
      this.fileName = files[0].name + ""
      this.dragAreaClass = "droparea";
      this.src = "assets/img/brand/excel.png"
    }
  }
  file
  arrayBuffer
  filelist: UploadOrder[] = []
  addfile(event, name) {
    if (name == 'click')
      this.file = event.target.files[0];
    else
      this.file = event.dataTransfer.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.filelist = []
      this.filelist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      // console.log(this.filelist)
      // this.ordersValidation()
    }
  }
  ordersValidation() {
    this.filelist.forEach(element => {
      this.orderValidation(element);
    });
    if (this.filelist.map(o => o.ValidationError == true).length > 0) {
      this.toasterService.pop('error', '', 'يوجد حقول مطلوبة لم يتم ادخالها');
    }
  }
  orderValidation(order: UploadOrder) {
    if (!order.Code || !order.CountryId || !order.Cost || order.RecipientPhones.length == 0 || !order.Address) {
      order.ValidationError = true;
    }
  }
  UploadExcel(){
    this.orderService.UploadExcel(this.orderFile,new Date()).subscribe(res=>{
      this.toasterService.pop('success', '', 'تم تحميل الملف بنجاح');
      this.dragAreaClass = "dragarea";
      this.src = "assets/img/brand/xls.png"
      this.filelist = []
      this.fileName = ""
    },err=>{
      this.toasterService.pop('error', '', err.message);
    })
  }
}
