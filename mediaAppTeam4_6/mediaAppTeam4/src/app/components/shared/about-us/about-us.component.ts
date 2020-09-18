import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  latitude = 40.5619385;
  longitude = -74.3368733;
  zoom = 16;

  constructor() { }

  ngOnInit(): void {
  }

}