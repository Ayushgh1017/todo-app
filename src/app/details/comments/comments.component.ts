import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IComment {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() postId!: number ;
  @Input() userId!: number | null ;
  comments: IComment[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if (this.postId) {
      this.fetchComments();
    }
  }

  fetchComments() {
    const url = `https://jsonplaceholder.typicode.com/posts/${this.postId}/comments`;
    this.http.get<IComment[]>(url).subscribe(comments => {
      if (this.userId) {
        this.comments = comments.filter(comment => comment.postId === this.userId);
      } else {
        this.comments = comments;
      }
    });
  }
}
