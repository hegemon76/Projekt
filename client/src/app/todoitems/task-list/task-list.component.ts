import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { createToDoItem } from 'src/app/_models/createToDoItem';
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
  createItem: any = {};
  addItemMode = false;
  selectedCategory: string;

  constructor(private taskService: TasksService, private categoryService: CategoriesService) { }

  ngOnInit() {
    this.loadToDoItems();
  }

  endJob(taskId:any){
    this.taskService.completeTask(taskId).subscribe(response => {
      if(response != null){
        console.log(response);
        this.ngOnInit();
      } 
    });
  }

  deleteTask(taskId: any){
    this.taskService.deleteTask(taskId).subscribe(response =>{
      this.ngOnInit();
    })
  }

  loadToDoItems(){
    this.taskService.getTasks().subscribe(items => {
      if(items){
        this.todoitems = items;
      }
    });
  }

  loadCategories(){
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  addItemToggle(){
    this.addItemMode = !this.addItemMode;
    if(this.addItemMode == true){
      this.loadCategories();
    }
  }

  addNewItem(){
    this.createItem.CategoryName = this.selectedCategory;
    this.taskService.addItem(this.createItem).subscribe(response =>{
      if(response){
        this.ngOnInit();
      }
    });
    
  }

  selectCategoryChange(event :any){
    this.selectedCategory = event.target.value;
  }

  

}
