import { Component, EventEmitter, Output } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { IUser } from '../post-service.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  postTitle: string = "";
  postDescription: string = "";
  newPost!: IUser;

  constructor(private apiCallService: ApiCallService) { }

  onSubmit() {
    const postData = {
      title: this.postTitle,
      body: this.postDescription
    };
    this.apiCallService.post('https://jsonplaceholder.typicode.com/posts', postData).subscribe((response: any) => {
        this.newPost = {
        userId: response.userId,
        id: response.id,
        title: this.postTitle,
        body: this.postDescription
      };
    });
  }
  
}