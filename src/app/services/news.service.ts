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

  insertPost(post){
    console.log('in Post method')
    this.postList.push({
      title: post.title,
      intro: post.intro,
      date: post.date
    })
  }
}
