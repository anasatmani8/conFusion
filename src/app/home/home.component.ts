import { LeaderService } from './../services/leader.service';
import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/Promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/Leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish!: Dish;
  promotion!: Promotion;
  leader!: Leader;
  constructor(
    private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService
    ) { }

  ngOnInit() {
    this.dish = this.dishservice.getFeaturedDish();
    this.promotion = this.promotionservice.getFeaturedPromotion();
    this.leader = this.leaderService.getLeaderDesignation("Executive Chef");

}
}
