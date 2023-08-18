import { Component, EventEmitter, Output } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { PostService } from '../post-service.service';

export interface IUser {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  postTitle: string = "";
  postDescription: string = "";

  

  constructor(private apiCallService: ApiCallService, private postService: PostService) { }

  onSubmit() {
    const postData = {
      title: this.postTitle,
      body: this.postDescription
    };
    this.apiCallService.post('https://jsonplaceholder.typicode.com/posts', postData).subscribe((response: any) => {
      const newPost: IUser = {
        userId: response.userId,
        id: response.id,
        title: this.postTitle,
        body: this.postDescription
      };
      console.log(newPost);
      this.postService.addPost(newPost);
    });
  }
}