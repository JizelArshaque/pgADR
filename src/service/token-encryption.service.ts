import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import * as CryptoJS from 'crypto-js';
// import * as CryptoJS from 'crypto-js';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class TokenEncryptionService {
  encrypted: string = '';
  decryptedData: string = '';
  dataToEncrypt: string = '';
  encryptedData: string = '';

  constructor(private router: Router) {
    this.secretkey = 'saaradhiemp';
    this.dataToEncrypt = '';
    this.encryptedData = '';
    this.decryptedData = '';
    this.encrypted = '';
  }

  secretkey: string = 'emp';

  EncryptToken(dataToencrypt: string) {
    // console.log(dataToencrypt,'data to encrypt');

    this.dataToEncrypt = dataToencrypt;
    CryptoJS
    this.encryptedData = CryptoJS.AES.encrypt(
      this.dataToEncrypt,
      this.secretkey,
    ).toString();
    // console.log(this.encryptedData,"encrypteddata");

    let type = {
      Name: this.encryptedData,
    };
    localStorage.setItem('type', JSON.stringify(type));
   // console.log("=============",type)
    
    // alert("encryption")
  }

  DecryptToken() {
    if (localStorage.getItem('type')) {
      this.encrypted = JSON.parse(`${localStorage.getItem('type')}`).Name;
     // console.log(this.encrypted,"encryptedindwecrytoy");
      // alert("decryprionsavelogin")

      try {
        let dat = CryptoJS.AES.decrypt(this.encrypted, this.secretkey);
        this.decryptedData = dat.toString(CryptoJS.enc.Utf8);
        // this.decryptedData = CryptoJS.AES.decrypt(this.encrypted, this.secretkey).toString(CryptoJS.enc.Utf8);
        // console.log(this.decryptedData,"00===============");

        if (this.decryptedData) {
          return this.decryptedData;
        } else {
          // Handle the case where decryption failed or resulted in an empty string.
          console.error('Decryption failed or resulted in an empty string.');
          return null;
        }
      } catch (error) {
        // Handle decryption errors
        console.error('Error during decryption:', error);
        return null;
      }
    } else {
      localStorage.clear();
      this.router.navigate(['login']);
      return null;
    }
  }
}
