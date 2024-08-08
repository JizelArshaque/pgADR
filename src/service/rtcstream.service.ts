import AgoraRTC, { IAgoraRTCClient, LiveStreamingTranscodingConfig, ICameraVideoTrack, IMicrophoneAudioTrack, ScreenVideoTrackInitConfig, VideoEncoderConfiguration, AREAS, IRemoteAudioTrack, ClientRole, } from "agora-rtc-sdk-ng"
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { catchError, retry, take } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
// import { ApiService } from './api.service';
import { EMPTY } from 'rxjs';

;
import { Router } from "@angular/router";
import { AppConfig } from "src/class/AppCofig";


export interface IUser {
  uid: number;
  name?: string;
  audioTrack?: any; // Add audioTrack property
  videoTrack?: any; // Add videoTrack property
}
export interface IRtc {
  client: IAgoraRTCClient | null |undefined |''|0,
  localAudioTrack: IMicrophoneAudioTrack | null |undefined|''|0,
  localVideoTrack: ICameraVideoTrack | null |undefined|''|0,
  
}

@Injectable({
    providedIn: 'root'
  })
  export class RtcstreamService {
    appconfig=new AppConfig();
    SharedEvent: EventEmitter<any> = new EventEmitter();
    screenStream: any;
    ArbitrationParties:any =[];
    usertype:any =[];
    Respondants:any =[];
    [x: string]: any;

    public token = new Subject<string>();
    HostId:number = 0;
    currentUser :number= 0;


    
    constructor(public http:HttpClient,
      
      // public api: ApiService,
      // public userService:UserService,
        private router: Router,) { }
      audioDevices:any =[];

    rtc: IRtc = {
        // For the local client.
        client: null,
        // For the local audio and video tracks.
        localAudioTrack: null,
        localVideoTrack: null,
      
      };
      options = {
        appId: "eae708a57586481da3a59a10b17490a3",  // set your appid here
        
        channel: "host_ggg", // Set the channel name. merin
        // channel: "host_gg",
        // token: '', // Pass a token if your project enables the App Certificate.
        // uid: null
        role:'host'
      };
      remoteUsers: IUser[] = [];       // To add remote users in list
      updateUserInfo = new BehaviorSubject<any>(null); // to update remote users name
    
    
      createRTCClient(host_id:any) {
        this.HostId = host_id;
        // this.currentUser = JSON.parse(`${localStorage.getItem('user')}`).Id;
        // localStorage.removeItem('removedRemoteuserId');
        this.rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
     
        
      }
    
      async getConnectedDevices() {
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const audioDevices = devices.filter(device => device.kind === 'audioinput');
          const videoDevices = devices.filter(device => device.kind === 'videoinput');
          const outputDevices = devices.filter(device => device.kind === 'audiooutput');
    
          console.log('Audio Devices:', audioDevices);
          console.log('Video Devices:', videoDevices);
          console.log('Output Devices:', outputDevices);
    
          return { audioDevices, videoDevices, outputDevices };
        } catch (error) {
          console.error('Error enumerating devices:', error);
          return null;
        }
      }
      // To join a call with tracks (video or audio)
      async localUser(token: any, Channel: any, uuid: any, videoState: any, audioState: any, usertype: any) {
        console.log(this.options.appId, Channel, token, uuid, "oooo");
    
        if (this.rtc.client) {
            const uid = await this.rtc.client.join(this.options.appId, Channel, token, uuid);
    
            // Add the event handler for token expiration
            this.rtc.client.on("token-privilege-will-expire", () => {
                console.log("Token will expire soon");
            });
        }
    
        // Create an audio track from the audio sampled by a microphone.
        this.rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    
        // Get the list of available audio playback devices (speakers)
        const playbackDevices = await AgoraRTC.getPlaybackDevices();
    
        // Assuming you want to use the first available playback device, you can choose the device ID
        const selectedPlaybackDeviceId = playbackDevices[0].deviceId;
    
        // Set the audio output to the selected playback device
        this.rtc.localAudioTrack.setPlaybackDevice(selectedPlaybackDeviceId);
    
        // Create a video track from the video captured by a camera.
        this.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
            optimizationMode: "motion"
        });
    
        if (videoState == "enabled") {
            this.rtc.localVideoTrack.setEnabled(true);
        }
        if (videoState === "disabled") {
            this.rtc.localVideoTrack.setEnabled(false);
        }
        if (audioState == "enabled") {
            this.rtc.localAudioTrack.setEnabled(true);
        }
        if (audioState === "disabled") {
            this.rtc.localAudioTrack.setEnabled(false);
        }
    
        // Publish the local audio and video tracks to the channel.
        const userId = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;
    
        const userVideoCliamnt = 'uservideoClaimant';
        const userVideoRespondant = 'uservideoRespondant';
        const uservideoAdmin = 'uservideoAdmin';
        const userVideoArbitrator = 'uservideoArbitrator';
    
        if (usertype == 'claimant') {
            this.rtc.localVideoTrack.play('uservideoClaimant' + userId);
        } else if (usertype == 'respondent') {
            this.rtc.localVideoTrack.play('uservideoRespondant' + userId);
        } else if (usertype == 'admin') {
            this.rtc.localVideoTrack.play('uservideoAdmin' + userId);
        } else if (usertype == 'arbitrator') {
            this.rtc.localVideoTrack.play('uservideoArbitrator' + userId);
        } else {
            console.log("Condition not met");
        }
    
        if (this.rtc.client) {
            await this.rtc.client.publish([this.rtc.localAudioTrack, this.rtc.localVideoTrack]);
        }
    }
    
    
      agoraServerEvents(rtc: any, ArbitrationParties: any,imInPvtCall:any) {
        // alert('serverev'+imInPvtCall)
        // Event listener for "user-published"
        // console.log("jj")
        rtc.client.on("user-published", async (user: any, mediaType: any) => {
          console.log(user, mediaType, 'user-published');
      // alert(user.uid)
          await rtc.client.subscribe(user, mediaType);
      
          if (mediaType === "video") {
            const remoteVideoTrack = user.videoTrack;
            rtc.client.setRemoteVideoStreamType(remoteVideoTrack, 0);
      
            // Find the user's type and side
            const userParty = ArbitrationParties.find((party: any) => party.Id === user.uid);
            // alert(userParty)
            if (userParty) {
             
              const userType = userParty.Type;
              const userSide = userParty.Side;
              const isprivatecall = userParty.IsPrivateCall;
            if(imInPvtCall){
              // alert(imInPvtCall+" "+userType+" "+userSide)
              if ((userType === 0 || userType === 2) && userSide === 1 && (isprivatecall == 2 || isprivatecall == 10)) {
                // Respondant
                remoteVideoTrack.play('uservideoRespondant' + user.uid);
              } else if ((userType === 0 || userType === 2) && userSide === 0 && (isprivatecall == 2 || isprivatecall == 10)) {
                // Claimant
                remoteVideoTrack.play('uservideoClaimant' + user.uid);
              } else if (userType === 3 && userSide === 0 && (isprivatecall == 2 || isprivatecall == 10)) {
                // Arbitrator
                remoteVideoTrack.play('uservideoArbitrator' + user.uid);
              } else if ((userType === 4 || userType === 5) && userSide === 0 && (isprivatecall == 2 || isprivatecall == 10)) {
                // Arbitrator
                remoteVideoTrack.play('uservideoAdmin' + user.uid);
              }else {
                // Handle other cases if needed
                console.log("User type and side not specified in the conditions.");
                // localStorage.clear();
              }
            }else{
              // alert("serve else"+userType+userSide+imInPvtCall)
              if ((userType === 0 || userType === 2) && userSide === 1) {
                // Respondant
                remoteVideoTrack.play('uservideoRespondant' + user.uid);
              } else if ((userType === 0 || userType === 2) && userSide === 0) {
                // Claimant
                remoteVideoTrack.play('uservideoClaimant' + user.uid);
              } else if (userType === 3 && userSide === 0) {
                // Arbitrator
                // alert("hi")
                remoteVideoTrack.play('uservideoArbitrator' + user.uid);
              } else if ((userType === 4 || userType === 5)  && userSide === 0) {
                // Arbitrator
                remoteVideoTrack.play('uservideoAdmin' + user.uid);
              }else {
                // Handle other cases if needed
                console.log("User type and side not specified in the conditions.");
                localStorage.clear();
              }
            }
             
            } else {
              console.log("User not found in ArbitrationParties.");
            }
          }
      
          if (mediaType === "audio") {
            const remoteAudioTrack = user.audioTrack;
            remoteAudioTrack.play();
          }
     
        });
      
        // Event listener for "user-joined"
        rtc.client.on("user-joined", (user: any) => {
          let id = user.uid;
          this.remoteUsers.push({ 'uid': +id, 'name': 'New User' });
          this.updateUserInfo.next(id);
          console.log(user, "user-joined", this.remoteUsers);
        });
      
        // Event listener for "user-unpublished"
        rtc.client.on("user-unpublished", (user: any) => {
          console.log(user, 'user-unpublished');
        });
      
        // Event listener for "user-left"
        rtc.client.on("user-left", (user: any) => {
          let id = user.uid;
          let index = this.remoteUsers.findIndex(user => user.uid === id);
      
          if (index !== -1) {
            this.remoteUsers.splice(index, 1);
          }
          console.log(user, 'user-left channel');
        });
      }
      changeAudioOutputDevice(deviceId: string): void {
        // Assuming this.rtc is your RTC object
        console.log(deviceId,'deviceId');
        
        if (this.rtc.client) {
          const audioTracks = this.rtc.localAudioTrack ? [this.rtc.localAudioTrack] : [];
          const videoTracks = this.rtc.localVideoTrack ? [this.rtc.localVideoTrack] : [];
    
          // Unpublish and then republish with the updated device
          this.rtc.client.unpublish([...audioTracks, ...videoTracks]);
          this.rtc.localAudioTrack && this.rtc.client.publish([this.rtc.localAudioTrack]);
          this.rtc.localVideoTrack && this.rtc.client.publish([this.rtc.localVideoTrack]);
          
          // Set the audio output device for the local audio track
          if (this.rtc.localAudioTrack) {
            (this.rtc.localAudioTrack as any).setPlaybackDevice(deviceId);
          }
    
          console.log('Audio output device changed:', deviceId);
        } else {
          console.error('RTC client not initialized.');
        }
      }
      async changeAudioTrack() {
        try {
          // Create a new microphone audio track
          const newAudioTrack: IMicrophoneAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
          
          // Close the existing local audio track if it exists
          if (this.rtc.localAudioTrack) {
            this.rtc.localAudioTrack.close();
          }
          
          // Replace the existing local audio track with the new one
          this.rtc.localAudioTrack = newAudioTrack;
          
          console.log('Audio track changed successfully:', this.rtc.localAudioTrack);
        } catch (error) {
          console.error('Error changing audio track:', error);
        }
      }

      // To leave channel-
      async leaveCall() {
        // Destroy the local audio and video tracks.
        if(this.rtc.localAudioTrack){
            this.rtc.localAudioTrack.close();

        }
        if(this.rtc.localVideoTrack){
            this.rtc.localVideoTrack.close();
    
        }
        // Traverse all remote users.
        if(this.rtc.client){
         
           
              // Leave the channel.
              await this.rtc.client.leave();
              localStorage.removeItem('videocalluserId');
              localStorage.removeItem('videocallid');
              localStorage.removeItem('cardid');
              localStorage.removeItem('hostid');
              localStorage.removeItem('Audioout');
              // this.router.navigate(['home']);
              console.log("user left from service");
              
        }
       
    
      }
    
      // rtc token
      async generateTokenAndUid(uid:any) {
    
       
    
        return { 'uid': uid, 
        token: '007eJxTYKjZmZdceGtGrKB29ey29ANzE24sOK7qNSlbvrW+7tgdr8UKDAZmBsbJZgZpacbJFiamlolJJgbJ5okWJsYpqUlpqakmrm6NKQ2BjAx+B9cxMzJAIIjPwZCRX1wSn56ezsAAAPaEIa4=' //merin
        // token: '007eJxTYFg8ZeWDhr8lVtm7BZ98vZxvJRZ6cum6ShanHNf1+1paxToVGAzMDIyTzQzS0oyTLUxMLROTTAySzRMtTIxTUpPSUlNNeN0aUxoCGRkW69xnZGSAQBCfnSEjv7gkPj2dgQEABtohYw=='
      }


    
      }
      async leaveCallonPrivateCallJoin() {
        // Destroy the local audio and video tracks.
        if(this.rtc.localAudioTrack){
            this.rtc.localAudioTrack.close();
    
        }
        if(this.rtc.localVideoTrack){
            this.rtc.localVideoTrack.close();
    
        }
        if(this.rtc.client){
        
              // Leave the channel.
         await this.rtc.client.leave();
             
              
        }
       
    
      }
      generateUid() {
        let length = 5;
        // const randomNo = JSON.parse(`${localStorage.getItem('user')}`).Id;
        
        const randomNo = (Math.floor(Math.pow(10, (length)-1) + Math.random() * 9 * Math.pow(10, length -1)));
        return randomNo;
      }
      onCameraChanged(){
        AgoraRTC.onCameraChanged = (info) => {
          console.log("camera changed!", info.state, info.device);
        };
      }
     
      onMicrophoneChanged(){
        AgoraRTC.onMicrophoneChanged = (info) => {
          console.log("microphone changed!", info.state, info.device);
        };
      }
      
      onPlaybackDeviceChanged(){
        AgoraRTC.onPlaybackDeviceChanged = (info) => {
          console.log("speaker changed!", info.state, info.device);
        };
      }
     


      muteAudio() {
        if (this.rtc.localAudioTrack) {
          this.rtc.localAudioTrack.setEnabled(false);
          // this.rtc.mute = true;
        }
      }
    
      unmuteAudio() {
        if (this.rtc.localAudioTrack) {
          this.rtc.localAudioTrack.setEnabled(true);
          // this.rtc.mute = false;
        }
      }
      muteVideo() {
        if (this.rtc.localVideoTrack) {          
          this.rtc.localVideoTrack.setEnabled(false);
          // this.rtc.mute = true;
        }
      }
    
      unmuteVideo(Type: any, Side: any,Id:any) {
        // alert('hi'+Type+Side+Id)
        // console.log(Type);
        // console.log(Side);
        // console.log(Id);
    
        if (this.rtc.localVideoTrack) {
            // console.log(this.rtc.localVideoTrack);
            this.rtc.localVideoTrack.setEnabled(true);
    
            // Set th console.log(Id);e video source based on the conditions
            if ((Type === 0 && Side === 1) || (Type === 2 && Side === 1)) {
              // alert('uservideoRespondant'+ Id)
                this.rtc.localVideoTrack.play('uservideoRespondant'+ Id);
            } else if ((Type === 0 && Side === 0) || (Type === 2 && Side === 0)) {
              // alert('uservideoClaimant'+ Id)
              // let path='uservideoClaimant'+ Id.toString();
                this.rtc.localVideoTrack.play('uservideoClaimant'+ Id.toString());
                // this.rtc.localVideoTrack.play('uservideoClaimant225');

            } else if ((Type === 3 && Side === 0) || (Type === 2 && Side === 0)) {
              // alert('uservideoArbitrator'+ Id)
                this.rtc.localVideoTrack.play('uservideoArbitrator'+ Id);
            } else if ((Type === 4 || Type === 5)  && Side === 0) {
              // alert('uservideoAdmin'+ Id)
                this.rtc.localVideoTrack.play('uservideoAdmin'+ Id);
            }
        }
    }
    
      showSelfVideoinUmute(Type: any, Side: any,Id:any){
        if (this.rtc.localVideoTrack) {
          this.rtc.localVideoTrack.setEnabled(true);
          // this.rtc.localVideoTrack.play("video-holder");
          if ((Type === 0 && Side === 1) || (Type === 2 && Side === 1)) {
            // alert('uservideoRespondant'+ Id.uid)
              this.rtc.localVideoTrack.play('uservideoRespondant'+ Id.uid);
          } else if ((Type === 0 && Side === 0) || (Type === 2 && Side === 0)) {
            // alert('uservideoClaimant'+ Id.uid)
              this.rtc.localVideoTrack.play('uservideoClaimant'+ Id.uid);
          } else if ((Type === 3 && Side === 0) || (Type === 2 && Side === 0)) {
            // alert('uservideoArbitrator'+ Id.uid)
              this.rtc.localVideoTrack.play('uservideoArbitrator'+ Id.uid);
          } else if ((Type === 4 || Type === 5)  && Side === 0) {
            // alert('uservideoAdmin'+ Id.uid)
              this.rtc.localVideoTrack.play('uservideoAdmin'+ Id.uid);
          }
      
        }
      }

      async muteRemoteUserAudio(uid:any,rtc:any){
        const remoteUser = this.remoteUsers.find(user => user.uid == uid);
        if (remoteUser) {
          await  rtc.client.muteRemoteAudio(uid, true);
          remoteUser.audioTrack.setEnabled(false);

        }

      }
      async unmuteRemoteUserAudio(uid:any,rtc:any) {
        const remoteUser = this.remoteUsers.find(user => user.uid === uid);
        if (remoteUser) {
          await  rtc.client.muteRemoteAudioStream(remoteUser.uid, false);
        }
      }
      async muteRemoteUserVideo(uid:any,rtc:any){
        const remoteUser = this.remoteUsers.find(user => user.uid == uid);
        if (remoteUser) {
          await  rtc.client.muteRemoteAudioStream(remoteUser.uid, true);
        }

      }
      
      async unmuteRemoteUserVideo(uid:any,rtc:any) {
        const remoteUser = this.remoteUsers.find(user => user.uid === uid);
        if (remoteUser) {
          await  rtc.client.muteRemoteAudioStream(remoteUser.uid, false);
        }
      }
      // create a screen-sharing stream
      // async  startScreenSharing(rtc:any,uid:any) {
      //   // create a screen-sharing stream with the screen sharing extension
      //   this.screenStream = await AgoraRTC.createScreenVideoTrack({
      //     encoderConfig: {
      //       width: 1920,
      //       height: 1080,
      //       frameRate: 30,
      //       // bitrate: 1500,
      //     },
      //   });
      //   // alert(uid)
      //   localStorage.setItem('screenshareduser',uid)
      //   // publish the screen-sharing stream
      
      //   try {
      //     // First, unpublish the camera track if it's currently being published
      //     if (this.rtc.localVideoTrack) {
      //       rtc.client.unpublish(this.rtc.localVideoTrack);
      //     }
      //     alert(localStorage.getItem('screenshareduser'))
      //     await rtc.client.publish(this.screenStream);
        
          
      //     console.log('Successfully published screen-sharing stream');

      //   } catch (error) {
      //     console.error('Failed to join or publish:', error);
      //     return;
      //   }

      //   this.screenStream.on('track-ended', async () => {
      //     console.log('Screen sharing stopped');
      //     localStorage.removeItem('screenshareduser');
      //     if (this.rtc.localVideoTrack) {
      //       rtc.client.unpublish(this.screenStream);
      //     }
      //     this.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
      //       encoderConfig: "720p_3",
      //     });
      //     await rtc.client.publish(this.rtc.localVideoTrack);
      //     this.agoraServerEvents(rtc,this.ArbitrationParties);
      //     console.log(this.ArbitrationParties);
          
      //     // Get the video element with the id="userid"
      //     const videoElement = document.getElementById("uservideo");
          
      //     // Set the video element's srcObject to the local video track
      //     if(videoElement){
      //       this.rtc.localVideoTrack.play("uservideo");

      //     }
      //     // Perform any necessary actions when the sharing stops
      //     // ...
      //   });
      //     // Start checking the screen sharing status periodically
          
      // }

GetAgoraToken(params:any) {
  let log = this.appconfig.ChatServerLink+"/rtcToken";
  return this.http.get<any>(log, { params }).pipe<any>(map(res => res));
}

// GenerateRTCToken(params:any){
//   let log = "http://localhost:8080/rtcToken";
//   return this.http.get<any>(log, { params }).pipe<any>(map(res => res));
// }


}
  // this.userService.GetAllUserDetailsWithId(id).subscribe(
          //   (data:any) => {
          //   if (data.length > 0) {
          //     this.remoteUsers.push({ 'uid': +id,'name':data[0].Name});
             
          //   } else{
          //     this.remoteUsers.push({ 'uid': +id,'name':'New User'});
              
          //   }
          //   this.updateUserInfo.next(id);
          //     console.log("user-joined", user, this.remoteUsers, 'event1');
          //   });
         

  
  