import { Comment } from './../shared/Comment';
import { Dish } from './../shared/Dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup,FormControl, Validators, FormBuilder }  from '@angular/forms';
import { Component, OnInit,Inject, ViewChild, ViewChildren } from '@angular/core';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {


  ctrl = new FormControl<number | null>(null, Validators.required);


	toggle() {
		if (this.ctrl.disabled) {
			this.ctrl.enable() ;
		} else {
			this.ctrl.disable();
		}
	}


  @ViewChild('fform')
  feedbackFormDirective!: { resetForm: () => void; };


  feedbackForm!: FormGroup ;
  feedback!: Comment;



  formErrors : { [char: string]: string } = {
    'author': '',
    'comment': '',

  } as const;



  validationMessages : any = {
    'author': {
      'required':      ' Name is required.',
      'minlength':     ' Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 4 characters long.',
      'maxlength':     'Comment cannot be more than 25 characters long.'
    }
  };

  dish!: Dish | null;;
  errMess!:string;
  dishcopy!: Dish | null;
  dishIds!: string[];
  prev!: string;
  next!: string;


  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('baseURL') public baseURL: string) {
      this.createForm();
     }

    ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params
      .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
        errmess => this.errMess = <any>errmess );
    }

    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];

      console.log(index, ":index");
      console.log(this.prev, ":prev");
      console.log(this.next, ":next");
    }

  goBack(): void {
    this.location.back();

  }

  createForm() {
    this.feedbackForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      comment: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)] ],
      rating: ['', [Validators.required]]
    });
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now

  }
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)

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

  onSubmit(){

    this.feedback = this.feedbackForm.value;
    this.feedback.date= new Date().toString();
    console.log(this.feedback);

    this.dishcopy?.comments.push(this.feedback);
    this.dishservice?.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null ; this.dishcopy = null; this.errMess = <any>errmess; });


  }

}
