import { NgModule }         from '@angular/core';
import { SanitizeHtmlPipe, DataSourcePipe } from './sanitizeHtml.pipe';

export const PIPES = [
  SanitizeHtmlPipe,
  DataSourcePipe
];

@NgModule({
  imports: [],
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }