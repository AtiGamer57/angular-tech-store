import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnChanges, OnInit {
  @Input() selectedPage: String = '';
  isMenuOpen = false;
  isLoggedIn = false;

  toggleSidebar(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.checkIfLoggedIn();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    if (localStorage.getItem('user')) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }


  logout() {
    this.authService.logout().then(_ => {
      this.router.navigateByUrl('/home');
    });
  }


}
