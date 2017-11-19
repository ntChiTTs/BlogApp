import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Category } from './category';
import { AppSettings } from './app-settings';

const jsonHeader = {headers: new Headers({'Content-Type': 'application/json'})};

@Injectable()
export class CategoriesService {

  constructor(private http: Http) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get(AppSettings.CATEGORY_URL)
    .map((res) => {
      let retVal: Category[] = [];
      res.json().forEach((catpojo) => {
        retVal.push(this.getCategoryFromPojo(catpojo));
      });
      return retVal;
    });
  }
  
  getCategoryById(id: number): Observable<Category> {
    return this.http.get(AppSettings.CATEGORY_URL + '/' + id)
    .map((res) => res.text() == '{}' ? undefined : this.getCategoryFromPojo(res.json()));
  }

  patchCategory(id: number, category: Category): Observable<Category> {
    return this.http.patch(AppSettings.CATEGORY_URL + '/' + id, JSON.stringify(category), jsonHeader)
    .map((res) => res.text() == '{}' ? undefined : this.getCategoryFromPojo(res.json()));
  }
  
  private getCategoryFromPojo(pojo: any): Category {
    let retVal = pojo as Category;
    return retVal;
  }
}
