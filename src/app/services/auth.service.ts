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
  withMail: boolean;
  error: string;
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  public loggedIn: boolean;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) { 
    this.withMail = true;
    this.user = afAuth.authState;
    this.loggedIn = !!sessionStorage.getItem('user');

    this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;

            console.log(this.userDetails);
          } else {
            this.userDetails = null;
          }
        }
      );
  }

  async googleSignin(){
    const provider = new auth.GoogleAuthProvider();
    //const googleIdToken = await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(googleIdToken, googleAccessToken))
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async mailSignin(email:string, password:string){
    console.log(email);
    
    const provider = new auth.EmailAuthProvider();
    
      
      this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(function (error) {
        console.log("testtesttest");
        console.log(error);
        this.withMail = false;
      });

      if (this.withMail) return this.router.navigate(['/home']);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/login']);
  }

  private updateUserData(user){

  }
}
