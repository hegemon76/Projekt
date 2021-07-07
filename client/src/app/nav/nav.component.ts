import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    public accountService: AccountService,
    private router: Router ) { }

  ngOnInit() {
    if(localStorage.length != 0){
      var user = JSON.parse(localStorage.getItem('user')).username;
      this.currentUserUsername = user;
    }
  }

  login(){
    this.accountService.login(this.model).subscribe(response => {
      this.currentUserUsername = this.model.username;
        window.location.reload();
    }, error => {
      console.log(error);
    });
  }

  logout(){
    this.currentUserUsername = '';
    this.accountService.logout();
    this.router.navigate(['']);
    window.location.reload();
  }


}
