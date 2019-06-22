import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgrxFormsModule } from 'ngrx-forms'
import { MaterialModule } from '@app/material';

import { ScrollingModule } from '@angular/cdk/scrolling';

import {
  // Module
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  // MatRippleModule,
  // MatPaginatorModule,
  // MatSortModule,
  MatTooltipModule,
  // MatProgressSpinnerModule,
  // MatSelectModule,
  MatProgressBarModule,

  // Components
} from '@angular/material';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';


import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { ComponentsModule } from '@app/shared/components/components.module';
import  { DirectivesModule } from '@shared/directives'
// import { InfiniteScrollerDirective } from '@app/shared/directives/infiniteScroll.directive';
// import { PostCardComponent } from '@app/shared/components/post-card/post-card.component';
// import { PostCardComponent } from '@shared/components/post-card/post-card.component';

export const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'details', component: DetailsComponent },
  { path: '', redirectTo: 'list' },
  { path: '**', redirectTo: 'list' },
];

@NgModule({
  declarations: [
    ListComponent, 
    DetailsComponent, 
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // ReactiveFormsModule,
    RouterModule.forChild(routes),
    
    MaterialModule,
    NgrxFormsModule,
    
    ScrollingModule,
    // PlatformModule,
    
    MatButtonModule,
    // MatRippleModule,
    MatFormFieldModule,
    // MatPaginatorModule,
    // MatSortModule,
    MatInputModule,
    // MatSelectModule,
    MatTooltipModule,
    // MatProgressSpinnerModule,
    MatProgressBarModule,
    
    SweetAlert2Module,

    DirectivesModule,
    
    ComponentsModule,
  ],
  exports: [
  ],
})
export class PostsRoutingModule { }
