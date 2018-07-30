import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.css']
})
export class RightMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  classes:string[]=["","","",""];
  comand(index:number){
    if(this.classes[index].length===0){
      this.classes[index]="isSelected";
    }
    else this.classes[index]="";
  }
}
