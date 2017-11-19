import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Blog } from './blog';
import { AppSettings } from './app-settings';

const jsonHeader = {headers: new Headers({'Content-Type': 'application/json'})};

@Injectable()
export class BlogsService {
  
  public blogToEdit: Blog;

  constructor(private http: Http) { }

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get(AppSettings.BLOG_URL)
    .map((res) => {
      let retVal: Blog[] = [];
      res.json().forEach((blogpojo) => {
        retVal.push(this.getBlogFromPojo(blogpojo));
      });
      return retVal;
    });
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get(AppSettings.BLOG_URL + '/' + id)
    .map((res) => res.text() == '{}' ? undefined : this.getBlogFromPojo(res.json()));
  }

  // getBlogsMatchingTitle(titleRegex: string): Observable<Blog[]> { }
  // getBlogsMatchingBody(bodyRegex: string): Observable<Blog[]> { }

  postBlog(blog: Blog): Observable<Blog> {
    return this.http.post(AppSettings.BLOG_URL, JSON.stringify(blog), jsonHeader)
    .map((res) => this.getBlogFromPojo(res.json()));
  }

  patchBlog(id: number, blog: Blog): Observable<Blog> {
    return this.http.patch(AppSettings.BLOG_URL + '/' + id, JSON.stringify(blog), jsonHeader)
    .map((res) => res.text() == '{}' ? undefined : this.getBlogFromPojo(res.json()));
  }
  
  deleteBlog(id: number): Observable<Response> {
    return this.http.delete(AppSettings.BLOG_URL + '/' + id);
  }

  searchBlogsByKeyword(keyword: string): Observable<Blog[]> {
    return this.http.get(AppSettings.BLOG_URL + '/?body_like=' + keyword)
    .map((res) => {
      let retVal: Blog[] = [];
      res.json().forEach((blogpojo) => {
        retVal.push(this.getBlogFromPojo(blogpojo));
      });
      return retVal;
    });
  }


  private getBlogFromPojo(pojo: any): Blog {
    let retVal = pojo as Blog;
    retVal.lastModified = new Date(retVal.lastModified);
    return retVal;
  }

}
