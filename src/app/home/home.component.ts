import { LeaderService } from './../services/leader.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/Promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/Leader';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {

  dish!: Dish;
  dishErrMess!:string;
  promotion!: Promotion;
  leader!: Leader;
  constructor(
    private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService,
    @Inject('baseURL') public baseURL: string
    ) { }

  ngOnInit() {
 
    this.dishservice.getFeaturedDish() 
    .subscribe(dish => this.dish = dish,
      errmess => this.dishErrMess = <any>errmess);

    this.promotionservice.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion,
      errmess => this.dishErrMess = <any>errmess);

    this.leaderService.getLeaderDesignation("Executive Chef").
    subscribe(leader => this.leader = leader,
      errmess => this.dishErrMess = <any>errmess);


}
} 
