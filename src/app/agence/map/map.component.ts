import { Component, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import * as L from 'leaflet';
import {Agence} from '../../models/agence';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map;
  @Input() using: string;
  @Input() event: any;
  @Input() listagence: Agence[];
  century21icon;
  @Output() longLat = new EventEmitter<any>();

  private initMap(): void {
    if (this.using === 'create') {
      this.map = L.map('map', {
        center: [32.93333, 10.45000],
        zoom: 6
      });
    } else if (this.using === 'displayOne') {
      this.map = L.map('map', {
        center: [this.event.latitude, this.event.lang],
        zoom: 9
      });
    } else {
      this.map = L.map('map', {
        center: [32.93333, 10.45000],
        zoom: 6
      });
    }

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">MapLoooL</a>'
    });

    tiles.addTo(this.map);
    this.century21icon = L.icon({
      iconUrl: 'https://i.ibb.co/sJrMTdz/favicon-32x32.png',
      iconSize: [20, 20]
    });

    if (this.using === 'create') {
      this.map.on('click', e => {
        const newMarker = new L.marker([e.latlng.lat, e.latlng.lng], { icon: this.century21icon }).addTo(this.map);
        this.revertToParent(e.latlng);
      });
    } else if (this.using === 'displayOne') {
      console.log(this.event);
      const newMarker = new L.marker([this.event.latitude, this.event.lang], { icon: this.century21icon }).addTo(this.map);
    } else {
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      console.log(this.listagence);
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

      if (this.listagence && Array.isArray(this.listagence)) {
        this.listagence.forEach((listagenceStruct: Agence) => {
          console.log(listagenceStruct);
          const newMarker = new L.marker([listagenceStruct.latitude, listagenceStruct.lang], { icon: this.century21icon }).addTo(this.map);
        });
      }
    }
  }

  revertToParent(latlng: any) {
    console.log('W chiel component');
    this.longLat.emit(latlng);
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
