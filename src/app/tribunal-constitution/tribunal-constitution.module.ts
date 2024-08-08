import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TribunalConstitutionPageRoutingModule } from './tribunal-constitution-routing.module';

import { TribunalConstitutionPage } from './tribunal-constitution.page';
import { AlertInfoModule } from 'src/shared/alert-info/alert-info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TribunalConstitutionPageRoutingModule,AlertInfoModule
  ],
  declarations: [TribunalConstitutionPage]
})
export class TribunalConstitutionPageModule {}
