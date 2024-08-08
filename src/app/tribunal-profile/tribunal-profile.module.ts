import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TribunalProfilePageRoutingModule } from './tribunal-profile-routing.module';

import { TribunalProfilePage } from './tribunal-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TribunalProfilePageRoutingModule
  ],
  declarations: [TribunalProfilePage]
})
export class TribunalProfilePageModule {}
