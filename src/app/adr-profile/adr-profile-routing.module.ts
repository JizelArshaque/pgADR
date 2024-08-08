import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdrProfilePage } from './adr-profile.page';

const routes: Routes = [
  {
    path: '',
    component: AdrProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdrProfilePageRoutingModule {}
