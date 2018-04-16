import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    @ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;

    latitude: any;
    longitude: any;

    ngOnInit() {
        const location = new google.maps.LatLng(17.4617, 78.3671);
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
}
