import { WallImages } from './WallImages';
import { WallImageMapping } from './WallImageMapping';

export class Wall{
    Id:number=0;
    WallText:string='';
    ImageUrl:string='';
    IsHideEnquiry:number=0;
    UserId:number=0;
    StartDate:any='';
    EndDate:any='';
    CardId:number=0;
    WallImages:WallImages[]=[];
    WallImageMapping:WallImageMapping[]=[];
    CategoryId:number=0;
    CompanyName:string='';
    MobileCode:string='';
    Mobile:string='';
    WhatsappCode:string='';
    Whatsapp:string='';
    WallView:number=0;
    BasicDetailsWhatsappCode:string='';
    BasicDetailsWhatsapp:string='';
    Systime:string='';
    Email:string='';
    Code:string=''; 
    FirstName:string='';
    PhoneNumber:string='';
    LogoUrl:string='';
    DefaultCard:number=0;
}