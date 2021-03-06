import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  isLoggedIn = false;

  constructor(accountService: AccountService) { }

  ngOnInit() {
    if(localStorage.length != 0)
    {
      var user = JSON.parse(localStorage.getItem('user')).username
      this.isLoggedIn = true;
    }
    
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegistrationMode(event: boolean) {
    this.registerMode = event;
  }

}
