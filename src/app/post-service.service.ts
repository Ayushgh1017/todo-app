import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

export interface IUser {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: IUser[] = [];
  newPostCreated = new EventEmitter<IUser>();

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/posts');
  }

  addPost(post: IUser) {
    this.posts.push(post);
    this.newPostCreated.emit(post);
  }
}