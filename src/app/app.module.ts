import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { HttpClientModule } from '@angular/common/http';
import { Videocalluser } from 'src/service/Videocalluser.service';
import { TestProvider } from 'src/service/TestProvider';
import { AlertService } from 'src/shared/alert-info/alert.service';
import { AlertInfoModule } from 'src/shared/alert-info/alert-info.module';
import { AppConfig } from 'src/class/AppCofig';
import { NgxEditorModule } from 'ngx-editor';
import {NgxSimpleTextEditorModule} from 'ngx-simple-text-editor';
const appcon = new AppConfig();
// const config: SocketIoConfig = { url: appcon.SocketServerLink, options: {} };


@NgModule({
  declarations: [AppComponent, ],
  imports: [BrowserModule, NgbModule,IonicModule.forRoot(), AppRoutingModule, EditorModule,HttpClientModule,AlertInfoModule,NgxEditorModule,NgxSimpleTextEditorModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Videocalluser,TestProvider,NavParams,AlertService], 
  bootstrap: [AppComponent],
})
export class AppModule {}
