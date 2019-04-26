import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post, User } from '@app/shared/models';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() item: Post; //
  @Input() author?: User; 
  @Input() largeFormat?: boolean = false; 
  @Output() onClick: EventEmitter<any> = new EventEmitter(); // ...and emit actions that should

  showDetail: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {

  }

  onShowMore(){
    this.showDetail = !this.showDetail;
  }

  onEmitEvent(action:string) {
    this.onClick.emit({id: this.item.id, action:action})
  }

}
