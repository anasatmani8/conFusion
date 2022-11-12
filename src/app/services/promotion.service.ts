import { Injectable } from '@angular/core';
import { Promotion } from '../shared/Promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  getPromotions(): Promotion[] {
    return PROMOTIONS;
  }

  getPromotion(id: string): Promotion {
    return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  }

  getFeaturedPromotion(): Promise<Promotion>{
    return  Promise.resolve( PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  }

  constructor() { }
}
