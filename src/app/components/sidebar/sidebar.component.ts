import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
 
  }

  toggleButton(){
    if ($(".container-menu").is(':visible')){
      $(".container-menu").hide(400);
      $("#sidebar-visibility-div i").removeClass("fa-chevron-left");
      $("#sidebar-visibility-div i").addClass("fa-chevron-right");
    }
    else{
      $(".container-menu").removeClass("hidden");
      $(".container-menu").hide(0);
      $(".container-menu").show(400);
      $("#sidebar-visibility-div i").addClass("fa-chevron-left");
      $("#sidebar-visibility-div i").removeClass("fa-chevron-right");
    }
  }

}
