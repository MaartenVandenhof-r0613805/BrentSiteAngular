import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { AboutComponent } from './components/about/about.component';
import { AddPostComponent } from './components/add-post/add-post.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'news', component: NewsComponent},
  { path: 'about', component: AboutComponent},
  { path: 'addPost', component: AddPostComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
