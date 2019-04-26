import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PostsEffects } from './effects';
import { reducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('posts', reducer),
    EffectsModule.forFeature([PostsEffects])
  ],
  providers: [PostsEffects]
})
export class PostsStoreModule {}