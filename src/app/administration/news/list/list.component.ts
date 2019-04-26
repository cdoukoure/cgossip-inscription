
import { Component, OnInit, AfterViewInit, OnDestroy, 
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef, 
} from '@angular/core';

import { Subscription } from 'rxjs';

import { Router }           from '@angular/router';

import { fadeInAnimation, moveIn } from '@shared/animations';

import { NewsSandbox }  from '../news.sandbox';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit  {

  pageSize: number = 2;
  pageIndex: number = 0;

  constructor(
    private router: Router,
    public sandBox: NewsSandbox
  ) {
    
  }

  private subscriptions: Array<Subscription> = [];

  ngOnInit() {

    this.sandBox.loadItems();

    this.registerEvents();

    // setTimeout(()=>{}, 0);

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

  public createNews() {
    this.sandBox.getItem(null, 'edition');
  }

  /**
   * Callback function for grid select event
   * 
   * @param selected
   */
  public onPostAction(event): void {
    // console.log(event)
    if (event.action === "edition") {
      this.sandBox.getItem(event.id, "edition");
    } else if (event.action === "getItem") {
      this.sandBox.getItem(event.id);
    } else {
      this.sandBox.treatment(event.action, event.id);
    }
  }

  public onListMore() {
    this.pageSize = this.pageSize + 2;
  }

}
