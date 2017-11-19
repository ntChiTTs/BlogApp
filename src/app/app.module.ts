import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { BlogComponent } from './blog/blog.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { MyBlogsComponent } from './my-blogs/my-blogs.component';
import { MyFavBlogsComponent } from './my-fav-blogs/my-fav-blogs.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { CategoriesComponent } from './categories/categories.component';

import { UserAccountsService } from './user-accounts.service';
import { BlogsService } from './blogs.service';
import { CategoriesService } from './categories.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotfoundComponent,
    SignUpComponent,
    LogoutComponent,
    LoginComponent,
    BlogComponent,
    AddBlogComponent,
    MyBlogsComponent,
    MyFavBlogsComponent,
    SearchResultsComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    UserAccountsService,
    BlogsService,
    CategoriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
