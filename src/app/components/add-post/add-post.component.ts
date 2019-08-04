import { Component, OnInit } from '@angular/core';
import { NewsService } from "../../services/news.service";
import { UploadService } from 'src/app/services/upload.service';
import { Upload } from 'src/app/services/upload';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor(private newsService: NewsService, private uploadService:UploadService) { }
  submitted: boolean;
  submittedSucces: boolean;
  errorTitle: boolean;
  errorIntro: boolean;
  errorDate: boolean;
  formConrols = this.newsService.form.controls;
  selectedFiles: FileList;
  currentUpload: Upload;
  imageSelected: boolean;

  ngOnInit() {
    this.newsService.getPosts();
    this.submittedSucces = false;
    this.errorDate = false;
    this.errorIntro = false;
    this.errorTitle = false;
  }

  uploadFormData(newsService, uploadService){
    if(newsService.form.valid){
      if(newsService.form.get('$key').value == null){
        
        if(this.imageSelected){
          console.log("Met afbeelding")
          setTimeout(newsService.insertPostImage(newsService.form.value, uploadService.uploadUrl),3000)
          //newsService.insertPost(newsService.form.value);
        } else {
          console.log("Zonder afbeelding")
          newsService.insertPost(newsService.form.value);
        }
        this.submittedSucces = true;
        this.errorDate = false;
        this.errorIntro = false;
        this.errorTitle = false;
        newsService.form.reset();
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

  onSubmit(){
    this.submitted = true;
    
    new Promise((resolve, reject) => {
      this.uploadSingle();
      resolve()
    }).then(data => {
      this.uploadService.getUploaded().subscribe(value => {
        if(value){
          this.uploadFormData(this.newsService, this.uploadService)
          this.uploadService.setUploaded(false);
        }
      })
    })
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.imageSelected = true;
}

uploadSingle() {
  let file = this.selectedFiles.item(0)
  this.currentUpload = new Upload(file);
  this.uploadService.pushUpload(this.currentUpload)
}
}
