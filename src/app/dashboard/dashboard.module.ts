import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';

import { DashboardPageRoutingModule } from './dashboard-routing.module';
import {  HttpClientModule } from '@angular/common/http';
import { RtcstreamService } from 'src/service/rtcstream.service';

import { BrowserModule } from '@angular/platform-browser';


import { SafePipe } from 'src/class/safe.pipe';
import { SharedPipesModule } from 'src/service/Safe.pipe.module';
import { AlertInfoModule } from 'src/shared/alert-info/alert-info.module';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppConfig } from 'src/class/AppCofig';
const appcon = new AppConfig();
// const config: SocketIoConfig = { url: appcon.SocketServerLink, options: {} };


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    HttpClientModule,
    SharedPipesModule,AlertInfoModule,
    //SocketIoModule.forRoot(config)
    
    // AlertInfoModule
  ],
  providers: [RtcstreamService,DatePipe ],
  declarations: [DashboardPage    
  ],
})
export class DashboardPageModule {}
