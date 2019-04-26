import {
	Pipe,
	PipeTransform
} 							from '@angular/core';
import {
	DomSanitizer,
	SafeHtml
}    						from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform  {
  constructor(private sanitizer: DomSanitizer){}  

  transform(v: string) : SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(v); 
  } 
}

@Pipe({
  name: 'dataSource'
})
export class DataSourcePipe implements PipeTransform {

  transform<T>(value: Observable<T[]>, args?: any): DataSource<T> {
    if (!value) {
      return null;
    }

    return {
      connect() {
        return value;
      }, disconnect() {

      }
    };
  }

}