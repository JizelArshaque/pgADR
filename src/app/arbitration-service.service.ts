import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbPaginationNumber } from '@ng-bootstrap/ng-bootstrap';
import { catchError, map, retry } from 'rxjs';
import { ArbitrationParties } from 'src/class/AdditionalParty';
import { AppConfig } from 'src/class/AppCofig';
import { Mediation } from 'src/class/Mediation';
import { Chat } from '../class/Chat';
import { TokenEncryptionService } from '../service/token-encryption.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ArbitrationServiceService {

  appConfig=new AppConfig();
  decryptiondata: any;
  constructor(
    public http: HttpClient,
    public tokenservice: TokenEncryptionService,
    public router: Router,
  ) {
    // this.GetDecryptedData()
  }
  GetDecryptedData() {
    this.decryptiondata = this.tokenservice.DecryptToken();
  }


  UpdateArebitration(arb:any)
  {  
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
      
  

    let options = { headers: headers };
    return this.http.post<any>(this.appConfig.url +'/Arbitration/InsertArbitration',arb, options).pipe(map(res=>res));
  } 
  GetArbitrationDetailsWithSecreteCode(SecreteCode:any)
  {  
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
      
  

    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url +'/Arbitration/GetArbitrationDetailsWithSecreteCode?SecreteCode='+SecreteCode, options).pipe(map(res=>res));
  } 

  GetArbitrationIdWithSecreteCode(SecreteCode:any)
  {  
     let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url +'/Arbitration/GetArbitrationIdWithSecreteCode?SecreteCode='+SecreteCode, options).pipe(map(res=>res));
  } 

  InsertArbitrationParty(additionalparty:ArbitrationParties){
   
    
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
      
  

    let options = { headers: headers };
    return this.http.post(this.appConfig.url+"/ArbitrationParty/InsertSpArbitrationPartiesAsync",additionalparty,options).pipe<any>(map(res=>res));
  }
  spGetAllarbitrationParties(ArbId:any)
  {  
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  

    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url +'/Arbitration/spGetAllarbitrationParties?arbidParty='+ArbId, options).pipe(map(res=>res));
  } 

  InsertMediation(mediation:Mediation)
  {
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.post(this.appConfig.url +'/ArbitrationTribunalConstitution',mediation, options).pipe<any>(map(res=>res));
  }
  InsertScrunitytoArbParty(ArbitrationId:any,Type:any,Side:any,ScrunityId:any)
  {
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  

    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/Scrunity/SpInsertScrunitytoArbitrationParty?arbId='+ArbitrationId+'&type='+Type+'&side='+Side+'&id='+ScrunityId, options).pipe<any>(map(res => res));
  }
  InsertArbitrationAward(doc:any)
  {
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.post(this.appConfig.url + '/ArbitrationAward/InsertArbitrationAward', doc, options).pipe<any>(map(res => res));
  }
  GetAllMediatorWithCenterIdForMediation() 
  {
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url +'/ArbitrationTribunalConstitution/spGetAllArbitratorsForUserDisplay', options).pipe(map(res=>res));
    // return this.http.get(this.appConfig.url +'/Mediator?centerid='+centerid+'&adrtype='+adrtype+'&quantumofclaim='+quantumofclaim+'&disputecategory='+disputecategory+'&region='+region, options).pipe(map(res=>res));
  }
  InsertArbitratorforExpedited(mediation:Mediation) 
  // GetAllMediatorWithCenterIdForMediation(centerid:any,adrtype:any,quantumofclaim:any,disputecategory:any,region:any) 
  {
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url +'/ArbitrationTribunalConstitution/spGetAllArbitratorsForUserDisplay', options).pipe(map(res=>res));
    // return this.http.get(this.appConfig.url +'/Mediator?centerid='+centerid+'&adrtype='+adrtype+'&quantumofclaim='+quantumofclaim+'&disputecategory='+disputecategory+'&region='+region, options).pipe(map(res=>res));
  }
  spGetAllTribunalForConstitution(ArbitrationPartyId:number,UserId:number)
{
  
  this.GetDecryptedData();
  
  let headers = new HttpHeaders()
    .set("Accept", 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.decryptiondata);

  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/ArbitrationTribunalConstitution/spGetAllTribunalForConstitution?arbId='+ArbitrationPartyId+'&UserId='+UserId, options).pipe<any>(map(res => res));
}
  spGetAllConstitutionalTribunal(arbId:any)
  {  
    
     let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Bearer ' + this.decryptiondata);

    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url +'/ArbitrationTribunalConstitution?arbId='+arbId, options).pipe(map(res=>res));
  } 
  spGetAllArbitrationDocuments(ArbId:any)
  {  
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);

    let options = { headers: headers };
    debugger
    return this.http.get<any>(this.appConfig.url +'/Arbitration/spGetAllArbitrationDocuments?arbiddoc='+ArbId, options).pipe(map(res=>res));
  } 

  spGetAllArbitrationDocumentDetails(ArbId:any)
  { 
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);

    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url +'/Arbitration/spGetAllArbitrationDocumentDetails?arbiddocdetails='+ArbId, options).pipe(map(res=>res));
  } 

  spGetAllArbitrationCaseManagement(ArbId:any)
  {  
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url +'/Arbitration/spGetAllArbitrationCaseManagement?arbidcasemanagements='+ArbId, options).pipe(map(res=>res));
  } 
  GetBankDetails(ArbId:any)
  {  
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url +'/Arbitration/GetBankDetails?Bankarbitrationid='+ArbId, options).pipe(map(res=>res));
  } 
  GetnextPoNumber(ArbId:any,creatortype:any,filenumber:any)
  {  
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url +'/ArbitrationDocument/spGetNextPONumber?ArbitrationId='+ArbId+"&creatortype="+creatortype+"&filenumber="+filenumber, options).pipe(map(res=>res));
  } 
  spGetAllCentersWithAdrType(adrtype:any)
  {  
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url +'/ArbiterationCommon/GetAllCentersWithAdrType?adrType='+adrtype, options).pipe(map(res=>res));
  } 
  ConstituteTribunalExpedited(ArbitrationId:number,UserId:any)
  {   
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url +'/Arbitration/ConstitutionOfTribunal?ConstitutionArbitrationId='+ArbitrationId+'&UserId='+UserId,options).pipe(map(res=>res)); 
  }
  SpLoginUser(ArbId:any,email:any)
  
  {  
     let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url +'/Arbitration/spCreateOtp?email='+email+'&arbId='+ArbId, options).pipe(map(res=>res));
  } 
  
  GetAllADRProfessional() 
  {
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.get(this.appConfig.url +'/ArbiterationCommon/GetAllADRProfessionals', options).pipe(map(res=>res));
  }

  VerifyLogin(username:any,password:any) 
  {
      
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/LoginUser/VerifyOtp?username='+username+'&password='+password, options).pipe<any>(map(res => res));

  }


  UploadDocumentCDN(document:any)
  {  
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.post<any>(this.appConfig.url +'/ArbitrationDocumentDetails/UploadDocumentCdn',document, options).pipe(map(res=>res)); 
  }
  UploadArbitrationDocument(document:any)
  {  
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.post<any>(this.appConfig.url +'/ArbitrationDocument/InsertArbitrationDocument',document, options).pipe(map(res=>res)); 
  }

  UploadArbitrationDocumentDetails(document:any)
  
  {  
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.post<any>(this.appConfig.url +'/ArbitrationDocumentDetails/ArbitrationDocumentUpload',document, options).pipe(map(res=>res)); 
  }
  GetScrunityBoardDetails() 
  {
      
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/Scrunity/GetAllScrunityBoard?', options).pipe<any>(map(res => res));
  
    // return this.http.get(this.appConfig.url+'/VideoCall?MainCallId=',VideoCallId).pipe<any>(map(res => res));
  }
  GetMyArbitrationPartyDetails(ArbId:any,UserId:any) 
{
    
  this.GetDecryptedData();
  
  let headers = new HttpHeaders()
    .set("Accept", 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.decryptiondata);
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Arbitration/spGetLoginUserData?ArbitrationId='+ArbId+'&UserId='+UserId, options).pipe<any>(map(res => res));

  // return this.http.get(this.appConfig.url+'/VideoCall?MainCallId=',VideoCallId).pipe<any>(map(res => res));
}
  DeleteDocumentCDN(documentid:any)
  {  
     let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json'); 
    headers.append('Authorization', 'Bearer ' + this.decryptiondata);

    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url +'/ArbitrationFileUpload/spDeleteDocumentUploadCDN?delDocId='+documentid, options).pipe(map(res=>res)); 
  }
  InsertAuthorisationofMultipleLawyers(Lawyers:any)
  {
    this.GetDecryptedData()
    
      let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.post<any>(this.appConfig.url +'/LawyerAuth/SpInserLawyerVakalat',Lawyers, options).pipe(map(res=>res)); 
  }
  GetAllGeneralSettings()
  {
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/ArbiterationCommon/GetAllGeneralSetting',options).pipe(map(res=>res)); 
  }

  GetFeeForDisputeRegister (quantumofclaim:any,mediatorcategory:any,disputecategory:any,arbitrationcategory:any,email:any,adrtype:any) 
  {
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.get(this.appConfig.url +'/ArbiterationCommon/spGetFeeForDisputeRegister?quantumofclaim='+quantumofclaim+'&mediatorcategory='+mediatorcategory+'&disputecategory='+disputecategory+'&arbitrationcategory='+arbitrationcategory+'&email='+email+'&adrtype='+adrtype,options).pipe(map(res=>res)); 
  }
  AuthorisationURLInsert(Id:any,SecretCode:any,)
  {  
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url +'/Arbitration/SpInsertAuthorisationSecretCode?Id='+Id+'&SecretCode='+SecretCode, options).pipe(map(res=>res));
  } 
  InsertExhibits(exhibits:any)
  {  
     let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.post<any>(this.appConfig.url +'/PleadingExhibits',exhibits, options).pipe(map(res=>res));
  }

  ReplyNoticeByRespondentUrlInsert(ArbitrationId:any,SecretCode:any)
  {  
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url +'/Arbitration/SpInsertReplyNoticeByRespondent?ArbitrationId='+ArbitrationId+'&SecretCode='+SecretCode, options).pipe(map(res=>res));
  }

  GetAllUserWithEmail(Email: string) {
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/ArbiterationCommon/GetAllUserWithEmail?email=' + Email,options).pipe(map(res=>res)); 
  }


  SpInsertTribunalConstitutionPreference (TribunalObj:any) 
  {    
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.post<any>(this.appConfig.url +'/TribunalContitution',TribunalObj, options).pipe(map(res=>res));   }
  SpUpdateTribunalConstitutionPreference (ArbId:any,ArbPartyId:any) 
  {    
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url +'/ArbitrationTribunalConstitution?arbitrationId='+ArbId+'&arbitrationpartyid='+ArbPartyId,options).pipe(map(res=>res)); 
  }
  GetDigitalCardDetailsWithUserId(userid:any) 
  {
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url + '/ArbiterationCommon/GetDigitalCardDetailsWithUserId?UserId='+userid, options).pipe(map(res=>res)); 
  }
  spAppointTribunal(ArbitrationPartyId:number,TId:any)
  {   
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.get(this.appConfig.url +'/ArbitrationTribunalConstitution/spAppointTribunal?arbId='+ArbitrationPartyId+'&tribunalId='+TId,options).pipe(map(res=>res)); 

  }

  spAppointTribunalforExpedited(ArbitrationPartyId:number,TId:any,Name:any,Email:any,Mobile:any,Address:any,ArbitratorType:any,ArbitratorSide:any,Country:any,State:any,City:any)
  {
    
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.get(this.appConfig.url +'/ArbitrationTribunalConstitution/spAppointTribunalforExpedited?ArbitrationPartyId='+ArbitrationPartyId+'&TId='+TId+'&Name='+Name+'&Email='+Email+'&Mobile='+Mobile+'&Address='+Address+'&ArbitratorType='+ArbitratorType+'&ArbitratorSide='+ArbitratorSide+'&Country='+Country+'&State='+State+'&City='+City,options).pipe(map(res=>res)); 

  }
  SpInsertChat(UserId:any,MediationId:any,Message:any,CreatorId:any)
  {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.decryptiondata);

    let options = { headers: headers };
    return this.http.get(this.appConfig.url+'/ArbiterationCommon/InsertMediationChat?userId='+UserId+'&mediationid='+MediationId+'&message='+Message+'&creatorid='+CreatorId,options).pipe(map(res=>res)); 

  }
  SpGetAllChats(MediationId:any)
  {
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);

    let options = { headers: headers };
    return this.http.get(this.appConfig.url+'/ArbiterationCommon/GetAllMediationChat?mediationidChat='+MediationId,options).pipe(map(res=>res)); 

  }
  GenerateArbitrationFileNumber(id:number,type:number,message:string)
  {  
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);

    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url +'/Arbitration/Generatefilenumber?arbidfilenumber='+id+'&type='+type+'&message='+ encodeURIComponent(message) , options).pipe(map(res=>res)); 
  }
  CommentClaimant(message:string,email:string,name:string,arbid:any)
  {  
      
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);

    let options = { headers: headers };
    return this.http.get<any>(this.appConfig.url +'/Arbitration/SendMessageToClaimant?message='+message+'&email='+email+'&name='+name+"&arbitrationid="+arbid, options).pipe(map(res=>res)); 
  }
  SpReportIssue(ReportIssue:any)
  
  {  


     let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.post<any>(this.appConfig.url +'/ArbiterationCommon/InsertReportIssue',ReportIssue, options).pipe(map(res=>res));
  }
}