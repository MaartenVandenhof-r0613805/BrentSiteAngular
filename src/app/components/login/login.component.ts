import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = '';
  //private afAuth: AngularFireAuth,
  // private router: Router,
  // private fb: FormBuilder,
  // private ngZone: NgZone,
  constructor( public auth: AuthService) { }

  //  loginForm = this.fb.group({
  //   email: ['', Validators.required],
  //   password: ['', Validators.required]
  // })

  ngOnInit() {
    
  }

}
