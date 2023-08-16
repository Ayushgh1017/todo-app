import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
interface TodoItem {
  message: string;
  timestamp: string | null;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: TodoItem[] = [];
  inProgress: TodoItem[] = [];
  done: TodoItem[] = [];
  newTodo: string = '';
  obj: TodoItem | undefined;

  constructor(private http: HttpClient,private datePipe: DatePipe) {
    
  }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.http.get<TodoItem[]>('assets/todos.json').subscribe(
      (data) => {
        this.todos = data;
      },
    );
  }

  addTodo() {
    if (this.newTodo.trim() !== '') {
      const today = new Date();
      const dueDate = new Date(today);
      dueDate.setDate(today.getDate() + 1); 
      const formattedDueDate = this.datePipe.transform(dueDate, 'medium');
      this.obj = {
        message: this.newTodo,
        timestamp: formattedDueDate
      };
      this.todos.push(this.obj);
      this.newTodo = '';
      
    }
  }

  moveInProgress(todo: TodoItem) { 
    this.todos = this.todos.filter(item => item !== todo);
    this.inProgress.push(todo);
  }

  markDone(todo: TodoItem) {
    const doneTime = new Date();
    const formattedDueDate = this.datePipe.transform(doneTime, 'medium');
    todo.timestamp = formattedDueDate;
    this.inProgress = this.inProgress.filter(item => item !== todo);
    this.done.push(todo);
  }

  removeFromDone(todo: TodoItem) { 
    this.done = this.done.filter(item => item !== todo);
  }
}
