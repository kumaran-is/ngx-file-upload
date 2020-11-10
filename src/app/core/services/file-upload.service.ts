import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { Presigned } from './../interfaces/presigned';
import { HttpAPIService } from './http-api.service';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient, private apiService: HttpAPIService) { }

  public getPresignedS3URL(fileName: string): Observable<any> {
    /*return this.http
      .get<Presigned>(
        `https://h9ntmojkr4.execute-api.us-east-1.amazonaws.com/MyDeploymentStage/generateS3PresignedUrl?fileName=${fileName}`
      )*/
      return this.apiService.get(fileName)
      .pipe(
        tap((response: any) => {
          console.log(response);
        }),
        map(response => response),
        catchError(this.handleAndThrowRemoteError.bind(this)),
        finalize(() => {
          console.log('Clean up your resource here ');
        })
      );
  }

  public handleAndThrowRemoteError(
    error: HttpErrorResponse | any
  ): Observable<any> {
    return throwError(error);
  }
}
