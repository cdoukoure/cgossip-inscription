import { NgModule }         from '@angular/core';
import { InfiniteScrollerDirective } from './infiniteScroll.directive';
import { TextareaAutoHeightDirective } from './textarea-auto-height.directive';
import { DateTimePickerDirective } from './date-time-picker.directive';

export const DIRECTIVES = [
  InfiniteScrollerDirective,
  TextareaAutoHeightDirective,
  DateTimePickerDirective
];

@NgModule({
  imports: [],
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class DirectivesModule { }