import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { Blog } from '../blog';
import { Category } from '../category';
import { BlogsService } from '../blogs.service';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  allBlogs: Blog[];
  allBlogsLatestFirst: Blog[];
  allBlogsPopularFirst: Blog[];

  constructor(
    private blogsService: BlogsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.blogsService.getAllBlogs()
    .subscribe((res) => {
      this.allBlogs = res;
      this.allBlogsLatestFirst = this.allBlogs.slice().sort((blog1: Blog, blog2: Blog) => {
                                   return blog2.lastModified.valueOf() - blog1.lastModified.valueOf();
                                 });

      this.allBlogsPopularFirst = this.allBlogs.slice().sort((blog1: Blog, blog2: Blog) => {
                                    return blog2.favouriteOf.length - blog1.favouriteOf.length;
                                  });
    });
  }

}
