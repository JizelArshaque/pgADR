import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import {AppConfig} from '../class/AppConfig';
import { map } from 'rxjs/operators';
// import { UserDetailsAndTargetAudience } from 'src/class/UserDetailsAndTargetAudience';
import { VideoCall } from 'src/class/VideoCall';
import { VideoCallChat } from 'src/class/VideoCallChat';
import { VideoStoreOrder } from 'src/class/VideoStoreOrder';
// import { Test } from 'src/class/Test';
import { VideoStoreOrderItemss } from 'src/class/VideoStoreOrderItemss';
import { VideoCallHandRaise } from 'src/class/VideoCallHandRaise';
import { AppConfig } from 'src/class/AppCofig';
import { TokenEncryptionService } from '../service/token-encryption.service';




@Injectable()
export class TestProvider {
  appConfig = new AppConfig();
  decryptiondata: any;

  constructor(public http: HttpClient,public tokenservice: TokenEncryptionService) {
   
  }

  GetDecryptedData() {
    this.decryptiondata = this.tokenservice.DecryptToken();
  }

  // InsertTest(test:Test){
  //   let headers = new HttpHeaders();
  //   headers.append("Accept", 'application/json');
  //   headers.append('Content-Type', 'application/json');
  //   let options = { headers: headers };
  //   return this.http.post(this.appConfig.url+'/Test',test,options).pipe<any>(map(res => res));
  // }
  spGetAllScales()
  {
    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/QuestionSections', options).pipe<any>(map(res => res));
  }

  GetAllCategoryWithUserId(userid:number,type:number)
  {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/TestCategory?userid='+userid+'&type='+type, options).pipe<any>(map(res => res));
  }
  InsertVideoCall(video:VideoCall){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.post(this.appConfig.url+'/VideoCall',video,options).pipe<any>(map(res => res));
  }
  InsertVideoCallChat(videochat:VideoCallChat){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.post(this.appConfig.url+'/VideoCallChat',videochat,options).pipe<any>(map(res => res));
  }
  InsertVideoAttatchment(data:FormData){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.post(this.appConfig.url+'/VideoCallChatUpload',data,options).pipe<any>(map(res => res));

  }
  GetAllVideoChatwithVideoCallId(Id:any)
  {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/VideoCallChat?videocallid='+Id, options).pipe<any>(map(res => res));
  }
  InsertVideoChatOrder(  videostoreorder:VideoStoreOrder)
  {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.post(this.appConfig.url+'/VideoStoreOrder',videostoreorder,options).pipe<any>(map(res => res));
  }
  UpdateVideoChatOrder(  videostoreorder:VideoStoreOrder)
  {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.post(this.appConfig.url+'/VideoStoreOrderItems',videostoreorder,options).pipe<any>(map(res => res));
  }
  UpdateVideoStoreOrderItems( Id:any,Qty:any)
  {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url+'/VideoStoreOrder?Id='+Id+'&Quantity='+Qty+'&flag=0',options).pipe<any>(map(res => res));
  }
  GetVideoStoreOrderItems(VideoStoreOrderId:any,ClientUserId:any)
  {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/VideoStoreOrderItems?VideoStoreOrderId='+VideoStoreOrderId+'&ClientUserId='+ClientUserId, options).pipe<any>(map(res => res));
  }
  GetVideoStoreOrderItemsByVideoCallId(VideoCallId:any)
  {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/VideoStoreOrderItems?VideoCallId='+VideoCallId, options).pipe<any>(map(res => res));
  }
  GetVideoStoreOrder(VideoCallId:any,userid:any)
  {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/VideoStoreOrder?VideoCallId='+VideoCallId+'&ClientUserId='+userid, options).pipe<any>(map(res => res));
  }

  GetAllVideoCallWithUserId(UserId:number,Type:number)
  {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/VideoCall?UserId='+UserId+'&Type='+Type, options).pipe<any>(map(res => res));
  }
  DeleteVideCall(Id:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/VideoCall?Id='+Id, options).pipe<any>(map(res => res));
  }

  GetAllCategoryWithUserIdAndSurveyMode(userid:number,mode:any)
  {
   
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/TestCategory?userid='+userid+'&Mode='+mode, options).pipe<any>(map(res => res));
  }
  GetAllSubCategoryWithCategoryId(categoryid:number)
  {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/TestCategory?categoryid='+categoryid, options).pipe<any>(map(res => res));
  }
  GetAllSubCategoryWithTestId(testid:number)
  {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/SubCategory?testid='+testid, options).pipe<any>(map(res => res));
  }

  GetAllTestWithUserId(userid:number,type:any){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/Test?userid='+userid+'&Type='+type, options).pipe<any>(map(res => res));
 
  }
  GetAllTestWithUserIdForSurvey(userid:number,Mode:any){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/Test?userid='+userid+'&Mode='+Mode, options).pipe<any>(map(res => res));
 
  }
  GetAllTestDetailsWithTestId(testid:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/Test?testid='+testid+'&Flag=0', options).pipe<any>(map(res => res));
 
  }
 
  DeleteTest(Id:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/Test?id='+Id, options).pipe<any>(map(res => res));
  }

  GetAllTestBatteries()
  {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/TestBatteries', options).pipe<any>(map(res => res));
  }

  GetAllTestBatteriesWithUserId(userid:number){

    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/TestBatteries?userid='+userid, options).pipe<any>(map(res => res));

  }

  // InsertTestBatteries(testbatteries:TestBatteries){
  //   let headers = new HttpHeaders();
  //   headers.append("Accept", 'application/json');
  //   headers.append('Content-Type', 'application/json');
  //   let options = { headers: headers };
  //   return this.http.post(this.appConfig.url+'/TestBatteries',testbatteries,options).pipe<any>(map(res => res));

  // }

  DeleteTestBatteries(id:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.get(this.appConfig.url + '/TestBatteries?id='+id, options).pipe<any>(map(res => res));
  }

