import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-accessdenied',
  templateUrl: './app.accessdenied.component.html',
})
export class AppAccessdeniedComponent implements OnInit, OnDestroy {

  myLinkElement1: HTMLLinkElement;

  myLinkElement2: HTMLLinkElement;

  constructor() {
    this.myLinkElement1 = document.createElement('link');
    this.myLinkElement1.href = "assets/theme/blue/theme-light.css";
    this.myLinkElement1.rel = "stylesheet";
    this.myLinkElement1.id = "theme-css";
    //this.myLinkElement1.style = "text/css";

    this.myLinkElement2 = document.createElement('link');
    this.myLinkElement2.href = "assets/layout/css/layout-light.css";
    this.myLinkElement2.rel = "stylesheet";
    this.myLinkElement2.id = "layout-css";
    //this.myLinkElement2.style = "text/css";


    document.body.appendChild(this.myLinkElement1);
    document.body.appendChild(this.myLinkElement2);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    document.body.removeChild(this.myLinkElement1);
    document.body.removeChild(this.myLinkElement2);
  }

}
