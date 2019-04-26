import { NgModule, ModuleWithProviders, Optional, SkipSelf, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterStateSerializer } from '@ngrx/router-store';

import {
  // Module
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatDatepickerModule,
  MatRippleModule,
  MatPaginatorModule,
  MatSortModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatProgressBarModule,
  // Components
} from '@angular/material';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { CustomRouterStateSerializer } from '../store/utils/router-utils';



import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostCardComponent } from './post-card/post-card.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { PostCommentListComponent } from './post-comment-list/post-comment-list.component';
import { AdvancedTableComponent } from './advanced-table/advanced-table.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatRippleModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatProgressBarModule,

    SweetAlert2Module,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    PostCardComponent,
    SvgIconComponent,
    PostCommentComponent,
    PostCommentListComponent,
    AdvancedTableComponent,
  ],
  exports: [
    PostCardComponent,
    PostCommentComponent,
    PostCommentListComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ]
})
export class ComponentsModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: ComponentsModule,
  //     providers: [
  //       /**
  //        * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
  //        * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
  //        * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
  //        */
  //       { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  //     ]
  //   };
  // }

  /* constructor(
    @Optional()
    @SkipSelf()
    parentModule: ComponentsModule
  ) {
    if (parentModule) {
      throw new Error('ComponentsModule is already loaded. Import it in the AppModule only');
    }
  } */
}
