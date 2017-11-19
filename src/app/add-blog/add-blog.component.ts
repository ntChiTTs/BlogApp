import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { UserAccountsService } from '../user-accounts.service';
import { BlogsService } from '../blogs.service';
import { CategoriesService } from '../categories.service';
import { AppSettings } from '../app-settings';
import { User } from '../user';
import { Blog } from '../blog';
import { Category } from '../category';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  @Input('blog') blogToEdit?: Blog;
  title: string;
  content: string;
  componentMessage: string;
  showAddBlog: boolean;
  categories: Category[];
  categorySelected: boolean[];

  constructor(
    private userAccService: UserAccountsService,
    private blogsService: BlogsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.componentMessage = 'You need to sign in to post blogs.';
  }

  getCurrentUser(): User {
    return this.userAccService.getCurrentUser();
  }

  onSubmit() {
    let selectedCategories: number[] = [];
    for(let i = 0; i < this.categorySelected.length; i++) {
      if(!this.categorySelected[i]) continue;
      selectedCategories.push(this.categories[i].id);
    }

    let blog: Blog = new Blog(
                       this.title,
                       this.content,
                       this.getCurrentUser().id,
                       selectedCategories
                     );
    blog.lastModified = new Date();

    if(this.blogToEdit == undefined) {
      this.blogsService.postBlog(blog)
      .subscribe((blogRes) => {
        let blogsOwned = this.userAccService.getCurrentUser().blogsOwned;
        if(blogsOwned.indexOf(blogRes.id) == -1) {
          blogsOwned.push(blogRes.id);
          this.userAccService.patchUser(this.getCurrentUser().id, { blogsOwned: blogsOwned } as User)
          .subscribe((userRes) => userAccSettings.setCurrentUser(userRes));
        }
        
        selectedCategories.forEach((catId) => {
          this.categoriesService.getCategoryById(catId)
          .subscribe((catRes) => {
            let relatedBlogs: number[] = catRes.relatedBlogs;
            relatedBlogs.push(blogRes.id);
            this.categoriesService.patchCategory(catId, { relatedBlogs: relatedBlogs } as Category)
            .subscribe(() => {});
          });
        });

        this.router.navigate(['/myblogs']);
      });
    }
    else {
      this.blogsService.patchBlog(this.blogToEdit.id, blog)
      .subscribe((blogRes) => {
        selectedCategories.forEach((catId) => {
          this.categoriesService.getCategoryById(catId)
          .subscribe((catRes) => {
            let relatedBlogs: number[] = catRes.relatedBlogs;
            if(relatedBlogs.indexOf(blogRes.id) != -1) return;
            relatedBlogs.push(blogRes.id);
            this.categoriesService.patchCategory(catId, { relatedBlogs: relatedBlogs } as Category)
            .subscribe(() => {});
          });
        });

        this.router.navigate(['/myblogs']);
      });
    }
  }

  ngOnInit() {
    if(this.getCurrentUser() == undefined) {
      this.showAddBlog = false;
      return;
    }

    this.showAddBlog = true;
    this.blogToEdit = this.blogsService.blogToEdit;
    this.blogsService.blogToEdit = undefined;

    this.categoriesService.getAllCategories()
    .subscribe((res) => {
      this.categories = res;
      this.categorySelected = new Array<boolean>(res.length);
      for(let i = 0; i < this.categorySelected.length; i++) {
        this.categorySelected[i] = false;
        if(this.blogToEdit == undefined) continue;
        if(this.blogToEdit.categories.indexOf(this.categories[i].id) == -1) continue;
        this.categorySelected[i] = true;
      }
      for(let i = 0; i < this.categorySelected.length; i++) {
        console.log(this.categories[i].name + ' ' + this.categorySelected[i]);
      }
    });

    if(this.blogToEdit == undefined) return;
    if(this.blogToEdit.owner != this.getCurrentUser().id) {
      this.blogToEdit = undefined;
      return;
    }

    this.title = this.blogToEdit.title;
    this.content = this.blogToEdit.body;
  }

}
