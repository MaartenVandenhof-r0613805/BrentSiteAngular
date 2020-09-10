import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { environment } from "../environments/environment";
import { NewsService } from "./services/news.service";
import { AddPostComponent } from './components/add-post/add-post.component';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { LoginComponent } from './components/login/login.component';
import { BlogpostComponent } from './components/blogpost/blogpost.component';
import { AuthService } from "./services/auth.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthguardGuard } from './authguard.guard';
import { DataServiceService } from './services/data-service.service';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    AddPostComponent,
    LoginComponent,
    BlogpostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [NewsService, AuthService, AngularFirestore, AuthguardGuard, DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
