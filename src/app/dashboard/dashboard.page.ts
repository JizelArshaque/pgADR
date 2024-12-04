
import { Component, ElementRef, OnInit, ViewChild, Renderer2, HostListener, AfterViewInit, RendererStyleFlags2 } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, IonContent, ModalController, PopoverController, ToastController, LoadingController } from '@ionic/angular';
// import { IMediaTrack, IRemoteUser } from 'ngx-agora-sdk-ng';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { VideoStoreOrder } from 'src/class/VideoStoreOrder';
import { VideoStoreOrderItemss } from 'src/class/VideoStoreOrderItemss';
import { RtcstreamService } from 'src/service/rtcstream.service';
import { UploadModalPage } from '../upload-modal/upload-modal.page';
import { ArbitrationServiceService } from '../arbitration-service.service';
import { AppConfig } from 'src/class/AppCofig';
import { ProfileDetailsPage } from '../profile-details/profile-details.page';
import { ProceduralOrderPage } from '../procedural-order/procedural-order.page';
import { DocViewerPage } from '../doc-viewer/doc-viewer.page';
import { ArbitrationPartyAddPage } from '../arbitration-party-add/arbitration-party-add.page';
import { Videocalluser } from 'src/service/Videocalluser.service';
import { VideoCall } from 'src/class/VideoCall';
import { TestProvider } from 'src/service/TestProvider';
import { UserListPopoverComponent } from '../user-list-popover/user-list-popover.component';
import { LoginService } from 'src/service/login.service';
import { SaveLoginsDetail } from 'src/class/SaveLogins';
import { ArbitratorModalPage } from '../arbitrator-modal/arbitrator-modal.page';
import { Chat } from 'src/class/Chat';
import { ScrunityModalPage } from '../scrunity-modal/scrunity-modal.page';
import AgoraRTC, { IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import { AlertService } from 'src/shared/alert-info/alert.service';
// import { Socket } from 'ngx-socket-io';
import { ReportIssue } from 'src/class/ReportIssue';
import { DocumentUploadCDN } from 'src/class/DocumentUploadCDN';
import { TokenEncryptionService } from '../././../service/token-encryption.service';
import { UserService } from 'src/service/user.service';
import { VideoCallModalPage } from '../video-call-modal/video-call-modal.page';






interface SelectedPDFs {
  [section: string]: File[];
}
// export interface IMeetingUser {
//   type: 'local' | 'remote';
//   user?: IRemoteUser;
//   mediaTrack?: IMediaTrack;
// }
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})

export class DashboardPage implements OnInit, AfterViewInit {
  @ViewChild('chatContent', { static: false }) chatContent!: ElementRef;
  @ViewChild('pdfViewer') pdfViewer!: ElementRef<HTMLIFrameElement>;
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('scrollMe') myScrollContainer!: ElementRef;
  @ViewChild('scrollMeNotification') myScrollNotificationContainer!: ElementRef;
  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideo', { static: false }) remoteVideo!: ElementRef;
  @ViewChild('uservideo', { static: false }) uservideo!: ElementRef;
  @ViewChild('rid', { static: false }) rid!: ElementRef;
  @ViewChild(IonContent) content!: IonContent;
  @ViewChild('chatwrapper') chatwrapper: any;
  @ViewChild('fileupload1') fileupload1!: ElementRef
  @ViewChild('camera1') cameraElementRef1!: ElementRef;
  @ViewChild('camera2') cameraElementRef2!: ElementRef;
  @ViewChild('fullscreen', { static: false }) fullscreen!: ElementRef;
  @ViewChild('audioOption1') audioPlayerRef!: ElementRef;
  // private subscriptions: Subscription[] = [];
  private stream?: MediaStream;
  // public microphoneIcon = faMicrophoneAlt;
  // public microphoneMutedIcon = faMicrophoneAltSlash;
  // public cameraIcon = faVideo;
  // public cameraOffIcon = faVideoSlash;
  // settingIcon = faCog;
  isCameraOff: boolean = false;
  usersNotinSelectedPrivateRoom: any = [];
  isMicrophoneMute: boolean = false;
  // public isCameraOff = false;
  TribunalConstitutionalStatus: any;
  // public isMicrophoneMute = true;
  public selectedVideoInId?: string;
  selectedPDFs: SelectedPDFs = {};
  showSettings = false;
  audioTrack: IMicrophoneAudioTrack | null = null;
  ReplyNoticeByRespondentUrl: any;
  link = '';
  showResendLink: boolean = false;
  MainHostId: any;
  channel = '';
  SecretvideocallforAdd: any;
  subscriptions: Subscription[] = [];
  //userList: IMeetingUser[] = [];
  audioInId = '';
  UserAddress: any;
  UserName: any;
  UserEmail: any;
  waitingroom: boolean = false;
  UserDesignation: any;
  UserCity: any;
  MyArbId: any;
  UserState: any;
  outputDevices: MediaDeviceInfo[] | null = null;

  UserCountry: any;
  isUserAcceptedByHost: boolean = false;
  modalclassFor3SecondsToMainRoom = "modal fade";
  videoInId = '';
  Type: any;
  LastLoginTime: any;
  CheckIsTokenExpired: any;
  Tab: number = 1;

  reportissueclass = new ReportIssue();
  toStartSecretCallId: number = 0;
  title: string = 'ng2-pdf-viewer';
  src: string = '';
  isPeacegatePaddingLeft = false;
  BodyClassFor3SecondsToMainRoom: string = '';
  page: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;
  audioOutId = '';
  enableAudio: boolean = true;
  token = '';
  collapsedone: string = 'collapse';
  Side: any;
  RequestforJoinVideocall: any = [];
  ArbitrationAgreementType: number = 0;
  AuthURL: any;
  Id: any;
  videocallUsersAfterJoin: any = [];
  ShowScrutinyComments: any = [];
  modalclassPrivateRoomSelect = "modal fade";
  timer: number = 10;
  modalstylePrivateRoomSelect = "display:none;"
  fadeclassPrivateRoomSelect = "";
  BodyClassPrivateRoomSelect: string = '';

  modalclassPrivateRoomParticipants = "modal fade";
  modalstylePrivateRoomParticipants = "display:none;"
  fadeclassPrivateRoomParticipants = "";
  BodyClassPrivateRoomParticipants: string = '';

  modalclassFor3SecondsToPvtRoom = "modal fade";
  modalstyleFor3SecondsToPvtRoom = "display:none;"
  fadeclassFor3SecondsToPvtRoom = "";
  BodyClassFor3SecondsToPvtRoom: string = '';
  videocall = new VideoCall();

  modalstyleFor3SecondsToMainRoom = "display:none;"
  fadeclassFor3SecondsToMainRoom = "";
  ArbitrationPartiesforselectPVTCall: any[] = [];
  ArbitrationPartiesforAddPVTCall: any[] = [];
  ArbitrationPartiesforremovePVTCall: any[] = [];

  modalclassAddParticipantsModalFromPvtRoom = "modal fade";
  modalstyleAddParticipantsModalFromPvtRoom = "display:none;"
  fadeclassAddParticipantsModalFromPvtRoom = "";
  BodyClassAddParticipantsModalFromPvtRoom: string = '';
  videocallLayout: any;
  ScrutinyComments: any;
  collapsedtwo: string = 'collapse';
  collapsedthree: string = 'collapse';
  collapsedfour: string = 'collapse';
  collapsedpdfstring = 'collapse';
  responsiveStyles: { [key: string]: any } = {};
  toStartMainCallId: number = 0;
  generatedtoken: string = '';
  // mediaTrack?: IMediaTrack;
  // pinnedUser?: IMeetingUser | null;
  // private client!: IChannelClient;
  TotalAmount: number = 0;
  selectedPDF: File | undefined;
  isChat: boolean = false;
  // modelclass:string='rightsidebar-wrapper';
  // sidebarfull='rightsidebar-wrapper';
  bodyclass: string = 'videobg sidebar-padding';
  sidebarclass = 'videobg sidebar-padding';
  bodyclass2 = 'videobg sidebar';
  client: any;
  isHostLeavingCall: boolean = false;
  user: any
  GeneratedTokenByHost: string = '';
  GeneratedTokenByAudience: string = '';
  GeneratedToken: string = '';
  cart: number = 0;
  enablevideo: boolean = true;
  // videochat=new VideoCallChat();
  userId: any;
  Evidence: any[] = [];
  PleadingsByParty: any[] = [];
  NoticeTribunal: any[] = [];
  SC: any
  ArbitrationNotes: any[] = [];
  NoticeAdmin: any[] = [];
  ArbitralAward: any[] = [];
  CaseManagementProcedure: any[] = [];
  ApplicationsMemo: any[] = [];
  VideoChatList: any[] = [];
  // images = new Images();
  // chats: VideoCallChat[] = [];
  videostoreorder = new VideoStoreOrder()
  videostorreorder: VideoStoreOrder[] = []
  videostoreOrderitemm: any = [];
  videostoreOrderitem: any = [];
  videostore: VideoStoreOrderItemss[] = []
  a: number = 0;
  Name: string = '';
  Price: number = 0;
  value: number = 0;
  Discount: number = 0;
  b: number = 0;
  videostoreorderId: any
  isMuted: boolean = false;
  Host: any;
  VideoCallId: any
  LoginUserId: any
  interval: any;
  interval1: any;
  interval2: any;
  interval3: any;
  HostId: any;
  showChat: boolean = true;
  addnotes: boolean = false;
  hideBtns = true;
  ismuteAudio = true;
  ismuteVideo = true;
  selectedUid: number = 0;
  User: any;
  notes: any;
  Logourl: any
  // selfVideo: boolean = false;
  modalclass = "modal fade";
  modalstyle = "display:none;"
  fadeclass = "";
  BodyClass: string = '';


  // sock = io('https://chat.sopanam.in');
  videoState: string = "enabled";
  audioState: string = "enabled";
  // videocallHandraise = new VideoCallHandRaise();
  handraises: any = [];
  Conversation: any = [];
  selectedAudioDevice: any;
  selectedAudioDeviceId: any;
  selectedAudioDeviceOut: any;
  audioInputDevices: any;
  audioOutputDevices: any;

  IsControllerLeavingCall: boolean = false;
  // videocall = new VideoCall();
  enableVideo: boolean = true;

  hostName: string = '';
  pdfUrl: string | null = null;
  isMenuVisible: boolean = false;
  srcs: string = '';
  modelclass: string = 'bodybg menuslide'
  sidebarfull = 'bodybg menuslide'
  nosidebar = 'bodybg'
  isChatboxVisible = false;
  showprofilemodal: boolean = false;

  showReportSection: boolean = false;
  isFabVisible: boolean = true;
  isCollapsed = true;
  public isChatVisible = false;
  pdfSrc: string | ArrayBuffer | null = null;
  IsVideo: boolean = false;
  IsUser: boolean = false;
  Email: string = '';
  SecreteCode: any = '';
  ArbitrationDetails: any;
  ArbitrationParties: any[] = [];
  ArbitrationPartiesonly: any[] = [];
  Claimants: any[] = [];
  Respondants: any[] = [];
  Arbitrators: any[] = [];
  Admin: any[] = [];
  selecteddocument: any;
  IsHost: any;
  appconfig = new AppConfig();
  chatusers = new Chat();
  LoginStep = 1;
  Logindata: any;
  IsController: any;
  Password: string = '';
  collapsedfive: string = 'collapse';
  collapsedsix: string = 'collapse';
  inPrivateRoom: Boolean = false;
  selectedFileB64: string = '';
  selectedFilePath: string = '';
  isFileImage = false;
  selectedFile: any = "";
  isFileDocument = false;
  collapsedseven: string = 'collapse';
  collapsed8: string = 'collapse';
  collapsed9: string = 'collapse';
  collapsed10: string = 'collapse';
  ArbitrationDocs: any[] = [];
  ArbitrationDocDetails: any[] = [];
  body_class: string = '';
  document_class: string = 'document-wrapper';
  collapsed11: string = 'collapse';
  FeeList: any[] = [];
  GST: any = 0;
  Cess: any = 0;
  showDropdown: boolean = false;
  SaveLogin = new SaveLoginsDetail();
  CategoryofArbitrationList: any[] = [{ Id: 1, Name: 'Regular' }, { Id: 2, Name: 'Fast Track' }, { Id: 3, Name: 'Expedited' }]
  Institutions: any[] = [{ Id: 1, Name: 'IIAM' }, { Id: 2, Name: 'APCAM' }];
  CategoryofArbitrationList1: any[] = [{ Id: 1, Name: 'Arbitration' }, { Id: 2, Name: 'Fast Track Arbitration' }, { Id: 3, Name: 'Expedited Arbitration' }]
  collapsed12: string = 'collapse';
  selectedOptions: string[] = [];
  isOpen: boolean = false;
  isopenparticipantadd: boolean = false;
  isopenparticipantremove: boolean = false;
  videocallchannel: string = '';
  userside: any
  videocalltoken: string = '';
  privateCalls: any = [];
  participantsinprivatecall: any = [];
  ChatMessage: any
  usertype: any;
  issueReportSubmitted: boolean = false;
  reportIssue: string = '';
  imInPvtCall: boolean = false;
  adduserinpvtcall: any = [];
  removeuserinpvtcall: any = [];
  selectedPvtcallId: any;
  imInPvtCall_Id: any;
  currentTimeforchecking: any;
  collapsed13: string = 'collapse';
  collapsed14: string = 'collapse';
  dashboarddate: any[] = [];
  collapsed15: string = 'collapse';
  checkboxChecked: boolean = false;
  DraftAwards: any[] = [];
  AllScrutinyComments: any[] = [];
  ArbitrationDetailId: any;
  filteredDates: any[] = [];


  usernameForDashboard:string=''
  userTypeForDashboard:number=0

  constructor(private elementRef: ElementRef, private toastController: ToastController, private renderer: Renderer2, private el: ElementRef, private popoverController: PopoverController, public loginservice: LoginService,
    public videochatservice: TestProvider, public videocallUserservice: Videocalluser,
    private alertController: AlertController, private modalController: ModalController,
    private activatedRoute: ActivatedRoute, private arbitrationservice: ArbitrationServiceService,
    private modalService: NgbModal, private router: Router, public alertservice: AlertService,
    public videostream: RtcstreamService, private datePipe: DatePipe,
    private TokenEncryptionService: TokenEncryptionService, private loadingCtrl: LoadingController,


  ) {
    this.load()

  }



