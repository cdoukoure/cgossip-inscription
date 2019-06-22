import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { PostsApiClient }    from '@app/administration/posts/postsApiClient.service';
import * as actions         from './actions';
import { UtilService, wrapAsAsyncItems } from '@app/shared/utility';
import { selectAllItems } from './selectors';
import { Post } from '@app/shared/models';
import { AppState } from '..';

@Injectable()
export class PostsEffects {

  constructor(
    private notifyService: UtilService,
    private store$: Store<AppState.State>,
    private actions$: Actions,
    private postsApiClient: PostsApiClient
    ) {
      // super(formActions$);
    }

  /**
   * Load users effect
   */
  @Effect()
  loadItems$: Observable<Action> = this.actions$.pipe(
    ofType<actions.LoadPostsAction>(
      actions.ActionTypes.LOAD_ITEMS
    ),
    /*
    withLatestFrom(
      this.store$.pipe(select(selectAllItems))
    ),
    */
    switchMap(action =>
      this.postsApiClient
      .loadItems(action.payload)   
      .pipe(
        map(res => {
          return new actions.LoadPostsSuccessAction( { items: res.data.posts } );
        }),
        catchError(msg => {
          this.notifyService.showNotification('top', 'center', 
            'Erreur!!! Veuillez réessayer plutard.', 
            'danger');
            return observableOf(new actions.LoadPostsFailAction({ msg }))
        })
      )
    )
  );

  /**
   * Get single item effect
   */
  @Effect()
  getItem$: Observable<Action> = this.actions$.pipe(
    ofType<actions.GetPostAction>(
      actions.ActionTypes.GET_ITEM
    ),
    /* map( () => new actions.GetPostSuccessAction( )),
    catchError(msg => {
      this.notifyService.showNotification('top', 'center', 
        'Erreur!!! Veuillez réessayer plutard.', 
        'danger');
        return observableOf(new actions.GetPostFailAction({ msg }))
    }) */
    switchMap(action => 
      this.postsApiClient
      .getItem({id: action.payload.id})   
      .pipe(
        map(res => {
          if (res.code == '200') {
            return new actions.GetPostSuccessAction( { item: res.data } );            
          } else {
            return new actions.GetPostFailAction( { msg: res.msg } ); 
          }
        }),
        catchError(msg => {
          this.notifyService.showNotification('top', 'right', 
            'Erreur!!! Veuillez réessayer plutard.', 
            'danger');
            return observableOf(new actions.GetPostFailAction({ msg }))
        })
      )
    )
  ); 


  /**
   * Update item effect
   */
  @Effect()
  doCreate$: Observable<Action> = this.actions$.pipe(
    ofType<actions.CreatePostAction>(
      actions.ActionTypes.CREATE_ITEM
    ),
    switchMap(action => 
        this.postsApiClient
	      .createItem(action.payload.item)
	      .pipe(
	        map(res => {
            if (res.code == '200') {
              this.notifyService.showNotification('top', 'right', 'Opération réussie', 'success');
              return new actions.CreatePostSuccessAction( {item: res.data, msg:res.msg } );  
            } else {
              this.notifyService.showNotification('top', 'right', res.msg, 'danger');
              return new actions.CreatePostFailAction({ msg: res.msg });
            }
          }),
          catchError( res => {
            this.notifyService.showNotification('top', 'right', 
              'Erreur!!! Veuillez réessayer plutard. Message systême:' + res.msg, 
              'danger');
            return observableOf(new actions.CreatePostFailAction({ msg: res.msg }))
          })
	      ) 
    )
  );

  /**
   * Update item effect
   */
   @Effect()
  doUpdate$: Observable<Action> = this.actions$.pipe(
    ofType<actions.UpdatePostAction>(
      actions.ActionTypes.UPDATE_ITEM
    ),
    switchMap(action => 
        this.postsApiClient
	      .updateItem(action.payload.item)
	      .pipe(
	        map( res => { 
            if (res.code == '200') {
              this.notifyService.showNotification('top', 'right', res.msg, 'success');
              return new actions.UpdatePostSuccessAction( { item:res.data, msg:res.msg } );  
            } else {
              this.notifyService.showNotification('top', 'right', res.msg, 'danger');
              return new actions.UpdatePostFailAction({ msg: res.msg });
            }
          }),
          catchError( res => {
            this.notifyService.showNotification('top', 'right', res.msg, 'danger');
            return observableOf(new actions.UpdatePostFailAction({ msg: res.msg }));
          })
	      ) 
    )
  );

  /**
   * Delete effect
   */
  @Effect()
  doDelete$: Observable<Action> = this.actions$.pipe(
    ofType<actions.DeletePostAction>(
      actions.ActionTypes.DELETE_ITEM
    ),
    switchMap(action => 
        this.postsApiClient
	      .deleteItem({id: action.payload.id})
	      .pipe(
	        map( res => { 
            if (res.code == '200') {
              this.notifyService.showNotification('top', 'right', res.msg, 'success');
              return new actions.DeletePostSuccessAction( { id: res.id, msg:res.msg } );  
            } else {
              this.notifyService.showNotification('top', 'right', res.msg, 'danger');
              return new actions.DeletePostFailAction({msg: res.msg});
            }
          }),
          catchError( res => {
            this.notifyService.showNotification('top', 'right', 
              'Erreur!!! Veuillez réessayer plutard. Message systême:' + res.msg, 
              'danger');
            return observableOf(new actions.DeletePostFailAction({msg: res.msg}))
          })
	      ) 
    )
  );

  /**
   * Get single item effect
   */
  @Effect()
  postComment$: Observable<Action> = this.actions$.pipe(
    ofType<actions.DoPostComment>(
      actions.ActionTypes.COMMENT_ITEM
    ),
    switchMap(action => 
      this.postsApiClient
      .postComment(action.payload)   
      .pipe(
        map(res => {
          if (res.code == '200') {
            this.store$.dispatch(new actions.GetPostAction({id: action.payload.pubid}))
            return new actions.DoPostCommentSuccess({});            
          } else {
            return new actions.DoPostCommentFail({msg: res.msg}); 
          }
        }),
        catchError(msg => {
          this.notifyService.showNotification('top', 'right', 
            'Erreur!!! Veuillez réessayer plutard. ' + msg, 
            'danger');
            return observableOf(new actions.DoPostCommentFail({ msg }))
        })
      )
    )
  ); 

  /**
   * Treatment effect
   * Validattion task
   */
  @Effect()
  doTreatment$: Observable<Action> = this.actions$.pipe(
    ofType<actions.DoPostTreatment>(
      actions.ActionTypes.DO_TREATMENT
    ),
    switchMap(action => 
        this.postsApiClient
	      .treatment(action.payload)
	      .pipe(
	        map( res => { 
            if (res.code == '200') {
              this.notifyService.showNotification('top', 'right', res.msg, 'success');
              return new actions.UpdatePostSuccessAction({action: action.payload.action, id: action.payload.id, msg: res.msg});  
            } else {
              this.notifyService.showNotification('top', 'right', res.msg, 'danger');
              return new actions.UpdatePostFailAction({msg: res.msg});
            }
          }),
          catchError( res => {
            this.notifyService.showNotification('top', 'right', 
              'Erreur!!! Veuillez réessayer plutard. Message systême:' + res.msg, 
              'danger');
            return observableOf(new actions.UpdatePostFailAction({msg: res.msg}))
          })
	      ) 
    )
  );




}