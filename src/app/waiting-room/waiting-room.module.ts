import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaitingRoomPageRoutingModule } from './waiting-room-routing.module';

import { WaitingRoomPage } from './waiting-room.page';
//import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppConfig } from 'src/class/AppCofig';
const appcon = new AppConfig();
//const config: SocketIoConfig = { url: appcon.ChatServerLink, options: {} };
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaitingRoomPageRoutingModule,
    //SocketIoModule.forRoot(config)
  ],
  declarations: [WaitingRoomPage]
})
export class WaitingRoomPageModule {}
