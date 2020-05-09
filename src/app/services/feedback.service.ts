import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';
import { Feedback } from '../shared/feedback';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private errorProcessor: ProcessHTTPMsgService) { }



  submitFeedback(feedBack: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + "feedback", feedBack, httpOptions)
      .pipe(catchError(this.errorProcessor.handleError))
  }

}
