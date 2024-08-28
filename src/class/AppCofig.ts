export class AppConfig {
  //url: string = 'http://localhost:64515/api';    
  //AssetUrl: string = 'http://localhost:64515';
//videocalllayoutlink:string = 'http://localhost:8100/dashboard/'; //test
  // imagelink:string = 'http://localhost:8100/'; //test
  // ChatServerLink = "http://localhost:3005"
      url:string='https://adrapi.initstore.com/api';
      AssetUrl:string='https://adrapi.initstore.com';
      Link:string='https://pg.initstore.com';
       videocalllayoutlink:string = 'https://adrnew.initstore.com/dashboard/'; //test
      AdrDashboard='https://adrnew.initstore.com/dashboard/';
      AppVersion: string = '1.0.78'; //initstore
      imagelink:string = 'https://adrnew.initstore.com/';
      ChatServerLink="https://chat.sopanam.in";
      tinymce_key:string='oy0eq7kh654au69k6y1iwhshbfd072aui99snyhsiwb6iu0y';
      DigitalCardLink:string='https://card.peacegate.in/digital-card';
      SocketServerLink="https://socket.sopanam.in";
      AdminAssets="https://pgadmin.initstore.com"
      AdminpgURL="https://pgadmin.initstore.com/api"

      // url:string='https://admin.peacegate.in/api';  
      // AssetUrl:string='https://admin.peacegate.in';
      // Link:string='https://peacegate.in';
      // videocalllayoutlink:string = 'https://adr.peacegate.in/dashboard/'; //test
      // AdrDashboard='https://adr.peacegate.in/dashboard/';
      // AppVersion: string = '1.0.85'; //live        
      // imagelink:string = 'https://adr.peacegate.in/'; 
      // ChatServerLink="https://chat.sopanam.in";  
      // tinymce_key:string='oy0eq7kh654au69k6y1iwhshbfd072aui99snyhsiwb6iu0y';//'oy0eq7kh654au69k6y1iwhshbfd072aui99snyhsiwb6iu0y';
      // DigitalCardLink:string='https://card.peacegate.in/digital-card';     
      // SocketServerLink="https://socket.sopanam.in";
    // POINTS TO BE NOTED IN VIDEOCALL IN ARBITRATION PARTIES TABLE
    //  if IsVideoStart == 2 means host started call
    //  if IsVideoStart == 3 means that particular party in call
    //  if IsVideoStart == 5 means host stopped call for all
    //  if IsVideoStart == 4 means that particular party exit from call in 5 sec after host end call
    //  if IsVideoStart == 6 means that particular party leave the call
    //  if IsVideoStart == 100 means that admin started meeting and admin need to accept request to join call
    //  if IsVideoMute == 1 means that particular party's video is off
    //  if IsVideoMute == 0 means that particular party's video is on

    //  if IsAudioMute == 1 means that particular party's video is off
    //  if IsAudioMute == 0 means that particular party's video is on

    // if IsController == 1 means that particular party is controller or host


    // if IsPrivateCall == 1 means that particular party have a private call created by host or private call endedby host and party is back in main call
    // if IsPrivateCall == 2 means that particular party's private call started by host
    // if IsPrivateCall == 10 means that particular party is in private call
    // if IsPrivateCall == 3 means that particular party's private call ended by host


    // if IsVideoStart == 3 && IsPrivateCall == 2 means move party to private call from main call and change IsPrivateCall to 10
    // if IsVideoStart == 3 && IsPrivateCall == 3 means move party to main call from private call and change IsPrivateCall to 1

    // POINTS TO BE NOTED IN PRIVATE VIDEO TABLE
    // if Status = 0 means pvt call created
    // if Status = 2 means call started
    // if Status = 3 means pvt call ended


    // TYPES OF ARBITRATION 
// TYPE 0= means Party
// TYPE 2= means Lawyer
// TYPE 3= means Arbitrator
// TYPE 4= means SuperAdmin
// TYPE 5= means CaseADmin /Administrative Section

  }
