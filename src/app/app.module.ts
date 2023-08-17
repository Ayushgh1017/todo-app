import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomDatePipe } from './todo-list/formatDate.pipe';
import { DueDatePipe } from './todo-list/formatDate.pipe';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { DatePipe } from '@angular/common';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    CustomDatePipe,
    SignupComponent,
    DueDatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DatePipe
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
