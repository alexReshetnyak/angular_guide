import { Ingredient } from 'src/app/shared/models/ingredient.model';

export class Recipe {
  public attr: any;

  constructor(attributes: any) {
    this.attr = attributes;
  }

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
    // TODO Add changes to ingredient model
    // TODO return attr.ingredients.map(i => new Ingredient(i))
    return this.attr.ingredients;
  }
}
