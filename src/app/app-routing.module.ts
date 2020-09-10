import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { AboutComponent } from './components/about/about.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { LoginComponent } from "./components/login/login.component";
import { AuthguardGuard } from './authguard.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'news', component: NewsComponent},
  { path: 'about', component: AboutComponent},
  { path: 'addPost', canActivate: [AuthguardGuard], component: AddPostComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

RouterModule.forRoot(routes, {useHash: true})

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
