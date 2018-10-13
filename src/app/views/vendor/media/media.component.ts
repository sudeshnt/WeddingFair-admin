import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {AppConfig, Config} from '../../../shared/config';
import {VendorService} from '../../../shared/services/api-data-services';
import {AuthService} from '../../../shared/services';
import {ComFunction} from '../../../shared/class';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  @ViewChild('myModal') public modal: ModalDirective;

  AppConfig = AppConfig;

  imageUrl = '';
  galleryImages: any[][] = [];
  public fileUploadConfig: any = {};

  constructor(private vendorService: VendorService, private authService: AuthService, private comFunc: ComFunction) { }

  ngOnInit() {
    this.initGalleryImages();
  }

  private initGalleryImages() {
    const req = {
      'offset' : 0,
      'limit' : Config.getAllLimit,
      'statuses': [
        Config.statusList.PENDING.id,
        Config.statusList.APPROVED.id,
        Config.statusList.SUSPENDED.id
      ]
    };
    this.vendorService.galleryImageFindByCriteria(req).subscribe((response: any) => {
      if (response) {
        this.galleryImages = this.comFunc.devideArrayIntoColumns(response.data, 3);
      }
    }, error => {
    });
  }

  addNewGalleryImage () {
    this.modal.show();
  }

  saveGalleryImage () {
    const req = {
      'serviceProviderId': this.authService.getLoggedInUser().serviceProviderId,
      'imageUrl': this.imageUrl,
      'displaySequence': 0
    };
    this.vendorService.createGalleryImage(req).subscribe((response) => {
      if (response) {
        this.modal.hide();
        this.imageUrl = '';
      }
    }, (error) => {

    });
  }

  onFileUploadEvent($event) {
    if ($event.type === 'uploaded') {
      this.imageUrl = $event.data.fileName;
    }
  }

}
