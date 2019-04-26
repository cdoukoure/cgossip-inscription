import { Injectable } 	 from '@angular/core';
// import { Router }        from '@angular/router';
import { Store, select }      	 from '@ngrx/store';
import { Subscription, Observable, forkJoin }  from "rxjs";
import { SortDirection, Sort } from '@angular/material';

import { Sandbox } 			 from '@shared/sandbox/base.sandbox';



import {
  AppState,
  PostActions,
  PostSelectors
} from '@shared/store';

import { Post } from '@app/shared/models';
import { Router } from '@angular/router';
import { UtilService, buildGhosts } from '@app/shared/utility';
import { RowFilter } from '@app/shared/store/utils/store-utils';


@Injectable({
  providedIn: "root"
})
export class PostsSandbox extends Sandbox {

  Id : any;
  item: any;

  sort: Sort;

  filter:RowFilter[];


  constructor(   
    private router: Router,
    public countryService: UtilService,
    protected store$: Store<AppState.State>,
  ) {
    super(store$);
    this.registerEvents();
    // this.allCountries = this.countryService.fetchCountryData();
  }



  public formState$ = this.store$.select(state => state.posts.formState);
  public commentState$ = this.store$.select(state => state.posts.commentState);
  
  public waitingItems$ = this.store$.select(PostSelectors.selectItemsFilterAndSortBy([{key: "state", value:"waiting"}], this.sort));

  public validatedItems$ = this.store$.select(PostSelectors.selectItemsFilterAndSortBy([{key: "state", value:"validated"}], this.sort));

  public refusedItems$ = this.store$.select(PostSelectors.selectItemsFilterAndSortBy([{key: "state", value:"refused"}], this.sort));

  public userEntities$ = this.store$.select(state => state.users.entities);
  public isLoading$       = this.store$.select(PostSelectors.selectIsLoading);
  public message$         = this.store$.select(PostSelectors.selectMessage);
  
  // public forNavigateTo$ = combineLatest(
  //   this.viewMode$,
  //   this.selectedItem$
  // );

  private subscriptions: Array<Subscription> = [];

  /**
   * Loads Posts from the server
   */
  public loadItems(
    filter : any = null, 
    pindex : number = 0, 
    psize : number = 2500, 
    sort : any = null
  ): void {
    this.store$.dispatch(new PostActions.LoadPostsAction({
      filter, 
      pindex, 
      psize, 
      sort   
    }))
  }

  /**
   * Sort user details from the server
   */
  public sortItems(sort: any): void {
    this.store$.dispatch(new PostActions.SortPostsAction({sort: sort}))
  }

  /**
   * Load user details from the server
   */
  public getItem(id: any): void {
    // console.log(id);
    this.store$.dispatch(new PostActions.GetPostAction({id}))
  }

  /**
   * Load user details from the server
   */
  public releaseItem(): void {
    // console.log("releaseItem");
    this.store$.dispatch(new PostActions.LoadPostsAction({}))

    // console.log("Item release !!!");
    // this.router.navigate(['/admin-panel/users/list']);
  }

  /**
   * Add new user to the server
   */
  public createItem(): void {
    let subscription = this.formState$.subscribe(fs => {
      console.log("new Post(fs.value)");
      console.log(new Post(fs.value));
      this.store$.dispatch(new PostActions.CreatePostAction({ item: new Post(fs.value) }));
    })
    subscription.unsubscribe(); 
  }

  /**
   * Edit user to the server
   */
  public updateItem() {

    let subscription = this.formState$.subscribe(fs => {
      this.store$.dispatch(new PostActions.UpdatePostAction({ item: new Post(fs.value) }))
    }); 
    subscription.unsubscribe(); 
    // TODO : Remove subscrition and work with pipe
    /*this.formState$.pipe(
      take(1),
      filter(s => s.isValid),
      map(fs => this.store$.dispatch(new PostActions.UpdatePostAction({ item:new Post(fs.value) }))),
      tap((fs) => console.log("Form submitted"))      
    )*/

  }

  /**
   * Add new user to the server
   */
  public deleteItem(): void {
    this.store$.dispatch(new PostActions.DeletePostAction({ id: this.Id } ))
  }

  public postComment() {
    // this.store$.dispatch(new PostActions.DoPostComment({ pubid: this.Id, text:text })) 
    // console.warn("postComment")   
    let subscription = this.commentState$.subscribe(fs => {
      if (fs.isValid && fs.isDirty)
        this.store$.dispatch(new PostActions.DoPostComment({ pubid: fs.value.pubid, text:fs.value.text }));
    })
    subscription.unsubscribe(); 
  }

  /**
   * Add new user to the server
   */
  public treatment(decision:any, id?:any): void {
    let itemId: any;
    if (id) {
      itemId = id
    } else {
      itemId = this.Id
    }
    this.store$.dispatch(new PostActions.DoPostTreatment({ id: itemId, action:decision } ))
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
    // Subscribes to culture
    // this.subscriptions.push(this.culture$.subscribe((culture: string) => this.culture = culture));
    // this.subscriptions.push(this.culture$.subscribe((culture: string) => this.culture = culture));
  
    // Subscribes to login success event and redirects user to home page
    /* this.subscriptions.push(
      this.forNavigateTo$.subscribe(([viewmode, selectedItem]) => {
        if (viewmode === 'edition' || selectedItem) {
          // console.log("Edition mode !!!");
          this.router.navigate(['/admin-panel/posts/details']);
        }
        else {
          // console.log("List mode !!!");
          this.router.navigate(['/admin-panel/posts/list']);
        }     
      })
    ); */
  
    this.subscriptions.push(
      this.formState$.subscribe( fs => {
        this.Id = fs.value.id;
        this.item = fs.value;
        // console.warn(this.item)
        if (fs.value.id) {
          // console.log("Details mode !!!");
          this.router.navigate(['/admin-panel/posts/details']);
        }               
        else {
          // console.log("List mode !!!");
          this.router.navigate(['/admin-panel/posts/list']);
        }
      })
    );
  
    /* this.subscriptions.push(
      this.waitingItems$.subscribe( items => {
        // console.log("Post waitingItems$")
        // console.log(items)
      })
    ); */
   
  
  }
}