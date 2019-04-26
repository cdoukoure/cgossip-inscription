import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '@app/shared/models';

@Component({
  selector: 'post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {

  @Input() comment: Comment; //

  constructor() { }

  ngOnInit() {
  }

}
