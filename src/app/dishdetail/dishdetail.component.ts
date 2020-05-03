import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; //track location of page in browser
import { Dish } from "../shared/dish";
import {Comment} from "../shared/comment";
import { DishService } from "../services/dish.service";
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  comment: Comment;
  commentForm: FormGroup;
  @ViewChild('cform') commentFormDirective;

  constructor(private dishService: DishService, private route: ActivatedRoute,
     private location: Location, private formBuilder: FormBuilder) { 
       this.createForm();
     }

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

  createForm(): void{
    this.commentForm = this.formBuilder.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ['', [Validators.required]]
    })
  }

  onSubmit() : void{
    this.comment = this.commentForm.value;
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    })
    // this.commentFormDirective.resetForm();
  }

}
