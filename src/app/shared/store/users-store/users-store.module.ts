import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsersEffects } from './effects';
import { reducer as UsersReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('users', UsersReducer),
    EffectsModule.forFeature([UsersEffects])
  ],
  providers: [UsersEffects]
})
export class UsersStoreModule {}
