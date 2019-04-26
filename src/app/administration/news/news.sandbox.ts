import { Injectable } 	 from '@angular/core';
// import { Router }        from '@angular/router';
import { Store, select }      	 from '@ngrx/store';
import { Subscription, Observable, forkJoin, combineLatest }  from "rxjs";
import { SortDirection } from '@angular/material';

import { Sandbox } 			 from '@shared/sandbox/base.sandbox';



import {
  AppState,
  NewsActions,
  NewsSelectors
} from '@shared/store';

import { Post } from '@app/shared/models';
import { Router } from '@angular/router';
import { UtilService, buildGhosts } from '@app/shared/utility';
import { SetValueAction } from 'ngrx-forms';


@Injectable({
  providedIn: "root"
})
export class NewsSandbox extends Sandbox {

  Id : any;
  item: any;

  sort: any = null;

  constructor(   
    private router: Router,
    public countryService: UtilService,
    public store$: Store<AppState.State>,
  ) {
    super(store$);
    this.registerEvents();
    // this.allCountries = this.countryService.fetchCountryData();
  }

  public viewMode$ = this.store$.select(state => state.news.viewMode);
  public formState$ = this.store$.select(state => state.news.formState);
  public allItems$ = this.store$.select(NewsSelectors.selectAllItems);

  public draftItems$ = this.store$.select(NewsSelectors.selectItemsFilterAndSortBy([{key: "state", value:"draft"}], this.sort));

  public openedItems$ = this.store$.select(NewsSelectors.selectItemsFilterAndSortBy([{key: "state", value:"validated"}], this.sort));

  public closedItems$ = this.store$.select(NewsSelectors.selectItemsFilterAndSortBy([{key: "state", value:"deleted"}], this.sort));

  public userEntities$ = this.store$.select(state => state.users.entities);
  public isLoading$    = this.store$.select(NewsSelectors.selectIsLoading);
  public message$      = this.store$.select(NewsSelectors.selectMessage);

  public forNavigateTo$ = combineLatest(
    this.viewMode$,
    this.formState$
  );
  
  private subscriptions: Array<Subscription> = [];

  public formStateSetValue(ControlID:string, value) {
    this.store$.dispatch(new SetValueAction(ControlID, value));
  }

  /**
   * Loads Posts from the server
   */
  public loadItems(
    search : any = null, 
    pageIndex : number = 0, 
    pageSize : number = 20, 
    sort : string = null, 
    direction : SortDirection = "asc"
  ): void {
    // console.log("Post SandBox loadItems();");
    this.store$.dispatch(new NewsActions.LoadNewsAction({
      search, 
      pageIndex, 
      pageSize, 
      sort, 
      direction       
    }))
  }

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
    this.store$.dispatch(new NewsActions.GetNewsAction({id:id, viewMode:viewmode}))
  }

  /**
   * Load user details from the server
   */
  public releaseItem(): void {
    // console.log("releaseItem");
    this.store$.dispatch(new NewsActions.GetNewsAction({id: null}))
    // console.log("Item release !!!");
    // this.router.navigate(['/admin-panel/users/list']);
  }

  /**
   * Add new user to the server
   */
  public createItem(action): void {
    let subscription = this.formState$.subscribe(fs => {
      // console.log("fs.value");
      // console.log(fs.value);
      // console.log("new Post(fs.value)");
      // console.log(new Post(fs.value));
      this.store$.dispatch(new NewsActions.CreateNewsAction({ item: new Post(fs.value), action }));
    })
    subscription.unsubscribe(); 
  }

  /**
   * Edit user to the server
   */
  public updateItem(action) {

    let subscription = this.formState$.subscribe(fs => {
      this.store$.dispatch(new NewsActions.UpdateNewsAction({ item: new Post(fs.value), action }))
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
    this.store$.dispatch(new NewsActions.DeleteNewsAction({ id: this.Id } ))
  }

  /**
   * Add new user to the server
   */
  public treatment(decision:any, id?:any): void {

    if (id) { // Function called from list
      let item$ = this.store$.select(NewsSelectors.selectItemById(id));
      item$.subscribe(item => {
        this.store$.dispatch(new NewsActions.UpdateNewsAction({ item: item, action:decision } ))
      }).unsubscribe();
      return;
    } 

    // Called from detail or form
    let subscription = this.formState$.subscribe(fs => {
      // let item = new Post(fs.value);
      if(fs.value.id) {
        this.store$.dispatch(new NewsActions.UpdateNewsAction({ item: fs.value, action:decision } ))
      } else {
        this.store$.dispatch(new NewsActions.CreateNewsAction({ item: fs.value, action:decision } ))
      }
    })
    subscription.unsubscribe(); 
    return;
    
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