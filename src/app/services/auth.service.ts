import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) { 
    this.users$ = this.afAuth.authState;
  }

  async googleSignin(){
    const provider = new auth.GoogleAuthProvider();
    //const googleIdToken = await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(googleIdToken, googleAccessToken))
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async mailSignin(email: string, password: string){
    const provider = new auth.EmailAuthProvider();
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/login']);
  }

  private updateUserData(user){

  }
}
