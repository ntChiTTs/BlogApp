import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserAccountsService } from '../user-accounts.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private userAccService: UserAccountsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userAccService.tryLogOut();
    this.router.navigate(['/home']);
  }

}
