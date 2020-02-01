import { Ingredient } from 'src/app/shared/models/ingredient.model';

export class Recipe {
  // tslint:disable-next-line: variable-name
  private _ingredients: Ingredient[] = null;

  constructor(
    public attr: { [key: string]: any }
  ) {}

  public get name(): string {
    return this.attr.name;
  }

  public get description(): string {
    return this.attr.desc;
  }

  public get imagePath(): string {
    return this.attr.imagePath;
  }

  public get ingredients(): Ingredient[] {
    if (!this._ingredients && this.attr.ingredients) {
      this._ingredients = this.attr.ingredients.map(ingredient => new Ingredient(ingredient));
    }
    return this._ingredients;
  }

  public set ingredients(ingredients: Ingredient[]) {
    this._ingredients = ingredients;
  }
}
