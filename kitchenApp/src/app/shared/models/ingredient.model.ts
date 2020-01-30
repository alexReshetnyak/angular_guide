
export class Ingredient {
  constructor(
    public attr: { [key: string]: any }
  ) {}

  public get name(): string {
    return this.attr.name;
  }

  public get amount(): number {
    return this.attr.amount;
  }
}
