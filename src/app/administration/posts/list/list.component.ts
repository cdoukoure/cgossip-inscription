
import { Component, OnInit, AfterViewInit, OnDestroy, 
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef, 
} from '@angular/core';

import { Subscription } from 'rxjs';

import { Router }           from '@angular/router';

import { fadeInAnimation, moveIn } from '@shared/animations';

import { PostsSandbox }  from '../posts.sandbox';
import { LoadItems } from '@app/shared/models';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit  {

  filter: any = null;
  psize: number = 3;
  pindex: number = 0;
  sort: any = null;

  constructor(
    // private router: Router,
    public sandBox: PostsSandbox
  ) { }

  private subscriptions: Array<Subscription> = [];

  ngOnInit() {

    this.sandBox.loadItems();

    this.registerEvents();

  }

  // @ViewChild('scrollViewport') scrollViewport: ElementRef;
 
  ngAfterViewInit() {
    // this.scrollViewport.nativeElement.focus();
  }
  
  ngOnDestroy() {

    this.subscriptions.forEach(sub => sub.unsubscribe());

  }

  /**
   * Subscribes to events
   */
  private registerEvents(): void {      
    /* 
      this.subscriptions.push( ); 
    */    
  }

  /**
   * Callback function for grid select event
   * 
   * @param selected
   */
  public onPostAction(event): void {
    // console.log(event)
    if (event.action === "getItem") {
      this.sandBox.getItem(event.id);
    } else {
      this.sandBox.treatment(event.action, event.id);
    }
  }

  public onListMore() {
    // this.pageSize = this.pageSize + 2;
  }

}
