import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from "../services/dish.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
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
        errorMsg => this.errorMessage = <any>errorMsg );
  }

}
