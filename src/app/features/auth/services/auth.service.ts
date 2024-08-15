import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from '@angular/fire/auth';
import { User } from '../../../core/models/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$: Observable<User | null>;

  constructor(private auth: Auth) {
    this.currentUser$ = new Observable<User | null>((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        observer.next(user ? { email: user.email!, password: '' } : null);
      });
    });
  }

  register(user: User) {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }

  login(user: User) {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  logout() {
    return signOut(this.auth);
  }

}
