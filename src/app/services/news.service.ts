import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private firebase: AngularFireDatabase) { }
  postList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl('', Validators.required),
    intro: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required)
  });

  getPosts() {
    this.postList = this.firebase.list('posts');
    return this.postList.snapshotChanges();
  }

  getPostsV2(){
    let posts = this.firebase.list('/posts');
    return posts;
  }

  insertPost(post, pdf: string){
    console.log('in Post method')
    this.postList.push({
      title: post.title,
      intro: post.intro,
      date: post.date,
      url: "https://firebasestorage.googleapis.com/v0/b/brentsite-ebcd7.appspot.com/o/uploads%2Fblogpost1.jpg?alt=media&token=736fcc7e-5514-472a-8a43-df7e19ed74d4",
      pdf: pdf
    })
  }

  insertPostImage(post, url:string, pdf: string){
    console.log('in Image Post method')
    console.log("Met url: " + url)
    this.postList.push({
      title: post.title,
      intro: post.intro,
      date: post.date,
      url: url,
      pdf: pdf
    })
  }
}
