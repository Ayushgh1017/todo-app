import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

interface TodoItem {
  message: string;
  deadlineD: string;
  deadlineT: { hour: number, minute: number },
  priority: 'high' | 'medium' | 'low';
}


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})


export class TodoListComponent implements OnInit {
  todos: TodoItem[] = [];
  inProgress: TodoItem[] = [];
  done: TodoItem[] = [];
  selectedPriority: 'high' | 'medium' | 'low' = 'low';
  newTodo: string = '';
  deadlineDate: string = '';
  deadlineTime: { hour: number, minute: number } = { hour: 0, minute: 0 };
  obj!: TodoItem;

  constructor( private datePipe: DatePipe) { }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todos = dummyData;

  }

  addTodo() {
    if (this.newTodo.trim() !== '') {
      if (this.deadlineDate && this.deadlineTime) {
        this.obj = {
          message: this.newTodo,
          deadlineD: this.deadlineDate,
          deadlineT: this.deadlineTime,
          priority: this.selectedPriority
        };
      }
      this.todos.push(this.obj);
      this.newTodo = '';
      this.deadlineDate = '';
      this.deadlineTime = { hour: 0, minute: 0 };
    }
  }

  moveInProgress(todo: TodoItem) { 
    this.todos = this.todos.filter(item => item!== todo);
    this.inProgress.push(todo);
  }

  markDone(todo: TodoItem) {
    this.inProgress = this.inProgress.filter(item => item!== todo);
    let date = new Date();
    todo.deadlineD = date.toISOString().split('T')[0]
    todo.deadlineT = {hour: date.getHours(), minute:date.getMinutes()}
    this.done.push(todo);
  }

  removeFromDone(todo: TodoItem) { 
    const index = this.done.indexOf(todo);
    if (index!== -1) {
        this.done.splice(index, 1);
    }
  }
  //used in html to get priority
  getPriorityClass(priority: string): string {
    if (priority === 'high') {
      return 'high-priority';
    } else if (priority === 'medium') {
      return 'medium-priority';
    } else if (priority === 'low') {
      return 'low-priority';
    }
    return '';
  }

  // to disbale the calender previous date 
  minDateISOString(): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split('T')[0];
  }
 
}

const dummyData: TodoItem[] = [
  {
    message: "Go to gym",
    deadlineD: "2023-08-18",
    deadlineT:{ hour: 10, minute: 25 },
    priority: "high"
  },
  {
    message: "Update your task",
    deadlineD: "2023-08-19",
    deadlineT:{ hour: 10, minute: 25 },
    priority: "low" 
  },
  {
    message: "Play cricket",
    deadlineD: "2023-08-20",
    deadlineT:{ hour: 10, minute: 25 },
    priority: "medium"
  }
];
