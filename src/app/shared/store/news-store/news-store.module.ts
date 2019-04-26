import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NewsEffects } from './effects';
import { reducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('news', reducer),
    EffectsModule.forFeature([NewsEffects])
  ],
  providers: [NewsEffects]
})
export class NewsStoreModule {}
