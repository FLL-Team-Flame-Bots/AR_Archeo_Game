import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { environment } from '../../environments/environment';

/** Thin singleton holding the Firebase app, auth, and Firestore handles. */
@Injectable({ providedIn: 'root' })
export class FirebaseService {
  readonly app: FirebaseApp;
  readonly auth: Auth;
  readonly db: Firestore;

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
  }
}
