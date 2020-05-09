import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
  dish: Dish;
  promotion: Promotion;
  ceo: Leader;
  BaseURL: string;
  errorMessage: string;

  constructor(private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') BaseURL) {
      this.BaseURL = BaseURL;
  }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
        error => this.errorMessage = <any>error);
    this.promotionService.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion,
        error => this.errorMessage = <any>error);
    this.leaderService.getFeaturedLeader()
      .subscribe(leader => this.ceo = leader,
        error => this.errorMessage = <any>error);
  }

}
