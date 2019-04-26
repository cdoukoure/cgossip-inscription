import { Injectable } 	 from '@angular/core';
// import { Router }        from '@angular/router';
import { Store }      	 from '@ngrx/store';
import { Subscription, combineLatest }  from "rxjs";
import { SortDirection, Sort } from '@angular/material';

import { Sandbox } from '@shared/sandbox/base.sandbox';

import {
  AppState,
  UsersActions,
  UsersSelectors,
  GroupSelectors,
  AuthSelectors
} from '@shared/store';

import { User } from '@app/shared/models';
import { Router } from '@angular/router';
import { UtilService } from '@app/shared/utility';
import { unbox } from 'ngrx-forms';
import { RowFilter } from '@app/shared/store/utils/store-utils';

@Injectable({
  providedIn: "root"
})
export class UsersSandbox extends Sandbox {

  Id : any;

  loggedUserGroup : any;

  allItems: User[];

  constructor(   
    private router: Router,
    public countryService: UtilService,
    protected store$: Store<AppState.State>,
  ) {
    super(store$);
    this.registerEvents();
  }

  public allCountries = this.countryService.fetchCountryData();

  sort: Sort;

  filter:RowFilter[];

  public formState$ = this.store$.select(state => state.users.formState);

  // public allItems$ = this.store$.pipe(select(UsersSelectors.selectAllItems));
  public allItems$ = this.store$.select(UsersSelectors.selectItemsFilterAndSortBy(this.filter, this.sort));

  public fanItems$ = this.store$.select(UsersSelectors.selectItemsFilterAndSortBy([{key: "groups", value:[5]}], this.sort));

  public celebrityItems$ = this.store$.select(UsersSelectors.selectItemsFilterAndSortBy([{key: "groups", value:[4]}], this.sort));

  public moderatorItems$ = this.store$.select(UsersSelectors.selectItemsFilterAndSortBy([{key: "groups", value:[3]}], this.sort));

  public adminItems$ = this.store$.select(UsersSelectors.selectItemsFilterAndSortBy([{key: "groups", value:[2]}], this.sort));

  public groupEntities$ = this.store$.select(state => state.groups.entities);
  public allGroups$ = this.store$.select(GroupSelectors.selectAllItems);
  public viewMode$ = this.store$.select(state => state.users.viewMode);
  public isLoading$ = this.store$.select(UsersSelectors.isLoading);
  public message$ = this.store$.select(UsersSelectors.message);

  // public loggedInUser$ = this.store$.select(AuthSelectors.loggedInUser);

  public loggedInUser$ = this.store$.select(state => state.auth.me);

  public forNavigateTo$ = combineLatest(
    this.viewMode$,
    this.formState$
  );
  


  /* 
  public filteredAndSortedItems$ = combineLatest(
    this.allItems$,
    this.sort$,
    this.filter$
  ).subscribe(([items, sort, filter]) => {
    if (filter) {
      console.log("Selector filter");
      let all = items;
      filter.forEach(f => {
        all = all.filter(p => p[f.key] === f.value);
        console.log(all);
      })
    }
    if (sort) {
      console.log("Selector sort");
      this.allItems = items.sort(sortStore(sort));
    }
    console.log(this.allItems);
  });  
  */

  private subscriptions: Array<Subscription> = [];

  /**
   * Loads Users from the server
   */
  public loadItems(
    filter : any = null, 
    pindex : number = 0, 
    psize : number = 20000, 
    sort : any = null, 
  ): void {
    this.store$.dispatch(new UsersActions.LoadUsersAction({
      filter, 
      pindex, 
      psize, 
      sort       
    }))
  }

  /**
   * Sort user details from the server
   */
  public sortItems(sort: any, forRole?:string): void {
    this.sort = sort;
    UsersSelectors.selectItemsFilterAndSortBy().release()
    // this.allItems$ = this.store$.select(UsersSelectors.selectItemsFilterAndSortBy(this.filter, this.sort));
    switch (forRole) {
      case 'fan':
        this.fanItems$ = this.store$.select(UsersSelectors.selectItemsFilterAndSortBy([{key: "groups", value:[5]}], this.sort));        
        break;

      case 'celebrity':
        this.celebrityItems$ = this.store$.select(UsersSelectors.selectItemsFilterAndSortBy([{key: "groups", value:[4]}], this.sort));        
        break;

      case 'moderator':
        this.moderatorItems$ = this.store$.select(UsersSelectors.selectItemsFilterAndSortBy([{key: "groups", value:[3]}], this.sort));        
        break;

      case 'admin':
        this.adminItems$ = this.store$.select(UsersSelectors.selectItemsFilterAndSortBy([{key: "groups", value:[2]}], this.sort));        
        break;
    
      default:
        break;
    }


  
  
    }

