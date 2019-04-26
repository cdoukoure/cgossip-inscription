import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

// import { GroupsApiClient }    from '@app/administration/posts/postsApiClient.service';
import * as actions         from './actions';
import { UtilService, wrapAsAsyncItems } from '@app/shared/utility';
// import { allItems } from './selectors';
// import { IGroup } from '@app/shared/models';
// import { AppState } from '..';
import { State } from './state';

@Injectable()
export class GroupsEffects {

  constructor(
    private notifyService: UtilService,
    private store$: Store<State>,
    private actions$: Actions,
    //private postsApiClient: GroupsApiClient
    ) {
      // super(formActions$);
    }

  /**
   * Load users effect
   */
  /* @Effect()
  loadItems$: Observable<Action> = this.actions$.pipe(
    ofType<actions.LoadGroupsAction>(
      actions.ActionTypes.LOAD_ITEMS
    ),
    withLatestFrom(
      //this.store$.select(state => state.posts.posts)
      this.store$.pipe(select(selectAllItems))
    ),
    switchMap(() =>
      this.groupsApiClient
      .loadItems()
      .pipe(
        // map(res => wrapAsAsyncItems<Group>(res.data.posts)),        // add AsyncItem wrappers
        map(res => {
          // console.log("Effect LoadGroupsSuccessAction");
          // console.log(asyncItems);
          return new actions.LoadGroupsSuccessAction( { items: res.data.posts } );
        }),
        catchError(msg => {
          this.notifyService.showNotification('top', 'center', 
            'Erreur!!! Veuillez réessayer plutard.', 
            'danger');
            return observableOf(new actions.LoadGroupsFailAction({ msg }))
        })
      )
    )
  );
 */
  /**
   * Set items 
   */
  @Effect()
  setItems$: Observable<Action> = this.actions$.pipe(
    ofType<actions.SetGroupsAction>(
      actions.ActionTypes.SET_ITEMS
    ),
    map( () => {
      console.log("Group effect SetGroupSuccessAction");
      return new actions.SetGroupSuccessAction( )
    }),
    catchError(msg => {
      this.notifyService.showNotification('top', 'center', 
        'Erreur!!! Impossible de charger la liste des groupes.', 
        'danger');
        return observableOf(new actions.SetGroupFailAction({ msg }))
    })
  ); 

  /**
   * Get single item effect
   */
  /* @Effect()
  getItem$: Observable<Action> = this.actions$.pipe(
    ofType<actions.GetGroupAction>(
      actions.ActionTypes.GET_ITEM
    ),
    map( () => new actions.GetGroupSuccessAction( )),
    catchError(msg => {
      this.notifyService.showNotification('top', 'center', 
        'Erreur!!! Veuillez réessayer plutard.', 
        'danger');
        return observableOf(new actions.GetGroupFailAction({ msg }))
    })
  ); */ 


  /**
   * Update item effect
   */
  /* @Effect()
  doCreate$: Observable<Action> = this.actions$.pipe(
    ofType<actions.CreateGroupAction>(
      actions.ActionTypes.CREATE_ITEM
    ),
    switchMap(action => 
        this.postsApiClient
	      .createItem(action.payload.item)
	      .pipe(
	        map(res => {
            if (res.code === '401') {
              this.notifyService.showNotification('top', 'right', res.msg, 'danger');
              return new actions.CreateGroupFailAction({ msg: res.msg });
            } else {
              this.notifyService.showNotification('top', 'right', 'Opération réussie', 'success');
              return new actions.CreateGroupSuccessAction( {item: res.data, msg:res.msg } );  
            }
          }),
          catchError( res => {
            this.notifyService.showNotification('top', 'right', 
              'Erreur!!! Veuillez réessayer plutard. Message systême:' + res.msg, 
              'danger');
            return observableOf(new actions.CreateGroupFailAction({ msg: res.msg }))
          })
	      ) 
    )
  );
 */
  /**
   * Update item effect
   */
  /*  @Effect()
  doUpdate$: Observable<Action> = this.actions$.pipe(
    ofType<actions.UpdateGroupAction>(
      actions.ActionTypes.UPDATE_ITEM
    ),
    switchMap(action => 
        this.postsApiClient
	      .updateItem(action.payload.item)
	      .pipe(
	        map( res => { 
            if (res.code === '401') {
              this.notifyService.showNotification('top', 'right', res.msg, 'danger');
              return new actions.UpdateGroupFailAction({ msg: res.msg });
            } else {
              this.notifyService.showNotification('top', 'right', res.msg, 'success');
              return new actions.UpdateGroupSuccessAction( { item:res.data, msg:res.msg } );  
            }
          }),
          catchError( res => {
            this.notifyService.showNotification('top', 'right', res.msg, 'danger');
            return observableOf(new actions.UpdateGroupFailAction({ msg: res.msg }));
          })
	      ) 
    )
  ); */

  /**
   * Delete effect
   */
  /* @Effect()
  doDelete$: Observable<Action> = this.actions$.pipe(
    ofType<actions.DeleteGroupAction>(
      actions.ActionTypes.DELETE_ITEM
    ),
    switchMap(action => 
        this.postsApiClient
	      .deleteItem({id: action.payload.id})
	      .pipe(
	        map( res => { 
            if (res.code === '401') {
              this.notifyService.showNotification('top', 'right', res.msg, 'danger');
              return new actions.DeleteGroupFailAction({msg: res.msg});
            } else {
              this.notifyService.showNotification('top', 'right', res.msg, 'success');
              return new actions.DeleteGroupSuccessAction( { id: res.id, msg:res.msg } );  
            }
          }),
          catchError( res => {
            this.notifyService.showNotification('top', 'right', 
              'Erreur!!! Veuillez réessayer plutard. Message systême:' + res.msg, 
              'danger');
            return observableOf(new actions.DeleteGroupFailAction({msg: res.msg}))
          })
	      ) 
    )
  ); */



}