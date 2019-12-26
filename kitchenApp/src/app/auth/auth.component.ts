import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService, AuthResponseData } from './services/auth.service';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { PlaceholderDirective } from '../shared/directives/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy {
  public isLoginMode    = true;
  public isLoading      = false;
  public error: string  = null;

  @ViewChild(PlaceholderDirective, { static: false })
  private alertHost: PlaceholderDirective; // * helper directive for dynamic components
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
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
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  public onHandleError(): void {
    this.error = null;
  }

  private showErrorAlert(message: string): void {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    this.closeSub && this.closeSub.unsubscribe();
  }
}
