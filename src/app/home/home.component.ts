import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { FileUploadService } from './../core/services/file-upload.service';
import { Presigned } from './../core/interfaces/presigned';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // public presigned$: Observable<Presigned>;
  public response$: Observable<any>;
  private fileName: string;
  private fileToUpload: File | null = null;

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  public onUpload(): void{

    this.fileUploadService.getPresignedS3URL(this.fileName).pipe(
      mergeMap((presignedResponse: Presigned) => {
        return this.fileUploadService.uploadFile(
          presignedResponse.presignedUrl,
          this.fileToUpload,
          presignedResponse.contentType
        );
      }),
      catchError(this.handleError.bind(this))
    ).subscribe(
      response => this.onNext(response),
      error => this.onError(error),
      () => this.onComplete()
    );
  }

  public onFilePicked(event: any): void {
    this.fileName = event.file.name;
    this.fileToUpload = event.file;
  }

  private handleError(error: HttpErrorResponse | any): Observable<any> {
    console.error('Error while making file upload sequential call', error);
    return EMPTY;
  }

  private onNext(response): void {
    console.log('response ', response);
  }

  private onError(error): void {
    console.error(error);
  }

  private onComplete(): void {
    console.log('Processing is Complete');
  }

}
