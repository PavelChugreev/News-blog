import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertType, AlertTypes, IAlert } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public alert$: Subject<IAlert> = new Subject<IAlert>();

  open (text: string, type: AlertType = AlertTypes.SUCCESS) {
    this.alert$.next({text, type, open: true})
  }

  close () {
    this.alert$.next({text: '', open: false})
  }
}
