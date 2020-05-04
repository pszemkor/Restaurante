import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; //track location of page in browser
import { Dish } from "../shared/dish";
import { Comment } from "../shared/comment";
import { DishService } from "../services/dish.service";
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'protractor';

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
  BaseURL: string;
  errorMessage: string;
  dishcopy: Dish;


  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Your name is required.',
      'minlength': 'Your name must be at least 2 characters long.'
    },
    'comment': {
      'required': 'Comment is required.'
    }
  };

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    @Inject('BaseURL') BaseURL) {
    this.BaseURL = BaseURL;
    this.createForm();
  }

  ngOnInit(): void {
    this.dishService.getDishIds()
      .subscribe(ids => this.dishIds = ids);
    this.route.params
      .pipe(switchMap(params => this.dishService.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
        error => this.errorMessage = <any>error);
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

  createForm(): void {
    this.commentForm = this.formBuilder.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ['', [Validators.required]]
    })

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //(re)set form validation messages
  }

  onSubmit(): void {
    this.comment = this.commentForm.value;
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    })
    this.comment.date = Date.now().toString();
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish },
        error => {this.errorMessage = <any>error; this.dish = this.dishcopy = null});
    this.commentFormDirective.resetForm();
  }
  onValueChanged(data?: any) {
    if (!this.commentForm) return;

    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


}
