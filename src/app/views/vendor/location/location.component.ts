import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log(this.authService.getLoggedInUser());
  }

  clickMap (event) {
    console.log(event);
  }

}
