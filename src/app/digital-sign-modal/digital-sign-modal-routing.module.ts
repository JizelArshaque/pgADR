import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DigitalSignModalPage } from './digital-sign-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DigitalSignModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigitalSignModalPageRoutingModule {}
