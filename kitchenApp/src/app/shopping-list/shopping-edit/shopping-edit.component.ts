
import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

import * as ShoppingListActions from '../store/actions/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  public editMode = false;

  @ViewChild('f', { static: false }) private shoppingListForm: NgForm;
  private subscription: Subscription;
  private editedItemIndex: number;
  private editedItem: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>,
  ) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.shoppingListForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  public onSubmit(form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({
        index: this.editedItemIndex,
        ingredient: newIngredient,
      }));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }

    this.clearForm();
  }

  public clearForm(): void {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  public onDelete(): void {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient({ index: this.editedItemIndex }));
    this.clearForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
