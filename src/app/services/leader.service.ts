import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private errorProcessor: ProcessHTTPMsgService) { }


  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + "leadership")
      .pipe(catchError(this.errorProcessor.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL + "leadership/" + id)
      .pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.errorProcessor.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + "leadership?featured=true")
      .pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.errorProcessor.handleError));
  }
}
