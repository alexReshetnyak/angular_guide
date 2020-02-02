import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { StateIngredient } from '../shared/models/ingredient.model';
import { Observable } from 'rxjs';

import * as fromApp from '../store/app.reducers';
import * as ShoppingListActions from './store/actions/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Observable<{ ingredients: StateIngredient[]}>;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  public onEditItem(index: number): void {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
