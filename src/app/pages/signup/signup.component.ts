import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  
  signUpForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
    passwordRepeat: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
    name: new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    }),
  });

  constructor(private location: Location, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.signUpForm.valid) {
      console.log('valid form');
    } else {
      console.log('invalid form :(');
    }
  }

  goBack(){
    this.location.back();
  }
}
