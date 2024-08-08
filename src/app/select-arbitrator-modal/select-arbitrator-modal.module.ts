import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectArbitratorModalPageRoutingModule } from './select-arbitrator-modal-routing.module';

import { SelectArbitratorModalPage } from './select-arbitrator-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectArbitratorModalPageRoutingModule
  ],
  declarations: [SelectArbitratorModalPage]
})
export class SelectArbitratorModalPageModule {}
