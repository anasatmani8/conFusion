import { LeaderService } from './../services/leader.service';
import { Leader } from './../shared/Leader';
import { Component, OnInit, Inject } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutusComponent implements OnInit {

  leaders!: Leader[];
  leadersErrMess!: string;
  constructor(private leaderService: LeaderService,
    @Inject('baseURL') public baseURL: string) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
    .subscribe(leaders => this.leaders = leaders,
      errmess => this.leadersErrMess = <any>errmess
      );
  }

}
