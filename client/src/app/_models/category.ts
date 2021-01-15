import { ToDoItem } from './ToDoItem'

export interface Category {
    id: number;
    category: string;
    appUserId: number;
    toDoItems: ToDoItem[];
  }