import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AuthService, HttpService, ImageService} from '../../shared/services';
import {Config, ServiceConfig} from '../../shared/config';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() config: any;
  @Output() onFileUploadEvent: EventEmitter <any> = new EventEmitter();
  @ViewChild('fileId') fileIdValue: any;

  public uploadedUrl: any = null;
  public uploadProgress: any = 0;


  constructor(private httpService: HttpService, private imageService: ImageService, private toastr: ToastrService,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onChooseFile(files: FileList) {
    const fileToUpload = files.item(0);
    const req = {
      'file' : fileToUpload,
      'serviceProviderId ' : this.authService.getLoggedInUser().serviceProviderId,
      'type' : 'image'
    };
    this.imageService.uploadImage(req).subscribe((response: any) => {
      if (response) {
        if (response.loaded && response.total) {
          // @ts-ignore
          this.uploadProgress = parseFloat(response.loaded / response.total).toFixed( 2 ) * 100;
        }
        if (response.body) {
          this.onFileUploadEvent.emit({type: 'uploaded', data: response.body});
        }
      }
      // type: 1, loaded: 81920, total: 179688
    }, (error) => {
      this.toastr.error('', error.errorMessage);
      this.onFileUploadEvent.emit({type: 'error', data: null});
    });
    // this.httpService.httpPostFile(ServiceConfig.IMAGE_SERVICE,"/upload_image/"+this.config.customerId,req,null)
    // .then((response : any) => {
    //   //this.uploadedUrl = this.config.imgUrl+response.fileName;
    //   if(response){
    //     this.uploadProgress = 100;
    //     setTimeout(()=>{
    //       this.uploadProgress = 0;
    //     },1000);
    //     this.onFileUploadEvent.emit({type:"uploaded",data:response});
    //   }else{
    //     this.onFileUploadEvent.emit({type:"error",data:null});
    //   }
    //   this.fileIdValue.nativeElement.value = "";
    // }).catch(error => {
    //   this.fileIdValue.nativeElement.value = "";
    //   this.onFileUploadEvent.emit({type:"error",data:error});
    // });
  }

}
