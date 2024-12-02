import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/class/AppCofig';
import { TestProvider } from 'src/service/TestProvider';
//import { Socket } from 'ngx-socket-io';
import { ArbitrationServiceService } from '../arbitration-service.service';
import { Videocalluser } from 'src/service/Videocalluser.service';
@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.page.html',
  styleUrls: ['./waiting-room.page.scss'],
})
export class WaitingRoomPage implements OnInit {
  @ViewChild('toastDiv', { static: true }) toastDiv: ElementRef | undefined;
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef;
  appconfig = new AppConfig();
  SecreteCode:any;
  path:any
  IsVideoStart:any
  enableVideo: boolean = true;
  ArbitrationPartiesonly: any[] = [];
  UserName:any
  videoState: boolean = false;
  ArbitrationId:any;
  PartyId:any
  Videocameraoff: boolean = false;
  joinnowclicked: boolean = false;
  showToast: boolean = false;
  constructor(public videocallUserservice: Videocalluser,private arbitrationservice: ArbitrationServiceService,
    private renderer: Renderer2,private router: Router,public videochatservice: TestProvider) { }

  ngOnInit() {

 
    this.ReceiveSocket();
    const arbitrationDetails = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`);
    const user = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`);
  
    if (arbitrationDetails && user) {
      // Condition based on the values from local storage
      if (arbitrationDetails.SecureCode === 100) {
        // Do something specific when SecureCode is 100
        // You can add your logic here
   
      }
  
      // Set properties based on local storage values
      this.SecreteCode = arbitrationDetails.SecureCode;
      this.path = this.appconfig.videocalllayoutlink + this.SecreteCode;
      this.UserName = user.Name;
      
    }
  }
  ionViewDidEnter() {
    // alert("hi"+this.enableVideo)
  // Access the nativeElement property here
  
  if(this.enableVideo){
   
    if (this.videoElement) {
     
      const videoElement = this.videoElement.nativeElement as HTMLVideoElement;
      this.turnvideoOn();
     
      // Additional code for manipulating the video element
    }else{
      
      this.videoElement = new ElementRef(document.querySelector('#videoElement'));
      this.turnvideoOn();
    }
   

  }else{
    this.turnvideoOff();
  }
  this.GetMyData(); // Call initially
    setInterval(() => {
      this.GetMyData(); // Call every 5 seconds
    }, 5000);
}
joinvideocall(){
  this.PartyId = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;
  this.ArbitrationId= JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id;
  this.videochatservice.ChangeVideoStatusforJoinRequest(this.ArbitrationId,this.PartyId).subscribe(
    (data: any) => {
      this.joinnowclicked=true
      // this.socket.emit('JoinVideoCallRequests', {
         
      //   JoinVideoCallRequests: 1
      // });
      if (data.length > 0) {

      } else {
   
      }



    }
  )

}
ReceiveSocket(){
  // this.socket.on('JoinVideoCallRequestsResponse', (message: any) => {
  // this.GetAllArbitrationPartiesonly()
  //   console.log('Received message:', message);

  // });
  
  // this.socket.on('AcceptedUsertoVideocallResponse', (message: any) => {
                                                
  //   this.GetAllArbitrationPartiesonly();


  //     console.log('AcceptedUsertoVideocallResponse:', message);
  
  //   });

                                      
}
GetMyData() {
  if (!!localStorage.getItem('ADR_Dashboard_User') && !!localStorage.getItem('ArbitrationDetails')) {
    const arbitrationDetails = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`);
    const adrDashboardUser = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`);

    if (arbitrationDetails && adrDashboardUser) {
      this.videocallUserservice.GetMyArbitrationPartyDetails(arbitrationDetails.Id, adrDashboardUser.Id).subscribe((data: any) => {
        // console.log(data, "myar oncefgfgh");

        if (!!data && data.length > 0) {
          // Perform actions with the data as needed
this.IsVideoStart=data[0].IsVideoStart
          if (data[0].IsVideoStart === 2 || data[0].IsVideoStart === 3) {
            const secureCode = arbitrationDetails.SecureCode;
            this.router.navigate([`dashboard/${secureCode}`]);
          }

        } else {
          // Handle the case when data.length <= 0
        }
      });
    } else {
      // Handle the case when either arbitrationDetails or adrDashboardUser is null
      console.log('Required data from local storage is null');
    }
  }
}

GetAllArbitrationPartiesonly() {
  this.arbitrationservice.spGetAllarbitrationParties(JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id).subscribe((data: any) => {
    if (!!data && data.length > 0) {
      this.ArbitrationPartiesonly = data;
    //  console.log(this.ArbitrationPartiesonly, ' this.ArbitrationPartiesonly');

      if (data[0].IsVideoStart === 2 || data[0].IsVideoStart === 3) {
        const secureCode = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).SecureCode;
        this.router.navigate([`dashboard/${secureCode}`]);
      }
    } else {
      this.ArbitrationPartiesonly = [];
    }
  });
}

  getInitials(username: string): string {
 
    // Handle cases where the username is empty
    if (!username) {
      return '';
    }

    // Extract initials from the username
    const initials = username.split(' ').map(word => word.charAt(0)).join('');
  
    return initials;
  }
  dashboard() {
    const url = this.appconfig.videocalllayoutlink + this.SecreteCode;
    window.open(url, '_blank');
  }
  toggleVideo() {
    
    if (this.videoState) {
 
        this.turnvideoOff();
    } else {
        this.turnvideoOn();
    }
}

toggleMicrophone(){

}
turnvideoOn() {
    const videoElement = this.videoElement.nativeElement as HTMLVideoElement;
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            if (videoElement) {
                videoElement.srcObject = stream;
                videoElement.play();
                this.videoState = true;
            }
        })
        .catch(error => {
            console.error('Error accessing camera:', error);
            this.enableVideo = false;
            this.turnvideoOff();
        });
    // Additional code for manipulating the video element
    // Access the user's camera
}


turnvideoOff() {

    const videoElement = this.videoElement.nativeElement as HTMLVideoElement;

    // Pause the video and stop the camera stream
    videoElement.pause();
    const stream = videoElement.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach((track: any) => track.stop());

    // Clear the video element source
    videoElement.srcObject = null;
    this.videoState = false;
    // this.ngAfterViewInit(); // Uncomment if necessary
}
  copyLink() {
    // Logic to copy the link
    const dummyInput = document.createElement('input');
    document.body.appendChild(dummyInput);
    dummyInput.value = this.path;
    dummyInput.select();
    document.execCommand('copy');
    document.body.removeChild(dummyInput);

    // Show toast
    this.showToast = true;
    
    // Use Angular's Renderer2 to schedule the toast removal
    this.renderer.setStyle(document.body, 'position', 'relative');
    setTimeout(() => {
      this.showToast = false;
      this.renderer.removeStyle(document.body, 'position');
    }, 1000); // You can adjust the timeout duration as needed
  }
  getAllPrivateCalls() {
   
  }
}
