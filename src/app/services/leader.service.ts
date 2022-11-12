
import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaders(): Promise < Leader[]>{
    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS), 2000);
      });
    }

  getLeader(id: String):Leader{
    return LEADERS.filter((leader)=>(leader.id == id))[0];
  }

  getLeaderDesignation(designation: String): Promise<Leader>{
    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS.filter((leader)=>(leader.designation == designation))[0]), 2000);
  });}

  getCEO():Leader{
    return LEADERS.filter((leader)=>(leader.abbr == "CEO"))[0];
  }

  constructor() { }
}