  /**
   * Load user details from the server
   */
  public getItem(userid?: string): void {
    this.store$.dispatch(new UsersActions.GetUserAction({id: userid }))
    // this.router.navigate(['/admin-panel/users/edit-form']);
  }

  /**
   * Load user details from the server
   */
  public releaseItem(): void {
    // console.log("releaseItem");
    // this.store$.dispatch(new UsersActions.GetUserAction({id: null}))
    // console.log("Item release !!!");
    // this.router.navigate(['/admin-panel/users/list']);
    this.store$.dispatch(new UsersActions.LoadUsersAction())
  }

  /**
   * Add new user to the server
   */
  public createItem(): void {
    let subscription = this.formState$.subscribe(fs => {
      // console.log("fs.value");
      // console.log(fs.value);
      // console.log("createItem new User(fs.value)");
      // console.log(new User(fs.value));
      if(fs.isValid && fs.isDirty) {
        let f = {
          ...fs.value,
          phone: this.allCountries.filter(country => country.iso2 === fs.value.country)[0].dialCode + fs.value.phone,
          groups: unbox(fs.value.groups)
        }
        // console.log(f);
        this.store$.dispatch(new UsersActions.CreateUserAction({ item: f }));
      }
    })
    subscription.unsubscribe(); 
  }

  /**
   * Edit user to the server
   */
  public updateItem() {

    let subscription = this.formState$.subscribe(fs => {
      // console.log("updateItem new User(fs.value)");
      // console.log(new User(fs.value));
      if (fs.isValid && fs.isDirty) {
        let f = {
          ...fs.value,
          groups: unbox(fs.value.groups)
        }
        console.log(f);
        this.store$.dispatch(new UsersActions.UpdateUserAction({ item: f }))
      }
    }); 
    subscription.unsubscribe();
    // TODO : Remove subscrition and work with pipe
    /*
    this.formState$.pipe(
      take(1),
      filter(s => s.isValid),
      map(fs => new SetSubmittedValueAction(fs.value)),
      tap((fs) => console.log('Avant : ' + fs.value)),
      this.store$.dispatch(new UsersActions.EditUserAction({ userid: this.Id, data: new User(fs.value) }))
    )
    */

  }

  /**
   * Add new user to the server
   */
  public deleteItem(): void {
    this.store$.dispatch(new UsersActions.DeleteUserAction({ id: this.Id } ))
  }

 /**
   * Dispatches register action
   *
   * @param form
   */
  public generatePassword(phone): void {
      this.store$.dispatch(new UsersActions.DoGeneratePassword( { phone: phone } ))
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
    /* 
    this.subscriptions.push(
      this.forNavigateTo$.subscribe(([viewmode, selectedItem]) => {
        if (viewmode === 'edition' || selectedItem) {
          // console.log("Edition mode !!!");
          this.router.navigate(['/admin-panel/users/edit-form']);
        }
        else {
          // console.log("List mode !!!");
          this.router.navigate(['/admin-panel/users/list']);
        }     
      })
    ); 
    */
  
    /* 
    this.subscriptions.push(
      this.formState$.subscribe( fs => {
        this.Id = fs.value.phone;
        if (fs.value.phone !== "") this.router.navigate(['/admin-panel/users/edit-form']);
      })
    ); 
    */
  
    this.subscriptions.push(
      this.forNavigateTo$.subscribe(([viewmode, fs]) => {
        this.Id = fs.value.phone;
        if (viewmode === 'creation' || viewmode === 'update') {
          this.router.navigate(['/admin-panel/users/edit-form']);
        }
        /* 
        else if (viewmode === 'view' && fs.value.id) {
          this.router.navigate(['/admin-panel/news/details']);
        } 
        */
        else {
          this.router.navigate(['/admin-panel/users/list']);
        }     
      })
    );

  }
}