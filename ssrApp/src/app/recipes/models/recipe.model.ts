import { Ingredient, StateIngredient } from 'src/app/shared/models/ingredient.model';

export class Recipe {
  // tslint:disable-next-line: variable-name
  private _ingredients: Ingredient[] = null;

  constructor(
    public attr: StateRecipe
  ) {
    const { ingredients = [] } = attr;
    this._ingredients = ingredients.map(ingredient => new Ingredient(ingredient));
  }

  public get name(): string {
    return this.attr.name;
  }

  public get description(): string {
    return this.attr.description;
  }

  public get imagePath(): string {
    return this.attr.imagePath;
  }

  public get ingredients(): Ingredient[] {
    return this._ingredients;
  }

  public set ingredients(ingredients: Ingredient[]) {
    this.attr.ingredients = ingredients.map(ingredient => ingredient.attr);
    this._ingredients = ingredients;
  }
}

export interface StateRecipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: StateIngredient[];
}
