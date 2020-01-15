import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/actions/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  public onSignin(form: NgForm): void {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TrySignin({
      username: email,
      password,
    }));
  }

}
