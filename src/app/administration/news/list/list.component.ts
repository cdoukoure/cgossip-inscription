
import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { Router } from '@angular/router';

import { fadeInAnimation, moveIn } from '@shared/animations';

import { NewsSandbox } from '../news.sandbox';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit {

  filter: any = null;

  pindexWaiting: number = 0;
  pindexValidated: number = 0;
  pindexRefused: number = 0;

  constructor(
    public sandBox: NewsSandbox
  ) { }

  private subscriptions: Array<Subscription> = [];

  ngOnInit() {

    this.sandBox.loadItems();
    
    // this.sandBox.loadItems(null, this.pindexWaiting, 10, 'waiting');

    // this.sandBox.loadItems(null, this.pindexValidated, 10, 'validated');

    // this.sandBox.loadItems(null, this.pindexRefused, 10, 'refused');

    this.registerEvents();

  }

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

  /* 
  getItems() {
    this.sandBox.loadItems(this.filter, this.pindex, this.psize, this.sort);
  } 
  */

  public createNews() {
    this.sandBox.getItem(null, 'edition');
  }

  /**
   * Callback function for grid select event
   * 
   * @param selected
   */
  public onPostAction(event): void {
    if (event.action === "edition") {
      this.sandBox.getItem(event.id, "edition");
    } else if (event.action === "getItem") {
      this.sandBox.getItem(event.id);
    } else {
      this.sandBox.treatment(event.action, event.id);
    }
  }

  public onListMore(sort) {
    switch (sort) {
      case 'waiting':
        this.pindexWaiting = this.pindexWaiting + 1;
        this.sandBox.loadItems(null, this.pindexWaiting, 10, 'waiting');
        break;
      case 'validated':
        this.pindexValidated = this.pindexValidated + 1;
        this.sandBox.loadItems(null, this.pindexValidated, 10, 'validated');
        break;
      case 'refused':
        this.pindexRefused = this.pindexRefused + 1;
        this.sandBox.loadItems(null, this.pindexRefused, 10, 'refused');
        break;
      default:
        break;
    }
  }

}
