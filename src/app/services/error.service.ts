import {Injectable, ErrorHandler} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {

  constructor() {
  }

  handleError(error: any): void {
    // HttpErrorResponse handled in a HttpInterceptor separately
    if (!(error instanceof HttpErrorResponse)) {
      /*
      * TODO: Decision to be made about what to do with the exception. One option is to implement a logging service to save all exceptions
      *  using a REST API
      */
      console.group('Global Error Handler');
      console.error(error);
      console.groupEnd();
    }
  }
}
