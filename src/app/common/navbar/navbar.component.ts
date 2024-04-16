import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() selectedPage: String = '';
  isMenuOpen = false;
  isLoggedIn=false;

  toggleSidebar(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  constructor() {
    
  }
}