GetAllTestsWithTestBatteriesId(testbatteriesid:number){

  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/TestBatteries?testbatteriesid='+testbatteriesid, options).pipe<any>(map(res => res));

}

GetAllTestStatusWithTestId(testid:number){
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Test?teststatus='+testid, options).pipe<any>(map(res => res));
}


// InsertTargetAudience(targetaudience:UserDetailsAndTargetAudience){
//   let headers = new HttpHeaders();
//   headers.append("Accept", 'application/json');
//   headers.append('Content-Type', 'application/json');
//   let options = { headers: headers };
//   return this.http.post(this.appConfig.url+'/TargetAudience',targetaudience,options).pipe<any>(map(res => res));

// }


GetAllTargetAudienceWithTestId(testid:number){
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Test?TestId='+testid, options).pipe<any>(map(res => res));
}

GetAllTargetAudienceUserDetailsWithTestId(testid:number){
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/TargetAudience?UserDetailsTestId='+testid, options).pipe<any>(map(res => res));
}

DeleteTargetAudienceAndUserDetails(Id:number){
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/TargetAudience?Id='+Id, options).pipe<any>(map(res => res));
}

ExportTest(Id:number){
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/TestExport?TestId='+Id, options).pipe<any>(map(res => res));
}

ArchiveTest(ArchiveId:number){
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Test?archiveid='+ArchiveId, options).pipe<any>(map(res => res));
}

GetAllTestBatteryResultWithTrainerId(trainerid:number){
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/TestBatteryReport?TrainerId='+trainerid, options).pipe<any>(map(res => res));
}

GetAllTestBatterySubscriptionWithCode(testbatterycode:number,testbatteriesid:number,userid:number){
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/TestBatteryLink?testbatterycode='+testbatterycode+'&testbatteriesid='+testbatteriesid+'&userid='+userid, options).pipe<any>(map(res => res));
}

GetAllAssignedTestBatteryWithTrainerId(trainerid:number){
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/TestBatteryResult?trainerid='+trainerid, options).pipe<any>(map(res => res));
}

