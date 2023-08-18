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
  selectedPost!: IUser;
  @Input()
  set newPost(post:IUser){
    if(post){
      this.posts.push(post);
    }
  }


  @Output() postSelected = new EventEmitter<IUser>();
  selectedUserId: number | null = null;
  posts: IUser[] = [];
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  loadDetails(post: IUser) {
    this.selectedPost = post;
    this.postSelected.emit(post);
  }
}