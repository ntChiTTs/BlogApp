import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { Blog } from '../blog';
import { User } from '../user';
import { BlogsService } from '../blogs.service';
import { UserAccountsService } from '../user-accounts.service';
import { AppSettings } from '../app-settings';

@Component({
  selector: 'app-my-fav-blogs',
  templateUrl: './my-fav-blogs.component.html',
  styleUrls: ['./my-fav-blogs.component.css']
})
export class MyFavBlogsComponent implements OnInit {

  myFavBlogs: Blog[];
  myFavBlogsLatestFirst: Blog[];
  myFavBlogsPopularFirst: Blog[];
  componentMessage: string;
  showMyFavBlogs: boolean;

  constructor(
    private userAccService: UserAccountsService,
    private blogsService: BlogsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.componentMessage = 'You need to sign in to view your favourite blogs.';
    this.myFavBlogs = [];
    this.myFavBlogsLatestFirst = [];
    this.myFavBlogsPopularFirst = [];
  }

  getCurrentUser(): User {
    return this.userAccService.getCurrentUser();
  }

  ngOnInit() {
    if(this.getCurrentUser() == undefined) {
      this.showMyFavBlogs = false;
      return;
    }

    this.showMyFavBlogs = true;
    this.myFavBlogs = [];
    this.myFavBlogsLatestFirst = [];
    this.myFavBlogsPopularFirst = [];
    
    // we can also get blogs by owner, that is to be tried later
    this.getCurrentUser().favouriteBlogs.forEach((blogId) => {
      this.blogsService.getBlogById(blogId)
      .subscribe((blog) => {
        this.myFavBlogs.push(blog);
        this.myFavBlogsLatestFirst.push(blog);
        this.myFavBlogsPopularFirst.push(blog);

        this.myFavBlogsLatestFirst.sort((blog1: Blog, blog2: Blog) => {
          return blog2.lastModified.valueOf() - blog1.lastModified.valueOf();
        });

        this.myFavBlogsPopularFirst.sort((blog1: Blog, blog2: Blog) => {
          return blog2.favouriteOf.length - blog1.favouriteOf.length;
        });
      });
    });
  }

}
