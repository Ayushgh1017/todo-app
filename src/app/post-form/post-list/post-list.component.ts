import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { PostService } from 'src/app/post-service.service';

interface IUser {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() newPost: IUser | null = null;
  @Output() editSelectedPost = new EventEmitter<IUser>();
  
  posts: IUser[] = [];
  selectedPost!: IUser | null;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
    this.postService.newPostCreated.subscribe((post) => {
      this.posts.push(post);
    });
  }

  loadDetails(post: IUser) {
    this.selectedPost = post;
  }

  editPost(updatedPost: IUser) {
    this.editSelectedPost.emit(updatedPost);
  }
  newPostCreated(newPost:IUser){
    this.posts.push(newPost);

  }
  deletePost(postToDelete: IUser) {

    this.posts = this.posts.filter(post => post.id !== postToDelete.id);

  }
}
