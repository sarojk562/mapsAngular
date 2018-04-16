import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewChild } from '@angular/core';
import { DataService } from '../core/data.service';
import { Subscription } from 'rxjs/Subscription';
import { } from '@types/googlemaps';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

    @ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;

    latitude: any = 17.4617971;
    longitude: any = 78.3671564;

    Location: Object;
    sub: Subscription;

    constructor(private dataService: DataService) { }

    ngOnInit() {

        this.sub = this.dataService.getLocations().subscribe(loc => {
            this.Location = loc;
            this.latitude = this.Location['lat'];
            this.longitude = this.Location['lon'];
            this.setMarker(this.latitude, this.longitude);
        });

        this.setMarker(this.latitude, this.longitude); // Setting Up initial location marker

    }

    setMarker(latitude, longitude) {
        const location = new google.maps.LatLng(this.latitude, this.longitude);
        const mapProp = {
            center: location,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

        const marker = new google.maps.Marker({
            position: location,
            map: this.map,
            animation: google.maps.Animation.BOUNCE
        });

        marker.setMap(this.map);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
