import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from './../core/services/file-upload.service';
import { Presigned } from './../core/interfaces/presigned';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public presigned$: Observable<Presigned>;

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  public onUpload(fileName: string){
    console.log('upload file>>>', fileName);
    this.presigned$ = this.fileUploadService.getPresignedS3URL(fileName);
  }

}
