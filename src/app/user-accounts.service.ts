import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { User } from './user';
import { AppSettings } from './app-settings';

const jsonHeader = {headers: new Headers({'Content-Type': 'application/json'})};

@Injectable()
export class UserAccountsService {
  
  constructor(private http: Http) { }

  trySignUp(username: string, password: string): Observable<boolean> {
    return this.getUsersByName(username)
      .map((res) => {
        // No user with this name was found; create new User
        if(res.length == 0) {
          let newUser: User = new User(username, password);
          this.postUser(newUser)
          .subscribe((res) => { this.setCurrentUser(this.getUserFromPojo(res)); });

          return true;
        }

        // A user with similar name already existed
        else return false;
      });
  }

  tryLogin(username: string, password: string): Observable<boolean> {
    return this.http.get(AppSettings.USER_URL + `/?username=${username}&password=${password}`)
    .map((res) => res.json())
    .map((res) => {
      // Auth failed
      if(res.length != 1) return false;

      // Auth succeeded
      else {
        this.setCurrentUser(this.getUserFromPojo(res[0]));
        return true;
      }
    });
  }

  tryLogOut(): boolean {
    AppSettings.CURRENT_USER = undefined;
    return AppSettings.CURRENT_USER == undefined;
  }

  // Gets currently logged in user (can be undefined)
  getCurrentUser(): User {
    return AppSettings.CURRENT_USER;
  }

  setCurrentUser(user: User) {
    AppSettings.CURRENT_USER = user;
  }

  getUserById(id: number): Observable<User> {
    return this.http.get(AppSettings.USER_URL + '/' + id)
    .map((res) => res.text() == '{}' ? undefined : this.getUserFromPojo(res.json()));
  }
  
  getUsersByName(name: string): Observable<User[]> {
    return this.http.get(AppSettings.USER_URL + '/?username=' + name)
    .map((res) => {
      let retVal: User[] = [];
      res.json().forEach((userpojo) => {
        retVal.push(this.getUserFromPojo(userpojo));
      });
      return retVal;
    });
  }

  private postUser(user: User): Observable<User> {
    return this.http.post(AppSettings.USER_URL, JSON.stringify(user), jsonHeader)
    .map((res) => this.getUserFromPojo(res.json()));
  }

  deleteUser(id: number): Observable<Response> {
    return this.http.delete(AppSettings.USER_URL + '/' + id);
  }

  patchUser(id: number, user: User): Observable<User> {
    return this.http.patch(AppSettings.USER_URL + '/' + id, JSON.stringify(user), jsonHeader)
    .map((res) => res.text() == '{}' ? undefined : this.getUserFromPojo(res.json()));
  }

  private getUserFromPojo(pojo: any): User {
    let retVal = pojo as User;
    retVal.password = undefined;
    return retVal;
  }
}
