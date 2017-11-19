import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { Blog } from '../blog';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  foundBlogs: Blog[];
  foundBlogsLatestFirst: Blog[];

  constructor(
    private blogsService: BlogsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.foundBlogs = [];
    this.foundBlogsLatestFirst = [];
    let keyword: string;
    this.route.queryParams
    .subscribe((params) => {
      keyword = params['keyword'];
      this.blogsService.searchBlogsByKeyword(keyword)
      .subscribe((res) => {
        this.foundBlogs = res;
        this.foundBlogsLatestFirst = this.foundBlogs.slice().sort((blog1: Blog, blog2: Blog) => {
                                       return blog2.lastModified.valueOf() - blog1.lastModified.valueOf();
                                     });
      });
    });

  }

}
