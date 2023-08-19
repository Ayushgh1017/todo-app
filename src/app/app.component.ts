import { Component } from '@angular/core';
import { IUser } from './post-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedPost: IUser | null = null;
  newPost: IUser | null = null;
  posts: IUser[]=[];
  handleFormSubmission(submittedPost: IUser | null) {
    if (submittedPost) {
      if (submittedPost.id) {
        // Edit an existing post
        const postIndex = this.posts.findIndex(post => post.id === submittedPost.id);
        if (postIndex !== -1) {
          this.newPost = submittedPost;
        }
      } else {
        // Add a new post
        this.newPost = submittedPost;
      }
    }
    // Reset selectedPost and newPost after submission
    this.selectedPost = null;
    this.newPost = null;
  }
  handleEditSelectedPost(updatedPost: IUser) {
    this.selectedPost = updatedPost;
  }
}
