import { Component, ChangeDetectorRef ,style,OnInit, NgZone, group,ViewEncapsulation, Inject } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster' ;
import { Map ,geoJSON,Layer,LatLngBounds,control,latLng,tileLayer,marker,icon,LayerGroup,latLngBounds } from 'leaflet';
import { WebsocketService } from '../../services/websocket.service';
import { DisplayassetsService} from '../../services/displayassets.service' ;
import { HttpClient,HttpParams } from '@angular/common/http';
import {SnotifyService} from 'ng-snotify';
import { Observable } from "rxjs"; 

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MapComponentComponent implements OnInit {
  googleMaps:any;
  options:any;
  fitBounds:any;
  layers=[];
  markers:any[];
  layergroup:LayerGroup = new L.LayerGroup();
  // serverUrl='http://54.37.81.35:9077' ; 

  constructor( private ws:WebsocketService,private service:DisplayassetsService, private http:HttpClient, private snotifyService: SnotifyService) {
  }

 // Marker cluster stuff
  markerClusterGroup: L.MarkerClusterGroup;
	markerClusterData: any[] = [];
  markerClusterOptions: L.MarkerClusterGroupOptions;
 assets:any [];

  ngOnInit() {
    // console.log(this)
    // this.snotifyService.info('Example body content', {
    //   timeout: 5000,
    //   showProgressBar: true,
    //   closeOnClick: true,
    //   pauseOnHover: true
    // });
    
    this.googleMaps = tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 18,
      //Remove this for other base layers only google needs it
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      detectRetina: true
    });
   this.options = {
      layers: [ this.googleMaps],
      zoom: 8,
      center: latLng([ 41.9028,12.4964 ]),
      zoomControl:false
      //Hide deafult zoom control so u can use costum 
    };
    this.ws.getUpdate().subscribe(message=>{
     
      message.data.forEach(event => {

        let markerinfo= this.setIcon(event.eventType);
        let polylineOptions;
 
        //popup info
       let infotab =`
          <div style = "width=400px , background-color:red">
            <h2>${event.eventType}</h2>
       
          </div>
        `
        this.snotifyService.error('Example body content', {
          timeout: 1000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          position:"rightBottom"
        });
 
        event.geoData.forEach(geodata => {
          //marker build
          if(geodata.geometry.type=="Point"){
            let PointLatLng= geodata.geometry.coordinates;
            this.layergroup.addLayer(marker([geodata.geometry.coordinates[1],geodata.geometry.coordinates[0]],markerinfo)
            .bindPopup(infotab,{
              className:"angular_leaflet"
            }));
          }
        });
        this.markerClusterGroup.addLayer(this.layergroup);
      });
    });
    
//Displaying assets from the Api in the map

this.service.getAssets().subscribe(assets => {
  assets.results.forEach(geoinffo => {

  if(geoinffo.geoinfo.geometry.type=="Point"){
     let coordinates=geoinffo.geoinfo.geometry.coordinates;
        // console.log(coordinates);
         this.markerClusterGroup.addLayer(marker(coordinates,{
             icon: icon({
             iconSize: [ 200, 200 ],
             iconAnchor: [ 41, 41 ],
             iconUrl: '../../../assets/markers /asset.svg'
             //shadowUrl: 'assets/marker-shadow.png'
            })
  
       }).bindPopup("<div align='center'><h1>Asset</h1></div>"))
   
      //  console.log(coordinates);
      }
      if(geoinffo.geoinfo.geometry.type=="LineString"){
        let linecoord=geoinffo.geoinfo.geometry.coordinates;
      
        this.layergroup.addLayer(L.polyline(linecoord,{
            color: 'green'
          }).bindPopup('<h3>PolyLine</h3>'))
      }
      if(geoinffo.geoinfo.geometry.type=="Polygon"){
        let polycoord=geoinffo.geoinfo.geometry.coordinates;
          this.markerClusterGroup.addLayer(L.polygon(polycoord,{
                    color: 'green'
                  }).bindPopup('<h3>Polygon</h3>'))

                  // console.log(polycoord);
      }
    })
  }) 
}

markerClusterReady(group: L.MarkerClusterGroup) {
    this.markerClusterGroup = group;  
  }
 // Displayng different icons of markers based on the Event Type
setIcon(eventType:string){
  let iconurl;
   switch(eventType){
   case "Accident":
     iconurl='../../../assets/markers /accident.svg' ;
     break;
   case "Congestion":
     iconurl= '../../../assets/markers /congestion.svg'
   break;
   case "Incident": 
     iconurl='../../../assets/markers /incident.svg'
   break;
   
   }
    return {
    icon: icon({
      iconSize: [ 100, 100 ],
      iconAnchor: [ 41, 41 ],
      iconUrl: iconurl
    })
  }; 
}

 
// Adding the geojson layer --Ignore--
onMapReady(map:L.Map) {
  L.control.zoom({
    position:'topright'
  }).addTo(map); 

  let that=this;
  map.on("moveend",function(e){
    let params = new HttpParams().append('minLat', map.getBounds().getEast().toString());
    params=params.append('maxLat',  map.getBounds().getWest().toString());
    params=params.append('minLng',  map.getBounds().getNorth().toString());
    params=params.append('maxLng',  map.getBounds().getSouth().toString()); 
    console.log(params);
    that.http.get("http://spring-websocket.herokuapp.com/events",{params:params}).subscribe(data=>{
      console.log(data);
      // console.log(that.layergroup)
      that.markerClusterGroup.removeLayer(that.layergroup);
      that.layergroup.clearLayers();
      Array.prototype.forEach.call(data,message => { 

        message.data.forEach(event => {

          let markerinfo= that.setIcon(event.eventType);
          let polylineOptions;
  
          //popup info
        let infotab =`
            <div style = "width=400px , background-color:red">
              <h2>${event.eventType}</h2>
        
            </div>
          `
  
          event.geoData.forEach(geodata => { 

            //marker build
            if(geodata.geometry.type=="Point"){
              // let PointLatLng= geodata.geometry.coordinates;
              let marker1 =  marker([geodata.geometry.coordinates[1],geodata.geometry.coordinates[0]],markerinfo);
              that.layergroup.addLayer(marker1
              .bindPopup(infotab,{
                className:"angular_leaflet"
              }));
              // console.log(that.markerClusterGroup);

              that.snotifyService.error(event.eventType, {
                timeout: 5000,
                showProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                position:"rightBottom"
              }
              ).on("click",e =>{
                console.log("done"); 
                let latlngs = [ marker1.getLatLng()]; 
                let latlngbounds = latLngBounds(latlngs);
                map.fitBounds(latlngbounds);
                // console.log(marker1);
                marker1.openPopup();
              });

            }
          });
        });
        that.markerClusterGroup.addLayer(that.layergroup);
      });
    });
    // console.log(e);
    // console.log(map.getBounds());
  });


  map.fireEvent("moveend");

  }


}

