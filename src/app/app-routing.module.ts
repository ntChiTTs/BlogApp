import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { MyBlogsComponent } from './my-blogs/my-blogs.component';
import { MyFavBlogsComponent } from './my-fav-blogs/my-fav-blogs.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { CategoriesComponent } from './categories/categories.component';

// Our Array of Angular 2 Routes
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home', // Default Route
    pathMatch: 'full'
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'search',
    component: SearchResultsComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'myblogs',
    component: MyBlogsComponent
  },
  {
    path: 'myfavblogs',
    component: MyFavBlogsComponent
  },
  {
    path: 'addblog',
    component: AddBlogComponent
  },
  { path: '**',
  component: NotfoundComponent } // "Catch-All" Route
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
