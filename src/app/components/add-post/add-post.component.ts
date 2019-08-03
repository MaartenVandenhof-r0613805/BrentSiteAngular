import { Component, OnInit } from '@angular/core';
import { NewsService } from "../../services/news.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor(private newsService: NewsService) { }
  submitted: boolean;
  submittedSucces: boolean;
  errorTitle: boolean;
  errorIntro: boolean;
  errorDate: boolean;
  formConrols = this.newsService.form.controls;

  ngOnInit() {
    this.newsService.getPosts();
    this.submittedSucces = false;
    this.errorDate = false;
    this.errorIntro = false;
    this.errorTitle = false;
  }

  onSubmit(){
    this.submitted = true;
    if(this.newsService.form.valid){
      if(this.newsService.form.get('$key').value == null){
        this.newsService.insertPost(this.newsService.form.value);
        this.submittedSucces = true;
        this.errorDate = false;
        this.errorIntro = false;
        this.errorTitle = false;
        this.newsService.form.reset();
        setTimeout(function(){ 
          console.log("Done")
          this.submittedSucces = false; 
        }, 3000);
      } else {
        
      }
      this.submitted = false;
    } else {
      this.errorDate = true;
        this.errorIntro = true;
        this.errorTitle = true;
    }
  }
}
