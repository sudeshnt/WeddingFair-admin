import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  public fileUploadConfig: any = {};
  constructor() { }

  ngOnInit() {
  }

  onFileUploadEvent($event) {
    if ($event.type === 'uploaded') {
    }
  }

}
