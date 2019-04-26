import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { NewsApiClient }    from '@app/administration/news/newsApiClient.service';
import * as actions         from './actions';
import { UtilService } from '@app/shared/utility';
import { selectAllItems } from './selectors';
import { Post } from '@app/shared/models';
import { AppState } from '..';

@Injectable()
export class NewsEffects {

  constructor(
    private notifyService: UtilService,
    private store$: Store<AppState.State>,
    private actions$: Actions,
    private newsApiClient: NewsApiClient
    ) {
      // super(formActions$);
    }

  /**
   * Load users effect
   */
  @Effect()
  loadItems$: Observable<Action> = this.actions$.pipe(
    ofType<actions.LoadNewsAction>(
      actions.ActionTypes.LOAD_ITEMS
    ),
    withLatestFrom(
      //this.store$.select(state => state.News.News)
      this.store$.pipe(select(selectAllItems))
    ),
    switchMap(() =>
      this.newsApiClient
      .loadItems()   
      .pipe(
        map(res => {
          // console.log("Effect LoadNewsSuccessAction");
          // console.log(res);
          return new actions.LoadNewsSuccessAction( { items: res.data.news } );
        }),
        catchError(msg => {
          this.notifyService.showNotification('top', 'center', 
            'Erreur!!! Veuillez réessayer plutard.', 
            'danger');
            return observableOf(new actions.LoadNewsFailAction({ msg }))
        })
      )
    )
  );

  /**
   * Get single item effect
   */
  @Effect()
  getItem$: Observable<Action> = this.actions$.pipe(
    ofType<actions.GetNewsAction>(
      actions.ActionTypes.GET_ITEM
    ),
    map( () => new actions.GetNewsSuccessAction( )),
    catchError(msg => {
      this.notifyService.showNotification('top', 'center', 
        'Erreur!!! Veuillez réessayer plutard.', 
        'danger');
        return observableOf(new actions.GetNewsFailAction({ msg }))
    })
  ); 

  /**
   * Update item effect
   */
  @Effect()
  doCreate$: Observable<Action> = this.actions$.pipe(
    ofType<actions.CreateNewsAction>(
      actions.ActionTypes.CREATE_ITEM
    ),
    switchMap(action => 
        this.newsApiClient
	      .createItem(action.payload)
	      .pipe(
	        map(res => {
            if (res.code == '200') {
              this.notifyService.showNotification('top', 'right', 'Opération réussie', 'success');
              return new actions.CreateNewsSuccessAction( {item: res.data, msg:res.msg } );  
            } else {
              this.notifyService.showNotification('top', 'right', res.msg, 'danger');
              return new actions.CreateNewsFailAction({ msg: res.msg });
            }
          }),
          catchError( res => {
            this.notifyService.showNotification('top', 'right', 
              'Erreur!!! Veuillez réessayer plutard. Message systême:' + res.msg, 
              'danger');
            return observableOf(new actions.CreateNewsFailAction({ msg: res.msg }))
          })
	      ) 
    )
  );

  /**
   * Update item effect
   */
   @Effect()
  doUpdate$: Observable<Action> = this.actions$.pipe(
    ofType<actions.UpdateNewsAction>(
      actions.ActionTypes.UPDATE_ITEM
    ),
    switchMap(action => 
        this.newsApiClient
	      .updateItem(action.payload)
	      .pipe(
	        map( res => { 
            if (res.code == '200') {
              this.notifyService.showNotification('top', 'right', res.msg, 'success');
              return new actions.UpdateNewsSuccessAction( { item:res.data, msg:res.msg } );  
            } else {
              this.notifyService.showNotification('top', 'right', res.msg, 'danger');
              return new actions.UpdateNewsFailAction({ msg: res.msg });
            }
          }),
          catchError( res => {
            this.notifyService.showNotification('top', 'right', res.msg, 'danger');
            return observableOf(new actions.UpdateNewsFailAction({ msg: res.msg }));
          })
	      ) 
    )
  );

  /**
   * Delete effect
   */
  @Effect()
  doDelete$: Observable<Action> = this.actions$.pipe(
    ofType<actions.DeleteNewsAction>(
      actions.ActionTypes.DELETE_ITEM
    ),
    switchMap(action => 
        this.newsApiClient
	      .deleteItem({id: action.payload.id, action:"deletion"})
	      .pipe(
	        map( res => { 
            if (res.code == '200') {
              this.notifyService.showNotification('top', 'right', res.msg, 'success');
              return new actions.DeleteNewsSuccessAction( { id: res.id, msg:res.msg } );  
            } else {
              this.notifyService.showNotification('top', 'right', res.msg, 'danger');
              return new actions.DeleteNewsFailAction({msg: res.msg});
            }
          }),
          catchError( res => {
            this.notifyService.showNotification('top', 'right', 
              'Erreur!!! Veuillez réessayer plutard. Message systême:' + res.msg, 
              'danger');
            return observableOf(new actions.DeleteNewsFailAction({msg: res.msg}))
          })
	      ) 
    )
  );

}