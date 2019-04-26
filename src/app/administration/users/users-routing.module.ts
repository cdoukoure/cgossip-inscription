import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableListComponent } from './table-list/table-list.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
  { path: 'list',      component: TableListComponent },
  { path: 'edit-form', component: EditFormComponent },
  { path: '', redirectTo: 'list' },
  { path: '**', redirectTo: 'list' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})
export class UsersRoutingModule { }
