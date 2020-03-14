import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  private SERVER_URL = 'http://localhost:3000';

  public first = '';
  public prev = '';
  public next = '';
  public last = '';

  constructor(private httpClient: HttpClient) {

  }

  parseLinkHeader(header) {
    if (header.length === 0) {
      return;
    }

    let parts = header.split(',');
    var links = {};
    parts.forEach(p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });

    this.first = links['first'];
    this.last = links['last'];
    this.prev = links['prev'];
    this.next = links['next'];
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
  // tslint:disable-next-line: max-line-length
  return this.httpClient.get(this.SERVER_URL, {  params: new HttpParams({fromString: "_page=1&_limit=20"}), observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));
    }));
  }

  public sendGetRequestToURL(url: string) {
    return this.httpClient.get(url, {observe: 'response'}).pipe(retry(3),
    catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));
    }));
  }

  public get() {
    return this.httpClient.get(this.SERVER_URL);
  }
}
