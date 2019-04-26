import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[textareaAutoHeight]'
})
export class TextareaAutoHeightDirective {

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  constructor(public element: ElementRef) {
  }

  ngAfterContentChecked(): void {
    this.adjust();
  }

  adjust(): void {
    let nativeElement = this.element.nativeElement;
    nativeElement.style.overflow = 'hidden';
    nativeElement.style.height = 'auto';
    nativeElement.style.height = nativeElement.scrollHeight + "px";
  }

}
