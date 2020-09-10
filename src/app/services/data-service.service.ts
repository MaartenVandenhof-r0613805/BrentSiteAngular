import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/Article';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  apiURL = "https://admin.brentusewils.be/wp-json/wp/v2/articles";

  constructor(private http:HttpClient) { }

  getArticles() {
    return this.http.get<Article[]>(this.apiURL);
  }
}