  async load() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...', // Message to display in the loader
      spinner: 'crescent',  // Choose spinner style (default is 'dots')
      duration: 0           // Keep it open until manually dismissed
    });

    // Show the loader
    await loading.present();

    try {
      this.initializeAudioTrack();
      this.currentTimeforchecking = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

      if (this.activatedRoute.snapshot.paramMap.get('securecode')) {
        this.SecreteCode = this.activatedRoute.snapshot.paramMap.get('securecode');
        if (!!this.SecreteCode && this.SecreteCode.length > 0) {
          if (localStorage.getItem("ADR_Dashboard_User")) {
            const storedUser = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`);
            if (storedUser.SecreteCode === this.SecreteCode) {
              this.IsUser = true;
              this.User = storedUser;
              if (!!this.User.AuthorisationUrl && this.User.AuthorisationUrl.length > 0) {
                this.AuthURL = this.User.AuthorisationUrl;
                await this.checkauthurl();
              }
            } else {
              this.IsUser = false;
              this.AuthURL = null;
              localStorage.clear();
            }
          } else {
            this.IsUser = false;
            this.AuthURL = null;
            localStorage.clear();
          }

          const arbitrationDetailId = localStorage.getItem('ArbitrationDetailId');
          if (arbitrationDetailId) {

            await Promise.all([
              this.GetAllArbitrationDetails(),
              this.GetAllArbitrationParties()
            ]);
          } else {

            await this.GetAllArbitrationDetailsId();
          }
        }
      }
    } catch (error) {
      console.error('Error in load:', error);
    } finally {
      // Dismiss the loader
      await loading.dismiss();
    }
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    // Get the secure code from local storage
    const secureCode = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).SecureCode

    // Check if the secure code exists in local storage
    if (!!secureCode) {
      // alert(secureCode)
      // Navigate to the dashboard with the secure code
      this.router.navigate(['/dashboard', secureCode]);
    } else {
      // Navigate to a default route if the secure code is not found
      this.router.navigate(['/dashboard']); // Navigate to a default dashboard route
    }
  }
  ngOnInit() {

    // this.ReceiveSocket();


    const userDataString = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`);
    if (userDataString) {
      const userData = userDataString;
	  this.usernameForDashboard = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Name
      this.usertype = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Type
      this.userside = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Side
      this.Type = userData?.Type;
      // alert(userData?.Type)
      this.GetAllScrutinyComments();
      this.GetAllAbitrationNotes();
      this.GetAllArbitrationPartiesonly();
    } else {

    }

    this.setResponsiveStyles(window.innerWidth);


  }
  playSound() {
    // Create an oscillator (sound wave generator)
    const oscillator = this.audioContext.createOscillator();

    // Connect the oscillator to the audio context's destination (speakers)
    oscillator.connect(this.audioContext.destination);

    // Start the oscillator to play the sound
    oscillator.start();

    // Stop the oscillator after 1 second (you can adjust the duration)
    setTimeout(() => {
      oscillator.stop();
    }, 1000);
  }
  audioContext = new AudioContext();

  mutesystemspeaker(isMute: boolean) {
    this.isMuted = isMute;
    if (this.isMuted) {
      this.audioContext.suspend();
    } else {
      this.audioContext.resume();
    }
  }

  unmutesystemspeaker(isMute: boolean) {
    this.isMuted = isMute;

    if (this.isMuted) {
      this.audioContext.suspend();
    } else {
      this.audioContext.resume();
    }
  }
  GetMyData() {
    if (!!localStorage.getItem('ADR_Dashboard_User') && !!localStorage.getItem('ArbitrationDetails')) {
      const arbitrationDetails = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`)
      const adrDashboardUser = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`)
      if (arbitrationDetails && adrDashboardUser) {
        this.videocallUserservice.GetMyArbitrationPartyDetails(arbitrationDetails.Id, adrDashboardUser.Id).subscribe((data: any) => {
          // console.log(data, "myar oncefgfgh");
          this.UserAddress = data[0].Address;
          this.UserName = data[0].Name;
          this.UserEmail = data[0].Email;
          this.UserDesignation = data[0].Designation;
          this.UserCity = data[0].City;
          this.UserState = data[0].State;
          this.UserCountry = data[0].Country;
          if (!!data && data.length > 0) {
            this.AuthURL = data[0].AuthorisationUrl;

            this.LastLoginTime = data[0].LastLoginTime;


            const tokenTime = new Date(this.LastLoginTime);
            const currentTime = new Date(); // Use current time directly with new Date()

            const timeDiff = currentTime.getTime() - tokenTime.getTime();
            const hoursDiff = timeDiff / (1000 * 60 * 60);

            let futureTime = new Date(tokenTime.getTime() + (24 * 60 * 60 * 1000)); // Corrected calculation for 24 hours
            //         const hoursDiff = timeDiff / (1000 * 60 * 60);

            // let futureTime = new Date(tokenTime.getTime() + (3 * 60 * 1000)); // 10 minutes in milliseconds



            if (futureTime.getTime() > currentTime.getTime()) {
              // console.log(hoursDiff);
            } else {
              // Clear local storage here if futureTime is less than currentTime

              // localStorage.clear();
              // window.location.reload(); // Clearing local storage

              // Optionally, you can add a message or perform additional actions after clearing local storage
              console.log("Local storage cleared because futureTime is less than currentTime");
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

  checklogins() {
    if (localStorage.getItem('SCode')) {
      this.SC = JSON.parse(`${localStorage.getItem('SCode')}`);
      this.loginservice.GetLoginUser(this.SC).subscribe((data: any) => {
        if (!!data && data.length > 0) {
          if (data[0].LogoutTime !== null) {
            // Use custom alert service for confirmation
            this.alertservice.Alert(
              'New user has logged in with another device. You will be logged out.',
              3,
              () => {
                // If the user confirms, proceed with logging out the user
                this.logoutUser();
              },
              () => {
                // If the user cancels, you can add code here to handle cancellation
                // Example: Close the alert modal
                // this.alertservice.closeAlert();
              }
            );
          }
        }
      });
    }
  }
  submitarbnotes() {
    this.VideoCallId = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id;
    this.LoginUserId = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;

    this.loginservice.InsertArbNotes(this.VideoCallId, this.LoginUserId, this.notes).subscribe((data: any) => {
      if (!!data && data.length > 0 && data[0].Id > 0 && data[0].Error === 0) {


        this.alertservice.Alert("Notes added successfully !", 3, () => { }, () => { },);
        this.notes = ''
        this.Addnotes();
        this.checklogins();
        // this.socket.emit('InsertArbnotes', {

        //   NotesSend: 1
        // });
      } else {
        // Handle error or other conditions
      }
    });
  }
  submitReport() {


    this.reportissueclass.ArbitrationId = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id;
    this.reportissueclass.UserId = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;
    this.reportissueclass.Name = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Name;
    this.reportissueclass.Email = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Email;
    this.reportissueclass.Mobile = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Mobile;
    this.reportissueclass.Country = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Country;
    this.reportissueclass.Message = this.reportIssue

    this.arbitrationservice.SpReportIssue(this.reportissueclass).subscribe(data => {
      if (data.Id > 0 && data.Error === 0) { // Check conditions for Id and error
        this.issueReportSubmitted = true;
      }

    });

  }
  async logoutUser() {
    localStorage.clear()
    window.location.reload()
  }
  showReport() {
    this.showReportSection = !this.showReportSection;
  }
  Resend() {
    // Use custom alert service for confirmation
    this.alertservice.Alert(
      "Are you sure you want to resend?",
      3,
      () => {
        // alert('ok')
        // If the user confirms, proceed with the resend logic
        this.startTimer();
        this.showResendLink = true;
        this.arbitrationservice.SpLoginUser(this.ArbitrationDetailId, this.Email).subscribe(data => {
          if (!!data) {
            if (data.Id > 0 && data.SecreteCode == this.SecreteCode) {
              this.Logindata = data;
              this.LoginStep = 2;
            } else {
              // Replace the alert with your custom alert
              this.alertservice.Alert("Sorry, You are not an authorised User!", 3, () => { }, () => { },);
            }
          }
        });

      },
      () => {
        // If the user cancels, you can add code here to handle cancellation
        // Example: Close the alert modal
        // this.alertservice.closeAlert();
      }
    );
  }

  GetAllArbitrationDetailsId() {

    this.arbitrationservice.GetArbitrationIdWithSecreteCode(this.SecreteCode).subscribe(data => {
      if (data) {


        this.ArbitrationDetailId = data[0].Id
        localStorage.setItem('ArbitrationDetailId', JSON.stringify(this.ArbitrationDetailId));


        // Check conditions for Id and error
      }

    });

  }

  GetAllArbitrationDetails() {

    this.arbitrationservice.GetArbitrationDetailsWithSecreteCode(this.SecreteCode).subscribe(data => {
      if (!!data && data.length > 0) {
        this.ArbitrationDetails = data[0];
        // console.log("================atls",this.ArbitrationDetails)
        this.ReplyNoticeByRespondentUrl = data[0].ReplyNoticeByRespondentUrl;


        // alert(this.ReplyNoticeByRespondentUrl)
        if (this.ArbitrationDetails.Id > 0) {
          if (!!localStorage.getItem('ADR_Dashboard_User') && JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id > 0) {

            this.alertservice.Alert(this.ArbitrationDetails.ProcessStatus, 1, () => { }, () => { },);

          }
          if (this.ArbitrationDetails.ArbitrationStage < 8) { this.Tab = 2; }
          else if ((this.ArbitrationDetails.ArbitrationStage > 7 && this.ArbitrationDetails.ArbitrationStage < 14) || this.ArbitrationDetails.ArbitrationStage > 16) { this.Tab = 3; }
          else if (this.ArbitrationDetails.ArbitrationStage > 13 && this.ArbitrationDetails.ArbitrationStage < 17) { this.Tab = 4; }

          this.ArbitrationDetails.ArbitrationType = this.CategoryofArbitrationList1.find(x => x.Id == this.ArbitrationDetails.ArbitrationAgreementType).Name;
          this.ArbitrationDetails.InstitutionName = this.Institutions.find(x => x.Id == this.ArbitrationDetails.Institution).Name;

          localStorage.setItem('ArbitrationDetails', JSON.stringify(this.ArbitrationDetails));
          this.ArbitrationAgreementType = data[0].ArbitrationAgreementType

          if (this.ReplyNoticeByRespondentUrl == null && JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id && ((this.Type == 0 || this.Type == 2) && JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Side == 1)) {
            //  this.openUploadModal(5);
          }
          this.GetAllArbitrationParties();
          this.GetAllArbitrationDocuments();

          setInterval(() => {

            this.GetAllChats()
            this.GetAllArbitrationPartiesonly();
            //  this.GetMyData();
            this.currentTimeforchecking = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
          }, 20000); //

          this.VideoCallId = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id;
          this.LoginUserId = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;
          this.interval1 = setInterval(() => {
            // this.GetAllArbitrationPartiesonly();
            this.GetMyArbitrationPartyDetails();
          }, 20000);

        } else {
          // alert("Invalid link !");
          this.alertservice.Alert("Invalid link !", 3, () => { }, () => { },);
        }
      } else {
        // alert("Invalid link !");
        this.alertservice.Alert("Invalid link !", 3, () => { }, () => { },);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setResponsiveStyles((event.target as Window).innerWidth);
  }
  // async openArbitrationModal() {

  //   const navigationExtras: NavigationExtras = {
  //     state: {
  //       ArbitrationDetails: this.ArbitrationDetails,
  //       ArbitrationParties: this.ArbitrationParties,
  //     }
  //   };


  //   await this.router.navigate(['arbitrator-modal'], navigationExtras);
  // }

  async openArbitrationModal() {

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();

    // Fetch arbitration parties
    const arbitrationPartiesFetched = await this.GetAllArbitrationParties();

    if (arbitrationPartiesFetched) {
      //  console.log("this.ArbitrationParties", this.ArbitrationParties);

      // Create and present the modal
      const modal = await this.modalController.create({
        component: ArbitratorModalPage,
        cssClass: 'my-modal',
        componentProps: {
          Arbitration: this.ArbitrationDetails,
          ArbitrationParties: this.ArbitrationParties,
        },
      });

      modal.onDidDismiss().then((modelData: any) => {
        // Handle data returned from the modal

        this.loadPageFunctions()
      });

      // Dismiss the loader before presenting the modal
      loading.dismiss();

      await modal.present();
    } else {
      // If fetching arbitration parties fails, dismiss the loader
      loading.dismiss();
      // Optionally, show an error message
      this.alertservice.Alert("Failed to load arbitration parties. Please try again.", 3, () => { }, () => { });
    }
  }


  loadPageFunctions() {
    this.GetAllArbitrationDetails();
    this.GetAllArbitrationParties();
    this.GetAllScrutinyComments();
    this.GetAllAbitrationNotes();
    this.GetAllArbitrationPartiesonly();
  }

  async openscrunityModal() {
    const modal = await this.modalController.create({
      component: ScrunityModalPage,
      cssClass: 'my-modal',
      // You can pass data to the modal using the componentProps option if needed
      componentProps: {
        Arbitration: this.ArbitrationDetails,
        ArbitrationParties: this.ArbitrationParties,
        // Type: Type
      },

    });
    modal.onDidDismiss().then((modelData: any) => {
    });
    await modal.present();
  }
  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // Handle cancel action if needed
          }
        },
        {
          text: 'Logout',

          handler: () => {
            // Clear localStorage items

            localStorage.clear();
            window.location.reload();
            // Navigate to the dashboard page (you can replace 'dashboard' with your actual dashboard route)
            this.router.navigate(['/dashboard']);

            // Reload the page to ensure a fresh session (if needed)

          }
        }
      ]
    });

    await alert.present();
  }
  GetAllArbitrationCaseManagement() {

    this.arbitrationservice.spGetAllArbitrationCaseManagement(this.ArbitrationDetails.Id).subscribe(data => {
      if (!!data && data.length > 0) {

        this.CaseManagementProcedure = <Array<any>>data;
        //  console.log(this.CaseManagementProcedure,"==========case===")
      }
    });
  }
  setResponsiveStyles(screenWidth: number): void {
    // Define your responsive styles here based on screen width
    if (screenWidth >= 1200) {
      this.responsiveStyles = {
        'height.px': this.selecteddocument ? 180 : null,
        'width.px': this.selecteddocument ? 345 : null
      };
    } else if (screenWidth >= 768) {
      // Define styles for medium-sized screens
      this.responsiveStyles = {
        'height.px': this.selecteddocument ? 150 : null,
        'width.px': this.selecteddocument ? 280 : null
      };
    } else {
      // Define styles for small screens
      this.responsiveStyles = {
        'height.px': this.selecteddocument ? 120 : null,
        'width.px': this.selecteddocument ? 240 : null
      };
    }
  }
  closePdfPreview() {
    this.isPeacegatePaddingLeft = false;

    this.selecteddocument = null;

  }
  async GetAllArbitrationParties(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('ArbitrationDetails')) {
        this.arbitrationservice.spGetAllarbitrationParties(JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id).subscribe(data => {
          if (!!data && data.length > 0) {
            this.ArbitrationParties = <Array<any>>data;
            console.log(this.ArbitrationParties, "====ArbitrationParties=====")
            this.Claimants = this.ArbitrationParties.filter(x => (x.Type === 0 || x.Type === 2) && x.Side === 0);
            this.Respondants = this.ArbitrationParties.filter(x => (x.Type === 0 || x.Type === 2) && x.Side === 1);
            this.Arbitrators = this.ArbitrationParties.filter(x => x.Type === 3 && x.Side === 0);
            this.Admin = this.ArbitrationParties.filter(x => x.Type == 4 || x.Type == 5);

            let uid = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;
            const party = this.ArbitrationParties.find(p => p.Id == uid);

            if (party) {
              if ((party.Type === 0 && party.Side === 1) || (party.Type === 2 && party.Side === 1)) {
                this.usertype = 'respondent';
              } else if ((party.Type === 0 && party.Side === 0) || (party.Type === 2 && party.Side === 0)) {
                this.usertype = 'claimant';
              } else if (party.Type === 3 && party.Side === 0) {
                this.usertype = 'arbitrator';
              } else if ((party.Type === 4 || party.Type === 5) && party.Side === 0) {
                this.usertype = 'admin';
              }

              this.videocallUserservice.GetMyArbitrationPartyDetails(JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id, JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id).subscribe((data: any) => {
                if (data.length > 0) {
                  if (data[0].IsPrivateCall == 10) {
                    this.imInPvtCall = true;
                    if (this.imInPvtCall) {
                      this.imInPvtCall_Id = data[0].PrivateCallId;
                      this.Claimants = this.ArbitrationParties.filter(x => (x.Type === 0 || x.Type === 2) && x.Side === 0 && (x.IsPrivateCall == 2 || x.IsPrivateCall == 10));
                      this.Respondants = this.ArbitrationParties.filter(x => (x.Type === 0 || x.Type === 2) && x.Side === 1 && (x.IsPrivateCall == 2 || x.IsPrivateCall == 10));
                      this.Arbitrators = this.ArbitrationParties.filter(x => x.Type === 3 && x.Side === 0 && (x.IsPrivateCall == 2 || x.IsPrivateCall == 10));
                      this.Admin = this.ArbitrationParties.filter(x => (x.Type == 4 || x.Type == 5) && (x.IsPrivateCall == 2 || x.IsPrivateCall == 10));
                    }
                  } else {
                    this.imInPvtCall = false;
                    this.imInPvtCall_Id = 0;
                  }
                  if (data[0].IsVideoStart == 3) {
                    this.videocalltoken = data[0].Videocall_Token;
                    this.videocallchannel = data[0].Videocall_Channel;
                    this.IsVideo = true;
                    if (data[0].IsVideoMute == 0) {
                      this.videoState = 'enabled';
                      this.ismuteVideo = true;
                    } else {
                      this.ismuteVideo = false;
                      this.videoState = 'disabled';
                    }
                    if (data[0].IsAudioMute == 0) {
                      this.ismuteAudio = true;
                      this.audioState = 'enabled';
                    } else {
                      this.ismuteAudio = false;
                      this.audioState = 'disabled';
                    }
                    this.isMenuVisible = false;
                    this.continueToVideoCall();
                    this.IsController = data[0].IsController;
                    if (!sessionStorage.getItem('pageRefreshing')) {
                      sessionStorage.setItem('pageRefreshing', 'false');
                      let path = this.appconfig.videocalllayoutlink + this.SecreteCode;
                      window.location.href = path;
                    }
                  }
                  const adrDashboardUser = localStorage.getItem('ADR_Dashboard_User');
                  const videocallStartedBy = localStorage.getItem('VideocallStartedBy');
                  if (data[0].IsVideoStart === 100) {
                    this.alertservice.Alert(
                      "Virtual arbitration meeting has started. Please join the Video Call",
                      4,
                      () => {
                        this.router.navigate(['/waiting-room']);
                      },
                      () => { }
                    );
                  } else if (data[0].IsVideoStart == 5) {
                    this.alertservice.Alert("Host ended entire meeting !", 3, () => { }, () => { },);
                    this.IsVideo = false;
                    this.exitcall();
                  } else if (data[0].IsVideoStart == 0 || data[0].IsVideoStart == 4) {
                    this.IsVideo = false;
                  }
                }
                resolve(true);
              });
            } else {
              resolve(false);
            }
          } else {
            resolve(false);
          }
        }, error => {
          reject(error);
        });
      } else {
        resolve(false);
      }
    });
  }


  GetAllArbitrationPartiesonly() {
    this.arbitrationservice.spGetAllarbitrationParties(JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id).subscribe((data: any) => {


      if (!!data && data.length > 0) {
        this.ArbitrationPartiesonly = data;
        this.CheckIsTokenExpired = data[0].LastTokenGeneratedTime
        const filteredArrayForVideoStart = this.ArbitrationPartiesonly.filter((obj: any) => obj.IsVideoStart === 110);

        // Assign the filtered results to RequestforJoinVideocall array
        this.RequestforJoinVideocall = filteredArrayForVideoStart;
        const tokenTime = new Date(this.CheckIsTokenExpired);
        const currentTime = new Date(this.currentTimeforchecking);

        const timeDiff = currentTime.getTime() - tokenTime.getTime();

        // Convert milliseconds to hours
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        let futureTime = new Date(tokenTime.getTime() + (24 * 60 * 60 * 1000)); //24 hours 

        if (futureTime.getTime() < currentTime.getTime()) {

        }

        else {
          // Token is still valid
          console.log('Token is still valid.');
        }

        // Filter array2 based on conditions
        // const filteredArray1 = this.ArbitrationPartiesonly.filter((obj:any) => (obj.Type === 0 || obj.Type === 2) && obj.Side === 0  && obj.PrivateCallId === this.imInPvtCall_Id && (obj.IsPrivateCall === 2 || obj.IsPrivateCall === 10));
        const filteredArray1 = this.ArbitrationPartiesonly.filter((obj2: any) => (obj2.Type === 0 || obj2.Type === 2) && obj2.Side === 0 &&
          obj2.PrivateCallId === this.imInPvtCall_Id && (obj2.IsPrivateCall === 2 || obj2.IsPrivateCall === 10) &&
          !this.Claimants.some((obj1: any) => obj1.Id === obj2.Id)
        );
        // Append the filtered results to array1
        this.Claimants.push(...filteredArray1);

        // Filter array2 based on conditions
        //  const filteredArray2 = this.ArbitrationPartiesonly.filter((obj:any) => (obj.Type === 0 || obj.Type === 2) && obj.Side === 1  && obj.PrivateCallId === this.imInPvtCall_Id && (obj.IsPrivateCall === 2 || obj.IsPrivateCall === 10));
        const filteredArray2 = this.ArbitrationPartiesonly.filter((obj2: any) => (obj2.Type === 0 || obj2.Type === 2) && obj2.Side === 1 &&
          obj2.PrivateCallId === this.imInPvtCall_Id && (obj2.IsPrivateCall === 2 || obj2.IsPrivateCall === 10) &&
          !this.Respondants.some((obj1: any) => obj1.Id === obj2.Id)
        );
        // Append the filtered results to array1
        this.Respondants.push(...filteredArray2);

        // Filter array2 based on conditions
        //  const filteredArray2 = this.ArbitrationPartiesonly.filter((obj:any) => (obj.Type === 0 || obj.Type === 2) && obj.Side === 1  && obj.PrivateCallId === this.imInPvtCall_Id && (obj.IsPrivateCall === 2 || obj.IsPrivateCall === 10));
        const filteredArray3 = this.ArbitrationPartiesonly.filter((obj2: any) => obj2.Type === 3 && obj2.Side === 0 &&
          obj2.PrivateCallId === this.imInPvtCall_Id && (obj2.IsPrivateCall === 2 || obj2.IsPrivateCall === 10) &&
          !this.Arbitrators.some((obj1: any) => obj1.Id === obj2.Id)
        );
        // Append the filtered results to array1
        this.Arbitrators.push(...filteredArray3);


        // Filter array2 based on conditions
        //  const filteredArray2 = this.ArbitrationPartiesonly.filter((obj:any) => (obj.Type === 0 || obj.Type === 2) && obj.Side === 1  && obj.PrivateCallId === this.imInPvtCall_Id && (obj.IsPrivateCall === 2 || obj.IsPrivateCall === 10));
        const filteredArray4 = this.ArbitrationPartiesonly.filter((obj2: any) => (obj2.Type === 4 || obj2.Type === 5) &&
          obj2.PrivateCallId === this.imInPvtCall_Id && (obj2.IsPrivateCall === 2 || obj2.IsPrivateCall === 10) &&
          !this.Admin.some((obj1: any) => obj1.Id === obj2.Id)
        );
        // Append the filtered results to array1
        this.Admin.push(...filteredArray4);
      }
      else {
        this.ArbitrationPartiesonly = [];
      }
    });
  }

  async ViewAward() {
    let doc = '';
    if (!!this.DraftAwards && this.DraftAwards.length > 0) {
      doc = this.DraftAwards[0].DocumentName;
    }
    else {
      doc = this.ArbitrationDocs.filter(x => x.Segment == 6)[0].DocumentName;
    }
    const modal = await this.modalController.create({
      component: ProceduralOrderPage, cssClass: 'my-modal',
      // You can pass data to the modal using the componentProps option if needed
      componentProps: {
        ArbitrationDetails: this.ArbitrationDetails,
        ArbitrationParties: this.ArbitrationParties,
        ArbitrationDocs: this.ArbitrationDocs,
        CaseManagementProcedure: this.CaseManagementProcedure,
        Type: 6,
        IsConnectwithParty: false,
        DocType: doc,
        ApplicationType: '',
        EditAward: 1
      },

    });
    modal.onDidDismiss().then((modelData) => {
      this.GetAllArbitrationDetails();
    });
    await modal.present();
  }
  SubmitScrutinyComments() {
    this.VideoCallId = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id;
    this.LoginUserId = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;
    let that = this;
    // Display confirmation alert
    this.alertservice.Alert("Are you sure to submit this comments?", 4, () => {
      // User clicked 'OK' in the confirmation alert
      this.loginservice.InsertScrutinyComment(this.VideoCallId, this.LoginUserId, this.ScrutinyComments).subscribe((data: any) => {
        if (!!data && data.length > 0 && data[0].Id > 0 && data[0].Error === 0) {
          // Comment added successfully
          that.GetAllScrutinyComments();
          this.alertservice.Alert("Comments submitted successfully !", 3, () => { }, () => { });
        } else {
          this.alertservice.Alert("Error while Submit !" + data[0].Error.toString(), 3, () => { }, () => { });
        }
      });
    }, () => {
      // User clicked 'Cancel' in the confirmation alert
      // Handle cancellation if needed
    });
  }

  GetAllAbitrationNotes() {

    this.VideoCallId = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id;
    this.LoginUserId = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;
    this.loginservice.GetAllAbitrationNotes(this.VideoCallId, this.LoginUserId).subscribe((data: any) => {
      if (!!data && data.length > 0) {
        this.ArbitrationNotes = data;
      }
    });

  }
  GetAllScrutinyComments() {

    if (!!localStorage.getItem('ArbitrationDetails') && !!localStorage.getItem('ADR_Dashboard_User')) {
      this.VideoCallId = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id;
      this.LoginUserId = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;
      this.loginservice.GetallScrutinyComment(this.VideoCallId, this.LoginUserId).subscribe((data: any) => {
        if (!!data && data.length > 0) {
          this.AllScrutinyComments = data;
          this.ShowScrutinyComments = data.filter((x: any) => x.PartyId == this.LoginUserId);
        }
      });
    }
  }
  checkauthurl() {
    // alert('jjijiijij')
    let userDataString = localStorage.getItem('ADR_Dashboard_User');
    if (userDataString) {


      let userData = JSON.parse(userDataString);
      this.Type = userData?.Type;
      this.Side = userData?.Side;
      this.AuthURL = userData?.AuthorisationUrl;
      // localStorage.setItem('AuthURL', this.AuthURL);
      // this.AuthURL=JSON.parse( `${localStorage.getItem('ADR_Dashboard_User')}`).AuthorisationUrl
      // alert(this.AuthURL)
    } else {
      console.log('No data found in localStorage for key ADR_Dashboard_User');
    }
    let showAlert = true;
    if (showAlert) {
      // alert('90')
      // alert(this.Type)
      // alert(this.AuthURL)
      if (this.AuthURL === null) {




        // alert(this.Type)

        if (this.Type === 2) {
          this.openUploadModal(4);
        } else if (this.Type === 3) {
          // this.openUploadModal(3);
        }
        else if (this.Type === 0 && this.Side == 1) {
          // this.openUploadModal(1)
        }
        showAlert = false; // Set the flag to prevent repeated alerts in the next 5 minutes.
      }
    }
  }
  FilterArbitratorwithDisclosure() {
    return this.ArbitrationParties.filter(x => x.Type == 3).filter(x => !!x.AuthorisationUrl && x.AuthorisationUrl.length > 1);
  }

  FilterArbitrationParties(side: any, partytype: any) {
    // console.log(this.imInPvtCall)
    if (this.imInPvtCall) {
      // console.log("else 2")
      return this.ArbitrationPartiesonly.filter(x => x.Type == partytype).filter(x => x.Side == side && (x.IsPrivateCall == 2 || x.IsPrivateCall == 10)).reverse();

    } else {
      // console.log("else 1")
      // console.log(this.ArbitrationPartiesonly, '    console.log(this.ArbitrationPartiesonly)')
      // console.log(this.ArbitrationParties.filter(x => x.Type == partytype).filter(x => x.Side == side), '-----------------WHAT--------------------');

      return this.ArbitrationParties.filter(x => x.Type == partytype).filter(x => x.Side == side).reverse();

    }
  }

  FilterArbitrationPartiesForAppearingFor(partytype: any) {
    // console.log(this.imInPvtCall)

    // console.log("else 1")
    // console.log(this.ArbitrationPartiesonly,'    console.log(this.ArbitrationPartiesonly)')
    // console.log(this.ArbitrationParties.filter(x => x.Type == partytype).filter(x => x.Side == side), '-----------------WHAT--------------------');

    return this.ArbitrationParties.filter(x => x.Type == partytype);


  }
  FilterArbitrationPartiesWithIsConteoller(side: any, partytype: any, controller: any) {
    if (side) {
      // console.log("if 2")

      return this.ArbitrationPartiesonly.filter(x => x.Type == partytype && x.IsController == controller).filter(x => x.Side == side && (x.IsPrivateCall == 2 || x.IsPrivateCall == 10));

    } else {
      // console.log("else 2")
      return this.ArbitrationParties.filter(x => x.Type == partytype && x.IsController == controller).filter(x => x.Side == side);

    }
  }
  FilterArbitrationPartiesWithType(partytype: any) {
    if (this.imInPvtCall) {
      // console.log("if 3")

      return this.ArbitrationPartiesonly.filter(x => x.Type == partytype && (x.IsPrivateCall == 2 || x.IsPrivateCall == 10));

    } else {
      // console.log("else 3")
      return this.ArbitrationPartiesonly.filter(x => x.Type == partytype);

    }

  }
  FilterArbitrationPartiesWithTypeForAdministrativeSection() {
    if (this.imInPvtCall) {
      // console.log("if 3")

      return this.ArbitrationPartiesonly.filter(x => (x.Type == 4 || x.Type == 5) && (x.IsPrivateCall == 2 || x.IsPrivateCall == 10));

    } else {
      // console.log("else 3")
      return this.ArbitrationParties.filter(x => (x.Type == 4 || x.Type == 5));

    }

  }
  FilterArbitrationPartiesWithSide(side: any) {


    return this.ArbitrationParties.filter(x => x.Side == side);

  }
  FilterArbitrationDocumentDetails(id: any) {
    // alert('g')

    return this.ArbitrationDocDetails.filter(x => x.ArbitrationDocumentsId == id);
  }
  ionViewWillEnter() {
    this.GetMyArbitrationPartyDetails();



    this.GetAllArbitrationPartiesonly();
    // Initialize a variable to control when to show the alert.

    // Set up an interval to run every 5 minutes (300,000 milliseconds).


    setTimeout(() => {
      this.checkauthurl();
      this.checktribunalstatus();
    }, 15000);

  }

  AddResponse() {
    // alert('kokokokkokokok')
    // Parse the JSON stored in localStorage and get the value of ArbitrationStage
    const arbitrationDetails = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`);
    const arbitrationStage = arbitrationDetails ? arbitrationDetails.ArbitrationStage : null;


    // Check if ArbitrationStage is 4
    if (arbitrationStage === 4) {

      this.router.navigate(['/tribunal-constitution']);
    } else {
      // Handle other cases or do nothing
    }
  }
  Profile() {

    this.router.navigate(['/profile-details']);

  }
  openPopup() {
    const popupContainer = this.el.nativeElement.querySelector('#popup-container');
    this.renderer.removeClass(popupContainer, 'popup-hidden');
    this.renderer.addClass(popupContainer, 'popup-visible');
  }
  modal() {

    this.showprofilemodal = !this.showprofilemodal

  }
  closePopup() {
    const popupContainer = this.el.nativeElement.querySelector('#popup-container');
    this.renderer.removeClass(popupContainer, 'popup-visible');
    this.renderer.addClass(popupContainer, 'popup-hidden');
  }
  ionViewDidEnter() {
    // Access the nativeElement property here
    // alert(this.enableVideo)
    if (this.enableVideo) {
      //  this.turnvideoOff();
      // alert("hell" +JSON.stringify(this.videoElement))
      if (this.videoElement) {
        // alert("hi"+JSON.stringify(this.videoElement))
        const videoElement = this.videoElement.nativeElement as HTMLVideoElement;
        //     this.turnvideoOn();

        // Additional code for manipulating the video element
      } else {

        this.videoElement = new ElementRef(document.querySelector('#videoElement'));
        //   this.turnvideoOn();
      }


    } else {
      // this.turnvideoOff();
    }

  }
  ngAfterViewInit() {
    this.enumerateDevices();
    if (this.isChatboxVisible) {
      this.scrollToBottom();
    }
  }
  // ReceiveSocket(){
  //   this.socket.on('muteAllVideoResponse', (message: any) => {
  //   this.GetAllArbitrationPartiesonly();
  //   this.checklogins();
  //     console.log('Received message:', message);

  //   });
  //   this.socket.on('unmuteAllVideoResponse', (message: any) => {
  //     this.GetAllArbitrationPartiesonly();
  //     this.checklogins();
  //           console.log('Received message:', message);

  //         });

  //         this.socket.on('MuteAudio', (message: any) => {
  //           this.GetAllArbitrationPartiesonly();
  //           this.checklogins();
  //                 console.log('Received message:', message);

  //               });

  //               this.socket.on('unmuteAllAudioResponse', (message: any) => {
  //                 this.GetAllArbitrationPartiesonly();
  //                 this.checklogins();
  //                       console.log('Received message:', message);

  //                     });

  //                     this.socket.on('unmutemyVideoResponse', (message: any) => {
  //                       this.GetAllArbitrationPartiesonly();
  //                       this.checklogins();
  //                         console.log('Received message:', message);

  //                       });
  //                       this.socket.on('mutemyVideoResponse', (message: any) => {
  //                         this.GetAllArbitrationPartiesonly();
  //                         this.checklogins();
  //                               console.log('Received message:', message);

  //                             });

  //                             this.socket.on('mutemyAudioResponse', (message: any) => {
  //                               this.GetAllArbitrationPartiesonly();
  //                               this.checklogins();
  //                                     console.log('Received message:', message);

  //                                   });

  //                                   this.socket.on('unmutemyAudioResponse', (message: any) => {
  //                                     this.GetAllArbitrationPartiesonly();
  //                                     this.checklogins();
  //                                           console.log('Received message:', message);

  //                                         });
  //                                         this.socket.on('InsertArbnotesResponse', (message: any) => {
  //                                           this.GetAllAbitrationNotes();
  //                                           this.checklogins();
  //                                                 console.log('Received message InsertArbnotes:', message);

  //                                               });
  //                                               this.socket.on('JoinVideoCallRequestsResponse', (message: any) => {

  //                                                 this.GetAllArbitrationPartiesonly();
  //                                                  this.checklogins();

  //                                                   console.log('JoinVideoCallRequestsResponse:', message);

  //                                                 });
  //                                                 this.socket.on('AcceptedUsertoVideocallResponse', (message: any) => {

  //                                                   this.GetAllArbitrationPartiesonly();
  //                                                   this.checklogins();

  //                                                     console.log('AcceptedUsertoVideocallResponse:', message);

  //                                                   });

  // }
  startTimer() {
    this.timer = 10;
    const interval = setInterval(() => {
      this.timer--;

      if (this.timer === 0) {
        this.showResendLink = true; // Enable the Resend link after 60 seconds
        clearInterval(interval); // Stop the timer
      }
    }, 1000); // Timer ticks every second
  }
  EnableVideo() {
    if (this.IsVideo == false) {
      this.IsVideo = true;
      this.isMenuVisible = false;
      setTimeout(() => {
        // this.startCalls();
        if (this.enableVideo) {
          this.turnvideoOff();
          // alert("hell" +JSON.stringify(this.videoElement))
          if (this.videoElement) {
            // alert("hi"+JSON.stringify(this.videoElement))
            const videoElement = this.videoElement.nativeElement as HTMLVideoElement;
            this.turnvideoOn();

            // Additional code for manipulating the video element
          } else {

            this.videoElement = new ElementRef(document.querySelector('#videoElement'));
            this.turnvideoOn();
          }


        } else {
          this.turnvideoOff();
        }
      }, 100)


    }
    else {


      //   this.isMenuVisible = true;
      this.IsVideo = false;
      // this.isPeacegatePaddingLeft=false;
      this.turnvideoOff();
    }
  }
  Send() {

    this.showResendLink = true;
    this.arbitrationservice.SpLoginUser(this.ArbitrationDetailId, this.Email).subscribe(
      data => {
        this.startTimer();
        if (data) {
          if (data.Id > 0) {
            this.Logindata = data;
            this.LoginStep = 2;
          } else {
            this.alertservice.Alert("Sorry, you are not an authorized user!", 3, () => { }, () => { });
          }
        }
      },
      error => {
        // Handle the error by showing an unauthorized message
        this.alertservice.Alert("Unauthorized user!", 3, () => { }, () => { });
      }
    );


  }
  VerifyOTP() {

    // Format the current time to a string in a desired format
    const currentTime = new Date();
    const formattedTime = currentTime.toISOString();
    // console.log(formattedTime);
    this.arbitrationservice.VerifyLogin(this.Email, this.Password).subscribe((data: any) => {
      // console.log(data,'document');

      if (data) {
        if (data.Status == 200) {

          this.TokenEncryptionService.EncryptToken(data.Token);


          localStorage.setItem("ADR_Dashboard_User", JSON.stringify(this.Logindata));

          this.GetAllArbitrationDetails()
          // this.GetMyArbitrationPartyDetails()
          // // this.GetAllArbitrationDetails()
          // // this.GetAllArbitrationParties();
          // // this.GetAllArbitrationDocuments();

          this.IsUser = true;
          this.LoginStep = 1;
          let users = []

          this.SaveLogin.LoginTime = formattedTime;
          this.SaveLogin.Email = this.Email
          users = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`)
          this.SaveLogin.UserId = users.Id; // Access the Id property


          this.loginservice.SaveLogins(this.SaveLogin).subscribe(data => {
            if (data) {


              localStorage.setItem("SCode", data.SecretCode);
              const user = JSON.parse(localStorage.getItem('ADR_Dashboard_User') || '[]')
              this.Type = user?.Type
              this.videocallUserservice.UpdateArbitrationPartyLastLoginTime(user.Id, this.currentTimeforchecking).subscribe(data => {
                if (data) {
                  // window.location.reload();
                  // alert(this.Logindata)
                  // console.log('====================================', user, '==================================');



                  if (user.Type == 6 || user.Type == 3) {
                    window.location.reload()
                  } else {
                    this.loadPageFunctions()
                    this.load()

                  }
                }
              });

              // alert('completed')

            }
          });

        }
        else {
          // alert("Invalid OTP !");
          this.alertservice.Alert("Invalid OTP !", 3, () => { }, () => { },);

        }
      }
      else {
        this.alertservice.Alert("Error while Sign In. Please try again !", 3, () => { }, () => { },);


        this.LoginStep = 1;
      }


    })


  }
  getObjectURL(file: File): string {
    return URL.createObjectURL(file);
  }

  GenerateToken(role: any) {
    for (let i = 0; i < this.ArbitrationParties.length; i++) {
      let param = {
        appID: 'eae708a57586481da3a59a10b17490a3',
        channelName: 'h_' + this.VideoCallId.toString(),
        uid: this.ArbitrationParties[i].Id,
        appCertificate: 'c9356956b4d44df980106316fb1efbd2',
        roleType: role
      };
      this.videostream.GetAgoraToken(param).subscribe((res: any) => {
        if (res) {
          this.generatedtoken = res.key;

          if (this.ArbitrationParties[i].Id == JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id) {
            this.MyArbId = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;
            this.videocallUserservice.UpdateTokenandChannel(this.ArbitrationParties[i].Id, param.channelName, res.key, this.MyArbId).subscribe(
              (data: any) => {
                this.videocallUserservice.UpdateArbitrationPartyLastTokenGeneratedTime(JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id, this.currentTimeforchecking).subscribe(
                  (data: any) => {

                  })
                if (data[0].Id > 0 && data[0].Error == 0) {
                  console.log("videocall status started updated");

                  this.videocallUserservice.GetMyArbitrationPartyDetails(JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id, JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id).subscribe((data: any) => {
                    if (data.length > 0) {
                      this.videocalltoken = data[0].Videocall_Token;
                      this.AuthURL = data[0].AuthorisationUrl;
                      this.videocallchannel = data[0].Videocall_Channel;
                      this.IsVideo = true;
                      this.continueToVideoCall();
                    } else {

                    }
                  });


                } else {
                  console.log("Error while updating ")
                }
              }
            );
          } else {
            this.MyArbId = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;
            this.videocallUserservice.UpdateTokenandChannel(this.ArbitrationParties[i].Id, param.channelName, res.key, this.MyArbId).subscribe(
              (data: any) => {
              }
            );

          }




        } else {
          this.alertservice.Alert("Unable to join videocall, Server not responding !", 3, () => { }, () => { },);


        }



      }, err => {
        this.alertservice.Alert("Unable to join videocall, Server not responding !", 3, () => { }, () => { },);
        console.log(err);
      });

    }






  }
  async openUploadModalForDraftIssues(Type: any) {
    const modal = await this.modalController.create({
      component: UploadModalPage,
      cssClass: 'my-modal',
      // You can pass data to the modal using the componentProps option if needed
      componentProps: {
        Arbitration: this.ArbitrationDetails,
        ArbitrationParties: this.ArbitrationParties,
        ArbitrationDocuments: this.ArbitrationDocs,
        Type: Type,
        DaftIssues: true
      },

    });
    modal.onDidDismiss().then((modelData: any) => {
      if (!!modelData && !!modelData.data && modelData.data.FormType == 0) {
        this.GetAllArbitrationDetails();
      }
      else if (!!modelData && !!modelData.data && modelData.data.FormType > 0 && !modelData.data.ReferenceDocument) {
        this.OpenProceduralOrderModal(modelData.data.FormType, modelData.data.IsConnectwithParty, modelData.data.DocType, modelData.data.ApplicationType);
      }
      else if (!!modelData && !!modelData.data && modelData.data.FormType > 0 && !!modelData.data.ReferenceDocument) {
        this.OpenProceduralOrderModalForApplication(modelData.data.FormType, modelData.data.IsConnectwithParty, modelData.data.DocType, '5', modelData.data.ReferenceDocument);
      }
    });
    await modal.present();
  }
  async openUploadModalForDocumentFiling(Type: any, filename: any, apptype: any) {
    const modal = await this.modalController.create({
      component: UploadModalPage,
      cssClass: 'my-modal',
      // You can pass data to the modal using the componentProps option if needed
      componentProps: {
        Arbitration: this.ArbitrationDetails,
        ArbitrationParties: this.ArbitrationParties,
        ArbitrationDocuments: this.ArbitrationDocs,
        CaseManagementProcedure: this.CaseManagementProcedure,
        Type: Type,
        Applicationtype: apptype,
        DocFileName: filename
      },

    });
    modal.onDidDismiss().then((modelData: any) => {
      if (!!modelData && !!modelData.data && modelData.data.FormType == 0) {
        this.GetAllArbitrationDetails();

      }
      else if (!!modelData && !!modelData.data && modelData.data.FormType > 0 && !modelData.data.ReferenceDocument) {
        this.OpenProceduralOrderModal(modelData.data.FormType, modelData.data.IsConnectwithParty, modelData.data.DocType, modelData.data.ApplicationType);
      }
      else if (!!modelData && !!modelData.data && modelData.data.FormType > 0 && !!modelData.data.ReferenceDocument) {
        this.OpenProceduralOrderModalForApplication(modelData.data.FormType, modelData.data.IsConnectwithParty, modelData.data.DocType, '5', modelData.data.ReferenceDocument);
      }
    });
    await modal.present();
  }
  async openUploadModalForApplication(Type: any, doctype: any, cm: any) {
    const modal = await this.modalController.create({
      component: UploadModalPage,
      cssClass: 'my-modal',
      // You can pass data to the modal using the componentProps option if needed
      componentProps: {
        Arbitration: this.ArbitrationDetails,
        ArbitrationParties: this.ArbitrationParties,
        ArbitrationDocuments: this.ArbitrationDocs,
        Type: Type,
        DocType: doctype,
        ReferenceDocument: cm
      },

    });
    modal.onDidDismiss().then((modelData: any) => {
      if (!!modelData && !!modelData.data && modelData.data.FormType == 0) {
        // this.GetAllArbitrationDetails();
        this.loadPageFunctions()
      }
      else if (!!modelData && !!modelData.data && modelData.data.FormType > 0) {
        this.OpenProceduralOrderModalForApplication(modelData.data.FormType, modelData.data.IsConnectwithParty, modelData.data.DocType, doctype.toString(), cm);
      }
    });

    await modal.present();
  }
  async openUploadModal(Type: any) {
    // debugger
    const modal = await this.modalController.create({
      component: UploadModalPage,
      cssClass: 'my-modal',
      // You can pass data to the modal using the componentProps option if needed
      componentProps: {
        Arbitration: this.ArbitrationDetails,
        ArbitrationParties: this.ArbitrationParties,
        ArbitrationDocuments: this.ArbitrationDocs,
        CaseManagementProcedure: this.CaseManagementProcedure,
        Type: Type
      },

    });
    modal.onDidDismiss().then((modelData: any) => {
      this.loadPageFunctions()
      if (!!modelData && !!modelData.data && modelData.data.FormType == 0) {
        this.GetAllArbitrationDetails();

      }
      else if (!!modelData && !!modelData.data && modelData.data.FormType > 0 && !modelData.data.ReferenceDocument) {
        this.OpenProceduralOrderModal(modelData.data.FormType, modelData.data.IsConnectwithParty, modelData.data.DocType, modelData.data.ApplicationType);
      }
      else if (!!modelData && !!modelData.data && modelData.data.FormType > 0 && !!modelData.data.ReferenceDocument) {
        this.OpenProceduralOrderModalForApplication(modelData.data.FormType, modelData.data.IsConnectwithParty, modelData.data.DocType, '5', modelData.data.ReferenceDocument);
      }
    });
    await modal.present();
  }
  async openProfileModal(party: any) {
    // code edited by jizel 
    // console.log(this.ArbitrationPartiesonly, 'ppppppppp', party.Type, '----------------', this.FilterArbitrationPartiesWithIsConteoller(0, 3, 1));

    let arbdoc: any = '';
    if (party.Type == 2) {
      console.log('here1');

      const modal = await this.modalController.create({
        component: ProfileDetailsPage,
        cssClass: 'my-modal',

        componentProps: {
          ArbitrationParty: party,
          ArbitrationParties: this.FilterArbitrationPartiesForAppearingFor(0),
          ArbDoc: arbdoc
        },

      });
      modal.onDidDismiss().then((modelData) => {
        if (modelData !== null) {
          this.GetAllArbitrationDetails();
        }
      });
      await modal.present();
    } else {

      if (party.Type == 3) {
        if ((!!this.filterarbitrationDocumentwithUserId(3, 3, party.Id) && this.filterarbitrationDocumentwithUserId(3, 3, party.Id).length > 0)) {
          arbdoc = this.filterarbitrationDocumentwithUserId(3, 3, party.Id)[0].Description;
          console.log('here4');
        }
      }

      const modal = await this.modalController.create({
        component: ProfileDetailsPage,
        // You can pass data to the modal using the componentProps option if needed
        componentProps: {
          ArbitrationParty: party,
          ArbitrationParties: this.FilterArbitrationPartiesWithIsConteoller(0, 3, 1),
          ArbDoc: arbdoc
        },

      });
      modal.onDidDismiss().then((modelData) => {
        if (modelData !== null) {
          this.GetAllArbitrationDetails();
        }
      });
      await modal.present();
    }


  }

  async OpenProceduralOrderModalForApplication(type: any, val: any, doc: any, applicationtype: any, cm: any) {

    const modal = await this.modalController.create({
      component: ProceduralOrderPage, cssClass: 'my-modal',
      // You can pass data to the modal using the componentProps option if needed
      componentProps: {
        ArbitrationDetails: this.ArbitrationDetails,
        ArbitrationParties: this.ArbitrationParties,
        ArbitrationDocs: this.ArbitrationDocs,
        Type: type,
        IsConnectwithParty: val,
        DocType: doc,
        ApplicationType: applicationtype,
        ReferenceDocument: cm
      },

    });
    modal.onDidDismiss().then((modelData) => {
      this.GetAllArbitrationDetails();
    });
    await modal.present();

  }
  async OpenProceduralOrderModal(type: any, val: any, doc: any, applicationtype: any) {
    if (type == 10) {
      if (!!this.filterarbitrationDocument(10, 3) && this.filterarbitrationDocument(10, 3).length > 0) {
        if (confirm("Case Management Procedure already created. Are you sure to amend the exiting and create new ?   ")) {
          const modal = await this.modalController.create({
            component: ProceduralOrderPage, cssClass: 'my-modal',
            // You can pass data to the modal using the componentProps option if needed
            componentProps: {
              ArbitrationDetails: this.ArbitrationDetails,
              ArbitrationParties: this.ArbitrationParties,
              Type: type,
              IsConnectwithParty: val,
              DocType: doc,
              ApplicationType: applicationtype,
              CaseManagementProcedure: this.CaseManagementProcedure
            },

          });
          modal.onDidDismiss().then((modelData) => {
            this.GetAllArbitrationDetails();

          });
          await modal.present();
        }
      }
      else {
        const modal = await this.modalController.create({
          component: ProceduralOrderPage, cssClass: 'my-modal',
          // You can pass data to the modal using the componentProps option if needed
          componentProps: {
            ArbitrationDetails: this.ArbitrationDetails,
            ArbitrationParties: this.ArbitrationParties,
            Type: type,
            IsConnectwithParty: val,
            DocType: doc,
            ApplicationType: applicationtype
          },

        });
        modal.onDidDismiss().then((modelData) => {
          this.GetAllArbitrationDetails();
        });
        await modal.present();
      }
    }

    else {
      const modal = await this.modalController.create({
        component: ProceduralOrderPage, cssClass: 'my-modal',
        // You can pass data to the modal using the componentProps option if needed
        componentProps: {
          ArbitrationDetails: this.ArbitrationDetails,
          ArbitrationParties: this.ArbitrationParties,
          CaseManagementProcedure: this.CaseManagementProcedure,
          Type: type,
          IsConnectwithParty: val,
          DocType: doc,
          ApplicationType: applicationtype
        },

      });
      modal.onDidDismiss().then((modelData) => {
        this.GetAllArbitrationDetails();
      });
      await modal.present();
    }
  }
  simple() {
    alert("clicked")
  }


  async OpenCreatedDoc(type: any, doc: any) {
    //console.log("!@#$%^^^^^^^^^^^^")
    const modal = await this.modalController.create({
      component: DocViewerPage, cssClass: 'my-modal',
      // You can pass data to the modal using the componentProps option if needed
      componentProps: {
        ArbitrationDetails: this.ArbitrationDetails,
        ArbitrationParties: this.ArbitrationParties,
        Type: type,
        Docs: doc
      },

    });
    modal.onDidDismiss().then((modelData) => {

    });
    await modal.present();
  }
  onJoinCallClick() {

    if (this.enableVideo) {
      localStorage.setItem("enableVideo", 'enabled');
    } else {
      localStorage.setItem("enableVideo", 'disabled');
    }
    if (this.enableAudio) {
      localStorage.setItem("enableAudio", 'enabled');

    } else {
      localStorage.setItem("enableAudio", 'disabled');

    }
    localStorage.setItem("AudioDevice", this.selectedAudioDeviceId);
    localStorage.setItem("Audioout", 'f4769a8baedaf9f9fcfb8ee9e12153d50b345ba76362b5d19647bc70c5e8e7db');



    // this.router.navigate(['videocall']);
  }
  turnvideoOff() {
    const videoElement = this.videoElement.nativeElement as HTMLVideoElement;

    // Pause the video and stop the camera stream
    videoElement.pause();
    const stream = videoElement.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    // Clear the video element source
    videoElement.srcObject = null;
    // this.ngAfterViewInit();
  }
  async startCalls() {


    await this.videostream.createRTCClient(this.HostId);


    const uid = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;
    console.log(this.videocalltoken, this.videocallchannel, uid, this.videoState, this.audioState, this.usertype, 'ppoopopopop');
    this.videostream.agoraServerEvents(this.videostream.rtc, this.ArbitrationParties, this.imInPvtCall);
    await this.videostream.localUser(this.videocalltoken, this.videocallchannel, uid, this.videoState, this.audioState, this.usertype);

    this.hideBtns = false;
    // const selectedUserVideo = document.getElementById('video-holder');
    // this.selfVideo = true;

    // // Hide the div by setting its display property to "none"
    // if (selectedUserVideo) {
    //   selectedUserVideo.style.display = "none";

    // }

  }
  async onvideostartGeneratetoken() {
    // alert('poda')
    this.isMenuVisible = false;

    // Assuming 'ADR_Dashboard_User' contains JSON stringified data
    const userDataString = localStorage.getItem('ADR_Dashboard_User');

    if (userDataString) {
      const userData = JSON.parse(userDataString);

      // Set the 'VideocallStartedBy' item in localStorage
      localStorage.setItem('VideocallStartedBy', userData.Id);
    }

    // Add token and channel for parties
    await this.GenerateToken(0);
  }
  async onvideostartformeonly() {
    // alert("for me only");

    let param = {
      appID: 'eae708a57586481da3a59a10b17490a3',
      channelName: 'h_' + this.VideoCallId.toString(),
      uid: JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id,
      appCertificate: 'c9356956b4d44df980106316fb1efbd2',
      roleType: 0
    };
    this.videostream.GetAgoraToken(param).subscribe((res: any) => {

      if (res) {
        this.generatedtoken = res.key;

        this.videocallUserservice.UpdateTokenandChannelformeonly(JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id, param.channelName, res.key).subscribe(
          (data: any) => {
            if (data[0].Id > 0 && data[0].Error == 0) {
              console.log("videocall status started updated");

              this.videocallUserservice.GetMyArbitrationPartyDetails(JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id, JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id).subscribe((data: any) => {
                if (data.length > 0) {
                  this.videocalltoken = data[0].Videocall_Token;
                  this.videocallchannel = data[0].Videocall_Channel;
                  this.IsVideo = true;
                  this.continueToVideoCall();
                } else {

                }
              });


            } else {
              console.log("Error while updating ")
            }
          }
        );





      } else {
        this.alertservice.Alert("Unable to join videocall, Server not responding !", 3, () => { }, () => { },);


      }



    }, err => {
      this.alertservice.Alert("Unable to join videocall, Server not responding !", 3, () => { }, () => { },);

      console.log(err);
    });

  }


  closevideomodal() {
    this.RequestforJoinVideocall = !this.RequestforJoinVideocall
  }
  turnvideoOn() {

    const videoElement = this.videoElement.nativeElement as HTMLVideoElement;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        // console.log(stream,"stream");
        if (videoElement) {
          videoElement.srcObject = stream;
          videoElement.play();
          // this.stream = stream;
          // this.isVideoEnabled = true;
        }
        // Assign the camera stream to the video element source
        // videoElement.srcObject = stream;
        // videoElement.play();
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
      });
    // Additional code for manipulating the video element

    // Access the user's camera

  }
  loadPDF(event: any, content: any): void {
    const file = event.target.files[0];


    const reader = new FileReader();
    reader.onloadend = () => {
      this.pdfUrl = reader.result as string;
      // this.srcs=this.pdfUrl

      if (this.pdfUrl) {
        // this.router.navigate(['/pdf'], { queryParams: { src: this.pdfUrl } });
        this.srcs = this.pdfUrl


      }
      // this.openPDF(); // Automatically open the PDF after loading
    };

    reader.readAsDataURL(file);



    const modalOptions: NgbModalOptions = {

      backdrop: false, // Disable backdrop
      keyboard: false // Disable closing the modal with the keyboard
    };
    this.modalService.open(content, modalOptions);
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }
  openFileSelector(content: any): void {
    const file = content.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.pdfUrl = reader.result as string;
      // this.openPDF(); // Automatically open the PDF after loading
    };
    reader.readAsDataURL(file);


    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.addEventListener('change', (event: any) => {
      this.selectedFile = event.target.files[0];


      if (this.selectedFile) {
        // Open the modal with customized options
        const modalOptions: NgbModalOptions = {
          backdrop: false, // Disable backdrop
          keyboard: false // Disable closing the modal with the keyboard
        };
        this.modalService.open(content, modalOptions);

        // Load the PDF into the viewer
        const fileUrl = URL.createObjectURL(this.selectedFile);


        // this.renderer.setProperty(this.pdfViewer.nativeElement, 'src', fileUrl);
      }
    });
    input.click();
  }

  addPDF(section: string) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';
    input.addEventListener('change', (event: any) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        // Check if the section exists in selectedPDFs object
        if (!this.selectedPDFs[section]) {
          this.selectedPDFs[section] = [];
        }
        this.selectedPDFs[section].push(selectedFile);
      }
    });
    input.click();
  }

  removePDF(section: string, pdf: File) {
    if (this.selectedPDFs[section]) {
      this.selectedPDFs[section] = this.selectedPDFs[section].filter((file) => file !== pdf);
    }
  }
  toggleCollapseOnes() {
    if (this.collapsedone == 'collapse') {
      this.collapsedone = ''

    } else {
      this.collapsedone = 'collapse'
    }
    // this.collapse = !this.collapse;
  }
  toggleCollapsetwo() {
    if (this.collapsedtwo == 'collapse') {
      this.collapsedtwo = ''

    } else {
      this.collapsedtwo = 'collapse'
    }
    // this.collapse = !this.collapse;
  }
  toggleCollapsethree() {
    if (this.collapsedthree == 'collapse') {
      this.collapsedthree = ''

    } else {
      this.collapsedthree = 'collapse'
    }
    // this.collapse = !this.collapse;
  }
  toggleCollapsefour() {
    if (this.collapsedfour == 'collapse') {
      this.collapsedfour = ''

    } else {
      this.collapsedfour = 'collapse'
    }
  }
  toggleCollapsefive() {
    if (this.collapsedfive == 'collapse') {
      this.collapsedfive = ''

    } else {
      this.collapsedfive = 'collapse'
    }
    // this.collapse = !this.collapse;
  }

  toggleCollapsesix() {
    if (this.collapsedsix == 'collapse') {
      this.collapsedsix = ''

    } else {
      this.collapsedsix = 'collapse'
    }
  }
  toggleCollapseseven() {
    if (this.collapsedseven == 'collapse') {
      this.collapsedseven = ''

    } else {
      this.collapsedseven = 'collapse'
    }
  }
  toggleCollapse8() {
    if (this.collapsed8 == 'collapse') {
      this.collapsed8 = ''

    } else {
      this.collapsed8 = 'collapse'
    }
  }
  toggleCollapse9() {
    if (this.collapsed9 == 'collapse') {
      this.collapsed9 = ''

    } else {
      this.collapsed9 = 'collapse'
    }
  }

  toggleCollapse10() {
    // alert('poda')
    if (this.collapsed10 == 'collapse') {
      this.collapsed10 = ''
    } else {
      this.collapsed10 = 'collapse'
    }
  }
  toggleCollapse11() {


    if (this.collapsed11 == 'collapse') {
      this.collapsed11 = ''
    } else {
      this.collapsed11 = 'collapse'
    }
  }
  toggleCollapse12() {
    if (this.collapsed12 == 'collapse') {
      this.collapsed12 = ''
    } else {
      this.collapsed12 = 'collapse'
    }
  }
  toggleCollapse13() {
    if (this.collapsed13 == 'collapse') {
      this.collapsed13 = ''
    } else {
      this.collapsed13 = 'collapse'
    }
  }
  toggleCollapse14() {
    if (this.collapsed14 == 'collapse') {
      this.collapsed14 = ''
    } else {
      this.collapsed14 = 'collapse'
    }
  }
  toggleCollapse15() {
    if (this.collapsed15 == 'collapse') {
      this.collapsed15 = ''
    } else {
      this.collapsed15 = 'collapse'
    }
  }
  openPDF(): void {
    if (this.pdfUrl) {
      this.router.navigate(['/pdf'], { queryParams: { src: this.pdfUrl } });
    }
  }


  sidebar() {
    this.isMenuVisible = !this.isMenuVisible
  }
  public toggleChat() {
    this.isChatVisible = !this.isChatVisible;
  }
  toggleChatbox() {
    this.isChatboxVisible = !this.isChatboxVisible;
    this.isFabVisible = !this.isFabVisible

    // Scroll to the bottom after toggling the chatbox
    if (this.isChatboxVisible) {
      this.scrollToBottom();
    }
  }

  // Function to scroll to the bottom of the chat content
  scrollToBottom() {
    try {
      this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }



  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    if (this.selectedFile) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data uri

      reader.onload = (event) => { // called once readsDataURL is completed
        let path = event.target == null ? '' : event.target.result;
        this.selectedFilePath = path as string;
        this.selectedFileB64 = this.selectedFilePath.split(",")[1];
        if (this.selectedFilePath.includes(" Image")) {
          this.isFileImage = true;
          this.isFileDocument = false;
        } else {
          this.isFileImage = false;
          this.isFileDocument = true

        }
      }
    }
  }

  async unmuteAudio(Type: any, Side: any, Id: any) {

    this.ismuteAudio = true;
    localStorage.setItem("enableAudio", 'enabled');
    // if(this.HostId != this.user){
    this.videocallUserservice.MuteAudioorVideoOfRemoteUser(this.VideoCallId, Id, 0, 0).subscribe(
      (data: any) => {
        // this.socket.emit('unmutemyAudio', {

        //   muteAudio: 1
        // });
      }
    )
    await this.videostream.unmuteAudio();
    //  }else{
    //   await this.videostream.unmuteAudio();
    //  }
    // await this.videostream.unmuteAudio();
  }
  async muteAudio(Type: any, Side: any, Id: any) {
    this.ismuteAudio = false;
    //  if(this.HostId != this.user){
    localStorage.setItem("enableAudio", 'disabled');
    this.videocallUserservice.MuteAudioorVideoOfRemoteUser(this.VideoCallId, Id, 1, 0).subscribe(
      (data: any) => {
        // this.socket.emit('mutemyAudio', {

        //   muteAudio: 1
        // });
      }
    );
    await this.videostream.muteAudio();

    //  }else{
    //   await this.videostream.muteAudio();
    //  }


  }
  async muteVideo(Type: any, Side: any, Id: any) {
    // console.log(Type, Side, Id, 'lo');

    // alert("mute")
    this.ismuteVideo = false;
    // if(this.HostId != this.user){
    localStorage.setItem("enableVideo", 'disabled');
    this.videocallUserservice.MuteAudioorVideoOfRemoteUser(this.VideoCallId, this.LoginUserId, 1, 1).subscribe(
      (data: any) => {
        // this.socket.emit('mutemyVideo', {

        //   muteAudio: 1
        // });
      }
    );
    await this.videostream.muteVideo();
    //  }else{
    //   await this.videostream.muteVideo();
    //  }
    // await this.videostream.muteVideo();
  }
  async unmuteVideo(Type: any, Side: any, Id: any) {

    this.ismuteVideo = true;
    localStorage.setItem("enableVideo", 'enabled');
    // this.selfVideo = true;
    // if(this.HostId != this.user){
    this.videocallUserservice.MuteAudioorVideoOfRemoteUser(this.VideoCallId, this.LoginUserId, 0, 1).subscribe(
      (data: any) => {
        // this.socket.emit('unmutemyVideo', {

        //   muteAudio: 1
        // });
      }
    );
    // }
    await this.videostream.unmuteVideo(Type, Side, Id);
    // }

  }
  async muteRemoteUserAudio(Type: any, Side: any, Id: any) {
    this.videocallUserservice.MuteAudioorVideoOfRemoteUser(this.VideoCallId, Id, 1, 0).subscribe(
      (data: any) => {
      }
    );


  }

  async unmuteRemoteUserAudio(Type: any, Side: any, Id: any) {
    this.videocallUserservice.MuteAudioorVideoOfRemoteUser(this.VideoCallId, Id, 0, 0).subscribe(
      (data: any) => {
      }
    )
  }
  async muteRemoteUserVideo(Type: any, Side: any, Id: any) {
    // await this.videostream.muteRemoteUserVideo(uid,this.videostream.rtc);
    this.videocallUserservice.MuteAudioorVideoOfRemoteUser(this.VideoCallId, Id, 1, 1).subscribe(
      (data: any) => {

      }
    );
  }
  async unmuteRemoteUserVideo(Type: any, Side: any, Id: any) {
    // await this.videostream.unmuteRemoteUserVideo(uid,this.videostream.rtc);
    this.videocallUserservice.MuteAudioorVideoOfRemoteUser(this.VideoCallId, Id, 0, 1).subscribe(
      (data: any) => {
      }
    );
  }

  CheckDocTypeandOpen(filename: any, path: any, segment: any, partytype: any) {
    console.log(filename, 'dis.ID?');

    let ext = '.' + filename.toString().split('.').pop();
    if (ext.startsWith(".jpg") || ext.startsWith(".JPG")
      || ext.startsWith(".JPEG") || ext.startsWith(".jpeg")
      || ext.startsWith(".png") || ext.startsWith(".PNG")
      || ext.startsWith(".pdf") || ext.startsWith(".PDF")
    ) {
      this.OpenDocument(filename, path);
    }
    else {
      let doc = this.ArbitrationDocs.filter(x => x.Id == filename)[0].Description;
      this.OpenCreatedDoc(2, doc);
    }
  }
  OpenDocument(filename: any, path: any) {
    // console.log(filename,path,"file name=================")

    this.isMenuVisible = false;
    this.document_class = 'document-wrapper visible-document';
    this.selecteddocument = this.appconfig.AssetUrl + "/assets/images/" + path + '/' + filename;
    //if (this.IsVideo) {
    this.isPeacegatePaddingLeft = true;
    //}

  }

  OpenDocumentforArbitrationRequest(filename: any, path: any) {

    this.isMenuVisible = false;
    this.document_class = 'document-wrapper visible-document';
    this.selecteddocument = this.appconfig.AssetUrl + "/assets/images/" + path + '/' + filename;
    //if (this.IsVideo) {
    this.isPeacegatePaddingLeft = true;
    //}

  }


  GetAllArbitrationDocuments() {
    this.arbitrationservice.spGetAllArbitrationDocuments(this.ArbitrationDetails.Id).subscribe(data => {
      if (!!data && data.length > 0) {
        this.ArbitrationDocs = <Array<any>>data;
        console.log(this.ArbitrationDocs, "================docs============")
        this.filteredDates = this.FilterDashboardDatesWithSegments(1);

        // Check if the array has more than one element and trim it to only the first one
        this.filteredDates = this.FilterDashboardDatesWithSegments(1);

        // Check if the array has exactly two elements
        if (this.filteredDates.length === 2) {
          this.filteredDates.shift(); // Remove the first element
        }



        this.DraftAwards = this.ArbitrationDocs.filter(x => x.Status == 2);
        //  this.ArbitrationDocs = this.ArbitrationDocs.filter(x => x.Status == 0);
        this.dashboarddate = [...new Map(this.ArbitrationDocs.map(item => [item['Date'], item])).values()];
        this.GetAllArbitrationCaseManagement();
        this.GetAllArbitrationDocumentDetails();
      }
    });
  }

  FilterDashboardDatesWithSegments(type: any) {
    if (type == 1) {
      //  let arb = this.ArbitrationDocs.filter(x => (x.Segment == 1 || x.Segment == 11 || x.Segment == 12 || x.Segment == 3 || x.Segment == 8 || x.Segment == 9) && x.IsMailer == 0);
      let arb = this.ArbitrationDocs.filter(x => (x.Segment == 1 || x.Segment == 11 || x.Segment == 12 || x.Segment == 3 || x.Segment == 9) && x.IsMailer == 0);
      let dashboarddate = [...new Map(arb.map(item => [item['Date'], item])).values()];
      let doc = new DocumentUploadCDN();
      doc.Date = this.datePipe.transform(this.ArbitrationDetails.SysTime, 'dd-MMM-yyyy');
      if (dashboarddate.filter(x => this.datePipe.transform(x.Date, 'dd-MMM-yyyy') == doc.Date).length == 0) {
        dashboarddate.push(doc);
      }
      if (this.FilterArbitrationPartiesWithType(2).length > 0) {

        for (let i = 0; i < this.FilterArbitrationPartiesWithType(2).length; i++) {
          if (!!this.FilterArbitrationPartiesWithType(2)[i].AuthorisationUrl && !!this.FilterArbitrationPartiesWithType(2)[i].AuthorisationDate) {
            doc = new DocumentUploadCDN();
            doc.Date = this.FilterArbitrationPartiesWithType(2)[i].AuthorisationDate;
            if (dashboarddate.filter(x => x.Date == doc.Date).length == 0) {
              dashboarddate.push(doc);
            }
          }
        }
      }
      dashboarddate = [...new Map(dashboarddate.map(item => [item['Date'], item])).values()];
      dashboarddate = dashboarddate.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());


      return dashboarddate;
    }
    else if (type == 2) {
      let arb = this.ArbitrationDocs.filter(x => (x.Segment > 4 && x.Segment < 11 && x.Segment != 5) || (x.DocType == 4 && x.DocumentName != 'Acceptance & Denials of documents'))
      let dashboarddate = [...new Map(arb.map(item => [item['Date'], item])).values()];

      return dashboarddate;

    }
    else if (type == 3) {
      let arb = this.ArbitrationDocs.filter(x => x.Segment == 2)
      let dashboarddate = [...new Map(arb.map(item => [item['Date'], item])).values()];

      return dashboarddate;
    }
    else if (type == 4) {
      let arb = this.ArbitrationDocs.filter(x => x.IsMailer == 1)
      let dashboarddate = [...new Map(arb.map(item => [item['Date'], item])).values()];

      return dashboarddate;
    }
    else if (type == 5) {

      let dashboarddate = [...new Map(this.CaseManagementProcedure.map(item => [item['Date'], item])).values()];
      return dashboarddate;
    }
    else {
      return [];
    }

  }

  CheckArbitrationRequestDate(dt: any) {
    if (this.datePipe.transform(this.ArbitrationDetails.SysTime, 'dd-MMM-yyyy') == this.datePipe.transform(dt, 'dd-MMM-yyyy')) {
      return true;
    }
    else {
      return false;
    }
  }

  GetAllArbitrationDocumentDetails() {
    this.arbitrationservice.spGetAllArbitrationDocumentDetails(this.ArbitrationDetails.Id).subscribe(data => {
      if (!!data && data.length > 0) {
        this.ArbitrationDocDetails = <Array<any>>data;
      }
    });
  }

  filterarbitrationDocumentwithPartytype(partytype: any) {
    if (partytype == 4 || partytype == 5) {
      return this.ArbitrationDocs.filter(x => x.CreatorType == 4 || x.CreatorType == 5);
    }
    else {
      return this.ArbitrationDocs.filter(x => x.CreatorType == partytype && x.DocumentName != ' DISCLOSURE STATEMENT' && x.Segment != 6);

    }
  }

  filterarbitrationDocumentMailers(date: any) {
    return this.ArbitrationDocs.filter(x => x.IsMailer == 1 && x.Date == date);
  }

  filterarbitrationDocument(segment: any, partytype: any) {
    // console.log(this.ArbitrationDocs.filter(x => x.Segment == segment && x.CreatorType == partytype && x. IsMailer == 0), '---------===========---------', this.ArbitrationDetails.ArbitrationStage);

    return this.ArbitrationDocs.filter(x => x.Segment == segment && x.CreatorType == partytype && x.IsMailer == 0);
  }

  filterarbitrationDocumentWithSegment(segment: any) {
    return this.ArbitrationDocs.filter(x => x.Segment == segment && x.IsMailer == 0);
  }

  filterarbitrationDocumentWithDate(segment: any, partytype: any, date: any) {
    return this.ArbitrationDocs.filter(x => x.Segment == segment && x.CreatorType == partytype && x.Date == date && x.IsMailer == 0);
  }
  filterarbitrationDocumentWithDateForPO(segment: any, partytype: any, date: any) {
    if (partytype == 4 || partytype == 5) {
      return this.ArbitrationDocs.filter(x => x.Segment == segment && (x.CreatorType == 4 || x.CreatorType == 5) && x.Date == date && x.IsMailer == 0 && x.DocType == 2);
    }
    else {
      return this.ArbitrationDocs.filter(x => x.Segment == segment && x.CreatorType == partytype && x.Date == date && x.IsMailer == 0 && x.DocType == 2);
    }
  }
  filterarbitrationDocumentWithDateForNotice(segment: any, partytype: any, date: any) {
    if (partytype == 4 || partytype == 5) {
      return this.ArbitrationDocs.filter(x => x.Segment == segment && (x.CreatorType == 4 || x.CreatorType == 5) && x.Date == date && x.IsMailer == 0 && x.DocType == 1);
    }
    else {
      return this.ArbitrationDocs.filter(x => x.Segment == segment && x.CreatorType == partytype && x.Date == date && x.IsMailer == 0 && x.DocType == 1 && x.DocumentName != 'ISSUES' && x.DocumentName != 'NOTICE FOR DRAFT ISSUES' && x.DocumentName != 'FIRST SITTING NOTICE');
    }
  }
  filterarbitrationDocumentWithDateandDocName(segment: any, partytype: any, date: any, docname: any) {
    return this.ArbitrationDocs.filter(x => x.Segment == segment && x.CreatorType == partytype && x.Date == date && x.DocumentName == docname && x.IsMailer == 0);
  }
  filterarbitrationDocumentWithDateandDocNameAndSide(side: any, date: any, docname: any) {
    return this.ArbitrationDocs.filter(x => x.Side == side && x.Date == date && x.DocumentName == docname && x.IsMailer == 0);
  }
  filterarbitrationDocumentWithDateandDocNameWithUserId(segment: any, partytype: any, date: any, docname: any, userId: any) {
    // console.log(userId, 'cm?', this.ArbitrationDocs.filter(x => x.Segment == segment && x.CreatorType == partytype && x.Date == date && x.DocumentName == docname && x.IsMailer == 0 && x.CreatorId == userId));

    return this.ArbitrationDocs.filter(x => x.Segment == segment && x.CreatorType == partytype && x.Date == date && x.DocumentName == docname && x.IsMailer == 0 && x.CreatorId == userId);
  }
  filterarbitrationDocumentWithDocName(segment: any, docname: any) {
    return this.ArbitrationDocs.filter(x => x.Segment == segment && x.DocumentName == docname && x.IsMailer == 0);
  }
  filterarbitrationDocumentWithDocNameandSide(side: any, docname: any) {
    return this.ArbitrationDocs.filter(x => x.Side == side && x.DocumentName == docname && x.IsMailer == 0);
  }
  filterarbitrationDocumentWithDocUrl(docurl: any) {
    return this.ArbitrationDocs.filter(x => x.DocUrl == docurl && x.IsMailer == 0);
  }
  filterarbitrationDocumentWithDateandDocType(segment: any, partytype: any, date: any) {
    return this.ArbitrationDocs.filter(x => x.Segment == segment && x.CreatorType == partytype && x.Date == date && x.IsMailer == 0);
  }
  filterarbitrationDocumentWithDateandDocType1(segment: any, doctype: any, date: any) {
    return this.ArbitrationDocs.filter(x => x.Segment == segment && x.DocType == doctype && x.Date == date && x.IsMailer == 0);
  }
  filterarbitrationDocumentWithDateForApplication(segment: any, date: any) {

    return this.ArbitrationDocs.filter(x => x.Segment == segment && x.ReferenceDocumentId == 0 && x.Date == date && x.IsMailer == 0);
  }
  filterarbitrationDocumentWithUniqueApplication(segment: any) {
    let arr = this.ArbitrationDocs.filter(x => x.Segment == segment && x.DocType == 3 && x.ReferenceDocumentId == 0 && x.IsMailer == 0);
    console.log(arr, 'this arr =================================');

    console.log([...new Map(arr.map(item => [item['Id'], item])).values()], 'popopopod', arr);

    return [...new Map(arr.map(item => [item['Id'], item])).values()];
  }
  filterarbitrationDocumentWithDateForApplicationCounter(segment: any, date: any) {
    return this.ArbitrationDocs.filter(x => x.Segment == segment && x.ReferenceDocumentId > 0 && x.Date == date && x.IsMailer == 0 && x.DocType == 3);
  }

  filterarbitrationDocumentWithDateForApplicationOrder(segment: any, date: any, doctype: any) {
    return this.ArbitrationDocs.filter(x => x.Segment == segment && x.ReferenceDocumentId > 0 && x.Date == date && x.IsMailer == 0 && x.DocType == doctype);
  }
  filterarbitrationDocumentWithApplicationOrder(segment: any, id: any, doctype: any) {

    return this.ArbitrationDocs.filter(x => x.Segment == segment && x.ReferenceDocumentId == id && x.IsMailer == 0 && x.DocType == doctype);
  }
  filterarbitrationDocumentWithApplicationCounter(segment: any, id: any) {
    return this.ArbitrationDocs.filter(x => x.Segment == segment && x.ReferenceDocumentId == id && x.IsMailer == 0 && x.DocType == 3);
  }
  filterarbitrationDocumentwithUserId(segment: any, partytype: any, UserId: any) {
    return this.ArbitrationDocs.filter(x => x.Segment == segment && x.CreatorType == partytype && x.CreatorId == UserId && x.IsMailer == 0);
  }
  closebutton() {

  }




  isChatOpen = true
  closechat() {
    this.isChatOpen = !this.isChatOpen;
  }
  GetVideocallaudiencewithId() {
    this.videocallUserservice.GetVideocallaudiencewithUserIdAndVideocallId(this.VideoCallId).subscribe((data: any) => {
      if (data.length > 0) {
        this.GeneratedTokenByAudience = data[0].Token;
        this.IsController = data[0].IsController;
        localStorage.setItem('videocalluserId', data[0].Id);
        if (data[0].IsControllerLeavingCall == 1) {
          this.IsControllerLeavingCall = true;
        }


        //mute or unmute audio
        if (data[0].IsAudioMute == 1) {
          if (this.ismuteAudio) {
            this.muteAudio(this.Type, this.Side, this.Id);
          }

        } else if (data[0].IsAudioMute == 0) {
          if (!this.ismuteAudio) {
            this.unmuteAudio(this.Type, this.Side, this.Id);
          }

        }
        // mute or unmute video
        if (data[0].IsVideoMute == 1) {
          if (this.ismuteVideo) {
            this.muteVideo(this.Type, this.Side, this.Id);
          }

        } else if (data[0].IsVideoMute == 0) {
          if (!this.ismuteVideo) {
            this.unmuteVideo(this.Type, this.Side, this.Id);
          }
        }
        //start secret call
        if (data[0].Status == 5) {
          this.toStartSecretCallId = data[0].SecretRoomId;
          this.OpensModalFor3SecondsToPvtRoom();




        }
        //start main call from secret call
        if (data[0].Status == 6) {
          this.toStartMainCallId = data[0].MainRoomId;
          this.OpensModalFor3SecondsToMainRoom();




        }
        //start whiteboard


        // this.continueToVideoCall();
      } else {
        console.log("Error while fetching ddd");

      }

    })
  }

  // calling arbitration parties of me in every 5 sec
  GetMyArbitrationPartyDetails() {
    // alert(this.VideoCallId)
    if (!!localStorage.getItem('ADR_Dashboard_User') && !!localStorage.getItem('ArbitrationDetails')) {


      this.videocallUserservice.GetMyArbitrationPartyDetails(JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id, JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id).subscribe((data: any) => {

        if (data.length > 0) {

          this.UserAddress = data[0].Address
          this.UserName = data[0].Name
          this.UserEmail = data[0].Email
          this.UserDesignation = data[0].Designation
          this.UserCity = data[0].City
          this.UserState = data[0].State
          this.UserCountry = data[0].Country
          if (!!data && data.length > 0) {

            this.AuthURL = data[0].AuthorisationUrl;
            if (!!data[0].AuthorisationUrl) {
              let authusr = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`);
              authusr.AuthorisationUrl = data[0].AuthorisationUrl;
              localStorage.setItem('ADR_Dashboard_User', JSON.stringify(authusr));
            }

            this.LastLoginTime = data[0].LastLoginTime


            const tokenTime = new Date(this.LastLoginTime);
            const currentTime = new Date(); // Use current time directly with new Date()

            const timeDiff = currentTime.getTime() - tokenTime.getTime();
            const hoursDiff = timeDiff / (1000 * 60 * 60);

            let futureTime = new Date(tokenTime.getTime() + (24 * 60 * 60 * 1000)); // Corrected calculation for 24 hours
            //         const hoursDiff = timeDiff / (1000 * 60 * 60);

            // let futureTime = new Date(tokenTime.getTime() + (3 * 60 * 1000)); // 10 minutes in milliseconds



            if (futureTime.getTime() > currentTime.getTime()) {
              // console.log(hoursDiff);
            } else {
              // Clear local storage here if futureTime is less than currentTime

              // localStorage.clear();
              // window.location.reload(); // Clearing local storage

              // Optionally, you can add a message or perform additional actions after clearing local storage
              console.log("Local storage cleared because futureTime is less than currentTime");
            }

          } else {
            // Handle the case when data.length <= 0
          }


          this.TribunalConstitutionalStatus = data[0].TribunalConstitutionStatus;
          this.IsController = data[0].IsController;


          if (data[0].IsVideoMute == 0) {
            this.videoState = 'enabled';
            // this.ismuteVideo = true;
          } else {
            // this.ismuteVideo = false;
            this.videoState = 'disabled';
          }
          if (data[0].IsAudioMute == 0) {
            // this.ismuteAudio = true;
            this.audioState = 'enabled';
          } else {
            // this.ismuteAudio = false;          
            this.audioState = 'disabled';
          }
          //mute or unmute audio
          if (data[0].IsAudioMute == 1) {
            if (this.ismuteAudio) {
              this.muteAudio(this.Type, this.Side, data[0].Id);
            }

          } else if (data[0].IsAudioMute == 0) {
            if (!this.ismuteAudio) {
              this.unmuteAudio(data[0].Type, data[0].Side, data[0].Id);
            }

          }
          // alert(this.ismuteVideo)
          // mute or unmute video
          if (data[0].IsVideoMute == 1) {
            if (this.ismuteVideo) {
              this.muteVideo(data[0].Type, data[0].Side, data[0].Id);
            }

          } else if (data[0].IsVideoMute == 0) {
            if (!this.ismuteVideo) {
              this.unmuteVideo(this.Type, this.Side, data[0].Id);
            }
          }



          if (data[0].IsPrivateCall == 2) {
            this.imInPvtCall = true;
            this.imInPvtCall_Id = data[0].PrivateCallId;
            if (this.imInPvtCall) {

              this.Claimants = this.ArbitrationParties.filter(x => (x.Type === 0 || x.Type === 2) && x.Side === 0 && (x.IsPrivateCall == 2 || x.IsPrivateCall == 10));
              this.Respondants = this.ArbitrationParties.filter(x => (x.Type === 0 || x.Type === 2) && x.Side === 1 && (x.IsPrivateCall == 2 || x.IsPrivateCall == 10));
              this.Arbitrators = this.ArbitrationParties.filter(x => x.Type === 3 && x.Side === 0 && (x.IsPrivateCall == 2 || x.IsPrivateCall == 10));
              this.Admin = this.ArbitrationParties.filter(x => (x.Type == 4 || x.Type == 5) && (x.IsPrivateCall == 2 || x.IsPrivateCall == 10));

            }
          } else if (data[0].IsPrivateCall == 10) {

            this.imInPvtCall = true;
            this.imInPvtCall_Id = data[0].PrivateCallId;

          } else {
            this.imInPvtCall = false;
            this.imInPvtCall_Id = 0;
          }
          //start Videocall if there is pvt call//compleed
          if (data[0].IsVideoStart == 2 && data[0].IsPrivateCall == null || data[0].IsVideoStart == 2 && data[0].IsPrivateCall == 0 || data[0].IsVideoStart == 2 && data[0].IsPrivateCall == 1 || data[0].IsVideoStart == 2 && data[0].IsPrivateCall == 3) {
            // alert("videostart main call in 5 sec")
            let url = 'isVideostart' + data[0].ArbitrationId.toString();
            this.IsVideo = true;
            // this.isMenuVisible = false;  
            this.videocalltoken = data[0].Videocall_Token;
            this.videocallchannel = data[0].Videocall_Channel;
            this.IsController = data[0].IsController;
            this.videostream.leaveCallonPrivateCallJoin();

            this.GetMAinVideocallwithId();


            // this.IsVideo = true;

          }
          //start secret call from main call
          if (data[0].IsVideoStart == 3 && data[0].IsPrivateCall == 2) {
            // console.log("2 pvt");

            this.toStartSecretCallId = data[0].PrivateCallId;
            this.IsVideo = true;
            // this.isMenuVisible = false;  
            this.videocalltoken = data[0].Videocall_Token;
            this.videocallchannel = data[0].Videocall_Channel;
            this.IsController = data[0].IsController;
            this.videostream.leaveCallonPrivateCallJoin();

            this.GetPrivateVideocallwithId();
            // this.OpensModalFor3SecondsToPvtRoom();

            // localStorage.removeItem('videocallid');
            // localStorage.removeItem('videocalluserId');
            // localStorage.setItem('videocallid',this.toStartSecretCallId.toString());
            // this.VideoCallId = localStorage.getItem('videocallid');




          }
          //  main call from pvt cll
          if (data[0].IsVideoStart == 3 && data[0].IsPrivateCall == 3) {
            // console.log("2 pvt");

            this.toStartSecretCallId = data[0].IsPrivateCall;
            this.IsVideo = true;
            // this.isMenuVisible = false;  
            this.videocalltoken = data[0].Videocall_Token;
            this.videocallchannel = data[0].Videocall_Channel;
            this.IsController = data[0].IsController;
            this.videostream.leaveCallonPrivateCallJoin();

            this.GetMAinVideocallFromPvtCall();
            // this.OpensModalFor3SecondsToPvtRoom();

            // localStorage.removeItem('videocallid');
            // localStorage.removeItem('videocalluserId');
            // localStorage.setItem('videocallid',this.toStartSecretCallId.toString());
            // this.VideoCallId = localStorage.getItem('videocallid');




          }
          //video not started
          if (data[0].IsVideoStart == 5) {
            // Check if MeetingStoppedBy and localStorage user ID match
            const localStorageUserId = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;
            const MeetingStoppedBy = localStorage.getItem('MeetingStoppedBy');
            if (MeetingStoppedBy != localStorageUserId) {
              // Show the alert only if MeetingStoppedBy and localStorage user ID don't match
              this.alertservice.Alert("Host/Admin has ended the meeting!", 3, () => {
                // Success callback function to execute when the user clicks "OK" in the alert
                this.exitcall();
              }, () => {
                // Close function (can be an empty function or a placeholder)
              });
            }

            // Additional logic
            this.IsVideo = false;
            // this.isMenuVisible = true;
          }




        } else {


        }
      },
        err => {
          this.alertservice.Alert("Unable to join videocall, Server not responding !", 3, () => { }, () => { },);

          localStorage.clear();
          window.location.reload();
          // Navigate to the dashboard page (you can replace 'dashboard' with your actual dashboard route)
          // this.router.navigate(['/dashboard']);
          // this.alertservice.Alert('Unable to join videocall, Server not responding', 3, function(){}, function(){});
          console.log(err);
        });
    }
  }

  checktribunalstatus() {
    // alert(this.TribunalConstitutionalStatus+'TribunalConstitutionStatus')
    if (this.TribunalConstitutionalStatus === 0 && (this.Type === 0 || this.Type === 4)) {
      this.AddResponse();
    }
  }

  CloseModalFor3SecondsToPvtRoom() {
    this.modalclassFor3SecondsToPvtRoom = 'modal fade';
    this.modalstyleFor3SecondsToPvtRoom = "display:none;"
    this.fadeclassFor3SecondsToPvtRoom = '';
    this.BodyClassFor3SecondsToPvtRoom = '';


    localStorage.removeItem('videocallid');
    localStorage.removeItem('videocalluserId');
    localStorage.setItem('videocallid', this.toStartSecretCallId.toString());
    this.VideoCallId = localStorage.getItem('videocallid');




    this.videocall = new VideoCall();
    // this.videostream.leaveCallonPrivateCallJoin();

    this.GetPrivateVideocallwithId();
  }
  OpensModalFor3SecondsToPvtRoom() {
    this.modalclassFor3SecondsToPvtRoom = 'modal fade show';
    this.modalstyleFor3SecondsToPvtRoom = "display:block;"
    this.fadeclassFor3SecondsToPvtRoom = 'modal-backdrop fade show';
    this.BodyClassFor3SecondsToPvtRoom = 'modal-open';
    setTimeout(() => {
      this.CloseModalFor3SecondsToPvtRoom();
    }

      , 15000); // 3000 milliseconds = 3 seconds
  }


  GetMAinVideocallwithId() {

    sessionStorage.removeItem('joinmainroomRefresh');
    sessionStorage.removeItem('joinprivateroomRefresh');
    sessionStorage.removeItem('joinmainroomfrompvtroomRefresh');

    //when join room change status to 3 of isvideostart
    this.videocallUserservice.GetMyArbitrationPartyDetails(JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id, JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id).subscribe((data: any) => {

      if (data.length > 0) {

        if (data[0].IsVideoStart == 2 && data[0].IsPrivateCall == null || data[0].IsVideoStart == 2 && data[0].IsPrivateCall == 0 || data[0].IsVideoStart == 2 && data[0].IsPrivateCall == 1 || data[0].IsVideoStart == 2 && data[0].IsPrivateCall == 3) {
          this.videocalltoken = data[0].Videocall_Token;
          this.videocallchannel = data[0].Videocall_Channel;
          this.IsVideo = true;
          // this.isMenuVisible = false;
          // this.continueToVideoCall();
          this.IsController = data[0].IsController;
          this.videocallUserservice.ChangeVideostartStatus(data[0].Id, 3).subscribe((data: any) => {
            if (!sessionStorage.getItem('joinmainroomRefresh')) {
              // Set the flag indicating the page has been refreshed
              sessionStorage.setItem('joinmainroomRefresh', 'false');
              // Redirect to another page
              let path = this.appconfig.videocalllayoutlink + this.SecreteCode;
              window.location.href = path;

            }

            this.continueToVideoCall();
          });



        } else {
          this.IsVideo = false;
          //     this.isMenuVisible = true;
        }

      } else {

      }
    });
  }
  acceptRequest(data: any) {

    const AcceptedId = data.Id
    this.VideoCallId = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id;
    this.LoginUserId = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;
    this.videocallUserservice.UpdateVideocallForAcceptedUsersOnly(this.LoginUserId, this.VideoCallId, AcceptedId).subscribe((data: any) => {
      if (data.length > 0) {
        // this.socket.emit('AcceptedUsertoVideocall', {

        //   AcceptedUsertoVideocall: 100
        // });

        if (this.RequestforJoinVideocall.length === 0) {
          this.closevideomodal();
        }


      }

    });


  }
  denyRequest(data: any) {

  }
  GetPrivateVideocallwithId() {

    sessionStorage.removeItem('joinmainroomRefresh');
    sessionStorage.removeItem('joinprivateroomRefresh');
    sessionStorage.removeItem('joinmainroomfrompvtroomRefresh');
    //when join room change status to 3 of isvideostart
    this.videocallUserservice.ChangeisPvtCallStatus(this.toStartSecretCallId, JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id, 10).subscribe((data: any) => {
      if (data.length > 0) {
        this.videocallUserservice.GetMyArbitrationPartyDetails(JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id, JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id).subscribe((data: any) => {
          if (data.length > 0) {

            if (data[0].IsVideoStart == 3 && data[0].IsPrivateCall == 10) {
              this.videocalltoken = data[0].Videocall_Token;
              this.videocallchannel = data[0].Videocall_Channel;
              this.IsVideo = true;
              // this.isMenuVisible = false;
              // this.continueToVideoCall();
              this.IsController = data[0].IsController;
              if (!sessionStorage.getItem('joinprivateroomRefresh')) {
                // Set the flag indicating the page has been refreshed
                sessionStorage.setItem('joinprivateroomRefresh', 'false');

                // Redirect to another page
                let path = this.appconfig.videocalllayoutlink + this.SecreteCode;
                window.location.href = path;

              }

              this.continueToVideoCall();




            } else {
              this.IsVideo = false;
              //   this.isMenuVisible = true;
            }

          } else {

          }
        });
      } else {

      }

    });

  }
  GetMAinVideocallFromPvtCall() {

    sessionStorage.removeItem('joinmainroomRefresh');
    sessionStorage.removeItem('joinprivateroomRefresh');
    sessionStorage.removeItem('joinmainroomfrompvtroomRefresh');
    //when join room change status to 3 of isvideostart
    // this.

    this.videocallUserservice.ChangeArbPartyPvtCallStatus(JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id, JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id, 1).subscribe((data: any) => {
      if (data.length > 0) {
        this.videocallUserservice.GetMyArbitrationPartyDetails(JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id, JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id).subscribe((data: any) => {
          if (data.length > 0) {

            if (data[0].IsVideoStart == 3 && data[0].IsPrivateCall == 1) {
              this.videocalltoken = data[0].Videocall_Token;
              this.videocallchannel = data[0].Videocall_Channel;
              this.IsVideo = true;
              // this.isMenuVisible = false;
              // this.continueToVideoCall();
              this.IsController = data[0].IsController;
              // this.videocallUserservice.ChangeVideostartStatusTo3(data[0].Id,3).subscribe((data:any)=>{
              if (!sessionStorage.getItem('joinmainroomfrompvtroomRefresh')) {
                // Set the flag indicating the page has been refreshed
                sessionStorage.setItem('joinmainroomfrompvtroomRefresh', 'false');

                // Redirect to another page
                let path = this.appconfig.videocalllayoutlink + this.SecreteCode;
                window.location.href = path;

              }

              this.continueToVideoCall();
              // });



            } else {
              this.IsVideo = false;
              //    this.isMenuVisible = true;
            }

          } else {

          }
        });
      } else {

      }
    })

  }
  continueToVideoCall() {

    // if (this.IsVideo == false) {
    //   this.IsVideo = true;
    //   this.isMenuVisible = false;
    this.startCalls();
    // }
    //   else{
    //     this.IsVideo = false;
    //     this.isMenuVisible = true;
    //     this.turnvideoOff(); 
    //   }
  }
  GetVideocallwithId() {

    this.videochatservice.GetVideocallwithId(this.VideoCallId).subscribe((data: any) => {
      // alert("jj")

      if (data.length > 0) {

        this.videocall = data[0];

        this.videocallUserservice.GetVideocallaudiencewithUserIdAndVideocallId(this.VideoCallId).subscribe((data: any) => {
          if (data.length > 0) {


            this.GeneratedToken = data[0].Token;

            this.IsController = data[0].IsController;
            if (data[0].MainRoomId > 0) {
              this.inPrivateRoom = true;
            } else {
              this.inPrivateRoom = false;
            }
            if (this.IsController == 1) {
              //host
              this.continueToVideoCall();
            } else {
              // not host
              if (data[0].isHostLeavingCall == 1) {
                this.isHostLeavingCall = true;
              }

              //mute or unmute audio
              if (data[0].IsAudioMute == 1) {
                this.muteAudio(this.Type, this.Side, this.Id);
              } else if (data[0].IsAudioMute == 0) {
                this.unmuteAudio(this.Type, this.Side, this.Id);
              }
              //mute or unmute video
              if (data[0].IsVideoMute == 1) {
                this.muteVideo(this.Type, this.Side, this.Id);
              } else if (data[0].IsVideoMute == 0) {
                this.unmuteVideo(this.Type, this.Side, this.Id);
              }


              this.continueToVideoCall();
            }


          } else {
            console.log("Error while fetching ddd");

          }

        })


      } else {
        this.alertservice.Alert("Error while fetching videocall!", 3, () => { }, () => { },);

      }

    });
  }
  async OpenPrivateRoomParticipantsModal(pvtroom: any) {
    // this.Secretvideocall = new VideoCall();
    this.SecretvideocallforAdd = pvtroom;
    this.modalclassPrivateRoomParticipants = 'modal fade show';
    this.modalstylePrivateRoomParticipants = "display:block;"
    this.fadeclassPrivateRoomParticipants = 'modal-backdrop fade show';
    this.BodyClassPrivateRoomParticipants = 'modal-open';

    this.usersNotinSelectedPrivateRoom = this.videocallUsersAfterJoin.filter((obj1: any) => {
      return !pvtroom.VideoCallUsercs.some((obj2: any) => obj1.UserId === obj2.UserId);
    });
    // this.activeMeeting = await this.privateRoomActiveStatus(this.Secretvideocall.VideoCallUsers);

  }
  async OpenAddParticipantsModalFromPvtRoom() {


    this.usersNotinSelectedPrivateRoom = [];

    this.SecretvideocallforAdd = this.videocall;
    this.modalclassAddParticipantsModalFromPvtRoom = 'modal fade show';
    this.modalstyleAddParticipantsModalFromPvtRoom = "display:block;"
    this.fadeclassAddParticipantsModalFromPvtRoom = 'modal-backdrop fade show';
    this.BodyClassAddParticipantsModalFromPvtRoom = 'modal-open';
    this.videocallUserservice.GetAllVideocallaudiencewithVideocallId(this.videocall.VideoCallId, 2, this.MainHostId).subscribe((data: any) => {
      if (data.length > 0) {


        this.usersNotinSelectedPrivateRoom = data;


        this.scrollToBottomNotifications();
      }

    });

    // this.activeMeeting = await this.privateRoomActiveStatus(this.Secretvideocall.VideoCallUsers);

  }
  scrollToBottomNotifications(): void {
    try {
      this.myScrollNotificationContainer.nativeElement.scrollTop = this.myScrollNotificationContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  CloseAddParticipantsModalFromPvtRoom() {
    this.modalclassAddParticipantsModalFromPvtRoom = 'modal fade';
    this.modalstyleAddParticipantsModalFromPvtRoom = "display:none;"
    this.fadeclassAddParticipantsModalFromPvtRoom = '';
    this.BodyClassAddParticipantsModalFromPvtRoom = '';
  }

  OpensModalFor3SecondsToMainRoom() {
    this.modalclassFor3SecondsToMainRoom = 'modal fade show';
    this.modalstyleFor3SecondsToMainRoom = "display:block;"
    this.fadeclassFor3SecondsToMainRoom = 'modal-backdrop fade show';
    this.BodyClassFor3SecondsToMainRoom = 'modal-open';
    setTimeout(() => {
      this.CloseModalFor3SecondsToMainRoom();
    }

      , 15000); // 3000 milliseconds = 3 seconds
  }
  CloseModalFor3SecondsToMainRoom() {
    this.modalclassFor3SecondsToMainRoom = 'modal fade';
    this.modalstyleFor3SecondsToMainRoom = "display:none;"
    this.fadeclassFor3SecondsToMainRoom = '';
    this.BodyClassFor3SecondsToMainRoom = '';

    localStorage.removeItem('videocallid');
    localStorage.removeItem('videocalluserId');
    localStorage.setItem('videocallid', this.toStartMainCallId.toString());
    this.VideoCallId = localStorage.getItem('videocallid');



    this.videocall = new VideoCall();
    // this.videostream.leaveCallonPrivateCallJoin();

    this.GetMainVideocallwithId();

  }
  GetMainVideocallwithId() {
    if (!sessionStorage.getItem('joinmainroomRefresh')) {
      // Set the flag indicating the page has been refreshed
      sessionStorage.setItem('joinmainroomRefresh', 'false');

      // Redirect to another page
      window.location.href = this.appconfig.AdrDashboard;

    }

  }
  isUserAudioMute(uid: any) {

    return this.ArbitrationPartiesonly.some((item: any) => item.IsAudioMute == 0 && item.Id == uid);
  }
  isUserVideoMute(uid: any) {

    return this.ArbitrationPartiesonly.some((item: any) => item.IsVideoMute == 0 && item.Id == uid);
  }
  isAllUserAudioMute() {
    return this.ArbitrationPartiesonly.some((item: any) => item.IsAudioMute == 0 && item.Id != this.LoginUserId);
  }
  isAllUserVideoMute() {

    return this.ArbitrationPartiesonly.some((item: any) => item.IsVideoMute == 0 && item.Id != this.LoginUserId);
  }

  async ArbitrationPartyAdd(side: any, partytype: any) {
    const modal = await this.modalController.create({
      component: ArbitrationPartyAddPage, cssClass: 'my-modal',
      componentProps: {
        ArbitrationDetails: this.ArbitrationDetails,
        ArbitrationParties: this.ArbitrationParties,
        Side: side,
        PartyType: partytype
      },

    });
    modal.onDidDismiss().then((modelData) => {
      this.GetAllArbitrationPartiesonly()
      this.GetAllArbitrationParties();
    });
    await modal.present();
  }

  async openUserListPopover() {
    const popover = await this.popoverController.create({
      component: UserListPopoverComponent,
      componentProps: {
        arbitrationParties: this.ArbitrationParties,
      },
    });

    popover.onDidDismiss().then((data: any) => {
    });

    return await popover.present();
  }
  selectedUsers: any[] = [];
  isModalOpen = false;

  openAddParticipantsModalFromPvtRoom() {
    // alert('hi')

    this.isMenuVisible = false;

    this.isModalOpen = true;
  }
  openModal() {
    const videoNavElement = this.elementRef.nativeElement.querySelector('.video-nav');

    // Check if the element is found before modifying the style
    if (videoNavElement) {
      // Change the z-index to 0
      this.renderer.setStyle(videoNavElement, 'z-index', '0', RendererStyleFlags2.Important);
    } else {
      console.warn('Element with class "video-nav" not found.');
    }
    this.isMenuVisible = false;
    // alert("jj");

    this.modalclass = '';
    this.modalstyle = 'display:block';
    this.isOpen = false;
    this.isopenparticipantadd = false;
    this.isopenparticipantremove = false;
    this.adduserinpvtcall = [];
    this.removeuserinpvtcall = [];
    this.selectedUsers = [];
    this.ArbitrationParties.forEach((option: any) => {
      option.Selected = false;
    });
    this.ArbitrationPartiesforselectPVTCall = this.ArbitrationParties;
    // console.log(this.ArbitrationPartiesforselectPVTCall,"for select");
    this.getAllPrivateCalls();


  }

  addDigitalSign() {
    this.router.navigate(['add-digital-sign']);
  }
  getAllPrivateCalls() {
    this.privateCalls = [];
    this.videochatservice.GetAllPrivateVideoCallWithArbitrationId(this.VideoCallId).subscribe(
      (data: any) => {
        // console.log(data,"pvt calls")
        if (data.length > 0) {
          this.privateCalls = data;
        } else {
          this.privateCalls = [];
        }



      }
    )
  }
  closeModal() {
    this.modalclass = 'modal fade';
    this.modalstyle = "display:none;";
    this.isOpen = false;
    const videoNavElement = this.elementRef.nativeElement.querySelector('.video-nav');

    // Check if the element is found before modifying the style
    if (videoNavElement) {
      // Change the z-index to 0
      this.renderer.setStyle(videoNavElement, 'z-index', '1200', RendererStyleFlags2.Important);
    } else {
      console.warn('Element with class "video-nav" not found.');
    }
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  addparticipantstopvtcall(pvtcall: any) {
    this.isopenparticipantadd = true;
    this.isopenparticipantremove = false;
    this.isOpen = false;
    this.selectedPvtcallId = pvtcall.Id;

    this.ArbitrationPartiesforAddPVTCall = this.ArbitrationPartiesonly.filter((item: any) => item.PrivateCallId <= 0);

  }

  onUserAddPvtcallChange(user: any) {
    if (user.Selected) {
      // Add the selected user to the array
      this.adduserinpvtcall.push(user);
    } else {
      // Remove the user from the array if deselected
      const index = this.adduserinpvtcall.indexOf(user);
      if (index > -1) {
        this.adduserinpvtcall.splice(index, 1);
      }
    }
  }


  onUserSelectionChange(user: any) {
    if (user.Selected) {
      // Add the selected user to the array
      this.selectedUsers.push(user);
    } else {
      // Remove the user from the array if deselected
      const index = this.selectedUsers.indexOf(user);
      if (index > -1) {
        this.selectedUsers.splice(index, 1);
      }
    }
    // console.log(this.selectedUsers,"sel us")
  }

  async enumerateDevices() {
    const connectedDevices = await this.videostream.getConnectedDevices();
    this.outputDevices = connectedDevices?.outputDevices || null;

  }

  async initializeAudioTrack() {
    try {
      this.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      console.log('Audio track initialized successfully:', this.audioTrack);
    } catch (error) {
      console.error('Error initializing audio track:', error);
    }
  }
  changeOutputDevice(event: Event): void {
    const selectedDeviceId = (event.target as HTMLSelectElement).value;

    if ('sinkId' in HTMLMediaElement.prototype) {
      // Browser supports changing audio output device

      // Update the audio output device in your RTC service
      this.videostream.changeAudioOutputDevice(selectedDeviceId);

      // You can also update the audio output device for any audio elements on the page
      const audioElements = document.getElementsByTagName('audio');
      const audioArray = Array.from(audioElements);

      audioArray.forEach(audioElement => {
        (audioElement as any).sinkId = selectedDeviceId;
      });

      console.log('Audio output set to device:', selectedDeviceId);
    } else {
      console.error('Changing audio output device is not supported in this browser.');
    }
  }
  onChangeAudioTrack(): void {
    this.videostream.changeAudioTrack();
  }

  AddToPrivateRoom() {

    this.videochatservice.GetSinglePvtCallWithId(this.selectedPvtcallId).subscribe(
      (datas: any) => {
        // console.log(datas,"datas pvt")
        if (datas.length > 0) {
          if (datas[0].Status == 2) {
            // started already
            for (let i = 0; i < this.adduserinpvtcall.length; i++) {
              let param = {
                appID: 'eae708a57586481da3a59a10b17490a3',
                channelName: 'p_' + this.selectedPvtcallId.toString(),
                uid: this.adduserinpvtcall[i].Id,
                appCertificate: 'c9356956b4d44df980106316fb1efbd2',
                roleType: 0
              };


              this.videostream.GetAgoraToken(param).subscribe((res: any) => {

                if (res) {
                  this.generatedtoken = res.key;

                  this.videochatservice.addorremoveparticipanttoStartedpvtcall(this.adduserinpvtcall[i].Id, this.selectedPvtcallId, 2, res.key, param.channelName).subscribe(
                    (datas: any) => {
                      console.log("add participant to  started pvt cal");
                      if (i == (this.adduserinpvtcall.length - 1)) {
                        this.isopenparticipantadd = false;
                        this.adduserinpvtcall = [];
                        this.ArbitrationPartiesforAddPVTCall = [];
                        this.getAllPrivateCalls();
                        this.closeModal();
                        this.GetMyArbitrationPartyDetails();

                      }


                    });




                } else {
                  this.alertservice.Alert("Unable to join videocall, Server not responding!", 3, () => { }, () => { },);


                  // this.alertserv/ce.Alert('Unable to join videocall, Server not responding', 3, function(){}, function(){});

                }



              }, err => {
                this.alertservice.Alert("Unable to join videocall, Server not responding!", 3, () => { }, () => { },);
                // this.alertservice.Alert('Unable to join videocall, Server not responding', 3, function(){}, function(){});
                console.log(err);
              });

            }

          } else {
            //not started
            for (let i = 0; i < this.adduserinpvtcall.length; i++) {
              this.videochatservice.addorremoveparticipanttopvtcall(this.adduserinpvtcall[i].Id, this.selectedPvtcallId, 1).subscribe(
                (datas: any) => {
                  console.log("add participant to not started pvt cal");
                  if (i == (this.adduserinpvtcall.length - 1)) {
                    this.isopenparticipantadd = false;
                    this.adduserinpvtcall = [];
                    this.ArbitrationPartiesforAddPVTCall = [];
                    this.getAllPrivateCalls();
                    this.closeModal();
                    this.GetMyArbitrationPartyDetails();

                  }


                });

            }
          }
        }

      });


  }

  // remove code starts
  removeparticipantstopvtcall(pvtcall: any) {
    this.isopenparticipantremove = true;
    this.isopenparticipantadd = false;
    this.isOpen = false;
    this.selectedPvtcallId = pvtcall.Id;
    this.ArbitrationPartiesforremovePVTCall = this.ArbitrationPartiesonly.filter((item: any) => item.PrivateCallId > 0);

  }
  onUserRemovePvtcallChange(user: any) {
    if (user.Selected) {
      // Add the selected user to the array
      this.removeuserinpvtcall.push(user);
    } else {
      // Remove the user from the array if deselected
      const index = this.removeuserinpvtcall.indexOf(user);
      if (index > -1) {
        this.removeuserinpvtcall.splice(index, 1);
      }
    }
    // console.log(this.removeuserinpvtcall,"sel remove")
  }
  RemoveToPrivateRoom() {
    this.videochatservice.GetSinglePvtCallWithId(this.selectedPvtcallId).subscribe(
      (datas: any) => {
        // console.log(datas,"datas pvt")
        if (datas.length > 0) {
          if (datas[0].Status == 2) {
            // started already
            for (let i = 0; i < this.removeuserinpvtcall.length; i++) {
              let param = {
                appID: 'eae708a57586481da3a59a10b17490a3',
                channelName: 'h_' + JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id.toString(),
                uid: this.removeuserinpvtcall[i].Id,
                appCertificate: 'c9356956b4d44df980106316fb1efbd2',
                roleType: 0
              };


              this.videostream.GetAgoraToken(param).subscribe((res: any) => {

                if (res) {
                  this.generatedtoken = res.key;

                  this.videochatservice.addorremoveparticipanttoStartedpvtcall(this.removeuserinpvtcall[i].Id, 0, 3, res.key, param.channelName).subscribe(
                    (datas: any) => {
                      console.log("remove participant from started pvt cal");
                      if (i == (this.removeuserinpvtcall.length - 1)) {
                        this.isopenparticipantremove = false;
                        this.removeuserinpvtcall = [];
                        this.ArbitrationPartiesforremovePVTCall = [];
                        this.getAllPrivateCalls();
                        this.closeModal();
                        this.GetMyArbitrationPartyDetails();

                      }


                    });




                } else {
                  this.alertservice.Alert("Unable to join videocall, Server not responding!", 3, () => { }, () => { },);
                  // this.alertserv/ce.Alert('Unable to join videocall, Server not responding', 3, function(){}, function(){});

                }



              }, err => {
                this.alertservice.Alert("Unable to join videocall, Server not responding!", 3, () => { }, () => { },);
                // this.alertservice.Alert('Unable to join videocall, Server not responding', 3, function(){}, function(){});
                console.log(err);
              });

            }

          } else {
            //not started
            for (let i = 0; i < this.removeuserinpvtcall.length; i++) {
              this.videochatservice.addorremoveparticipanttopvtcall(this.removeuserinpvtcall[i].Id, 0, 0).subscribe(
                (datas: any) => {
                  console.log("add participant to not started pvt cal");
                  if (i == (this.removeuserinpvtcall.length - 1)) {
                    this.isopenparticipantremove = false;
                    this.removeuserinpvtcall = [];
                    this.ArbitrationPartiesforremovePVTCall = [];
                    this.getAllPrivateCalls();
                    this.closeModal();
                    this.GetMyArbitrationPartyDetails();

                  }


                });

            }
          }
        }

      });


  }
  // remove code ends
  createPrivateRoom() {
    if (this.selectedUsers.length === 0) {
      this.alertservice.Alert("Please select parties before creating a private room!", 3, () => { }, () => { },);

      return; // Stop execution if no parties are selected
    }

    let Privatecall_obj = {
      'ArbitrationId': this.VideoCallId,
      'ArbitrationParties': this.selectedUsers,
      'IsPrivateCall': 1,
      'UserId': JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id,
    };

    this.videochatservice.InsertPrivateVideoCall(Privatecall_obj).subscribe((data: any) => {
      if (data) {
        if (data.Id > 0 && data.Error === 0) {
          this.isOpen = false;
          this.getAllPrivateCalls();
          this.alertservice.Alert("Parties added and private room created!", 3, () => { }, () => { },);

          // Additional handling or logic if creation is successful
        } else {
          this.alertservice.Alert("Error while adding user to Secret room!", 3, () => { }, () => { },);


          // Additional handling or logic if there's an error in the creation
        }
      } else {
        this.alertservice.Alert("Error while adding!", 3, () => { }, () => { },);


        // Additional handling or logic for unexpected errors
      }
    });
  }

  async muteAllAudio() {
    // Use custom alert service for confirmation
    this.alertservice.Alert("Are you sure you want to mute all audio?", 4, () => {
      // If the user confirms, proceed with muting all audio
      this.videocallUserservice.muteAllAudioorVideo(this.VideoCallId, JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id, 1, 0).subscribe(
        (data: any) => {
          // Log a message to the console indicating that all audio has been muted
          console.log("Mutes all audio");

          // Emit a socket event to notify about muting all audio
          // this.socket.emit('muteAllAudio', {
          //   muteAudio: 1
          // });

          // Call a function to get arbitration party details
          this.GetMyArbitrationPartyDetails();
        }
      );
    }, () => {
      // If the user cancels, you can handle it here (optional)
      console.log("User canceled the operation");
    });
  }


  async unmuteAllAudio() {
    // Use custom alert service for confirmation
    this.alertservice.Alert("Are you sure you want to unmute all audio?", 4, () => {
      // If the user confirms, proceed with unmuting all audio
      this.videocallUserservice.muteAllAudioorVideo(this.VideoCallId, JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id, 0, 0).subscribe(
        (data: any) => {
          // Emit a socket event to notify about unmuting all audio
          // this.socket.emit('unmuteAllAudio', {
          //   muteAudio: 1
          // });

          // Log a message to the console indicating that all audio has been unmuted
          console.log("Unmutes all audio");

          // Call a function to get arbitration party details
          this.GetMyArbitrationPartyDetails();
        }
      );
    }, () => {
      // If the user cancels, you can handle it here (optional)
      console.log("User canceled the operation");
    });
  }



  async muteAllVideo() {


    this.alertservice.Alert("Are you sure you want to switch off all video?!", 4, () => {

      // If the user confirms, proceed with muting all video
      this.videocallUserservice.muteAllAudioorVideo(this.VideoCallId, JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id, 1, 1).subscribe(
        (data: any) => {
          console.log("Mutes all video");
          console.log('emitting all');

          // this.socket.emit('muteAllVideo', {

          //   muteAudio: 1
          // });

          this.GetMyArbitrationPartyDetails();
        }
      );
    }, () => {
      // If the user cancels, you can add code here to handle cancellation
      // Example: Close the alert modal
      // this.alertservice.closeAlert();
    });
  }


  async unmuteAllVideo() {
    // Use custom alert service for confirmation
    this.alertservice.Alert("Are you sure you want to switch on all video?", 4, () => {
      // If the user confirms, proceed with unmuting all video
      this.videocallUserservice.muteAllAudioorVideo(this.VideoCallId, JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id, 0, 1).subscribe(
        (data: any) => {
          console.log("Unmutes all video");

          // this.socket.emit('unmuteAllVideo', {

          //   muteAudio: 1
          // });
          this.GetMyArbitrationPartyDetails();
        }
      );
    }, () => {
      // If the user cancels, you can handle it here (optional)
      console.log("User canceled the operation");
    });
  }

  onPvtCallStart(call: any) {
    this.participantsinprivatecall = [];
    this.videochatservice.GetAllParticipantsOfPvtCall(call.Id).subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.participantsinprivatecall = data;

          for (let i = 0; i < this.participantsinprivatecall.length; i++) {
            let param = {
              appID: 'eae708a57586481da3a59a10b17490a3',
              channelName: 'p_' + this.participantsinprivatecall[i].PrivateCallId.toString(),
              uid: this.participantsinprivatecall[i].Id,
              appCertificate: 'c9356956b4d44df980106316fb1efbd2',
              roleType: 0
            };


            this.videostream.GetAgoraToken(param).subscribe((res: any) => {

              if (res) {
                this.generatedtoken = res.key;

                this.videochatservice.UpdateOnStartPvtCall(this.participantsinprivatecall[i].Id, this.participantsinprivatecall[i].PrivateCallId, res.key, param.channelName).subscribe(
                  (datas: any) => {
                    // console.log("Pvt changed");
                    if (i == (this.participantsinprivatecall.length - 1)) {
                      this.getAllPrivateCalls();
                      this.closeModal();
                      this.GetMyArbitrationPartyDetails();

                    }


                  });




              } else {
                this.alertservice.Alert("Unable to join videocall, Server not responding!", 3, () => { }, () => { },);

                // this.alertserv/ce.Alert('Unable to join videocall, Server not responding', 3, function(){}, function(){});

              }



            }, err => {
              this.alertservice.Alert("Unable to join videocall, Server not responding!", 3, () => { }, () => { },);
              // this.alertservice.Alert('Unable to join videocall, Server not responding', 3, function(){}, function(){});
              console.log(err);
            });

          }
        } else {
          this.participantsinprivatecall = [];
        }



      }
    );
  }
  onPvtCallEnd(call: any) {
    this.participantsinprivatecall = [];
    this.videochatservice.GetAllParticipantsOfPvtCall(call.Id).subscribe(
      (data: any) => {
        // console.log(data,"mi");
        if (data.length > 0) {
          this.participantsinprivatecall = data;

          for (let i = 0; i < this.participantsinprivatecall.length; i++) {
            let param = {
              appID: 'eae708a57586481da3a59a10b17490a3',
              channelName: 'h_' + this.VideoCallId.toString(),
              uid: this.participantsinprivatecall[i].Id,
              appCertificate: 'c9356956b4d44df980106316fb1efbd2',
              roleType: 0
            };


            this.videostream.GetAgoraToken(param).subscribe((res: any) => {

              if (res) {
                this.generatedtoken = res.key;

                this.videochatservice.UpdateOnEndPvtCall(this.participantsinprivatecall[i].Id, this.participantsinprivatecall[i].PrivateCallId, res.key, param.channelName).subscribe(
                  (datas: any) => {
                    // console.log("Pvt end changed");
                    if (i == (this.participantsinprivatecall.length - 1)) {
                      this.getAllPrivateCalls();
                      this.closeModal();
                      this.GetMyArbitrationPartyDetails();

                    }


                  });




              } else {
                this.alertservice.Alert("Unable to join videocall, Server not responding!", 3, () => { }, () => { },);
                // this.alertserv/ce.Alert('Unable to join videocall, Server not responding', 3, function(){}, function(){});

              }



            }, err => {
              this.alertservice.Alert("Unable to join videocall, Server not responding!", 3, () => { }, () => { },);
              // this.alertservice.Alert('Unable to join videocall, Server not responding', 3, function(){}, function(){});
              console.log(err);
            });

          }
        } else {
          this.participantsinprivatecall = [];
        }



      }
    );
  }
  async leavingcall() {
    // alert("hi")
    this.hideBtns = true;
    this.ismuteAudio = true;
    this.ismuteVideo = true;
    clearInterval(this.interval);
    clearInterval(this.interval1);
    clearInterval(this.interval2);
    clearInterval(this.interval3);
    sessionStorage.clear();
    if (this.IsController != 1) {
      // alert("not host")
      // User clicked   -- user ending only for him
      this.videocallUserservice.ChangeVideostartStatus(JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id, 4).subscribe(
        async (data: any) => {
          await this.videostream.leaveCall();

          // Check if the page has already been refreshed
          if (!sessionStorage.getItem('pageRefreshed')) {
            // Set the flag indicating the page has been refreshed
            sessionStorage.setItem('pageRefreshed', 'false');

            // Redirect to another page
            let path = this.appconfig.videocalllayoutlink + this.SecreteCode;
            window.location.href = path;
            // window.location.href = 'http://localhost:8100/home';

          }
          // this.router.navigate(['home']);
        }
      );

    } else {

      // alert("host");

      const result = confirm('Are you sure you want to stop meeting for evereyone?');
      if (result) {
        // User clicked "OK"  -- host ending  for all
        // Perform your desired action
        this.videocallUserservice.UpdateStatusOfAllonEndCallByHost(this.VideoCallId).subscribe(
          async (data: any) => {

            // if(data[0].Id > 0 && data[0].Error == 0){
            await this.videostream.leaveCall();
            let path = this.appconfig.videocalllayoutlink + this.SecreteCode;
            window.location.href = path;
            // }

          }
        );



      } else {
        // alert("yes")
        // User clicked "Cancel"  -- host ending only for him
        // Handle accordingly
        this.videocallUserservice.ChangeVideostartStatus(JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id, 4).subscribe(
          async (data: any) => {

            await this.videostream.leaveCall();

            // Check if the page has already been refreshed
            if (!sessionStorage.getItem('pageRefreshed')) {
              // Set the flag indicating the page has been refreshed
              sessionStorage.setItem('pageRefreshed', 'false');

              // Redirect to another page
              let path = this.appconfig.videocalllayoutlink + this.SecreteCode;
              window.location.href = path;

            }
          }
        );

      }
    }



  }

  async onVideoEndByHost() {
    // Call the leavingcall function
    // await this.leavingcall();

    // After leavingcall is complete, show an alert with CSS styles
    const buttons = [
      {
        text: 'Leave Meeting',
        handler: () => {
          // Add code to handle leaving the meeting only for me
          const result = confirm('Are you sure you want to leave the meeting?');
          if (result) {
            this.exitcallformeonly();
          } else {
            // Handle the case when the user cancels the operation
          }
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
    ];

    // Conditionally add "End Entire Meeting" button for IsController=1
    if (this.IsController === 1) {
      buttons.unshift({
        text: 'End Entire Meeting',
        handler: async () => {

          // Use custom alert service for confirmation
          this.alertservice.Alert("Are you sure you want to stop the meeting for everyone?", 4, async () => {
            await this.videostream.leaveCall();
            // If the user confirms, proceed with ending the entire meeting for all
            const MeetingStoppedBy = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;

            // Update video start status for all parties
            for (let i = 0; i < this.ArbitrationParties.length; i++) {
              await this.videocallUserservice.ChangeVideostartStatus(this.ArbitrationParties[i].Id, 5).toPromise();
            }

            // Set MeetingStoppedBy in localStorage
            localStorage.setItem('MeetingStoppedBy', MeetingStoppedBy);
            // this.turnvideoOff()

            // Call the method to get arbitration party details
            this.GetMyArbitrationPartyDetails();


          }, () => {
            // Handle the case when the user cancels the operation (optional)
            console.log("User canceled the operation");
          });
        }
      });
    }



    const alert = await this.alertController.create({
      header: 'Video End Alert',
      message: ' ',
      buttons: buttons,
      cssClass: 'custom-alert'
    });

    await alert.present();
  }


  exitcallformeonlyconfirm() {
    const result = confirm('Are you sure you want to leave meeting?');
    if (result) {
      this.exitcallformeonly();
    } else {

    }
  }

  async exitcall() {
    if (localStorage.getItem('MeetingStoppedBy')) {
      localStorage.removeItem('MeetingStoppedBy');
    }
    sessionStorage.removeItem('pageRefreshedonexit');
    this.videocallUserservice.ChangeVideostartStatus(JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id, 4).subscribe(
      async (data: any) => {
        await this.videostream.leaveCall();
        // Check if the page has already been refreshed
        if (!sessionStorage.getItem('pageRefreshedonexit')) {
          // Set the flag indicating the page has been refreshed
          sessionStorage.setItem('pageRefreshedonexit', 'false');

          // Redirect to another page
          let path = this.appconfig.videocalllayoutlink + this.SecreteCode;
          window.location.href = path;
          // window.location.href = 'http://localhost:8100/home';

        }
        // this.router.navigate(['home']);
      }
    );
  }
  async exitcallformeonly() {
    sessionStorage.removeItem('pageRefreshedonexitformeonly');
    this.videocallUserservice.ChangeVideostartStatus(JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id, 6).subscribe(
      async (data: any) => {
        await this.videostream.leaveCall();
        // Check if the page has already been refreshed
        if (!sessionStorage.getItem('pageRefreshedonexitformeonly')) {
          // Set the flag indicating the page has been refreshed
          sessionStorage.setItem('pageRefreshedonexitformeonly', 'false');

          // Redirect to another page
          let path = this.appconfig.videocalllayoutlink + this.SecreteCode;
          window.location.href = path;
          // window.location.href = 'http://localhost:8100/home';

        }
        // this.router.navigate(['home']);
      }
    );
  }
  isLeftcallbyme() {
    return this.ArbitrationPartiesonly.some((item: any) => item.IsVideoStart == 6);

  }
  getBackgroundStyle(item: any) {
    const filteredArray = this.ArbitrationPartiesonly.filter((items: any) => items.Id == item);
    // console.log(filteredArray,"merins")

    let backgroundStyle = {
      'background-image': 'none', // Default to no background image
      'height': '120px', // Set the desired height
      // 'width': '212.16px' , // Set the desired width
      'background-size': 'contain',
      'background-position': 'center center',
      'background-repeat': 'no-repeat',
    };
    // let IsVideoStart =3
    if (this.ArbitrationPartiesonly.length > 0) {
      if (this.imInPvtCall) {
        if (filteredArray[0].IsVideoStart == 3 && filteredArray[0].IsPrivateCall == 1) {
          // Replace 'your-image-url' with the actual image URL
          let path = this.appconfig.imagelink + 'assets/img/Icon-MainCall.png';
          backgroundStyle['background-image'] = `url(${path})`;
        }
        else if (filteredArray[0].IsVideoStart == 3 && filteredArray[0].IsPrivateCall == 10 && filteredArray[0].IsVideoMute == 1) {
          // Replace 'your-image-url' with the actual image URL
          let path = this.appconfig.imagelink + 'assets/img/Icon-Camera.png';
          backgroundStyle['background-image'] = `url(${path})`;
        }
        else if (filteredArray[0].IsVideoStart == 2) {
          let path = this.appconfig.imagelink + 'assets/img/Icon-NotJoin.png';
          backgroundStyle['background-image'] = `url(${path})`;
        }
        else if (filteredArray[0].IsVideoStart == 4 || filteredArray[0].IsVideoStart == 6) {
          let path = this.appconfig.imagelink + 'assets/img/Icon-LogOut.png';
          backgroundStyle['background-image'] = `url(${path})`;
        }
      } else {
        if (filteredArray[0].IsVideoStart == 3 && filteredArray[0].IsPrivateCall == 10) {
          let path = this.appconfig.imagelink + 'assets/img/Icon-PrivateCall.png';
          backgroundStyle['background-image'] = `url(${path})`;
        }
        else if (filteredArray[0].IsVideoStart == 3 && filteredArray[0].IsVideoMute == 1) {
          // Replace 'your-image-url' with the actual image URL
          let path = this.appconfig.imagelink + 'assets/img/Icon-Camera.png';
          backgroundStyle['background-image'] = `url(${path})`;
        }
        else if (filteredArray[0].IsVideoStart == 2) {
          let path = this.appconfig.imagelink + 'assets/img/Icon-NotJoin.png';
          backgroundStyle['background-image'] = `url(${path})`;
        }
        else if (filteredArray[0].IsVideoStart == 4 || filteredArray[0].IsVideoStart == 6) {
          let path = this.appconfig.imagelink + 'assets/img/Icon-LogOut.png';
          backgroundStyle['background-image'] = `url(${path})`;
        }

      }

      return backgroundStyle;
    } else {
      return backgroundStyle;
    }
    // Add conditions to set background image based on your requirements


    // You can add more conditions here for different backgrounds



  }
  getBackgroundStyleForArbitrator(item: any) {
    const filteredArray = this.ArbitrationPartiesonly.filter((items: any) => items.Id == item);
    // console.log(filteredArray,"merins")

    let backgroundStyle = {
      'background-image': 'none', // Default to no background image
      'height': '200px', // Set the desired height
      'width': '300pxpx', // Set the desired width
      'background-size': 'contain',
      'background-position': 'center center',
      'background-repeat': 'no-repeat',
    };
    // let IsVideoStart =
    if (this.ArbitrationPartiesonly.length > 0) {
      // Add conditions to set background image based on your requirements
      if (this.imInPvtCall) {
        if (filteredArray[0].IsVideoStart == 3 && filteredArray[0].IsPrivateCall == 1) {
          // Replace 'your-image-url' with the actual image URL
          let path = this.appconfig.imagelink + 'assets/img/Icon-MainCall.png';
          backgroundStyle['background-image'] = `url(${path})`;
        }
        else if (filteredArray[0].IsVideoStart == 3 && filteredArray[0].IsPrivateCall == 10 && filteredArray[0].IsVideoMute == 1) {
          // Replace 'your-image-url' with the actual image URL
          let path = this.appconfig.imagelink + 'assets/img/Icon-Camera.png';
          backgroundStyle['background-image'] = `url(${path})`;
        }
        else if (filteredArray[0].IsVideoStart == 2) {
          let path = this.appconfig.imagelink + 'assets/img/Icon-NotJoin.png';
          backgroundStyle['background-image'] = `url(${path})`;
        }
        else if (filteredArray[0].IsVideoStart == 4 || filteredArray[0].IsVideoStart == 6) {
          let path = this.appconfig.imagelink + 'assets/img/Icon-LogOut.png';
          backgroundStyle['background-image'] = `url(${path})`;
        }
      } else {
        if (filteredArray[0].IsVideoStart == 3 && filteredArray[0].IsPrivateCall == 10) {
          let path = this.appconfig.imagelink + 'assets/img/Icon-PrivateCall.png';
          backgroundStyle['background-image'] = `url(${path})`;
        }
        else if (filteredArray[0].IsVideoStart == 3 && filteredArray[0].IsVideoMute == 1) {
          // Replace 'your-image-url' with the actual image URL
          let path = this.appconfig.imagelink + 'assets/img/Icon-Camera.png';
          backgroundStyle['background-image'] = `url(${path})`;
        }
        else if (filteredArray[0].IsVideoStart == 2) {
          let path = this.appconfig.imagelink + 'assets/img/Icon-NotJoin.png';
          backgroundStyle['background-image'] = `url(${path})`;
        }
        else if (filteredArray[0].IsVideoStart == 4 || filteredArray[0].IsVideoStart == 6) {
          let path = this.appconfig.imagelink + 'assets/img/Icon-LogOut.png';
          backgroundStyle['background-image'] = `url(${path})`;
        }

      }
      //  if (filteredArray[0].IsVideoStart === 3 && filteredArray[0].IsVideoMute === 1) {
      //   // Replace 'your-image-url' with the actual image URL
      //   let path = this.appconfig.imagelink+'assets/img/Icon-Camera.png';
      //   backgroundStyle['background-image'] = `url(${path})`;
      // }
      // else if(filteredArray[0].IsVideoStart == 2){
      //   let path = this.appconfig.imagelink+'assets/img/Icon-NotJoin.png';
      //   backgroundStyle['background-image'] = `url(${path})`;
      // }
      // else if(filteredArray[0].IsVideoStart == 4 || filteredArray[0].IsVideoStart == 6){
      //   let path = this.appconfig.imagelink+'assets/img/Icon-LogOut.png';
      //   backgroundStyle['background-image'] = `url(${path})`;
      // }

      // You can add more conditions here for different backgrounds

      return backgroundStyle;

    } else {
      return backgroundStyle;

    }

  }
  exitcallformeonlyconfirmfromPvtcall() {
    const result = confirm('Are you sure you want to leave private room?');
    if (result) {
      this.exitcallformeonlyfromPvtcall();
    } else {

    }
  }
  async exitcallformeonlyfromPvtcall() {

    let param = {
      appID: 'eae708a57586481da3a59a10b17490a3',
      channelName: 'h_' + JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id.toString(),
      uid: JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id,
      appCertificate: 'c9356956b4d44df980106316fb1efbd2',
      roleType: 0
    };


    this.videostream.GetAgoraToken(param).subscribe((res: any) => {

      if (res) {
        this.generatedtoken = res.key;

        this.videochatservice.addorremoveparticipanttoStartedpvtcall(JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id, this.imInPvtCall_Id, 3, res.key, param.channelName).subscribe(
          (datas: any) => {
            // console.log("changed pvt status on end for me only");

            this.GetMyArbitrationPartyDetails();




          });




      } else {
        this.alertservice.Alert("Unable to join videocall, Server not responding!", 3, () => { }, () => { },);
        // this.alertserv/ce.Alert('Unable to join videocall, Server not responding', 3, function(){}, function(){});

      }



    }, err => {
      this.alertservice.Alert("Unable to join videocall, Server not responding!", 3, () => { }, () => { },);
      // this.alertservice.Alert('Unable to join videocall, Server not responding', 3, function(){}, function(){});
      console.log(err);
    });
  }
  async openVotingModal() {
    this.router.navigate(['tribunal-constitution']);

  }
  onEnter(event: any) {

    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default "Enter" key behavior (new line)
      this.SendChat(); // Call the function to send the chat message
    }
  }
  SendChat() {

    this.chatusers.Id = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;
    this.chatusers.MediationId = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id;

    if (!this.ChatMessage || this.ChatMessage.trim() === '') {

      return;
    }
    this.arbitrationservice.SpInsertChat(this.chatusers.Id, this.chatusers.MediationId, this.ChatMessage, JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id
    ).subscribe((data: any) => {
      if (!!data && data.length > 0) {
        if (data[0].Id > 0 && data[0].Error === 0) {
          this.ChatMessage = '';
          this.GetAllChats();
        }
      }

    });
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Message Send',
      duration: 2000, // Duration in milliseconds
      position: 'top',
      animated: true,
      cssClass: 'custom-toast', // Apply custom CSS class
    });
    toast.present();

  }
  GetAllChats() {
    if (localStorage.getItem('ArbitrationDetails')) {
      this.arbitrationservice.SpGetAllChats(JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id).subscribe((data: any) => {
        if (!!data && data.length > 0) {
          //  console.log(data,'chats');
          this.Conversation = <Array<any>>data;
        }
      });
    }

  }
  changeTab(tab: any) {
    this.GetAllArbitrationDocuments()
    this.Tab = tab;

  }
  Addnotes() {
    this.addnotes = !this.addnotes
  }
  GetTabName() {
    switch (this.Tab) {
      case 1:
        return 'Process Status';
      case 2:
        return 'Commencement Procedure';
      case 3:
        return 'Arbitral Procedure';
      case 4:
        return 'Applications';
      case 5:
        return 'Communications';
      case 6:
        return 'Fee Payment';
      case 7:
        return 'Parties';
      case 8:
        return 'References';
      default:
        return '';
    }
  }
  GetApplicationColor(application: any) {

    console.log(application, "==============cm================")
    if (this.ArbitrationDocs.filter(x => x.Segment == 2 && x.ReferenceDocumentId == application.Id && x.IsMailer == 0 && x.DocType == 6).length > 0) {
      return 'green';
    }
    else if (this.ArbitrationDocs.filter(x => x.Segment == 2 && x.ReferenceDocumentId == application.Id && x.IsMailer == 0 && x.DocType == 3).length > 0) {
      return '#289bc9';
    }
    else if (this.ArbitrationDocs.filter(x => x.Segment == 2 && x.ReferenceDocumentId == application.Id && x.IsMailer == 0 && x.DocType == 5).length > 0) {
      return 'orange';
    }
    else {
      return 'red';
    }
  }

  GetPleadingCompletionDate(): boolean {
    // Check if CaseManagementProcedure exists and has at least one entry
    if (!this.CaseManagementProcedure || this.CaseManagementProcedure.length === 0) {
      return false;
    }

    const procedure = this.CaseManagementProcedure[0];
    const currentDate = new Date();

    // Utility function to check if a date string is valid and in the past
    const isValidPastDate = (dateString: string | null): boolean => {
      if (!dateString) return false;
      const dateObj = new Date(dateString);
      return !isNaN(dateObj.getTime()) && dateObj < currentDate;
    };

    // Check if all required dates are present and valid
    if (
      procedure.ClaimStatementFiledOn?.length > 0 &&
      procedure.DefenceStatementFiledOn?.length > 0 &&
      procedure.ReplyStatementFiledOn?.length > 0 &&
      procedure.RejoinderFiledOn?.length > 0
    ) {
      return true;
    }

    // Check individual date validity
    if (
      isValidPastDate(procedure.RejoinderFilingDate) ||
      isValidPastDate(procedure.ReplyStatementFilingDate) ||
      isValidPastDate(procedure.DefenceStatementFilingDate)
    ) {
      return true;
    }

    // Ensure that a value is always returned
    return false;
  }

  ViewRules(id: any) {
    window.open('https://peacegate.in/forms-list/' + id.toString(), '_blank');
  }


  // Video call modal 

  async openVideoCallModal() {

    const modal = await this.modalController.create({
      component: VideoCallModalPage,
      cssClass: 'custom-modal-height',
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        if (result.data.action === 'videoCall') {
          this.startVideoCall();
        } else if (result.data.action === 'externalLink') {
          this.openExternalLink(result.data.link);
        }
      }
    });

    return await modal.present();
  }

  getModalHeightClass() {
    // You can add logic to decide the height dynamically
    return 'custom-modal-height'; // Return the class based on conditions
  }

  startVideoCall() {
    // Your function to handle the app's integrated video call
    // console.log('Starting the video call...');
    this.onvideostartGeneratetoken()
  }

  openExternalLink(link: string) {
    // Your function to open the external link
    console.log('Opening external link:', link);
  }
}
