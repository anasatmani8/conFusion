
import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaders(): Leader[]{
    return LEADERS;
  }

  getLeader(id: String):Leader{
    return LEADERS.filter((leader)=>(leader.id == id))[0];
  }

  getLeaderDesignation(designation: String): Promise<Leader>{
    return Promise.resolve(LEADERS.filter((leader)=>(leader.designation == designation))[0]);
  }

  getCEO():Leader{
    return LEADERS.filter((leader)=>(leader.abbr == "CEO"))[0];
  }

  constructor() { }
}
