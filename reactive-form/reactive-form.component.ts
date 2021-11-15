import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors, ValidatorFn, AbstractControl, Validator } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  state: string[];

  myForm!: FormGroup;
  done: string = "";

  constructor(private formBuilder: FormBuilder) {
    this.state = ['select state...', 'TG', 'AP', 'TN', 'KN'];
  }

  ngOnInit(): void {

    this.myForm = this.formBuilder.group(
      {
        'firstName': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
        'lastName': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
        'email': ['', Validators.compose([Validators.required, Validators.email])],
        'password': ['', Validators.compose([Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)])],
        'confirmPassword': ['', Validators.compose([Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)])],
        'dob': ['', Validators.compose([Validators.required])],
        'zip': ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{6}$')])],
        'address': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(60)])],
      },

      {
        validator: [MatchPassword, pastdate]
      }

    )
  }

  save() {
    this.done = "Template_Driven_Form"
    console.log(this.myForm);
    console.log(JSON.stringify(this.myForm.value));
  }
}

export function MatchPassword(control: AbstractControl): ValidationErrors | null {

  const password = control.get('password')
  const confirm = control.get("confirmPassword")

  return password && confirm && password.value != confirm.value ?
    {
      'misMatch': true
    } : null;

}

export function pastdate(control: AbstractControl): ValidationErrors | null {

  const past = control.get('dob')

  return past && new Date(past.value) > new Date() ?
    {
      'lesserDate': true
    } : null;
}