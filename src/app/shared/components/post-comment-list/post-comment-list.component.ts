import { Component, OnInit, Input } from '@angular/core';
// import { Post } from '@app/shared/models';

@Component({
  selector: 'post-comment-list',
  templateUrl: './post-comment-list.component.html',
  styleUrls: ['./post-comment-list.component.scss']
})
export class PostCommentListComponent implements OnInit {

  @Input() comments: any; //

  constructor() { }

  ngOnInit() {
  }

}
