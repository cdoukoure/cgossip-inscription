import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GroupsEffects } from './effects';
import { reducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('groups', reducer),
    EffectsModule.forFeature([GroupsEffects])
  ],
  providers: [GroupsEffects]
})
export class GroupsStoreModule {}