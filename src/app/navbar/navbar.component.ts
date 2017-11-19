import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { UserAccountsService } from '../user-accounts.service';
import { User } from '../user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  
  searchKeyword: string;

  constructor(
    private userAccService: UserAccountsService,
    private router: Router
  ) { }

  getCurrentUser(): User {
    return this.userAccService.getCurrentUser();
  }

  searchBtnClicked() {
    //console.log(this.searchKeyword);
    this.router.navigate(['/search'], { queryParams: { keyword: this.searchKeyword } });
  }

  ngOnInit() {
  }

}
