import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, ModalController } from '@ionic/angular';

import { AddDigitalSignPageRoutingModule } from './add-digital-sign-routing.module';

import { AddDigitalSignPage } from './add-digital-sign.page';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx'; // Import Geolocation
import { Camera } from '@awesome-cordova-plugins/camera/ngx'; // Import Camera
import { AlertInfoModule } from 'src/shared/alert-info/alert-info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDigitalSignPageRoutingModule,
    AlertInfoModule
    
  ],
  declarations: [AddDigitalSignPage],
  providers: [
    Geolocation,
    Camera,
    ModalController
  ]
})
export class AddDigitalSignPageModule { }
