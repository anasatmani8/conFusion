import { FeedbackService } from './../services/feedback.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, Validators, FormBuilder }  from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, showForm, showSpinner, expand } from '../animations/app.animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand(),
      showForm(),
      showSpinner(),

    ]
})
export class ContactComponent implements OnInit {

  @ViewChild('fform')
  feedbackFormDirective!: { resetForm: () => void; };

  feedbackForm!: FormGroup ;
  feedback!: Feedback | null;
  isLoading:boolean=false;
  visibility = 'spinner';
  sub='spinner';
  feedbacksubmission! :Feedback;
  errMess!: string;
  contactType = ContactType;

  formErrors : { [char: string]: string } = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': '',
    'message': ''
  } as const;

  validationMessages : any = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
    'message': {
      'required':      'Feedback messafe is required',
      'minlength':     'Feedback message must be at least 5 charachters long',
      'maxlength':     'Feedback message cannot be more than 100 charachters long'
    }
  };

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService) {
    this.createForm();

   }

  ngOnInit(): void {

  }
  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message:['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)] ]
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



  onSubmit() {
    this.sub='hidden';
    this.isLoading=true;
    console.log(this.feedback);

    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();


    this.feedbackService.postFeedback(this.feedback)
      .subscribe(feedback => {
        setTimeout(()=>{
          this.isLoading=false;
          this.feedback = feedback;
          this.feedbacksubmission=feedback;
          this.visibility='hidden';
          this.sub='spinner';
        }, 5000)

      });

      console.log("ddddd")

      this.feedbackForm.reset({
        firstname: '',
        lastname: '',
        telnum: '',
        email: '',
        agree: false,
        contacttype: 'None',
        message: ''
      });
      this.feedbackFormDirective.resetForm();
      console.log(this.feedback,'apres post');


    }





}
