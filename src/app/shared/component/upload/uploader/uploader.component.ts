import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ngx-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit {
  @Output('linkFile')
  outPutFile: EventEmitter<string> = new EventEmitter<string>();
  @Input() type: string = '';
  @Input() width: string = null;
  @Input() height: string = null;
  @Input() hiddenImage: boolean = false;
  @Input() hiddenForm: boolean = true;
  enable: boolean = false;


  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }


  isHovering: boolean;

  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
      for (let i = 0; i < files.length; i++) {
        this.files.push(files.item(i));
    }
  }

  linkFile(file) {
    this.outPutFile.emit(file);
    if (this.hiddenForm === true) {
      this.enable = true;
    }
  }
}
