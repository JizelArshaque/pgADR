import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }


  ValidateEmail(mail:any,alt:any) 
  {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return (true)
    }
    if(alt==true){alert("You have entered an invalid email address!");}
    return false;
  }
  ValidateMobile(mobile:any,alt:any) 
  {
   if (/^(\+[\d]{1,5}|0)?[6-9]\d{9}$/.test(mobile))
    {
      return (true)
    }
    if(alt==true){alert("You have entered an invalid mobile number!");}
      
      return (false)
  }
  ValidateUserName(name:any,alt:any) 
  {
   if (name.length>2)
    {
      return (true)
    }
    if(alt==true){ alert("Username must be at least 5 characters long");}
      return (false)
  }
  ValidateUserName2(name:any,alt:any) 
  {
   if (name.length>2)
    {
      return (true)
    }
    if(alt==true){ alert("Username must be at least 5 characters long");}
      return (false)
  }
  ValidateRequired(name:any,alt:any) 
  {
   if (name.length>1)
    {
      return (true)
    }
    if(alt==true){ alert("Username must be at least 5 characters long");}
      return (false)
  }
  ValidateRequiredInt(name:any,alt:any) 
  {
   if (name>0)
    {
      return (true)
    }
    if(alt==true){ alert("Please select valid id");}
      return (false)
  }
  ValidateCode(name:any,alt:any) 
  {
   if (name.length>=12)
    {
      return (true)
    }
    if(alt==true)
    { 
      alert("Code must be at least 14 characters long");
    }
      return (false)
  }

  ValidateString(name:any,alt:any) 
  {
   if (name>0)
    {
      return (true)
    }
    if(alt==true){ alert("Please select valid id");}
      return (false)
  }

  ValidateNumber(name:any,alt:any) 
  {
   if (name>0)
    {
      return (true)
    }
    if(alt==true){ alert("Please select valid Amount");}
      return (false)
  }

  Validatestrings(name:any,alt:any) 
  {
   if (name>0)
    {
      return (true)
    }
    if(alt==true){ alert("Please select Type");}
      return (false)
  }

}
