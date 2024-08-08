import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, map } from 'rxjs/operators';
import { AppConfig } from 'src/class/AppCofig';
import { TokenEncryptionService } from '../service/token-encryption.service';



@Injectable({
  providedIn: 'root'
})
export class AdrProfessionalService {
  decryptiondata: any;

  constructor(
    public http: HttpClient,
    public tokenservice: TokenEncryptionService,

  ) { 
   
  }
  GetDecryptedData() {
    this.decryptiondata = this.tokenservice.DecryptToken();
  }

  appConfig=new AppConfig();
  

  GetAllADRProfessional() 
  {
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);


    let options = { headers: headers };
    return this.http.get(this.appConfig.url +'/ArbiterationCommon/GetAllADRProfessionals', options).pipe<any>(map(res=>res));
  }
  GetAllADRProfessionals(secretcode:any) 
  {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.decryptiondata);

    let options = { headers: headers };
    return this.http.get(this.appConfig.url +'/ArbiterationCommon/GetAllADRProfessionals?SecretCode='+secretcode, options).pipe<any>(map(res=>res));
  }


}
