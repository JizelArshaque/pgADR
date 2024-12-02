import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDigitalSignPage } from './add-digital-sign.page';

const routes: Routes = [
  {
    path: '',
    component: AddDigitalSignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDigitalSignPageRoutingModule {}
