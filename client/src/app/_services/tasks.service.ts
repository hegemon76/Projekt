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

  completeTask(taskId: any){
    var body: any ={};
    body.id = taskId;
    body.username = JSON.parse(localStorage.getItem('user')).username;
    return this.http.post(this.baseUrl + 'ToDoItems/' + body.username + '/' + taskId, body);
  }

  deleteTask(taskId: any){
    var body:any={};
    body.id = taskId;
    body.username = JSON.parse(localStorage.getItem('user')).username;
    return this.http.delete(this.baseUrl + 'ToDoItems/' + body.username + '/' + taskId, body);
  }

  getCompletedTasks(){
    var user = JSON.parse(localStorage.getItem('user')).username;
    return this.http.get<ToDoItem[]>(this.baseUrl + 'users/' + user + '/completed/items');
  }

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
