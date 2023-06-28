import { Component, OnInit } from '@angular/core';
import {AgenceService} from '../../service/agence.service';
import {Agence} from '../../models/agence';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-agence-deteil',
  templateUrl: './agence-deteil.component.html',
  styleUrls: ['./agence-deteil.component.scss']
})
export class AgenceDeteilComponent implements OnInit {
  display = false;
  id: string;
  event: Agence;
  constructor(private service: AgenceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.event = new Agence();
    this.service.getAgence(this.id).subscribe(data => {
      this.event = data;
      this.display = true;
      console.log(data);
    });
  }

}