GetAllTestBatteryAttendedUsers(testbatteriesid:number,trainerid:number){
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/TestBatteryResult?TestBatteriesId='+testbatteriesid+'&TrainerId='+trainerid, options).pipe<any>(map(res => res));
}

GetAllTestBatteryAttempts(userid:number,testbatteriesid:number){
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/TestBatteryResult?UserIdForAttempts='+userid+'&TestBatteriesIdForAttempts='+testbatteriesid, options).pipe<any>(map(res => res));
}

GetAllTestBatteryAttendedTests(userid:number,testbatteriesid:number,testbatterycode:number){
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/TestBatteryResult?AttendUserId='+userid+'&AttendTestBatteryId='+testbatteriesid+'&AttendTestBatteryCode='+testbatterycode, options).pipe<any>(map(res => res));
}

GetAllTestBatteryRemarks(userid:number,testbatteriesid:number,testbatterycode:number){
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/TestBatteryResult?RemarksUserId='+userid+'&RemarksTestBatteriesId='+testbatteriesid+'&RemarksTestBatteryCode='+testbatterycode, options).pipe<any>(map(res => res));
}

// InsertTestBatteryRemark(testbatteries:TestBatteries){
//   let headers = new HttpHeaders();
//   headers.append("Accept", 'application/json');
//   headers.append('Content-Type', 'application/json');
//   let options = { headers: headers };
//   return this.http.post(this.appConfig.url+'/TestBatteryRemarks',testbatteries,options).pipe<any>(map(res => res));

// }

GetSavedTestBatteryRemarks(userid:number,testbatterycode:number,testbatteriesid:number){
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/TestBatteryRemarks?UserId='+userid+'&TestBatteryCode='+testbatterycode+'&TestBatteriesId='+testbatteriesid,options).pipe<any>(map(res => res));
}

// ValidateTestBatteryRemark(testbatteries:TestBatteries){
//   let headers = new HttpHeaders();
//   headers.append("Accept", 'application/json');
//   headers.append('Content-Type', 'application/json');
//   let options = { headers: headers };
//   return this.http.post(this.appConfig.url+'/ValidateTestBatteryRemark',testbatteries,options).pipe<any>(map(res => res));

// }

GetRespondentsDetailsAnswered(testbatteriesid:number,userid:number,testbatterycode:number){
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Examination?DataTestBatteriesId='+testbatteriesid+'&DataUserId='+userid+'&DataTestBatteryCode='+testbatterycode, options).pipe<any>(map(res => res));
}
InsertVideoCallHandRaise(videocallhandraise:VideoCallHandRaise){

 
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.post(this.appConfig.url+'/VideoCallHandRaise',videocallhandraise,options).pipe<any>(map(res => res));
}
GetAllVideoCallHandRaiseId(UserId:any,VideoCallId:any)
{
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/VideoCallHandRaise?UserId='+UserId+'&VideoCallId='+VideoCallId+'&flag=0', options).pipe<any>(map(res => res));
}
UpdateAllVideoCallHandRaiseId(UserId:any,VideoCallId:any)
{
  let x;
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/VideoCallHandRaise?UserId='+UserId+'&VideoCallId='+VideoCallId, options).pipe<any>(map(res => res));
}
ClearAllVideoCallHandRaise(VideoCallId:any)
{
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/VideoCallHandRaise?VideoCallId='+VideoCallId, options).pipe<any>(map(res => res));
}
GetVideocallwithId(VideoCallId:any)
{
  this.GetDecryptedData();
  
  let headers = new HttpHeaders()
    .set("Accept", 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.decryptiondata);

  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Video/GetAllVideoCallPaymentsWithVideocallId?VideoCallId='+VideoCallId, options).pipe<any>(map(res => res));
}
sendMail(Email:any,Subject:any)
  {
   
      let headers=new HttpHeaders();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      let options ={ headers: headers };
      // return this.http.get(this.appConfig.url+'/ResetEmail',user,options).pipe<any>(map(res=>res));
      return this.http.post(this.appConfig.url+'/SendEmail?Email='+Email+'&Subject='+Subject,options).pipe<any>(map(res=>res));
 
  }
  GetVideocallwithSecretCode(SecretCode:any)
{

 
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/VideoCall?secretCode='+SecretCode, options).pipe<any>(map(res => res));
}
GetPrivateVideocallwithId(VideoCallId:any)
{
  let headers = new HttpHeaders();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/VideoCall?VideoCallId='+VideoCallId, options).pipe<any>(map(res => res));
}


