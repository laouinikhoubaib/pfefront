import { Component, OnInit } from '@angular/core';
import {Agence} from '../../models/agence';
import {AgenceService} from '../../service/agence.service';

@Component({
  selector: 'app-agence-front',
  templateUrl: './agence-front.component.html',
  styleUrls: ['./agence-front.component.scss']
})
export class AgenceFrontComponent implements OnInit {

  events: Agence[];
  display = false;
  constructor(private service: AgenceService) { }

  ngOnInit(): void {
    this.getEvent();
  }
  private getEvent() {
    this.service.getAgences().subscribe(eventsRslt => {
      this.events = eventsRslt;
      console.log(this.events);
      this.display = true;
    });
  }
}
