import { Component, OnInit } from '@angular/core';
import { DisplayassetsService } from '../../services/displayassets.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
assets:any[];
  constructor(private router:Router,public service:DisplayassetsService) {
    this.service.getAssets().subscribe(assets =>{ 
      console.log(assets.results[0].geoinfo.geometry);
    })
   }

  ngOnInit() {
    
  }
  onSubmit(){
    this.router.navigate(['/admin'])

  }

}
