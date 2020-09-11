import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Article } from 'src/app/models/Article';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit{


  constructor(private dataService: DataServiceService) { }
  articles: Article[];
  rootURL = "";
  

  ngOnInit(){
    this.dataService.getArticles().subscribe(data => {
      this.articles = data;

      //Sort on date
      this.articles = this.articles.sort((a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    });
  }
}
