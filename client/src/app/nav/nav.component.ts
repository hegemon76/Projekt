import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  title = 'ToDo App'
  model: any={}
  currentUserUsername = '';

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('user'));
    this.currentUserUsername = user.username
  }

  login(){
    this.accountService.login(this.model).subscribe(response => {
      this.currentUserUsername = this.model.username;
    }, error => {
      console.log(error);
    });
  }

  logout(){
    this.currentUserUsername = '';
    this.accountService.logout();
  }

}
