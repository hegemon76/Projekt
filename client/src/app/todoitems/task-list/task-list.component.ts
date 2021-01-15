import { Component, OnInit } from '@angular/core';
import { ToDoItem } from 'src/app/_models/ToDoItem';
import { UserCategory } from 'src/app/_models/userCategory';
import { CategoriesService } from 'src/app/_services/categories.service';
import { TasksService } from 'src/app/_services/tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  todoitems: ToDoItem[];
  categories: UserCategory[];
  addItemMode = false;

  constructor(private taskService: TasksService, private categoryService: CategoriesService) { }

  ngOnInit() {
    this.loadToDoItems();
  }

  loadToDoItems(){
    this.taskService.getTasks().subscribe(items => {
      this.todoitems = items;
    });
  }

  loadCategories(){
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories
    })
  }

  addItemToggle(){
    this.addItemMode = !this.addItemMode;
    if(this.addItemMode == true){
      this.loadCategories;
    }
  }

}
