import { Component, OnInit } from '@angular/core';
import { ToDoItem } from 'src/app/_models/ToDoItem';
import { TasksService } from 'src/app/_services/tasks.service';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css']
})
export class CompletedTasksComponent implements OnInit {
  jobs: ToDoItem[];

  constructor(private taskService: TasksService) { }

  ngOnInit(){
    this.loadCompletedTasks();
  }

  loadCompletedTasks(){
    this.taskService.getCompletedTasks().subscribe(response => {
      this.jobs = response;
      console.log(response);
    })
  }

}
