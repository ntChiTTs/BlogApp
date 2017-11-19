import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { User } from '../user';
import { UserAccountsService } from '../user-accounts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginConfirmationMessage: string;
  showLogIn: boolean = false;
  private username: string;
  private password: string;

  constructor(
    private userAccService: UserAccountsService,
    private router: Router
  ) { }

  onSubmit() {
    this.userAccService.tryLogin(this.username, this.password)
    .subscribe((result) => {
      this.showLogIn = false;
      this.loginConfirmationMessage = result ?
                                       'Log in successful.'
                                     : 'Couldn\'t log in. Invalid username or password.';
      if(result) this.router.navigate(['/myblogs']);
    });
  }

  getCurrentUser(): User {
    return this.userAccService.getCurrentUser();
  }

  ngOnInit() {
    this.showLogIn = this.getCurrentUser() == undefined;
    this.loginConfirmationMessage = this.getCurrentUser() ?
                                     'You\'re already signed in.'
                                   : '';
  }

}
