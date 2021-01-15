import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToDoItem } from 'src/app/_models/ToDoItem';

@Component({
  selector: 'app-selected-category',
  templateUrl: './selected-category.component.html',
  styleUrls: ['./selected-category.component.css']
})
export class SelectedCategoryComponent implements OnInit {
  @Input() toDosFromCategoriesList: ToDoItem;
  @Output() back = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  backToCategories() {
    this.back.emit(false);
  }

}
