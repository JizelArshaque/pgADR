// import { NatureOfBusiness } from './NatureOfBusiness';
// import { Specialities } from './Specialities';
// import { BasicDetails } from './BasicDetails';
// import { Links } from './Links';
// import { SocialLinks } from './SocialLinks';
// import { AboutUs } from './AboutUs';
// import { PaymentDetails } from './PaymentDetails';
// import { VisibilitySettings } from './VisibilitySettings';
// import { Products } from './Products';
// import { CardBackground } from './CardBackground';
// import { Category } from './Category';
// import { ColorPallette } from './ColorPallette';
// import { Gallery } from './Gallery';


export class Card {
    Id: number = 0;
    UserId: number = 0;
    CompanyName: string = '';
    ThemeId: number = 0;
    ThemeColor: string = '';
    BackgroundId: string = '';
    // NatureOfBuisnessList: NatureOfBusiness[] = [];
    // SpecialityList: Specialities[] = [];
    CreatorId: number = 0;
    // basicdetails = new BasicDetails();
    // links = new Links();
    // colors = new ColorPallette();
    // sociallinks = new SocialLinks();
    // aboutus = new AboutUs();
    // payment = new PaymentDetails();
    // settings = new VisibilitySettings();
    // ProductList: Products[] = [];
    CardMadeBy: string = '';
    // GalleryList: Gallery[] = [];
    Type: number = 0;
    Code: string = '';
    CardId: number = 0;
    WallList: any[] = [];
    CardNumber: string = '';
    CategoryId: number = 0;
    SecondaryCategoryId:number=0;
    Country: number = 0;
    WallCount: number = 3;
    ProductCount: number = 20;
    GalleryCount: number = 10;
    ExpiryDate: string = '';
    JobLahCount = 3;
    PackageId: number = 0;
    PackageMapingId: number = 0;
    EditRight: number = 1;
    JoblahPostRight: number = 1;
    TaglahPostRight: number = 1;
    EditType: number = 0;
    FullName: string = '';
    IsEditSection: boolean = false;
    IsFirstCreation: boolean = false;
    AgentCode: string = '';
    Status: number = 0;
    IsAgentCode: boolean = false;
    CheckAgentCode: number = 0;
    LogoUrl: string = '';
    Otp: string = '';
    OtpStatus: number = 0;
    EmailOtpStatus: number = 0;
    EmailOtp: string = '';
    // cardbackimg = new CardBackground();//16/dec/2021
    ImageUrl: string = ''; //16/dec/2021
    // SelectedCategory: Category[] = [];
    // fontfamily:string='';  
    Opacity:number=100;
    Feedback:number=0;
    Gallerys:number=0;
    GallerySection='';
    Views:number=0;
    PhoneNumber:string='';
    PhoneCode:string='';
    FontFamily:string='';  

    Galleryid: number=0;
    ExpireDays: string = '';

    PrimaryColor:string='';
    SecondaryColor:string='';
    TextColor:string='';
}

// export class selectedCategoryList{
//     Id:number;
//     Name:string;
//     Status:number;
//     isActive:number;
// }