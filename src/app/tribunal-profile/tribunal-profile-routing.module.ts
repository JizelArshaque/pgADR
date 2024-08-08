import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TribunalProfilePage } from './tribunal-profile.page';

const routes: Routes = [
  {
    path: '',
    component: TribunalProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TribunalProfilePageRoutingModule {}
