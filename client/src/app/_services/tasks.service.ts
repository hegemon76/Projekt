import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToDoItem } from '../_models/ToDoItem';
import { createToDoItem } from '../_models/createToDoItem';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTasks(){
    var user = JSON.parse(localStorage.getItem('user')).username;
    return this.http.get<ToDoItem[]>(this.baseUrl +'users/' +user +'/items');
  }

  addItem(item: any){
    var user = JSON.parse(localStorage.getItem('user')).username;
    item.UserName= user;
    return this.http.post(this.baseUrl + 'todoitems', item);
  }
}