InsertPrivateVideoCall(Arbitration:any){
 
  this.GetDecryptedData();
  
  let headers = new HttpHeaders()
    .set("Accept", 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.decryptiondata);

  let options = { headers: headers };
  return this.http.post(this.appConfig.url+'/Video/InsertUpdatePrivateVideo',Arbitration,options).pipe<any>(map(res => res));
}
GetAllPrivateVideoCallWithArbitrationId(ArbitrationId:number)
{
  this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Video/GetAllPrivateVideoCallWithArbitrationId?ArbitrationId='+ArbitrationId, options).pipe<any>(map(res => res));
}
GetAllParticipantsOfPvtCall(PrivateCallId:number)
{
  this.GetDecryptedData();
  
  let headers = new HttpHeaders()
    .set("Accept", 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.decryptiondata);

  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Video/GetAllPrivateVideoCallWithPrivateId?PrivateCallId='+PrivateCallId, options).pipe<any>(map(res => res));
}
UpdateOnStartPvtCall(ArbitrationId:number,PrivateCallId:number,VideocallToken:any,VideocallChannel:any)
{
  this.GetDecryptedData();
  
  let headers = new HttpHeaders()
    .set("Accept", 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.decryptiondata);

  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Video/InsertUpdateTokenandChannel?ArbitrationId='+ArbitrationId+'&PrivateCallId='+PrivateCallId+'&VideocallToken='+encodeURIComponent(VideocallToken)+'&VideocallChannel='+VideocallChannel, options).pipe<any>(map(res => res));
}
UpdateOnEndPvtCall(AID :number,PrivateCallId:number,VideocallToken:any,VideocallChannel:any)
{
  this.GetDecryptedData();
  
  let headers = new HttpHeaders()
    .set("Accept", 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.decryptiondata);

  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Video/InsertEndVideoCall?ArbId='+AID +'&PvtId='+PrivateCallId+'&VToken='+encodeURIComponent(VideocallToken)+'&VChannel='+VideocallChannel, options).pipe<any>(map(res => res));
}
addorremoveparticipanttoStartedpvtcall(Id:number,PvtId:number,IsPvtCall:number,Token:any,Channel:any)
{
  this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Video/AddParticipantstoStartedPrivateVideoCall?Id='+Id+'&PvtId='+PvtId+'&IsPvtCall='+IsPvtCall+'&Token='+encodeURIComponent(Token)+'&Channel='+Channel, options).pipe<any>(map(res => res));
}
addorremoveparticipanttopvtcall(Id:number,PvtId:number,IsPvtCall:number)
{
  // alert(Id+''+PvtId+""+IsPvtCall)
  this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);
  
    let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Video/AddParticipantstoPrivateVideoCall?Id='+Id+'&PvtId='+PvtId+'&IsPvtCall='+IsPvtCall, options).pipe<any>(map(res => res));
}
GetSinglePvtCallWithId(PvtId:number){
  this.GetDecryptedData();
  
  let headers = new HttpHeaders()
    .set("Accept", 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.decryptiondata);

  let options = { headers: headers };
  return this.http.get(this.appConfig.url + '/Video/GetAllPrivateCallfromPrivateVideo?PvtId='+PvtId, options).pipe<any>(map(res => res));

}
ChangeVideoStatusforJoinRequest(ArbId:any,PartyId:any){
  {

    this.GetDecryptedData();
  
    let headers = new HttpHeaders()
      .set("Accept", 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.decryptiondata);

    let options ={ headers: headers };
    return this.http.get(this.appConfig.url+'/Video/ChangeVideoStatusforJoinRequest?ArbId='+ArbId+'&PartyId='+PartyId, options).pipe<any>(map(res => res));
  }
}
}