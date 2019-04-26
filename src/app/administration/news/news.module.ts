import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsApiClient } from './newsApiClient.service';

import { NewsRoutingModule } from './news-routing.module';

// import { ListComponent } from './list/list.component';
// import { PostCardComponent } from './post-card/post-card.component';

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    // StateModule
  ],
  providers: [
    NewsApiClient,
  ],
  declarations: [
    
  ]
})
export class NewsModule { }
