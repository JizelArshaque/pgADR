import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { AppConfig } from 'src/class/AppCofig';

import { VideoCallUser } from 'src/class/VideoCallUser';
import { TokenEncryptionService } from '../service/token-encryption.service';




@Injectable()
export class Videocalluser {
  decryptiondata: any;

  appConfig = new AppConfig();
  constructor(public http: HttpClient,public tokenservice: TokenEncryptionService,
    ) {
   
  }
  GetDecryptedData() {
    this.decryptiondata = this.tokenservice.DecryptToken();
  }

 
  InsertVideoCallUser(videoUser:VideoCallUser){
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.post(this.appConfig.url+'/VideoCallUser',videoUser,options).pipe<any>(map(res => res));
  }
  GetVideocallaudiencewithUserIdAndVideocallId(MainCallId:any)
{
    // console.log(MainCallId);
   
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Video/UpdateVideoCallUserAudioMute?MainCallId='+MainCallId, options).pipe<any>(map(res => res));

  // return this.http.get(this.appConfig.url+'/VideoCall?MainCallId=',VideoCallId).pipe<any>(map(res => res));
}
GetAllVideocallaudiencewithVideocallId(VideoCallId:number,MainVideoCallId:number,Status:any)
  {
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/VideoCall?VideoCallId='+VideoCallId+'&Status='+Status+'&flag=0', options).pipe<any>(map(res => res));
  }

 
 
MuteAudioorVideoOfRemoteUser(VideoCallId:any,UserId:any,IsMute:any,IsAudioOrVideo:any){
  // console.log(VideoCallId,UserId,IsMute,IsAudioOrVideo,"in ser");
  this.GetDecryptedData();
  
  let headers = new HttpHeaders()
    .set("Accept", 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.decryptiondata);

  let options = { headers: headers };
   return this.http.get(this.appConfig.url + '/ArbitrationParty/muteAllAudioorVideo?VideoCallId='+VideoCallId+'&UserId='+UserId+'&IsMute='+IsMute+'&IsAudioOrVideo='+IsAudioOrVideo, options).pipe<any>(map(res => res));
 
 }

 
 



 

  UpdateAllUsersStatus(VideoCallId:any,Status:any)
  {
   
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.decryptiondata);

    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/VideoCallUser?VideoCallId='+VideoCallId+'&Status='+Status, options).pipe<any>(map(res => res));
  }
  UpdateVideocallOnJoinByHost(Id:any,Status:any,Remarks:any,Token:any,Channel:any){

    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/VideoCall?Id='+Id+'&Status='+Status+'&Remarks='+Remarks+'&Token='+encodeURIComponent(Token)+'&Channel='+Channel, options).pipe<any>(map(res => res));
 
  }







UpdateVideoCallUserStatusWithId(Id:any,Status:any)
{
  // console.log(Id,Status,"ll");
 
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/VideoCallUser?Id='+Id+'&Status='+Status, options).pipe<any>(map(res => res));
}


GetMyArbitrationPartyDetails(ArbId:any,UserId:any)
{
    // console.log(ArbId,UserId,"GetMyArbitrationPartyDetails");

    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Arbitration/spGetLoginUserData?ArbitrationId='+ArbId+'&UserId='+UserId, options).pipe<any>(map(res => res));

  // return this.http.get(this.appConfig.url+'/VideoCall?MainCallId=',VideoCallId).pipe<any>(map(res => res));
}
UpdateTokenandChannel(Id:any,VideoCallChannel:any,VideoCallToken:any,MyArbId:any){

  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/ArbitrationParty?Id='+Id+'&VideoCallToken='+encodeURIComponent(VideoCallToken)+'&VideoCallChannel='+VideoCallChannel+'&MyArbId='+MyArbId, options).pipe<any>(map(res => res));

}
UpdateArbitrationPartyLastTokenGeneratedTime(ArbitrationId:any,TokenGeneratedTime:any){
  // alert('hfgdfghiiiii')

  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', 'Bearer ' + this.decryptiondata);

  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/ArbitrationParty/spUpdateArbitrationPartyLastTokenGeneratedTime?ArbitrationId='+ArbitrationId+'&TokenGeneratedTime='+TokenGeneratedTime, options).pipe<any>(map(res => res));

}

