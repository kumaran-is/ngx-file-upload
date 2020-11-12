import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RetryService } from './retry.service';
import { CoreConstants } from '@core/core.constants';
import { environment } from '@env/environment';
import { Observable, pipe } from 'rxjs';
import { retryWhen } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpAPIService {
  constructor(private http: HttpClient, private retryService: RetryService) {}

  public get(path: string, params?: any): Observable<any> {
    return this.http.get(
      this.createCompleteURLPath(path),
      this.generateQueryString(params)
    );
  }

  public getWithRetry(
    path: string,
    params?: any,
    isRetry?: boolean,
    isRetryType?: string
  ): Observable<any> {
    return this.http
      .get(this.createCompleteURLPath(path), this.generateQueryString(params))
      .pipe(this.applyRetry(isRetry, isRetryType));
  }

  public patch(path: string, body: any): Observable<any> {
    return this.http.patch(
      this.createCompleteURLPath(path),
      body,
      this.generateHeaders()
    );
  }

  public patchWithRetry(
    path: string,
    body: any,
    isRetry?: boolean,
    isRetryType?: string
  ): Observable<any> {
    return this.http
      .patch(this.createCompleteURLPath(path), body, this.generateHeaders())
      .pipe(this.applyRetry(isRetry, isRetryType));
  }

  public post(path: string, body: any): Observable<any> {
    return this.http.post(
      this.createCompleteURLPath(path),
      body,
      this.generateHeaders()
    );
  }

  public postWithRetry(
    path: string,
    body: any,
    isRetry?: boolean,
    isRetryType?: string
  ): Observable<any> {
    return this.http
      .post(this.createCompleteURLPath(path), body, this.generateHeaders())
      .pipe(this.applyRetry(isRetry, isRetryType));
  }

  public put(path: string, body: any): Observable<any> {
    return this.http.put(
      this.createCompleteURLPath(path),
      body,
      this.generateHeaders()
    );
  }

  public putWithRetry(
    path: string,
    body: any,
    isRetry?: boolean,
    isRetryType?: string
  ): Observable<any> {
    return this.http
      .put(this.createCompleteURLPath(path), body, this.generateHeaders())
      .pipe(this.applyRetry(isRetry, isRetryType));
  }

  public delete(path: string): Observable<any> {
    return this.http.delete(this.createCompleteURLPath(path));
  }

  public deleteWithRetry(
    path: string,
    isRetry?: boolean,
    isRetryType?: string
  ): Observable<any> {
    return this.http
      .delete(this.createCompleteURLPath(path))
      .pipe(this.applyRetry(isRetry, isRetryType));
  }

  private createCompleteURLPath(path: string): string {
    return `${environment.APIUrl}/${path}`;
  }

  private generateHeaders(): any {
    return {
      headers: new HttpHeaders(CoreConstants.HTTP_HEADERS)
    };
  }

  private generateQueryString(params?: any): any {
    let queryString;
    if (params) {
      queryString = {
        params: new HttpParams()
      };
      for (const param in params) {
        if (params.hasOwnProperty(param)) {
          queryString.params.set(param, params[param]);
        }
      }
    }
    return queryString;
  }

  private applyRetry(isRetry?: boolean, isRetryType?: string): any{
    const operators = [];
    if (isRetry) {
      if (isRetryType === 'increment') {
        operators.push(
          retryWhen(this.retryService.retryWithIncrementalDelay())
        );
      } else {
        operators.push(retryWhen(this.retryService.retryWithDelay()));
      }
    }
    return pipe.apply(this, operators);
  }
}
