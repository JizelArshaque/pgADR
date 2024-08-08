import { Compiler, Component } from '@angular/core';
import { AppConfig } from 'src/class/AppCofig';
import { LoginService } from 'src/service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appConfig=new AppConfig();
  constructor(private compiler:Compiler,public loginservice:LoginService) {this.CheckAppVersion();}

  CheckAppVersion() {
    this.loginservice.GetAppVersion().subscribe((data:any) => {
      if (data) {


        if (data.Version != this.appConfig.AppVersion) {
          this.compiler.clearCache();  
          localStorage.clear(); 
            window.location.reload(); 
            
        }}
    });
  }

}
