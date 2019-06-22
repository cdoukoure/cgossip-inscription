import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom, take, share } from 'rxjs/operators';

import { UsersApiClient }    from '@app/administration/users/usersApiClient.service';
import * as actions         from './actions';
import { UtilService } from '@app/shared/utility';
import { State } from '../state';
import { selectAllItems } from './selectors';
import { GroupActions } from '../groups-store';
import { AppState } from '..';

@Injectable()
export class UsersEffects {

  constructor(
    private notifyService: UtilService,
    protected store$: Store<AppState.State>,
    private actions$: Actions,
    private usersApiClient: UsersApiClient
    ) {
      // super(formActions$);
    }

  /**
   * Load users effect
   */
  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType<actions.LoadUsersAction>(
      actions.ActionTypes.LOAD_ITEMS
    ),
    withLatestFrom(
      //this.store$.select(state => state.users.users)
      this.store$.pipe(select(selectAllItems))
    ),
    switchMap(() =>
      this.usersApiClient
      .loadItems()
      .pipe(
        tap(res => {
          // console.log("Effect Tap SetGroupsAction");
          // return new GroupActions.SetGroupsAction({items: res.data.groups});
          this.store$.dispatch(new GroupActions.SetGroupsAction({items: res.data.groups}))
        }),
        map(res => {
          // this.store$.dispatch()
          // new GroupActions.SetGroupsAction({items: res.data.groups})
          return new actions.LoadUsersSuccessAction( { items: res.data.users } )
        }),
        // catchError(msg => observableOf(new actions.LoadUsersFailAction({ msg })))
        catchError(msg => {
          this.notifyService.showNotification('top', 'center', 
            'Erreur!!! Veuillez réessayer plutard.', 
            'danger');
            return observableOf(new actions.LoadUsersFailAction({ msg }))
        })
      )
    )
  );

  /**
   * Load users effect
   */
  @Effect()
  sortItems$: Observable<Action> = this.actions$.pipe(
    ofType<actions.SortUsersAction>(
      actions.ActionTypes.SORT_ITEMS
    ),
    /* withLatestFrom(
      //this.store$.select(state => state.users.users)
      this.store$.pipe(select(allItems))
    ), */
    switchMap(action =>
      this.usersApiClient
      .loadItems()
      .pipe(
        map(res => {
          return new actions.SortUsersSuccessAction( { items: res.data.users, sort: action.payload.sort } )
        }),
        catchError(msg => {
          this.notifyService.showNotification('top', 'center', 
            'Erreur!!! Veuillez réessayer plutard.', 
            'danger');
            return observableOf(new actions.SortUsersFailAction({ msg }))
        })
      )
    )
  );

  /**
   * Sort users effect
   *
  @Effect()
  sortUsers$: Observable<Action> = this.actions$.pipe(
    ofType<actions.SortUsersAction>(
      actions.ActionTypes.SORT_ITEMS
    ),
    map( res => new actions.SortUsersSuccessAction( {items: res.payl})),
    //map(res => new actions.LoadUsersSuccessAction( { users: res.data.users, total: res.data.total, groups: res.data.groups } )),
    catchError(msg => {
      this.notifyService.showNotification('top', 'center', 
        'Erreur!!! Veuillez réessayer plutard.', 
        'danger');
        return observableOf(new actions.SortUsersFailAction({ msg }))
    })
  );
  /*@Effect()
  getUser$: Observable<Action> = this.actions$.pipe(
    ofType<actions.GetUserAction>(actions.ActionTypes.GET_ITEM),
    tap(action => console.log('User is logging out', action))
  );*/


  /**
   * Get single item effect
   */
  @Effect()
  getUser$: Observable<Action> = this.actions$.pipe(
    ofType<actions.GetUserAction>(
      actions.ActionTypes.GET_ITEM
    ),
    map( () => new actions.GetUserSuccessAction( {msg:"Utilisateur selectionné"} )),
    catchError(msg => {
      this.notifyService.showNotification('top', 'center', 
        'Erreur!!! Veuillez réessayer plutard.', 
        'danger');
        return observableOf(new actions.GetUserFailAction({ msg }))
    })
  ); 
  /* @Effect()
  getUser$: Observable<Action> = this.actions$.pipe(
    ofType<actions.GetUserAction>(actions.ActionTypes.GET_ITEM),
    tap(action => console.log('User is logging out', action))
  ); */

  /**
   * Update item effect
   */
  @Effect()
  doCreate$: Observable<Action> = this.actions$.pipe(
    ofType<actions.CreateUserAction>(
      actions.ActionTypes.CREATE_ITEM
    ),
    switchMap(action => 
        this.usersApiClient
	      .createItem(action.payload.item)
	      .pipe(
	        map( res => {
            if (res.code == '200') {
              this.notifyService.showNotification('top', 'right', 'Opération réussie', 'success');
              return new actions.CreateUserSuccessAction( {item: res.data, msg:res.msg } );  
            } else {
              this.notifyService.showNotification('top', 'right', res.msg, 'danger');
              return new actions.CreateUserFailAction({ msg: res.msg });
            }
          }),
          catchError( res => {
            this.notifyService.showNotification('top', 'right', 
              'Erreur!!! Veuillez réessayer plutard. Message systême:' + res.msg, 
              'danger');
            return observableOf(new actions.CreateUserFailAction({ msg: res.msg }))
          })
	      ) 
    )
  );

  /**
   * Update item effect
   */
   @Effect()
  doUpdate$: Observable<Action> = this.actions$.pipe(
    ofType<actions.UpdateUserAction>(
      actions.ActionTypes.UPDATE_ITEM
    ),
    switchMap(action => 
        this.usersApiClient
	      .updateItem(action.payload.item)
	      .pipe(
	        map( res => { 
            if (res.code == '200') {
              this.notifyService.showNotification('top', 'right', res.msg, 'success');
              return new actions.UpdateUserSuccessAction( { user:res.data, msg:res.msg } );  
            } else {
              this.notifyService.showNotification('top', 'right', res.msg, 'danger');
              return new actions.UpdateUserFailAction({ msg: res.msg });
            }
          }),
          catchError( res => {
            this.notifyService.showNotification('top', 'right', res.msg, 'danger');
            return observableOf(new actions.UpdateUserFailAction({ msg: res.msg }));
          })
	      ) 
    )
  );

  /**
   * Profile effect
   */
  @Effect()
  doDelete$: Observable<Action> = this.actions$.pipe(
    ofType<actions.DeleteUserAction>(
      actions.ActionTypes.DELETE_ITEM
    ),
    switchMap(action => 
        this.usersApiClient
	      .deleteItem({phone: action.payload.id})
	      .pipe(
	        map( res => { 
            if (res.code == '200') {
              this.notifyService.showNotification('top', 'right', res.msg, 'success');
              return new actions.DeleteUserSuccessAction( res );  
            } else {
              this.notifyService.showNotification('top', 'right', res.msg, 'danger');
              return new actions.DeleteUserFailAction(res);
            }
          }),
          catchError( res => {
            this.notifyService.showNotification('top', 'right', 
              'Erreur!!! Veuillez réessayer plutard. Message systême:' + res.msg, 
              'danger');
            return observableOf(new actions.DeleteUserFailAction(res))
          })
	      ) 
    )
  );

  /**
   * Profile effect
   */
  @Effect()
  doGenerate$: Observable<Action> = this.actions$.pipe(
    ofType<actions.DoGeneratePassword>(
      actions.ActionTypes.DO_GENERATE
    ),
    switchMap(action => 
        this.usersApiClient
	      .adminGenerate({phone: action.payload.phone})
	      .pipe(
	        map( res => { 
            if (res.code == '200') {
              this.notifyService.showNotification('top', 'right', res.msg, 'success');
              return new actions.DoGeneratePasswordSuccess( );  
            } else {
              this.notifyService.showNotification('top', 'right', res.msg, 'danger');
              return new actions.DoGeneratePasswordFail();
            }
          }),
          catchError( () => {
            this.notifyService.showNotification('top', 'center', 
              'Erreur!!! Veuillez contacter l\'administrateur.', 
              'danger');
            return observableOf(new actions.DoGeneratePasswordFail())
          })
	      ) 
    )
  );



}