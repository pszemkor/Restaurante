import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from "../services/dish.service";
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {
  dishes: Dish[];
  BaseURL: string;
  errorMessage: string;

  constructor(private dishService: DishService, @Inject('BaseURL') BaseURL) {
    this.BaseURL = BaseURL;
  }

  ngOnInit(): void {
    this.dishService.getDishes()
      .subscribe(dishesList => this.dishes = dishesList,
        errorMsg => this.errorMessage = <any>errorMsg);
  }

}