UpdateArbitrationPartyLastLoginTime(ArbitrationId:any,LastLoginTime:any){

  console.log(ArbitrationId,LastLoginTime,'ArbitrationId,LastLoginTime');
  
  this.GetDecryptedData();
  
  let headers = new HttpHeaders()
    .set("Accept", 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.decryptiondata);

  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/ArbitrationParty/spUpdateArbitrationPartyLastLoginTime?ArbitrationId='+ArbitrationId+'&LastLoginTime='+LastLoginTime, options).pipe<any>(map(res => res));

}
muteAllAudioorVideo(ArbitrationId:any,HostId:any,IsMute:any,IsAudioOrVideo:any){
  this.GetDecryptedData();
  
  let headers = new HttpHeaders()
    .set("Accept", 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.decryptiondata);

   let options = { headers: headers };
   return this.http.get(this.appConfig.url + '/ArbitrationParty/muteAllAudioorVideo?ArbitrationId='+ArbitrationId+'&HostId='+HostId+'&IsMute='+IsMute+'&IsAudioOrVideo='+IsAudioOrVideo, options).pipe<any>(map(res => res));
 
 }
 GetMyTokenChannelAndPvtSecretcode(ArbitrationPartyId:number)
{
  this.GetDecryptedData();
  
  let headers = new HttpHeaders()
    .set("Accept", 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.decryptiondata);
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/PrivateVideo?ArbitrationPartyId='+ArbitrationPartyId, options).pipe<any>(map(res => res));
}
// changeisvideostart to 3 to do
ChangeVideostartStatus(ArbitrationPartyId:number,isvideostart:any)
{
  this.GetDecryptedData();
  
  let headers = new HttpHeaders()
    .set("Accept", 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.decryptiondata);
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Video/ChangeVideoStartStatus?ArbitrationPartyId='+ArbitrationPartyId+'&IsVideoStart='+isvideostart, options).pipe<any>(map(res => res));
}
UpdateStatusOfAllonEndCallByHost(AID :any){
  this.GetDecryptedData();
  
  let headers = new HttpHeaders()
    .set("Accept", 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.decryptiondata);
   let options = { headers: headers };
   return this.http.get(this.appConfig.url + '/Video/InsertIsVideoStartStatus?AID='+AID, options).pipe<any>(map(res => res));
 
 }
 ChangeArbPartyPvtCallStatus(ArbId:any,UserId:any,PvtId:any)
{
    // console.log(ArbId,UserId,"GetMyArbitrationPartyDetails");
   
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Video/ChangeArbitrationPartyPrivateCallStatus?Id='+UserId+'&ArbId='+ArbId+'&PvtId='+PvtId, options).pipe<any>(map(res => res));

  // return this.http.get(this.appConfig.url+'/VideoCall?MainCallId=',VideoCallId).pipe<any>(map(res => res));
}
// change isprivatecall value
ChangeisPvtCallStatus(PrivateCallId:number,Id:number,IsPrivateCall:any)
{
  this.GetDecryptedData();
  
  let headers = new HttpHeaders()
    .set("Accept", 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.decryptiondata);
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Video/UpdateIsPrivateCallIdForStart?Id='+Id+'&PrivateCallId='+PrivateCallId+'&IsPrivateCall='+IsPrivateCall, options).pipe<any>(map(res => res));
}
UpdateTokenandChannelformeonly(Id:any,VideoCallChannel:any,VideoCallToken:any){
  this.GetDecryptedData();
  
  let headers = new HttpHeaders()
    .set("Accept", 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.decryptiondata);
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Video/RestartMeeting?Id='+Id+'&VideoCallToken='+encodeURIComponent(VideoCallToken)+'&VideoCallChannel='+VideoCallChannel, options).pipe<any>(map(res => res));

}


UpdateVideocallForAcceptedUsersOnly(LoginUserId:number,VideoCallId:number,AcceptedId:any)
  {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/VideoCall?LoginUserId='+LoginUserId+'&VideoCallId='+VideoCallId+'&AcceptedId='+AcceptedId, options).pipe<any>(map(res => res));
  }


}