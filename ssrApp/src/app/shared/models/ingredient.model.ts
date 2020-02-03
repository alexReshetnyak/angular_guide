
export class Ingredient {
  constructor(
    public attr: StateIngredient,
  ) {}

  public get name(): string {
    return this.attr.name;
  }

  public set name(newName: string) {
    this.attr.name = newName;
  }

  public get amount(): number {
    return this.attr.amount;
  }

  public set amount(newAmount: number) {
    this.attr.amount = newAmount;
  }
}

export interface StateIngredient {
  name: string;
  amount: number;
}
