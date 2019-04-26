import { NgModule }         from '@angular/core';
import { InfiniteScrollerDirective } from './infiniteScroll.directive';

export const DIRECTIVES = [
  InfiniteScrollerDirective
];

@NgModule({
  imports: [],
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class DirectivesModule { }