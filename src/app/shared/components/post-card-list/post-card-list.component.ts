import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'post-card-list',
  templateUrl: './post-card-list.component.html',
  styleUrls: ['./post-card-list.component.css']
})
export class PostCardListComponent implements OnInit {

  @Input() postcards: any; //

  constructor() { }

  ngOnInit() {
  }

}
