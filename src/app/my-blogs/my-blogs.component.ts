import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { Blog } from '../blog';
import { User } from '../user';
import { BlogsService } from '../blogs.service';
import { UserAccountsService } from '../user-accounts.service';
import { AppSettings } from '../app-settings';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {

  myBlogs: Blog[];
  myBlogsLatestFirst: Blog[];
  myBlogsPopularFirst: Blog[];
  componentMessage: string;
  showMyBlogs: boolean;

  constructor(
    private userAccService: UserAccountsService,
    private blogsService: BlogsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.componentMessage = 'You need to sign in to view your blogs.';
    this.myBlogs = [];
    this.myBlogsLatestFirst = [];
    this.myBlogsPopularFirst = [];
  }

  getCurrentUser(): User {
    return this.userAccService.getCurrentUser();
  }

  addBlogClicked() {
    this.router.navigate(['/addblog']);
  }

  ngOnInit() {
    if(this.getCurrentUser() == undefined) {
      this.showMyBlogs = false;
      return;
    }

    this.showMyBlogs = true;
    this.myBlogs = [];
    this.myBlogsLatestFirst = [];
    this.myBlogsPopularFirst = [];
    
    // we can also get blogs by owner, that is to be tried later
    this.getCurrentUser().blogsOwned.forEach((blogId) => {
      this.blogsService.getBlogById(blogId)
      .subscribe((blog) => {
        this.myBlogs.push(blog);
        this.myBlogsLatestFirst.push(blog);
        this.myBlogsPopularFirst.push(blog);

        this.myBlogsLatestFirst.sort((blog1: Blog, blog2: Blog) => {
          return blog2.lastModified.valueOf() - blog1.lastModified.valueOf();
        });

        this.myBlogsPopularFirst.sort((blog1: Blog, blog2: Blog) => {
          return blog2.favouriteOf.length - blog1.favouriteOf.length;
        });
      });
    });
  }

}
