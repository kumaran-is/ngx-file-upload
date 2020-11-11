import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConstants } from '@core/core.constants';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { HttpAPIService } from './http-api.service';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient, private apiService: HttpAPIService) { }

  public getPresignedS3URL(fileName: string): Observable<any> {

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

  public uploadFile(url: string, file: File, contentType: string): Observable<any> {
    console.log('upload file service>>>', file);
    console.log('url >>>', url);
    console.log('contentType >>>', contentType);
    return this.http.put(
      url,
      file,
      this.generateHeaders(contentType)
    );
  }


  private generateHeaders(contentType: string): any {
    return {
      headers: new HttpHeaders({'Content-Type': contentType})
    };
  }

  private handleAndThrowRemoteError(
    error: HttpErrorResponse | any
  ): Observable<any> {
    return throwError(error);
  }
}
