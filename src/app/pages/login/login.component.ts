import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loading: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor (private formBuilder: FormBuilder, private authService: AuthService) {

  }

  login() {
    console.log(this.loginForm.value);
    console.log(this.loginForm.value.email);
    console.log(this.loginForm.value.password);
    if (this.loginForm.value.email && this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then(cred => {
        console.log(cred);
      }).catch(error => {
        console.error(error);
      });
    }
  }
}
