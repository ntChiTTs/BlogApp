import { User } from './user'; 

export class AppSettings {
  public static readonly BASE_URL: string = 'http://localhost:3000';
  public static readonly USER_URL: string = AppSettings.BASE_URL + '/users';
  public static readonly BLOG_URL: string = AppSettings.BASE_URL + '/blogs';
  public static readonly CATEGORY_URL: string = AppSettings.BASE_URL + '/categories';

  public static CURRENT_USER: User = undefined;
}
