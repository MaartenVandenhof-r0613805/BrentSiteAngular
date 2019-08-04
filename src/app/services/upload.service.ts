import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Upload } from './upload';
import * as firebase from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(/*private af: AngularFire,*/ private db: AngularFireDatabase) { 
    this.uploaded = new BehaviorSubject<boolean>(false);
   }

  private basePath:string = '/uploads';
  uploads: AngularFireList<Upload[]>;
  uploadUrl: string;
  uploaded: BehaviorSubject<boolean>;

  pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadUrl){
          console.log(downloadUrl);
          upload.url = downloadUrl;
        }).then(value => {
          this.uploadUrl = upload.url;
          this.setUploaded(true)
        })
        upload.name = upload.file.name
      }
    );
  }

  setUploaded(value: boolean): void{
    console.log("Value set to " + value)
    this.uploaded.next(value);
  }

  getUploaded(): Observable<boolean> {
    return this.uploaded.asObservable();
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }
}