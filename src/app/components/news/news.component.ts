import { Component, OnInit } from '@angular/core';
import { post } from '../../models/post';
import { HttpClient } from "@angular/common/http";
import { NewsService } from "../../services/news.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent{


  constructor(private newsService:NewsService) { }
  postArray: post[];
  

  ngOnInit(){
    this.postArray = new Array();
    this.newsService.getPosts();
    this.newsService.getPosts().subscribe(items => {
      items.forEach(item => {
        this.postArray.push(item.payload.val())
      })
    })
    /*list => {
    this.postArray = list.map(item => {
      return {
        $key: item.key,
        ...item.payload.val()
      }
    })
    }*/

    
    //console.log('length = ' + this.postArray.length);
  }
}
