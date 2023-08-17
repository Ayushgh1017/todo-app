import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

interface TodoItem {
  message: string;
  deadline: Date;
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
        const deadlineDateTime = new Date(`${this.deadlineDate} ${this.deadlineTime.hour}:${this.deadlineTime.minute}`);
        console.log(deadlineDateTime);
        this.obj = {
          message: this.newTodo,
          deadline: deadlineDateTime,
          priority: this.selectedPriority
        };
      } else {
        const today = new Date();
        this.obj = {
          message: this.newTodo,
          deadline: today,
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
    const doneTime = new Date();
    this.obj.deadline = doneTime;
    this.inProgress = this.inProgress.filter(item => item!== todo);
    this.done.push(todo);
  }

  removeFromDone(todo: TodoItem) { 
    const index = this.done.indexOf(todo);
    if (index!== -1) {
        this.done.splice(index, 1);
    }
  }
  getPriorityClass(priority: string): string {
    if (priority === 'high') {
      return 'high-priority';
    } else if (priority === 'medium') {
      return 'medium-priority';
    } else if (priority === 'low') {
      return 'low-priority';
    }
    return ''; // Default class
  }

  minDateISOString(): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split('T')[0];
  }
 
}

const dummyData: TodoItem[] = [
  {
    message: "Go to gym",
    deadline: new Date(),
    priority: "high"
  },
  {
    message: "Update your task",
    deadline: new Date(),
    priority: "low" 
  },
  {
    message: "Play cricket",
    deadline: new Date(),
    priority: "medium"
  }
];
