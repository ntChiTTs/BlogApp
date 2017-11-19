export class Blog {
  public readonly id: number;
  public title: string;
  public body: string;
  public lastModified: Date;
  public owner: number;
  public favouriteOf : number[];
  public categories: number[];

  constructor(
    title: string,
    body: string,
    owner: number,
    categories: number[]
  ) {
    this.title = title;
    this.body = body;
    this.owner = owner;
    this.favouriteOf = [];
    this.lastModified = new Date();
    this.categories = categories;
  }
}
