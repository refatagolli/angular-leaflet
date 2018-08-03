import { Component, OnInit } from '@angular/core';
import { KeycloakService } from "../../keycloak/keycloak.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private  path : String = "../../../assets/markers/header-background.svg"; 
  name:String;

  constructor(private keycloakService:KeycloakService) {
    this.name=this.keycloakService.getUser().username;
   }

  ngOnInit() {
  }

}
