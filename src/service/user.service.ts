import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { AppConfig } from 'src/class/AppConfig';
import { map, retry, catchError } from "rxjs/operators";
import { Card } from 'src/class/Card';
import { Users } from 'src/class/Users';
import { EMPTY } from 'rxjs';
import { AppConfig } from 'src/class/AppCofig';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  appconfig=new AppConfig();
  constructor(public http:HttpClient) { 
  }

  InsertUser(user:Users){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.post(this.appconfig.url+"/User",user,options).pipe<any>(map(res=>res));
  }


  GetAllUserDetailsWithId(userid:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/User?userid="+userid, options).pipe(retry(3),catchError((error: HttpErrorResponse) => {return EMPTY}),map(res=>res));
  }

  
  UserLoginCheck(username:any,password:any,PhoneCode:any,type:any){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json'); 
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/UserCreation?UserName="+username+'&Password='+encodeURIComponent(password)+'&PhoneCode='+PhoneCode+'&Type='+type, options).pipe<any>(map(res=>res));
  }
  UserAccountByEmail(email:any){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json'); 
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/UserCreation?email="+email,options).pipe<any>(map(res=>res));
  }
  UserAccountByMobileandPhonecode(mobile:any,phonecode:any){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json'); 
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/UserCreation?mobile="+mobile+'&phonecode='+phonecode,options).pipe<any>(map(res=>res));
  }


  ForgotPassword(username:any,Code:any){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/User?forgotUserName="+username+'&Code='+Code,options).pipe<any>(map(res=>res));
  }

  ResendOtp(userid:number,type:any){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };  
    return this.http.get(this.appconfig.url+"/User?Id="+userid+'&Type='+type, options).pipe<any>(map(res=>res));
  }

  ResendProfileOtp(userid:number,type:any,userstring:any){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };  
    return this.http.get(this.appconfig.url+"/User?Id="+userid+'&Type='+type+'&userstring='+userstring, options).pipe<any>(map(res=>res));
  }

  VerifyAccountWithOtp(userid:number,Otp:any,type:any){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/User?Id="+userid+'&Password='+encodeURIComponent(Otp)+'&Type='+type, options).pipe<any>(map(res=>res));
  }
  VerifyProfileUpdateWithOtp(userid:number,Otp:any,type:any,userstring:any){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/User?Id="+userid+'&Password='+encodeURIComponent(Otp)+'&Type='+type+'&userstring='+userstring, options).pipe<any>(map(res=>res));
  }

  ResetPassword(userid:number,password:any){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/User?ResetUserId="+userid+'&ResetPassword='+encodeURIComponent(password), options).pipe<any>(map(res=>res));
  }


  ResetPasswordWhileRegister(password:any,userid:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/ResetPassword?Password="+encodeURIComponent(password)+'&UserId='+userid, options).pipe<any>(map(res=>res));
  }


  InsertUserFromAdmin(user:Users){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.post(this.appconfig.url+"/UserCreation",user,options).pipe<any>(map(res=>res));
  }


  GetAllUsers(){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/UserCreation", options).pipe<any>(map(res=>res));
  }


  InsertFranchisee(user:Users){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.post(this.appconfig.url+"/Franchisee",user,options).pipe<any>(map(res=>res));
  }


  GetAllFranchisee(){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/Franchisee", options).pipe<any>(map(res=>res));
  }

  
  GetAllFranchiseewithCreator(creatorid:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/Franchisee?CreatorId="+creatorid, options).pipe<any>(map(res=>res));
  }

  GetAllSubadmins(){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/Subadmin", options).pipe<any>(map(res=>res));
  }

  GetAllPages(){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/Subadmin?Pages=0", options).pipe<any>(map(res=>res));
  }
  GetAllUserRightMapingWithUserId(userid:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/Subadmin?UserId="+userid, options).pipe<any>(map(res=>res));
  }

  InsertSubadmin(user:Users){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.post(this.appconfig.url+"/Subadmin",user,options).pipe<any>(map(res=>res));
  }
  UpdateProfile(id:number,userstring:any,type:any,PhoneCode:any,name:any){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/User?Id="+id+'&userstring='+userstring+'&type='+type+'&pcode='+PhoneCode+'&name='+name, options).pipe<any>(map(res=>res));
  } 
  CreateFranchiseorUser(userid:number,usertype:any){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/FranchiseeCreation?UserId="+userid+"&UserType="+usertype, options).pipe<any>(map(res=>res));
  }
}
