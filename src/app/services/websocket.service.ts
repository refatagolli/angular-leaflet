import { Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Observable,Subject } from 'rxjs';

@Injectable()
export class WebsocketService {
  private serverUrl='https://spring-websocket.herokuapp.com' ;
  // private serverUrl;

  //the url from which we will get the datas (events)
  private stompClient; 
  //the client whitch will make requests to the server
  private subject=new Subject<any>();
  //Observers allow you to "push" new data into an observable sequence
  //observable that emits values as the user interacts with the component.
  //subject acts both as an observer and as an Observable. Because it is an observer, it can subscribe to one or more Observables, and because it is an Observable, it can pass through the items it observes by reemitting them, and it can also emit new items.
  constructor(){
    // Connect to SpringWebSocket
    let ws = new SockJS(this.serverUrl+'/websocket-connect',{});
    //
    this.stompClient= Stomp.over(ws);
    // Remove the console log of STOMP
    this.stompClient.debug=null;
    let that=this;
    // Connect to the socket define the callback func
    this.stompClient.connect({},function(){
      //connect to the STOMP server
      that.stompClient.subscribe('/events',(message)=>{
        // Parse the response into a JSON object
        // let sth=JSON.parse(message.body);
        // Push the object into our subject
        // that.subject.next(JSON.parse(sth.content));
        that.subject.next(JSON.parse(message.body));
        // console.log(message);
    });
  });
  }
  // Return the subject as an Obserbale so components 
  // implementing the service can subscribe to it
  getUpdate():Observable<any>{
    return this.subject.asObservable();
  }
  
}
