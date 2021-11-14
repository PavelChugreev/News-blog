import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertType, AlertTypes } from '../../interfaces/interfaces';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  public text: string = 'sdasa';
  public type: AlertType = AlertTypes.SUCCESS;
  public open: boolean = false;

  public AlertTypes: any = AlertTypes

  private alertSub: Subscription = new Subscription();

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertSub = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text || this.text;
      this.type = alert.type || this.type;
      this.open = alert.open;

      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.open = false;
      }, 3000);
    })

  }

  close () {
    this.open = false;
  }

  ngOnDestroy () {
    if(this.alertSub) {
      this.alertSub.unsubscribe();
    }
  }

}
