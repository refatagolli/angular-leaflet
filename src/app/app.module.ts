import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgZone} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '../leaflet-markercluster/leaflet-markercluster.module' ;
import { AppComponent } from './app.component';
import { MapComponentComponent } from './components/map-component/map-component.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { WebsocketService} from './services/websocket.service';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import {RouterModule,Routes ,Router} from '@angular/router';
import { HomeComponent } from './components/adminpanel/home/home.component';
import { AddUserComponent } from './components/adminpanel/home/add-user/add-user.component' ;;
import { DisplayassetsService } from './services/displayassets.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RightMenuComponent} from './components/right-menu/right-menu.component';
import { HttpClientModule,HttpClient } from '@angular/common/http'; 
import {  HttpModule, Http } from '@angular/http' ;
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { KeycloakHttp , KEYCLOAK_HTTP_PROVIDER } from "../app/keycloak/keycloak.http";
import { KeycloakService } from "../app/keycloak/keycloak.service";

const appRoutes: Routes = [ 
  {path:'', component:MapComponentComponent},
  {path:'login', component:LoginComponent},
  {path:'admin' , component:HomeComponent},
  {path:'addUser', component:AddUserComponent},
  {path: 'sidebar', component:SidebarComponent},
 
  ];

@NgModule({
  declarations: [
    AppComponent,
    MapComponentComponent,
    LoginComponent,
    HomeComponent,
    AddUserComponent,
    SidebarComponent,
    HeaderComponent,
    RightMenuComponent
  ],
  imports: [
    BrowserModule,
    LeafletModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    DragScrollModule,
    LeafletMarkerClusterModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    SnotifyModule
  ],
  providers: [WebsocketService,
      DisplayassetsService, 
      { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
      SnotifyService,
      KEYCLOAK_HTTP_PROVIDER,
      KeycloakService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

