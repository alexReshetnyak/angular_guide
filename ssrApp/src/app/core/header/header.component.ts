import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp       from '../../store/app.reducers';
import * as fromAuth      from '../../auth/store/reducers/auth.reducers';
import * as AuthActions   from '../../auth/store/actions/auth.actions';
import * as RecipeActions from '../../recipes/store/actions/recipe.actions';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public showMenu = false;
  public authState: Observable<fromAuth.State>;
  public error: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
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

}
