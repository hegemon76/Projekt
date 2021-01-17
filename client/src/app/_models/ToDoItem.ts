export interface ToDoItem {
    id?: number;
    description: string;
    created: string;
    category?:string;
    UserName?: string;
    isCompleted?: boolean;
    completed?: any;
  }