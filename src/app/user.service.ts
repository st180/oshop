import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  save(user: firebase.User) {
    this.db.doc('/users/' + user.uid).set({
      name: user.displayName,
      email: user.email
    }, { merge: true })
      .then(() => console.log('user saved successfully'))
      .catch((reason: any) => console.log('user save failed:', reason));
  }

  get(uid: string): Observable<AppUser> {
    return this.db.doc('/users/' + uid).valueChanges() as Observable<AppUser>;
  }

}
