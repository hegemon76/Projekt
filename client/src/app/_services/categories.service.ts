import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserCategory } from '../_models/userCategory';
import { ToDoItem } from '../_models/ToDoItem';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCategories() {
    var user = JSON.parse(localStorage.getItem('user')).username;
    return this.http.get<UserCategory[]>(this.baseUrl +'users/' + user +'/categories')
  }

  getToDoItems(categoryName){
    //var toDoItem = JSON.parse(localStorage.getItem('user')).username;
    return this.http.get<ToDoItem[]>(this.baseUrl + 'users/user/' + categoryName);
  }
}
