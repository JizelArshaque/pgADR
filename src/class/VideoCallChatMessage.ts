import { AppConfig } from './AppConfig';

export class VideoCallChatMessage
{
    appconfig=new AppConfig();
    Id:number=0;
    VideoCallChatId:number=0;
    SenderId:number=0;
    UserType:number=0;
    Message:string="";
    Status:number=0;
    SysTime:string="";
    IsRead:number=0;
    ReadTime:string="";
    UserName:string="";
    url: string = this.appconfig.url + '/VideoCallChatMessage';
    FileName:string="";
    UploadUrl:string="";
}