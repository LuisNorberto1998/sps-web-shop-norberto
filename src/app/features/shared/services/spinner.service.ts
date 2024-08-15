import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerVisible = new BehaviorSubject<boolean>(false);
  spinnerVisible$ = this.spinnerVisible.asObservable();

  showSpinner() {
    this.spinnerVisible.next(true);
  }

  hideSpinner() {
    this.spinnerVisible.next(false);
  }
}
