import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { PlaceholderDirective } from 'src/app/shared/directives/placeholder/placeholder.directive';
import { AlertComponent }       from 'src/app/shared/components/alert/alert.component';

import * as fromApp       from '../../store/app.reducers';
import * as fromAuth      from '../../auth/store/reducers/auth.reducers';
import * as AuthActions   from '../../auth/store/actions/auth.actions';
import * as RecipeActions from '../../recipes/store/actions/recipe.actions';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  public showMenu = false;
  public authState: Observable<fromAuth.State>;


  public error: string = null;

  private closeSub: Subscription;
  @ViewChild(PlaceholderDirective, { static: false }) private alertHost: PlaceholderDirective;

  constructor(
    private store: Store<fromApp.AppState>,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }

  public toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  public onSaveData(): void {
    this.store.dispatch(new RecipeActions.StoreRecipes());
    this.showMenu = false;
  }

  public onFetchData(): void {
    this.store.dispatch(new RecipeActions.FetchRecipes());
    this.showMenu = false;
  }

  public onLogout(): void {
    this.store.dispatch(new AuthActions.TryLogout());
    this.showMenu = false;
  }

  // TODO Move this logic to home component
  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  // TODO Move this logic to home component
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
}
