import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

type NewType = (remarks?: any) => void;

@Injectable()
export class AlertService {
  private subject = new Subject<any>();

  constructor() { }

  Alert(message: string, type: number, yesFn: NewType, closeFn: () => void) {
    this.setAlert(message, type, yesFn, 'OK', closeFn, 'Cancel');
  }

  CustomAlert(message: string, type: number, yesFn: (remarks: any) => void, yesBtn: string, closeFn: () => void, noBtn: string) {
    this.setAlert(message, type, yesFn, yesBtn, closeFn, noBtn);
  }

  setAlert(message: string, type: number, yesFn: (remarks: any) => void, yesBtn: string, closeFn: () => void, noBtn: string) {
    let that = this;
    this.subject.next({
      type: type,
      text: message,
      yesBtn: yesBtn,
      noBtn: noBtn,
      yesFn: function (remarks?: any) {
        that.subject.next(false); // this will close the modal
        !!remarks ? yesFn(remarks) : yesFn(remarks);
      },
      closeFn: function () {
        that.subject.next(false);
        closeFn();
      }
    });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
