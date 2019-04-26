import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsApiClient } from './postsApiClient.service';

import { PostsRoutingModule } from './posts-routing.module';

// import { ListComponent } from './list/list.component';
// import { PostCardComponent } from './post-card/post-card.component';

@NgModule({
  imports: [
    CommonModule,
    PostsRoutingModule,
    // StateModule
  ],
  providers: [
    PostsApiClient,
  ],
  declarations: [
    
  ]
})
export class PostsModule { }
