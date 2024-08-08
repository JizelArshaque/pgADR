import { VideoStoreOrderItemss } from "./VideoStoreOrderItemss";

export class VideoStoreOrder{
    Id:number=0;
    VideoCallId:number=0;
    OrderDate:string='';
    OrderNo:string='';
    Amount:number=0;
    Discount:number=0;
    TotalAmount:number=0;
    PayementCode:string='';
    PayementMode:number=0;
    Remarks:string='';
    UserId:number=0;
    ClientUserId:number=0;
    Status:number=0;
    Systime:string='';
    VideoStoreOrderItemss:VideoStoreOrderItemss[]=[]

}