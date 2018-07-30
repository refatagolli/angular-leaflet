import { Injectable } from '@angular/core';
import {  HttpModule, Http } from '@angular/http' ;
 import  'rxjs/add/operator/map' ;

@Injectable()

export class DisplayassetsService {

  constructor(public http:Http) {   }


   getAssets(){
     return this.http.get('http://street-asset-manager-api.herokuapp.com/assets/search?page_size=999').map(res =>  res.json());
   }

   getCoordinates(){
    
   }
  }