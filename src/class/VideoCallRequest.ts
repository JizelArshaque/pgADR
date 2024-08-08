export class VideoCallRequest {
    Id: number = 0;
    Name: string = '';
    Email: string = '';
    Mobile: string = '';
    Subject: string = '';
    MeetingDateTime: string = '';
    MeetingTime: string = '';
    Description: string = '';
    HostUserId: number = 0;
    RequestedUserId: number = 0;
    CardId: number = 0;
    Status: number = 0;

    Meeting: number=0;
    MeetingsSection: string = '';
}