import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  collectionName = 'Users';

  constructor(private afs: AngularFirestore) { }

  createUser(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }


  
}
