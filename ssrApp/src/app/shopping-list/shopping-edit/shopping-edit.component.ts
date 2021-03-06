
import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { StateIngredient } from '../../shared/models/ingredient.model';

import * as ShoppingListActions from '../store/actions/shopping-list.actions';
import * as ShoppingListReducers from '../store/reducers/shopping-list.reducers';
import * as fromApp from '../../store/app.reducers';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  public editMode = false;

  @ViewChild('f', { static: false }) private shoppingListForm: NgForm;
  private subscription: Subscription;
  private editedItem: StateIngredient;

  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe((stateData: ShoppingListReducers.State) => {
        // tslint:disable-next-line: no-bitwise
        if (~stateData.editedIngredientIndex) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          console.log('Edited Item name', this.editedItem);

          this.shoppingListForm.setValue({
            name:   this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  public onSubmit(form: NgForm): void {
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(form.value));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(form.value));
    }

    this.clearForm();
  }

  public clearForm(): void {
    this.shoppingListForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  public onDelete(): void {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.clearForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
