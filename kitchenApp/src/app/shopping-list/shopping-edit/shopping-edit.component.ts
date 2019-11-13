import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';

import { Ingredient } from '../../shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) private nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) private amountInputRef: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  public onAddItem() {
    const ingName       = this.nameInputRef.nativeElement.value;
    const ingAmount     = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);

    this.ingredientAdded.emit(newIngredient);
  }

}
