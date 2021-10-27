import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Renderer2 } from '@angular/core';
// import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { BgEvService } from '../shared/bgev.service';

import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BgEvMapOverviewComponent } from '../bgev-map-overview/bgev-map-overview.component';
import { BgEvConfigService } from 'app/bgev-config-service/bgev-config-service';
import { Router } from '@angular/router';
import { BgevMapService } from 'app/shared/bgev-map-service';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';


declare var H: any;

export interface Content {
  id: number;
  place: string;
  lat: number;
  lng: number;
  pricing: number;
  owner: string;
  availablity: string;
  typesAvailable: []
}
@Component({
  selector: 'bgev-map',
  templateUrl: './bgev-map.component.html',
  styleUrls: ['./bgev-map.component.scss']
})
export class BgEvMapComponent implements AfterViewInit {
  selectedChargerTypes: any = [];
  filteredSlideContents: any = [];
  platform: any;
  @ViewChild('mapp', { static: false }) mapElement: ElementRef;
  map: any;
  mapGroup: any;
  icon = new H.map.Icon('assets/imgs/car_charge.png', { size: { w: 30, h: 30 } });
  marker: any;
  bubble: any;
  slideContents = []
  slideLen: 0;
  errorMessage: any;
  //////////////////////////////////////////////
  intersectionObserver: IntersectionObserver;
  isDarkTheme = false;
  currentIndex = 0;
  carousel: Element;
  elements: any = [];
  elementIndices = {};
  loggedIn: string;
  isLoggedIn: string;
  defaultLayers;
  price: string;
  connector = ['Type1', 'Type2', 'CCA', 'CHAdeMO', 'TeslaSuperCharger', 'Untethered'];
  Type1 = [18, 22, 25];
  Type2 = [18];
  CCA = [30];
  CHAdeMO = [32];
  TeslaSuperCharger = [35];
  Untethered = [25, 35];
  searchService: any;

  constructor(private bgevService: BgEvService, public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private el: ElementRef, private router: Router,
    private mapService: BgevMapService, private bgevConfigService: BgEvConfigService) {
    this.intersectionObserver = null;
    this.platform = new H.service.Platform({
      apikey: 'PYLxxmi0DvOjFtD7SP5mvV5r0gHw6Oo9OwR9lxhRv18'
    });
    this.searchService = this.platform.getSearchService();
  }

  async ngAfterViewInit() {
    this.defaultLayers = this.platform.createDefaultLayers();
     this.map = new H.Map(this.mapElement.nativeElement,
      this.defaultLayers.vector.normal.map, {
      center: {lat: 53.45, lng: 0.21},
      zoom: 5,
      pixelRatio: window.devicePixelRatio || 1
    });
    navigator.geolocation.getCurrentPosition(( position ) => {
      const { latitude, longitude } = position.coords;
      this.changeCenter(latitude, longitude);
    });

    window.addEventListener('resize', () => this.map.getViewPort().resize());
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    const ui = H.ui.UI.createDefault(this.map, this.defaultLayers);

    const ref = this._bottomSheet.open(BgEvMapOverviewComponent);

    await this.dismissAction(ref)
  }

  changeCenter(lat, lng) {
    this.map.setCenter({ lat, lng });
    this.map.setZoom(14);
  }

  addObserver() {
    for (let i = 0; i < this.elements.length; i++) {
      this.elementIndices[this.elements[i].getAttribute('id')] = i;
      this.intersectionObserver.observe(this.elements[i]);
    }
  }
  getColor(obj: any) {
    return (obj.availablity) ? 'rgba(0, 200, 0, 0.8)' : 'rgba(200, 0, 0, 0.8)';
  }

  async showSearch() {
    const ref = this._bottomSheet.open(BgEvMapOverviewComponent);
    await this.dismissAction(ref);
  }
  async dismissAction(ref) {
    await ref.afterDismissed().subscribe( async(position) => {
      if(position) {
        // await this.getChargepoints(position[0], position[1]);
        await this.getChargePoints(position[2]);

        // this.addMarkersToMap(this.map);
        // this.zoomLocation();
      }
   })
  }

