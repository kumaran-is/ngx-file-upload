import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { CoreConstants } from './../../../core/core.constants';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  public fileToUpload: File | null = null;
  public fileSize: string | number;
  public maxFileSize = 10;
  public imageSrc: string;
  @Output() public filePicked = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  public doFilePicked(event) {
    const reader = new FileReader();
    this.fileToUpload = event && event.item(0);
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };

    this.filePicked.emit({
      file:  this.fileToUpload
    });
  }


  private calcFilesize(bytes, roundTo = 2) {
    const fileSize = bytes / (CoreConstants.FILE_SIZE_UNIT * CoreConstants.FILE_SIZE_UNIT);
   // this.isFileSizeError = fileSize > this.maxFileSize ? true : false;

    return roundTo ? fileSize.toFixed(roundTo) : fileSize;
  }

}
