import { Component, OnInit } from '@angular/core';
import { WebsocketService} from './services/websocket.service' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private serverUrl='http://54.37.81.35:9077';
  private stompClient;
  constructor(private ws:WebsocketService){
    // this.ws.getUpdate().subscribe(message=>{
    //   // Do sth with the message 
    //   console.log('eeee' + message.data[0].geoData[0].geometry.coordinates);
    // }) 
  }
}
