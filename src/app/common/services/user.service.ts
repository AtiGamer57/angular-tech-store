import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  collectionName = 'Users';
  private userCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.userCollection = afs.collection<User>(this.collectionName);
   }

  createUser(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  
  async getUserById(uid: string) {
    const querySnapshot = await this.userCollection.ref
      .where('id', '==', uid)
      .get();

    if (querySnapshot.empty) {
      return;
    }

    return querySnapshot.docs.at(0)?.data();
  }
  
}
