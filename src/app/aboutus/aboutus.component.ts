import { LeaderService } from './../services/leader.service';
import { Leader } from './../shared/Leader';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  leaders!: Leader[];
  constructor(private leaderService: LeaderService) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
    .subscribe(leaders => this.leaders = leaders);
  }

}
