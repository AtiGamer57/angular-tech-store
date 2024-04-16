import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../common/services/user.service';
import { Cart } from '../../models/cart';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../common/services/cart.service';

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

  constructor(private location: Location, private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private userService: UserService, private cartService: CartService) {}

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.signUpForm.valid) {
      if (this.signUpForm.value.email && this.signUpForm.value.password){
        this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.password).then(cred => {
          this.authService.setCurrentUser();
          const user: User = {
            id: cred.user?.uid as string,
            email: this.signUpForm.value.email as string,
            username: this.signUpForm.value.username as string,
            name: {
              firstName: this.signUpForm.value.name?.firstName as string,
              lastName: this.signUpForm.value.name?.lastName as string,
            }
          };
          this.userService.createUser(user).then(_ => {
          }).catch(error => {
            console.log(error); 
          });

          const cart: Cart = {
            uid: cred.user?.uid as string,
            items: []
          }
          this.cartService.createCart(cart).then(_ => {
            this.router.navigateByUrl('/home');
          }).catch(error => {
            console.log(error); 
          });
        }).catch(error => {
          console.error(error);
        });
      }
    } else {
      console.log('invalid form :(');
    }
  }

  goBack(){
    this.location.back();
  }
}
