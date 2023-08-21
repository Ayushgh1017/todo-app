import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { IUser } from '../post-service.service';

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

  constructor(private apiCallService: ApiCallService) { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPost'] && changes['selectedPost'].currentValue) {
      this.postTitle = changes['selectedPost'].currentValue.title;
      this.postDescription = changes['selectedPost'].currentValue.body;
    }
  }
  onSubmit() {
    if (this.selectedPost) {
      this.selectedPost.title = this.postTitle;
      this.selectedPost.body = this.postDescription;
      this.submitPost.emit(this.selectedPost); // Emit edited post
    } else {
      const postData = {
        title: this.postTitle,
        body: this.postDescription
      };
      this.apiCallService.post('https://jsonplaceholder.typicode.com/posts', postData)
        .subscribe((response: any) => {
          this.newPost = {
            userId: response.userId,
            id: response.id,
            title: this.postTitle,
            body: this.postDescription
          };
          this.submitPost.emit(this.newPost);
        });
    }
    this.resetForm();
  }

  resetForm() {
    this.postTitle = '';
    this.postDescription = '';
    this.selectedPost = null;
  }
}
