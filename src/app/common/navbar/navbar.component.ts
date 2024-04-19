import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() selectedPage: String = '';
  isLoggedIn = false;
  loggedInSubscription?: Subscription;

  toggleSidebar(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loggedInSubscription = this.authService.isLoggedIn().subscribe((data: boolean) => {
      this.isLoggedIn = data;
    })
  }

  ngOnDestroy(): void {
    this.loggedInSubscription?.unsubscribe();
  }


  logout() {
    this.authService.logout().then(_ => {
      this.router.navigateByUrl('/home');
    });
  }


}
