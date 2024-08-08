import { Injectable } from '@angular/core';
// import { AppConfig } from 'src/class/AppConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';

import { SaveLoginsDetail } from 'src/class/SaveLogins';
import { AppConfig } from 'src/class/AppCofig';
import { TokenEncryptionService } from '../service/token-encryption.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
appConfig=new AppConfig();
decryptiondata: any;

  constructor(public http:HttpClient,public tokenservice: TokenEncryptionService,
    ) { }

    
  GetDecryptedData() {
    this.decryptiondata = this.tokenservice.DecryptToken();
  }

 
  SaveLogins(SaveLogin: SaveLoginsDetail) {
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
  
    return this.http.post(this.appConfig.url + '/SaveLogins', SaveLogin, options).pipe<any>(map(res => res));
  }
  
  GetLoginUser(SC:any) 
  {
    // console.log(SC);
    
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);

    let options ={ headers: headers };
    return this.http.get(this.appConfig.url + '/ArbiterationCommon/GetLoginDeatilsWithSecretCode?SecretCode='+SC,options).pipe<any>(map(res=>res));

  }
  InsertScrutinyComment(ArbId:any,PartyId:any,Comments:any){
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);

    let options ={ headers: headers };
    return this.http.get(this.appConfig.url+"/Scrunity/SpInsertScrunityComments?ArbId="+ArbId+"&PartyId="+PartyId+"&Comments="+Comments, options).pipe<any>(map(res=>res));
  }
  InsertArbNotes(ArbId:any,PartyId:any,Comments:any){
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);

    let options ={ headers: headers };
    return this.http.get(this.appConfig.url+"/Scrunity/SpInsertArbitraionNotes?ArbitrationId="+ArbId+"&PartyId="+PartyId+"&Notes="+Comments, options).pipe<any>(map(res=>res));
  }
  GetallScrutinyComment(ArbId:any,PartyId:any){
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
    let options ={ headers: headers };
    return this.http.get(this.appConfig.url+"/Scrunity/SpGetAllScrutinyComments?ArbitrationId="+ArbId+"&PartyId="+PartyId, options).pipe<any>(map(res=>res));
  }
  GetAllAbitrationNotes(ArbId:any,PartyId:any){
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);

    let options ={ headers: headers };
    return this.http.get(this.appConfig.url+"/Scrunity/GetArbitrationNotesByPartyAndArbitrationId?ArbId="+ArbId+"&PartyId="+PartyId, options).pipe<any>(map(res=>res));
  }
  GetAllLogin() 
  {
    this.GetDecryptedData();
  
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);

    let options ={ headers: headers };
    return this.http.get(this.appConfig.url + '/User', options).pipe<any>(map(res=>res));
  }
  GetAppVersion() 
  {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appConfig.url +'/ArbiterationCommon/GetAppCurrentVersion?adr=0', options).pipe(map(res=>res));
  }
  // Send(user:UserDetails) 
  // {
  //   let headers = new HttpHeaders();
  //   headers.append("Accept", 'application/json');
  //   headers.append('Content-Type', 'application/json');
  //   let options = { headers: headers };
  //   return this.http.get(this.appConfig.url+'/User?username='+user.UserName ,options).pipe(retry(3),catchError(()=>{return null}),map(res=>res));
  // }
}
