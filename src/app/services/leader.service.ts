
import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of, pipe } from 'rxjs';
import { delay } from 'rxjs/operators';// Simulate server latency with 2 second delay

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaders(): Observable < Leader[]>{
    return of(LEADERS).pipe(delay(2000));

    }

  getLeader(id: String): Observable<Leader>{
    return of(LEADERS.filter((leader)=>(leader.id == id))[0]).pipe(delay(2000));
  }

  getLeaderDesignation(designation: String): Observable<Leader>{
    return of(LEADERS.filter((leader)=>(leader.designation == designation))[0]).pipe(delay(2000));
  }

  getCEO():Observable<Leader>{
    return of(LEADERS.filter((leader)=>(leader.abbr == "CEO"))[0]).pipe(delay(2000));
  }

  constructor() { }
}
