import { Component,EventEmitter,OnInit, Output} from '@angular/core';
import { PostService } from '../post-service.service';

export interface IUser {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  @Output() postSelected = new EventEmitter<IUser>();
  selectedUserId: number | null = null;

  posts: IUser[] = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPost()
  }

  getPost(){
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
    this.postService.newPostCreated.subscribe((post) => {
      this.posts.push(post);
    });
  }
  loadDetails(post: IUser) {
    this.selectedUserId = post.userId;
    this.postSelected.emit(post);
  }
}