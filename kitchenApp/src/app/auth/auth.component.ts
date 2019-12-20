import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public isLoginMode    = true;
  public isLoading      = false;
  public error: string  = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm): void {
    if (!form.valid) { return; }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    const authObs: Observable<AuthResponseData> =  this.isLoginMode ?
      this.authService.login(email, password) :
      this.authService.signup(email, password);

    authObs.subscribe(
      (resData: AuthResponseData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage: any) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
