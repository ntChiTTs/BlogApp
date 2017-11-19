export class User {

  public readonly id: number;
  public username: string;
  public password: string;
  public blogsOwned: number[];
  public favouriteBlogs: number[];
  
  constructor(
    username: string,
    password: string,
  ) {
    this.username = username;
    this.password = password;
    this.blogsOwned = [];
    this.favouriteBlogs = [];
  }

  static dummyUser(): User {
    return new User('', '');
  }
}
