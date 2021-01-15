import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.loadCategories();
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

}
