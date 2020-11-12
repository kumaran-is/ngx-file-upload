import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { delay, delayWhen, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RetryService {
  // Retry 3 times with delay of 1/2 second between each retry
  public retryWithDelay({
    maxRetries = 3,
    retryDelayMilliSeconds = 500
  }: { [key: string]: number } = {}): any {
    return (errors: any) => {
      return errors.pipe(
        scan((errorCount: number, error: any) => {
          if (errorCount >= maxRetries) {
            throw new Error(error);
          } else {
            return errorCount + 1;
          }
        }, 0),
        delay(retryDelayMilliSeconds)
      );
    };
  }

  // Retry 3 times with increment delay of 1/2 second, 1 second and 1 1/2 seconds
  // tslint:disable-next-line:typedef
  public retryWithIncrementalDelay({
    maxRetries = 3,
    retryDelayMilliSeconds = 500
  }: { [key: string]: number } = {}) {
    return (errors: any) => {
      return errors.pipe(
        scan((errorCount: number, error: any) => {
          if (errorCount >= maxRetries) {
            throw error;
          } else {
            return errorCount + 1;
          }
        }, 0),
        delayWhen((errorCount: any) => {
          return timer(errorCount * retryDelayMilliSeconds);
        })
      );
    };
  }
}
