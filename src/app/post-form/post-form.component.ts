import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { IUser } from '../post-service.service';
import { PostService } from '../post-service.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  @Input() selectedPost: IUser | null = null;
  postTitle: string = ''; 
  postDescription: string = '';
  newPost!: IUser;

  @Output() submitPost = new EventEmitter<IUser | null>();

  constructor(private apiCallService: ApiCallService, private postService:PostService) { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPost'] && changes['selectedPost'].currentValue) {
      this.postTitle = changes['selectedPost'].currentValue.title;
      this.postDescription = changes['selectedPost'].currentValue.body;
    }
  }
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
      this.submitPost.emit(this.newPost);
      this.postService.addPost(this.newPost);
      this.resetForm();
    });
  }

  edit(){
    this.selectedPost!.title = this.postTitle;
    this.selectedPost!.body = this.postDescription;
    this.submitPost.emit(this.selectedPost);
  }
  resetForm() {
    this.postTitle = '';
    this.postDescription = '';
    this.selectedPost = null;
  }
  
}