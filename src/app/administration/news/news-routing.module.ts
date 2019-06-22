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
  MatRadioModule,
  MatDatepickerModule,
  MatTooltipModule,
  MatProgressBarModule,
  // Components
} from '@angular/material';

import { TextFieldModule } from '@angular/cdk/text-field';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

// import { InfiniteScrollerDirective } from '@shared/directives/infiniteScroll.directive';

import { ComponentsModule } from '@app/shared/components/components.module';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { EditFormComponent } from './edit-form/edit-form.component';

export const routes: Routes = [
  { path: 'list',      component: ListComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'edit-form', component: EditFormComponent },
  { path: '', redirectTo: 'list' },
  { path: '**', redirectTo: 'list' },
];

@NgModule({
  declarations: [
    // InfiniteScrollerDirective,
    ListComponent, 
    DetailsComponent, 
    EditFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    
    ScrollingModule,
    // PlatformModule,
    
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatProgressBarModule,

    TextFieldModule,
    
    SweetAlert2Module,

    NgrxFormsModule,
    MaterialModule,

    ComponentsModule
  ],
  exports: [
    // PostCardComponent,
    // InfiniteScrollerDirective,
  ],
})
export class NewsRoutingModule { }
