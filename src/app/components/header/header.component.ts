import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() {}

  clicked = false;
  display = "flex";
  onClick($event) {
    console.log("clicked")
      const links = document.getElementsByClassName("routerLink");

      for (let i = 0; i < links.length; i++) {
        const link = links[i] as HTMLElement;
        link.style.display = this.display;
        console.log("set display to " + this.display)
      }

      if (this.display == "flex" ) this.display = "none";
      else this.display = "flex";
  }

  ngOnInit() {
  }

}
