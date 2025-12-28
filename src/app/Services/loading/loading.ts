import { Injectable } from '@angular/core';
import {  NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Loading {
  private reqCount = 0;

  constructor(private spinner: NgxSpinnerService) {}

  show() {
    this.reqCount++;
    if (this.reqCount === 1) {
      this.spinner.show(undefined, {
        bdColor: 'rgba(0,0,0,0.8)',
        size: 'medium',
        color: '#fff',
        type: 'pacman',
        fullScreen: true
      });
    }
  }

  hide() {
    this.reqCount--;
    if (this.reqCount <= 0) {
      this.reqCount = 0;
      this.spinner.hide();
    }
  }

}
