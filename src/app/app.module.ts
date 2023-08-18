import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PostFormComponent } from './post-form/post-form.component';
import { DetailsComponent } from './details/details.component';
import { CommentsComponent } from './details/comments/comments.component';
import { PostListComponent } from './post-form/post-list/post-list.component';
import { PostService } from './post-service.service';
import { PostDetailsComponent } from './post-form/post-details/post-details.component';
import { PostCommentsComponent } from './post-form/post-details/post-comments/post-comments.component';

@NgModule({
  declarations: [
    AppComponent,
    PostFormComponent,
    DetailsComponent,
    CommentsComponent,
    PostListComponent,
    PostDetailsComponent,
    PostCommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
