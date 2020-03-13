import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private SERVER_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {

  }

  handleError(error: HttpErrorResponse) {
    let errMsg = 'Error unknown!';
    if (error.error instanceof ErrorEvent) {
      errMsg = `Error: ${error.error.message}`;
    } else {
      errMsg = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errMsg);
    return throwError(errMsg);
  }

  public sendGetRequest() {
    return this.httpClient.get(this.SERVER_URL).pipe(catchError(this.handleError));
  }

  public get() {
    return this.httpClient.get(this.SERVER_URL);
  }
}
