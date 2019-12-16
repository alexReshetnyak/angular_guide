import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Post } from '../models/post.model';

const FIREBASE_URL = 'https://ng-kitchen-app.firebaseio.com';

@Injectable({ providedIn: 'root' })
export class PostsService {
  public error = new Subject<string>();

  constructor(private http: HttpClient) {}

  public createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ name: string }>(
        `${FIREBASE_URL}/posts.json`,
        postData,
        {
          observe: 'response' // * get full http response object with status, headers, type and body
        }
      )
      .subscribe(
        responseData => {
          console.log('Full response:', responseData);
        },
        error => {
          this.error.next(error.message);
        }
      );
  }

  public fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http
      .get<{ [key: string]: Post }>(
        `${FIREBASE_URL}/posts.json`,
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: searchParams,
          responseType: 'json'
        }
      )
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
          // Send to analytics server
          // * create new observable with error
          return throwError(errorRes);
        })
      );
  }

  public deletePosts() {
    return this.http
      .delete(
        `${FIREBASE_URL}/posts.json`,
        {
          observe: 'events',    // * observe http events
          responseType: 'text'  // * type of response text if you don't want that angular parse json
        }
      )
      .pipe(
        tap(event => {
          console.log(event);
          // * http hooks:
          // * HttpEventType.Response         -  The full response including the body was received.
          // * HttpEventType.Sent             -  The request was sent out over the wire.
          // * HttpEventType.ResponseHeader   -  The response status code and headers were received.
          // * HttpEventType.DownloadProgress -  A download progress event was received.
          // * HttpEventType.UploadProgress   -  An upload progress event was received.
          // * HttpEventType.User             -  A custom event from an interceptor or a backend.

          if (event.type === HttpEventType.Sent) {
            // ...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
