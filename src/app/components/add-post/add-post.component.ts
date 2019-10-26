import { Component, OnInit } from '@angular/core';
import { NewsService } from "../../services/news.service";
import { UploadService } from 'src/app/services/upload.service';
import { Upload } from 'src/app/services/upload';
import { range } from 'rxjs';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor(public newsService: NewsService, private uploadService:UploadService) { }
  submitted: boolean;
  submittedSucces: boolean;
  errorTitle: boolean;
  errorIntro: boolean;
  errorDate: boolean;
  errorPdf: boolean;
  formConrols = this.newsService.form.controls;
  selectedImage: FileList;
  selectedPdf: FileList;
  currentUpload: Upload;
  imageSelected: boolean;
  pdfSelected: boolean;

  ngOnInit() {
    this.newsService.getPosts();
    this.submittedSucces = false;
    this.errorDate = false;
    this.errorIntro = false;
    this.errorTitle = false;
    this.formConrols = this.newsService.form.controls;
  }

  uploadFormData(newsService, uploadService){
    console.log(newsService.form.value)
    if(newsService.form.valid){
      console.log("Valid")
      if(newsService.form.get('$key').value == null){
        
        if(this.pdfSelected){
          if(this.imageSelected){
            console.log("Met afbeelding")
            setTimeout(newsService.insertPostImage(newsService.form.value, uploadService.uploadUrl, uploadService.uploadPdf),3000)
            //newsService.insertPost(newsService.form.value);
          } else {
            console.log("Zonder afbeelding")
            newsService.insertPost(newsService.form.value, uploadService.uploadPdf);
          }
          this.pdfSelected = false;
          this.imageSelected = false;
        }
        this.submittedSucces = true;
        this.errorDate = false;
        this.errorIntro = false;
        this.errorTitle = false;
        newsService.form.reset();
        setTimeout(function(){ 
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
    
    if(this.pdfSelected){
      new Promise((resolve, reject) => {
        this.uploadMultiple();
        resolve()
      }).then(data => {
        console.log("after promise with value = " + this.uploadService.getUploaded())
        this.uploadService.getUploaded().subscribe(value => {
          if(value){
            this.uploadFormData(this.newsService, this.uploadService)
          }
        })
      }).then(data => {
        this.uploadService.setUploaded(false);
      })
    } else {
      this.errorPdf = true;
    }
  }

  detectFiles(event) {
    console.log("File Added")
    // this.selectedFiles = event.target.files;
    // console.log(this.selectedFiles.length)
}

detectImage(event){
  this.imageSelected = true;
  this.selectedImage = event.target.files;
}

detectPDF(event){
  this.pdfSelected = true;
  this.selectedPdf = event.target.files;
}

uploadSingle() {
  //let file = this.selectedFiles.item(0)
  // this.currentUpload = new Upload(file);
  // this.uploadService.pushUpload(this.currentUpload)
}

uploadMultiple(){  
  console.log("in uploadMultiple")
  let pdf = this.selectedPdf.item(0);
  
  if(this.imageSelected){
    new Promise((resolve, reject) => {
      let image = this.selectedImage.item(0);
      this.currentUpload = new Upload(image);
      this.uploadService.pushUpload(this.currentUpload)
      resolve();
    }).then(data => {
      this.currentUpload = new Upload(pdf);
      this.uploadService.pushUploadPdf(this.currentUpload)
    })
  } else {
    this.currentUpload = new Upload(pdf);
    this.uploadService.pushUploadPdf(this.currentUpload)
  }

  
}
}
