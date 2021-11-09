import { Component, Input, OnInit } from '@angular/core';

export enum Size {
  SM = 'sm',
  MD = 'md',
  LG = 'lg'
}

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit{

  @Input() size: string = Size.SM;

  public dimention: {[key: string]: boolean} = {};

  ngOnInit() {
    switch (this.size) {
      case Size.LG:
        this.dimention = {[Size.LG]: true}
        break;
      case Size.MD:
        this.dimention = {[Size.MD]: true}
        break;
      default:
        this.dimention = {[Size.SM]: true}
    }
  }
}