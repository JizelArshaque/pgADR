import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'dashboard/:securecode',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'upload-modal',
    loadChildren: () => import('./upload-modal/upload-modal.module').then( m => m.UploadModalPageModule)
  },
  {
    path: 'home-page',
    loadChildren: () => import('./home-page/home-page.module').then( m => m.HomePagePageModule)
  },
  {
    path: 'doc-viewer',
    loadChildren: () => import('./doc-viewer/doc-viewer.module').then( m => m.DocViewerPageModule)
  },
  {
    path: 'profile-details',
    loadChildren: () => import('./profile-details/profile-details.module').then( m => m.ProfileDetailsPageModule)
  },
  {
    path: 'procedural-order',
    loadChildren: () => import('./procedural-order/procedural-order.module').then( m => m.ProceduralOrderPageModule)
  },
  {
    path: 'arbitration-party-add',
    loadComponent: () => import('./arbitration-party-add/arbitration-party-add.page').then( m => m.ArbitrationPartyAddPage)
  },
  {
    path: 'tribunal-constitution',
    loadChildren: () => import('./tribunal-constitution/tribunal-constitution.module').then( m => m.TribunalConstitutionPageModule)
  },
  {
    path: 'tribunal-profile',
    loadChildren: () => import('./tribunal-profile/tribunal-profile.module').then( m => m.TribunalProfilePageModule)
  },
  {
    path: 'arbitrator-modal',
    loadChildren: () => import('./arbitrator-modal/arbitrator-modal.module').then( m => m.ArbitratorModalPageModule)
  },
  {
    path: 'select-arbitrator-modal',
    loadChildren: () => import('./select-arbitrator-modal/select-arbitrator-modal.module').then( m => m.SelectArbitratorModalPageModule)
  },
  {
    path: 'scrunity-modal',
    loadChildren: () => import('./scrunity-modal/scrunity-modal.module').then( m => m.ScrunityModalPageModule)
  },
  {
    path: 'adr-profile',
    loadChildren: () => import('./adr-profile/adr-profile.module').then( m => m.AdrProfilePageModule)
  },
  {
    path: 'waiting-room',
    loadChildren: () => import('./waiting-room/waiting-room.module').then( m => m.WaitingRoomPageModule)
  },



 
 
  
  
  
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
