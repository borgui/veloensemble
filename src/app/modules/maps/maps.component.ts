import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, Output, EventEmitter } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { map } from 'rxjs/operators';
import { MapsService } from './maps.service';
import * as L from 'mapbox.js';
import { geoJSON } from 'leaflet';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnChanges {


  @Input()
  width = "500px"

  @Input()
  height = "500px"

  @Input()
  route:any = null;

  @Output()
  selectedRoute= new EventEmitter<any>();

  mymap;

  showPark = true;
  switchBikePath = false;

  geo1;
  geo2;

  parkings = []

  parkingMarkers = new L.FeatureGroup();
  routeMarker = new L.FeatureGroup();

  @Input()
  destination;

  @Input()
  origin;

  routeLayer = new L.FeatureGroup();
  cycleLayer

  selectedStyle = {
    "color": "#e74c3c",
    "weight": 8,
    "opacity": 0.65
  };

  parkingIcon = new L.icon({
    iconUrl: './../../../assets/img/parking-sign-blue.png',
    iconSize: [15, 15],
    iconAnchor: [15, 15],
    popupAnchor: [10, 10],
  });

  redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  constructor(private mapsService: MapsService) { }

  ngOnInit() {
    this.mymap = L.mapbox.map('map').setView([48.853, 2.34991], 12);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYm9yZ3VpIiwiYSI6ImNqdHBodnA0MjA0Z3c0ZXM3b2RldWtpdDEifQ.12vJL9ItSgdioEhoavh8JQ', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiYm9yZ3VpIiwiYSI6ImNqdHBodnA0MjA0Z3c0ZXM3b2RldWtpdDEifQ.12vJL9ItSgdioEhoavh8JQ'
    }).addTo(this.mymap);
    // this.showMap(false);
    this.cycleLayer = L.tileLayer("https://tiles{s}.geovelo.fr/raster/facilities/{z}/{x}/{y}.png", {
      maxZoom: 20,
      subdomains: ["2", "3", "4"]
    })

    // this.mymap.on('load', () => {
    //   console.log("get route")
    if(this.route != null && this.mymap != null){
      this.setRoute(this.route);
    } else if (this.origin != null && this.destination != null && this.mymap != null){
      this.getRoute(this.origin, this.destination)
    }
    // })
    // console.log(this.mymap.getZoom());
    let self = this
    this.mymap.on('zoomend', function () {
      self.getParking();
    });
    this.mymap.on('moveend', function () {
      console.log(self.mymap.getZoom())
      self.getParking();
    });
  }

  ngOnChanges() {
    console.log(this.route)
    if(this.mymap != null){
      console.log("in change")
      this.getRoute(this.origin, this.destination);
    }
  }
  getParking() {
    if (this.mymap.getZoom() >= 15 && this.showPark == true) {
      let ne = this.mymap.getBounds().getNorthEast()
      ne = [ne.lng, ne.lat]
      let sw = this.mymap.getBounds().getSouthWest()
      sw = [sw.lng, sw.lat]
      this.mapsService.getParking(ne, sw).subscribe(result => {
        this.mymap.removeLayer(this.parkingMarkers)
        this.parkingMarkers = new L.FeatureGroup();
        result.forEach(element => {
          var marker = L.marker([element.geometry.coordinates[1], element.geometry.coordinates[0]], { icon: this.parkingIcon })
            .bindPopup('Nombre de places: ' + element.fields.placal);
          this.parkingMarkers.addLayer(marker);

        });
        this.mymap.addLayer(this.parkingMarkers);
      })
    } else {
      this.mymap.removeLayer(this.parkingMarkers)
    }
  }
  onSwitchBikePath(event) {
    if (event.currentTarget.checked) {
      this.mymap.addLayer(this.cycleLayer)
      this.switchBikePath = true
    } else {
      this.mymap.removeLayer(this.cycleLayer)
      this.switchBikePath = false

    }
  }

  onSwitchPark(event) {
    this.getParking();
  }

  setRoute(route){
    var myStyle = {
      "color": "#ff7800",
      "weight": 5,
      "opacity": 0.65
    };

    this.mymap.removeLayer(this.routeMarker)
    this.mymap.removeLayer(this.routeLayer)
    this.routeLayer = new L.FeatureGroup();
    this.routeMarker = new L.FeatureGroup();
    L.marker([this.route.geometry.coordinates[0][1], this.route.geometry.coordinates[0][0]]).addTo(this.routeMarker);
    L.marker([this.route.geometry.coordinates[this.route.geometry.coordinates.length - 1][1], this.route.geometry.coordinates[this.route.geometry.coordinates.length - 1][0]], { icon: this.redIcon }).addTo(this.routeMarker);
    this.mymap.addLayer(this.routeMarker);

    this.routeLayer.addLayer(L.geoJson(route, {style:myStyle}));
    this.mymap.addLayer(this.routeLayer);


  }
  getRoute(origin, destination) {
    this.mymap.removeLayer(this.routeMarker)
    this.mymap.removeLayer(this.routeLayer)
    this.routeLayer = new L.FeatureGroup();
    this.routeMarker = new L.FeatureGroup();
    if (origin != null) {
      L.marker([this.origin[1], this.origin[0]]).addTo(this.routeMarker);
    }
    if (destination != null) {
      L.marker([this.destination[1], this.destination[0]], { icon: this.redIcon }).addTo(this.routeMarker);
    }
    this.mymap.addLayer(this.routeMarker);

    if (origin != null && destination != null) {
      this.mapsService.getRoute(origin, destination).subscribe(response => {
        var route = response.routes[0].geometry.coordinates;
        var alternativeRoute;
        if(response.routes[1] != null){
          alternativeRoute = response.routes[1].geometry.coordinates;
        }
        console.log(route)
        var geojson = {
          type: 'Feature',
          properties: { color: 'blue' },
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        };
        var myStyle = {
          "color": "#ff7800",
          "weight": 5,
          "opacity": 0.65
        };
      let self = this
       this.geo1 = L.geoJson(geojson, {style:myStyle}).on('click', function(){
         console.log("test")
         this.setStyle(self.selectedStyle)
         self.geo2.setStyle(myStyle)
         self.selectedRoute.emit(geojson)
        });
      this.routeLayer.addLayer(this.geo1);
       if(alternativeRoute != null){
        let altenativeGeo = geojson;
        altenativeGeo.geometry.coordinates = alternativeRoute;
        this.geo2 = L.geoJson(altenativeGeo, {style: myStyle}).on('click', function(){
          this.setStyle(self.selectedStyle)
          self.geo1.setStyle(myStyle)
          self.selectedRoute.emit(altenativeGeo)
        })
        this.routeLayer.addLayer(this.geo2);
       }

      this.geo1.setStyle(this.selectedStyle)
      this.selectedRoute.emit(geojson)

      this.mymap.addLayer(this.routeLayer);

        var legend = L.control({ position: 'topright' });

        legend.onAdd = function (map) {
          var div = L.DomUtil.create('div', 'info legend')

          div.innerHTML += "<div>test</div>"
          return div
        };

          legend.addTo(this.mymap)


      })
    }

  }

}
