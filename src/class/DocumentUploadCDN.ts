export class DocumentUploadCDN{
    UserId:number=0;
    ArbitrationId:number=0;
    DocName:string='';
    DocType:number=0;
    DocUrl:string='';
    Remarks:string='';
    CreatorType:number=0;
    ScheduleDate :any;
    ScheduleVenue:string='';
    Segment:number=0;
    Side:number=0;
    FileName:string='';
    Base64Data:string='';
    Type:number=0;
    Description:string='';
    SecreteCode:string=''; 
    Date:any='';
    Id:number=0;
    Name:string='';
    Mobile:string='';
    Email:string=''; 
    ReferenceDocumentId:number=0;
    CaseManagement:ArbitrationCaseManagement=new ArbitrationCaseManagement();
    AwardStatus:number=0; 
    Status:number=0;   
}

export class ArbitrationCaseManagement{
    Id :number=0;
    UserId  :number=0;
    ArbitrationId  :number=0;
    ArbitrationDocumentId  :number=0;
     Description :string=''; 
     ClaimStatementFilingDate :any;
     DefenceStatementFilingDate :any; 
     ReplyStatementFilingDate :any; 
     RejoinderFilingDate :any;
     ArbitratorFee :number=0;
     AdministrativeFee :number=0;
     FeePaidBy :number=1;
     FeeScheduleDay1 :any; 
     FeeScheduleDay2 :any; 
     FeeScheduleDay3 :any;
     FeeScheduleDay4 :any; 
     FeeScheduleDay5 :any; 
     NextPostingDateAndTime :string=''; 
     SittingOption :string=''; 
     VenueforSitting :string=''; 
     NameandAddressofVenue :string=''; 
     SittingCentre:number=0;
     FeePaymentType:number=1;
}

