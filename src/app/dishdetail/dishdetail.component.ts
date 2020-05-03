import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; //track location of page in browser
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  constructor(private dishService: DishService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.dishService.getDishIds()
      .subscribe(ids => this.dishIds = ids);
    this.route.params
      .pipe(switchMap(params => this.dishService.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(id: string) {
    const index = this.dishIds.indexOf(id);
    let len = this.dishIds.length;
    this.prev = this.dishIds[(len + index - 1) % len];
    this.next = this.dishIds[(len + index + 1) % len];
  }

  goBack(): void {
    this.location.back()
  }

}
