import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdrProfilePageRoutingModule } from './adr-profile-routing.module';

import { AdrProfilePage } from './adr-profile.page';
import { AlertInfoModule } from 'src/shared/alert-info/alert-info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdrProfilePageRoutingModule,AlertInfoModule
  ],
  declarations: [AdrProfilePage]
})
export class AdrProfilePageModule {}
