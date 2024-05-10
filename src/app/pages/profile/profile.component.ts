import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../common/services/auth.service';
import { User } from '../../models/user';
import { UserService } from '../../common/services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  user?: User;
  subscription?: Subscription

  constructor(private auth: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.auth.getCurrentUser().subscribe(user => {
      if (user) {
        this.userService.getUserById(user?.uid).then(data => {
          this.user = data;
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  deleteUser() {
    this.auth.deleteAndLogoutUser().then(_ => {
      localStorage.clear();
      this.auth.logout().then(_ => {
        this.router.navigateByUrl("/home");
      });
    });
  }


}
