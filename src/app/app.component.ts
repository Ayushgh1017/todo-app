import { Component } from '@angular/core';
import { IUser } from './post-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedPost: IUser | null = null;
  selectedUserId: number | null = null;

  onPostSelected(post: IUser) {
    this.selectedPost = post;
    this.selectedUserId = post ? post.userId : null;
  }
}
