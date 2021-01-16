import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserCategory } from '../_models/userCategory';
import { ToDoItem } from '../_models/ToDoItem';
import { AddCategory } from '../_models/AddCategory';

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

  addNewCategory(category: any){
    var user = JSON.parse(localStorage.getItem('user')).username;
    category.UserName = user;
    return this.http.post(this.baseUrl +'categories', category);
  }
}
