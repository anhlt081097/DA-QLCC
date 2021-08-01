import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage/';
import {finalize, tap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'ngx-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() hiddenImage = false;
  @Input() file: File;
  @Output('linkFile') linkFile: EventEmitter<string> = new EventEmitter<string>();
  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) {
  }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {
    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.db.collection('files').add({downloadURL: this.downloadURL, path});
        this.linkFile.emit(this.downloadURL);
      }),
    );
  }


  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
