import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tribunal-profile',
  templateUrl: './tribunal-profile.page.html',
  styleUrls: ['./tribunal-profile.page.scss'],
})
export class TribunalProfilePage implements OnInit {

  constructor() { }
  userDetails:any;
  ImageData:string='';
  ngOnInit() {
  }
  OpenCertificate(type:any){

  }
  back(){}
}
