
import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of, pipe } from 'rxjs';
import { delay } from 'rxjs/operators';// Simulate server latency with 2 second delay
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }


  getLeaders(): Observable < Leader[]>{
    return this.http.get<Leader[]>(baseURL+ "leadership")
    .pipe(catchError(this.processHTTPMsgService.handleError))

    }

  getLeader(id: String): Observable<Leader>{
    return of(LEADERS.filter((leader)=>(leader.id == id))[0]).pipe(delay(2000));
  }

  getLeaderDesignation(designation: String): Observable<Leader>{
    return this.http.get<Leader[]>(baseURL+ "leadership?featured=true").pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getCEO():Observable<Leader>{
    return of(LEADERS.filter((leader)=>(leader.abbr == "CEO"))[0]).pipe(delay(2000));
  }


}
