import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { Blog } from '../blog';
import { Category } from '../category';
import { BlogsService } from '../blogs.service';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  allCategories: Category[];
  categoryToShow: Category;
  catBlogs: Blog[];
  catBlogsLatestFirst: Blog[];
  catBlogsPopularFirst: Blog[];
  
  constructor(
    private blogsService: BlogsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.categoriesService.getAllCategories()
    .subscribe((res) => {
      this.allCategories = res;
    });

    this.categoryToShow = undefined;
    this.route.queryParams
    .subscribe((params) => {
      let catId: number = params['category'];
      if(catId == undefined) return;
      this.categoriesService.getCategoryById(catId)
      .subscribe((res) => {
        this.categoryToShow = res;
        this.catBlogs = [];
        this.catBlogsLatestFirst = [];
        this.catBlogsPopularFirst = [];
        this.categoryToShow.relatedBlogs.forEach((blogId) => {
          this.blogsService.getBlogById(blogId)
          .subscribe((res) => {
            this.catBlogs.push(res);
            this.catBlogsLatestFirst.push(res);
            this.catBlogsPopularFirst.push(res);

            this.catBlogsLatestFirst.sort((blog1: Blog, blog2: Blog) => {
              return blog2.lastModified.valueOf() - blog1.lastModified.valueOf();
            });
            this.catBlogsPopularFirst.sort((blog1: Blog, blog2: Blog) => {
              return blog2.favouriteOf.length - blog1.favouriteOf.length;
            });
          });
        });
      });
    });
  }

}
