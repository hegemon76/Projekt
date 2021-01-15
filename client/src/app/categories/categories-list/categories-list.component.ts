import { Component, Input, OnInit } from '@angular/core';
import { AddCategory } from 'src/app/_models/AddCategory';
import { ToDoItem } from 'src/app/_models/ToDoItem';
import { UserCategory } from 'src/app/_models/userCategory';
import { CategoriesService } from 'src/app/_services/categories.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories: UserCategory[];
  categoryItems: ToDoItem[];
  isCategoryDisplayed = false;
  isCategoriesLoaded = false;
  addCategoryToggle = false;
  newCategory: any ={};

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.loadCategories();
    if(this.categories == null) this.isCategoriesLoaded = !this.isCategoriesLoaded;
    console.log(this.categories);
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe(category => {
      this.categories = category;
    })
  }

  loadCategoryItems(categoryName){
    this.categoriesService.getToDoItems(categoryName).subscribe(toDoItems =>{
      this.categoryItems = toDoItems;
    })
    this.toggleCategoryItemsDisplay();
  }

  toggleCategoryItemsDisplay(){
    this.isCategoryDisplayed = !this.isCategoryDisplayed;
  }

  cancelDisplayingItems(event: boolean){
    this.isCategoryDisplayed = event;
  }

  addCategory(){
    this.categoriesService.addNewCategory(this.newCategory).subscribe(response =>{
      console.log(response);
    });
    console.log(this.newCategory);
  }

  toggleAddCategory(){
    this.addCategoryToggle = !this.addCategoryToggle;
    this.loadCategories();
  }

}
