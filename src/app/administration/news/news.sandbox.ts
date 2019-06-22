import { Injectable } from '@angular/core';
// import { Router }        from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable, forkJoin, combineLatest, Subject } from "rxjs";
import { SortDirection } from '@angular/material';

import { Sandbox } from '@shared/sandbox/base.sandbox';



import {
  AppState,
  NewsActions,
  NewsSelectors
} from '@shared/store';

import { Post, LoadItems } from '@app/shared/models';
import { Router } from '@angular/router';
import { UtilService, buildGhosts } from '@app/shared/utility';
import { SetValueAction, MarkAsTouchedAction, MarkAsDirtyAction } from 'ngrx-forms';
import { NewsApiClient } from './newsApiClient.service';
// import { HttpResponse, HttpEventType } from '@angular/common/http';
// import { fstat } from 'fs';


@Injectable({
  providedIn: "root"
})
export class NewsSandbox extends Sandbox {

  Id: any;
  item: any;
  mediaUrl: any; // Used in news edit-form to check if url is ok

  sort: any = null;

  constructor(
    private router: Router,
    public countryService: UtilService,
    private newsApiClient: NewsApiClient,
    public store$: Store<AppState.State>,
  ) {
    super(store$);
    this.registerEvents();
  }

  public viewMode$ = this.store$.select(state => state.news.viewMode);
  public formState$ = this.store$.select(state => state.news.formState);
  public allItems$ = this.store$.select(NewsSelectors.selectAllItems);

  public draftItems$ = this.store$.select(NewsSelectors.selectItemsFilterAndSortBy([{ key: "state", value: "draft" }], this.sort));

  public openedItems$ = this.store$.select(NewsSelectors.selectItemsFilterAndSortBy([{ key: "state", value: "validated" }], this.sort));

  public closedItems$ = this.store$.select(NewsSelectors.selectItemsFilterAndSortBy([{ key: "state", value: "deleted" }], this.sort));

  public userEntities$ = this.store$.select(state => state.users.entities);
  public isLoading$ = this.store$.select(NewsSelectors.selectIsLoading);
  public message$ = this.store$.select(NewsSelectors.selectMessage);

  public forNavigateTo$ = combineLatest(
    this.viewMode$,
    this.formState$
  );

  private subscriptions: Array<Subscription> = [];

  public formStateSetValue(ControlID: string, value) {
    this.store$.dispatch(new SetValueAction(ControlID, value));
    this.store$.dispatch(new MarkAsDirtyAction(ControlID));
    this.store$.dispatch(new MarkAsTouchedAction(ControlID));
  }

  /**
   * Loads Posts from the server
   */
  public loadItems(
    filter: any = null,
    pindex: number = 0,
    psize: number = 10000,
    sort: any = null
  ): void {
    pindex = pindex * psize // eq 5
    this.store$.dispatch(new NewsActions.LoadNewsAction(
      new LoadItems({
        filter,
        pindex,
        psize,
        sort
      })
    ))
  } // array.slice(page_number * page_size, (page_number + 1) * page_size)

  /**
   * Sort user details from the server
   */
  public sortItems(sort: any): void {
    // this.store$.dispatch(new NewsActions.SortPostsAction({sort: sort}))
    this.sort = sort;
  }

  /**
   * Load user details from the server
   */
  public getItem(id?, viewmode?): void {
    this.store$.dispatch(new NewsActions.GetNewsAction({ id: id, viewMode: viewmode }))
  }

  /**
   * Load user details from the server
   */
  public releaseItem(): void {
    this.store$.dispatch(new NewsActions.GetNewsAction({ id: null }))
  }

  /**
   * Add new user to the server
   */
  public createItem(action): void {
    let subscription = this.formState$.subscribe(fs => {
      if (fs.isDirty && fs.isValid) {
        this.store$.dispatch(new NewsActions.CreateNewsAction({ item: new Post(fs.value), action }));
      }
    })
    subscription.unsubscribe();
  }

  /**
   * Edit user to the server
   */
  public updateItem(action) {

    let subscription = this.formState$.subscribe(fs => {
      if (fs.isDirty && fs.isValid) {
        this.store$.dispatch(new NewsActions.UpdateNewsAction({ item: new Post(fs.value), action }))
      }      
    });
    subscription.unsubscribe();
    // TODO : Remove subscrition and work with pipe
    /*this.formState$.pipe(
      take(1),
      filter(s => s.isValid),
      map(fs => this.store$.dispatch(new NewsActions.UpdatePostAction({ item:new Post(fs.value) }))),
      tap((fs) => console.log("Form submitted"))      
    )*/
  }

  /**
   * Add new user to the server
   */
  public deleteItem(): void {
    this.store$.dispatch(new NewsActions.DeleteNewsAction({ id: this.Id }))
  }

  /**
   * Edit news to the server
   */
  public treatment(decision: any, id?: any): void {

    if (id) { // Function called from list/PostCardComponent
      /* 
      let item$ = this.store$.select(NewsSelectors.selectItemById(id));
      item$.subscribe(item => {
        this.store$.dispatch(new NewsActions.DoNewsTreatment({ item: item, action:decision } ))
      }).unsubscribe(); 
      */
      this.store$.dispatch(new NewsActions.DoNewsTreatment({ id: id, action: decision }))
      return;
    }

    // Called from detail or form
    let subscription = this.formState$.subscribe(fs => {
      // let item = new Post(fs.value);
      if (fs.isValid && fs.isTouched) {
        if (fs.value.id) {
          this.store$.dispatch(new NewsActions.UpdateNewsAction({ item: fs.value, action: decision }))
        } else {
          this.store$.dispatch(new NewsActions.CreateNewsAction({ item: fs.value, action: decision }))
        }
      } else {
        console.warn("Form is invalid or has not been edited");
      }
    })
    subscription.unsubscribe();
    return;

  }

  public uploadBeforeEdit(formdata, action) {
    let subscription = this.formState$.subscribe(fs => {
      this.store$.dispatch(new NewsActions.UploadNewsRessource({formData: formdata, item: fs.value, action: action}));
      /* if (fs.controls.media.isTouched) {
        this.store$.dispatch(new NewsActions.UploadNewsRessource({formData: formdata, item: fs.value, action: action}))
      } else {
        console.warn("Form ressource has not been edited !!!");
      }  */
    })
    subscription.unsubscribe();  
  }

  /**
   * Unsubscribes from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Subscribes to events
   */
  private registerEvents(): void {

    // Subscribes to viewmode and formState
    this.subscriptions.push(
      this.forNavigateTo$.subscribe(([viewmode, fs]) => {

        this.Id = fs.value.id;
        this.mediaUrl = fs.value.media.url;

        if (viewmode === 'edition') {
          // console.log("Edition mode !!!");
          this.router.navigate(['/admin-panel/news/edit-form']);
        }
        else if (viewmode === 'view' && fs.value.id) {
          // console.log("views mode !!!");
          this.router.navigate(['/admin-panel/news/details']);
        }
        else {
          // console.log("List mode !!!");
          this.router.navigate(['/admin-panel/news/list']);
        }
      })
    );

  }
}