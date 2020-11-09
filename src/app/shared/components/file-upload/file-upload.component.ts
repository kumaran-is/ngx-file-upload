import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
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
  public disabled = false;
  public imageSrc: string;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
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
  }


  private calcFilesize(bytes, roundTo = 2) {
    const fileSize = bytes / (CoreConstants.FILE_SIZE_UNIT * CoreConstants.FILE_SIZE_UNIT);
   // this.isFileSizeError = fileSize > this.maxFileSize ? true : false;

    return roundTo ? fileSize.toFixed(roundTo) : fileSize;
  }

}
