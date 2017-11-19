import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { UserAccountsService } from '../user-accounts.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  
  signupConfirmationMessage: string;
  showSignUp: boolean = false;
  private username: string;
  private password: string;

  constructor(private userAccService: UserAccountsService) { }

  onSubmit() {
    this.userAccService.trySignUp(this.username, this.password)
    .subscribe((result) => {
      this.showSignUp = false;
      this.signupConfirmationMessage = result ?
                                       'Sign up Successful. You have been automatically signed in.'
                                     : 'Couldn\'t sign up. Please choose a different username.';
    });
  }

  getCurrentUser(): User {
    return this.userAccService.getCurrentUser();
  }

  ngOnInit() {
    this.showSignUp = this.getCurrentUser() == undefined;
    this.signupConfirmationMessage = this.getCurrentUser() ?
                                     'You\'re already signed in.'
                                   : '';
  }

}
