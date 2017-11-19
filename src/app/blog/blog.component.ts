import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Blog } from '../blog';
import { User } from '../user';
import { Category } from '../category';

import { UserAccountsService } from '../user-accounts.service';
import { BlogsService } from '../blogs.service';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  @Input() blog: Blog;
  categories: Category[];
  blogHtmlBody: string;
  blogDeleted: boolean;
  blogMarkedAsFavourite: boolean;
  private blogOwner: User;
  
  constructor(
    private userAccService: UserAccountsService,
    private blogsService: BlogsService,
    private categoriesService: CategoriesService,
    private router: Router
    ) {
    this.blogOwner = User.dummyUser();
    this.categories = [];
    this.blogDeleted = false;
    this.blogMarkedAsFavourite = false;
  }

  editThisBlog() {
    if(this.userAccService.getCurrentUser() == undefined) return;
    if(this.userAccService.getCurrentUser().id != this.blogOwner.id) return;
    
    this.blogsService.blogToEdit = this.blog;
    this.router.navigate(['/addblog']);
  }

  deleteThisBlog() {
    if(this.userAccService.getCurrentUser() == undefined) return;
    if(this.userAccService.getCurrentUser().id != this.blogOwner.id) return;
    
    this.blogsService.deleteBlog(this.blog.id)
    .subscribe(() => this.blogDeleted = true);

    this.categories.forEach((category) => {
      let relatedBlogs: number[] = category.relatedBlogs;
      let idx: number = relatedBlogs.indexOf(this.blog.id);
      if(idx == -1) return;
      relatedBlogs.splice(idx, 1);
      this.categoriesService.patchCategory(category.id, { relatedBlogs: relatedBlogs } as Category)
      .subscribe((res) => { });
    });
    
    let blogsOwned: number[] = this.blogOwner.blogsOwned;
    let idx: number = blogsOwned.indexOf(this.blog.id);
    if(idx == -1) return;
    blogsOwned.splice(idx, 1);
    this.userAccService.patchUser(this.blogOwner.id, { blogsOwned: blogsOwned } as User)
    .subscribe((res) => this.userAccService.setCurrentUser(res));
  }

  favouriteThisBlog(fav: boolean) {
    if(this.userAccService.getCurrentUser() == undefined) return;
    let userId: number = this.userAccService.getCurrentUser().id;
    let blogId: number = this.blog.id;

    if(fav) {
      let favouriteOf: number[] = this.blog.favouriteOf;
      favouriteOf.push(userId);
      this.blogsService.patchBlog(blogId, { favouriteOf: favouriteOf } as Blog)
      .subscribe((res) => this.blog = res);

      let favouriteBlogs: number[] = this.userAccService.getCurrentUser().favouriteBlogs;
      favouriteBlogs.push(blogId);
      this.userAccService.patchUser(userId, { favouriteBlogs: favouriteBlogs } as User)
      .subscribe((res) => this.userAccService.setCurrentUser(res));

      this.blogMarkedAsFavourite = true;
    }
    
    else {
      let favouriteOf: number[] = this.blog.favouriteOf;
      favouriteOf.splice(favouriteOf.indexOf(userId), 1);
      this.blogsService.patchBlog(blogId, { favouriteOf: favouriteOf } as Blog)
      .subscribe((res) => this.blog = res);

      let favouriteBlogs: number[] = this.userAccService.getCurrentUser().favouriteBlogs;
      favouriteBlogs.splice(favouriteBlogs.indexOf(blogId), 1);
      this.userAccService.patchUser(userId, { favouriteBlogs: favouriteBlogs } as User)
      .subscribe((res) => this.userAccService.setCurrentUser(res));
      
      this.blogMarkedAsFavourite = false;
    }
    
  }

  ngOnInit() {
    this.categories = [];
    
    this.blog.categories.forEach((categoryId) => {
      this.categoriesService.getCategoryById(categoryId)
      .subscribe((res) => this.categories.push(res));
    });

    this.userAccService.getUserById(this.blog.owner)
    .subscribe((res) => { this.blogOwner = res; });
    
    this.blogDeleted = false;
    this.blogMarkedAsFavourite = this.userAccService.getCurrentUser() == undefined ?
                                 false
                               : this.blog.favouriteOf.indexOf(this.userAccService.getCurrentUser().id) == -1 ?
                                 false
                               : true;
    this.blogHtmlBody = this.blog.body.replace(/\n/g, '<br>');
  }

}