  zoomLocation() {
    this.intersectionObserver = new IntersectionObserver((entries, observer) => {
      // console.log(entries, observer);
      // find the entry with the largest intersection ratio
      const activated = entries.reduce((max, entry) => {
        return (entry.intersectionRatio > max.intersectionRatio) ? entry : max;
      });
      if (activated.intersectionRatio > 0) {
        this.currentIndex = this.elementIndices[activated.target.getAttribute('id')];
      }
      if (entries[0].isIntersecting) {
        this.changeLocation(this.currentIndex);
      }
    }, {
      root: this.carousel,
      threshold: 0.5
    });
    this.carousel = document.querySelector('.carousel');
    this.elements = document.querySelectorAll('.carousel > *');
    if(this.elements.length === 0) {
      setTimeout(() => {
        this.zoomLocation();
      }, 2000);
    }
    this.addObserver();
  }

  addMarkersToMap(map) {
    const marker = []
    this.slideContents.map((content) => {
      console.log(content);
      marker.push(new H.map.Marker({lat: content.lat, lng: content.lng},
        {icon: this.icon}));
    })
    const group = new H.map.Group();
    group.addObjects(marker);
    map.addObject(group);

    // map.getViewModel().setLookAtData({
    //   bounds: group.getBoundingBox()
    // });
  }

  openDialog(chargerType: string, index: number, chargepointId) {

        this.isLoggedIn = localStorage.getItem('loggedIn');
        if (this.isLoggedIn === 'no') {
            this.router.navigate(['./login']);
        } else {
          this.bgevService.changeData(this.slideContents[index]);
          localStorage.setItem('chargerType', chargerType);
          localStorage.setItem('price', this[chargerType][0]);
          localStorage.setItem('chargePointId',chargepointId);
          this.router.navigate(['./request-page']);
        }
  }

  selectType(chargerType: string) {
    this.price = this[chargerType][0];
  }

  changeLocation(index: number) {
    const currCity = this.slideContents[index];
    const { lat, lng } = currCity;
    this.map.setCenter({ lat, lng });
    this.map.setZoom(14);
  }


  reverseGeocode(evt, ui) {
    const { lat, lng } = evt.target.getGeometry();
    const geocoder = this.platform.getGeocodingService(),
      parameters = {
        prox: `${lat}, ${lng}, 250`,
        mode: 'retrieveAddresses',
        maxresults: '1',
        gen: '9'
      };

    geocoder.reverseGeocode(parameters,
      (result) => {
        console.log(result.Response.View[0].Result[0].Location.Address.Label);
        if (!this.bubble) {
          this.bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
            // read custom data
            content: result.Response.View[0].Result[0].Location.Address.Label
          });
          ui.addBubble(this.bubble);
        } else {
          this.bubble.setPosition(evt.target.getGeometry());
          this.bubble.setContent(result.Response.View[0].Result[0].Location.Address.Label);
          this.bubble.open();
        }

      }, (error) => {
        console.log(error);
      });
  }

  getChargePoints(postcode) {
    this.slideContents = [];
    this.mapService.getChargePointsLocations(postcode.replace(/\s/g, "")).subscribe({
      next: chargePoints => {
          chargePoints.map((chargePoint, count) => {
            const price = this[this.connector[count]] ? this[this.connector[count]] : this[this.connector[0]];
            const connectorType = [(this.connector[count]) ? this.connector[count] : this.connector[0],
        (this.connector[count + 2]) ? this.connector[count + 2] : undefined]
            const content = {
              id: chargePoint.ChargeDeviceId,
              availablity: 'Yes',
              lat : chargePoint.ChargeDeviceLocation.Latitude,
              lng : chargePoint.ChargeDeviceLocation.Longitude,
              owner: 'Centrica',
              place: chargePoint.ChargeDeviceLocation.Address.Street,
              typesAvailable: connectorType.filter(conn => conn !== undefined),
              pricing: price[0],
            };
            this.slideContents.push(content);
          });
          this.addMarkersToMap(this.map);
          this.zoomLocation();
        },
      error: err => this.errorMessage = err
  });
  }

}
