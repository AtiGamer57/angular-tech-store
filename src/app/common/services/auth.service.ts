import { Injectable, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router) {
   }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    localStorage.clear();
    return this.auth.signOut();
  }

  setCurrentUser() {
    this.auth.user.subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
    }, error => {
      console.log(error);
      localStorage.setItem('user', JSON.stringify('null'));
    });
  }

  isLoggedIn(): Observable<boolean> {
    return new Observable((subscriber : Subscriber<boolean>) => {
      if (typeof localStorage !== 'undefined' && localStorage.getItem('user')){
        subscriber.next(true);
      } else {
        subscriber.next(false);
      }
    })
  }

  getCurrentUser() {
    return this.auth.authState;
  }

  async deleteAndLogoutUser() {
    try {
      const user = await this.auth.currentUser;
      if (user) {
        await user.delete();
        await this.auth.signOut();
      } else {
        console.error('No user found.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }




}
