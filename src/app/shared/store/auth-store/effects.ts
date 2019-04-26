import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf, pipe } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthApiClient }    from '@app/auth/authApiClient.service';
import * as actions         from './actions';
import { UtilService } from '@app/shared/utility';

@Injectable()
export class AuthEffects {

  constructor(
    private notifyService: UtilService,
    private actions$: Actions,
    private authApiClient: AuthApiClient) {}

  /**
   * Login effect
   */
  @Effect()
  doLogin$: Observable<Action> = this.actions$.pipe(
    ofType<actions.DoLoginAction>(
      actions.ActionTypes.DO_LOGIN
    ),
    switchMap(action => 
      {
      // console.log('Redux Effect: doLogin$ the payload was: ' + action);
      // return Observable.of({type: "DO_LOGIN_SUCCESS", payload: {message: "The effect says hi!"}});
      return this.authApiClient
      .login(action.payload)
	    .pipe(
        map(response => {
          // console.log(response)
          if(response.code == "401"){
            this.notifyService.showNotification('top', 'right', response.msg, 'danger');
            return new actions.DoLoginFailAction({ msg: response.msg })
          } else if (response.code == "100"){
            return new actions.InitFirstLoginAction( { me: response.data } )
          } else {
            this.notifyService.showNotification('top', 'right', 'Bienvenue <b>' + response.data.firstname + '</b>', 'success');
            return new actions.DoLoginSuccessAction( { me: response.data, jwt: response.jwt, expireat: response.expireat } )
          }
        }),
	      catchError(msg => observableOf(new actions.DoLoginFailAction({msg})))
      )
    })
      /*
      this.authApiClient
	    .login(action.payload)
	    .pipe(
	      map(me => new actions.DoLoginSuccessAction( { me } )),
	      catchError(msg => observableOf(new actions.DoLoginFailAction({ msg })))
      )
      */
  );

  /**
   * Login effect
   */
  @Effect()
  doInitFirstLogin$: Observable<Action> = this.actions$.pipe(
    ofType<actions.InitFirstLoginAction>(
      actions.ActionTypes.INIT_FIRSTLOGIN
    ),
    pipe(
      map(() => (new actions.DoRegisterSuccessAction())),
      catchError(msg => observableOf(new actions.DoLoginFailAction({msg})))
    )
  );

  /**
   * Login effect
   */
  @Effect()
  doFirstLogin$: Observable<Action> = this.actions$.pipe(
    ofType<actions.DoFirstLoginAction>(
      actions.ActionTypes.DO_FIRSTLOGIN
    ),
    switchMap(action => 
      {
      return this.authApiClient
	    .firstlogin(action.payload)
	    .pipe(
	      map(response => {
          if(response.code == "401"){
            this.notifyService.showNotification('top', 'right', response.msg, 'danger');
            return new actions.DoLoginFailAction({ msg: response.msg })
          } else {
            this.notifyService.showNotification('top', 'right', 'Bienvenue <b>' + response.data.firstname + '</b>', 'success');
            return new actions.DoLoginSuccessAction( { me: response.data, jwt: response.jwt, expireat: response.expireat } )
          }
        }),
	      catchError(msg => {
          this.notifyService.showNotification('top', 'center', 
            'Erreur!!! Veuillez contacter l\'administrateur', 
            'danger');
          return observableOf(new actions.DoLoginFailAction({msg}))
        })
      )
    })
      /*
      this.authApiClient
	    .login(action.payload)
	    .pipe(
	      map(me => new actions.DoLoginSuccessAction( { me } )),
	      catchError(msg => observableOf(new actions.DoLoginFailAction({ msg })))
      )
      */
  );
  /**
   * Registers effect
   */
  @Effect()
  setUser$: Observable<Action> = this.actions$.pipe(
    ofType<actions.SetUserInfo>(
      actions.ActionTypes.SET_USER_INFO
    ),
    pipe(
	      map(() => new actions.SetUserInfoSuccess( )),
	      catchError(msg => observableOf(new actions.SetUserInfoFail()))
    )
  );

  /**
   * Validate effect
   */
  @Effect()
  doValidate$: Observable<Action> = this.actions$.pipe(
    ofType<actions.DoValidateAction>(
      actions.ActionTypes.DO_VALIDATE
    ),
    switchMap(action =>
        this.authApiClient
	      .validate(action.payload)
	      .pipe(
	        map( links => new actions.DoValidateSuccessAction( { links : links } )),
	        catchError(msg => observableOf(new actions.DoValidateFailAction()))
	      )
    )
  );

  /**
   * Logout effect
   */
  @Effect()
  doLogout$: Observable<Action> = this.actions$.pipe(
    ofType<actions.DoLogoutAction>(
      actions.ActionTypes.DO_LOGOUT
    ),
    switchMap(() =>
      this.authApiClient
	    .logout()
	    .pipe(
        map( response => { 
          return new actions.DoLogoutSuccessAction();
        }),
        catchError( () => {
          this.notifyService.showNotification('top', 'right', 
            'Erreur!!! Veuillez réessayer plutard.', 
            'danger');
          return observableOf(new actions.DoLogoutFailAction())
        })
      )
    ) 
    /*map( response => { 
      // this.notifyService.showNotification('top', 'center', 'Opération réussie', 'success');
      return new actions.DoLogoutSuccessAction();
    }),
    catchError( () => {
      this.notifyService.showNotification('top', 'center', 
        'Erreur!!! Veuillez réessayer plutard.', 
        'danger');
      return observableOf(new actions.DoLogoutFailAction())
    })*/

  );

    /**
   * Profile effect
   */
  @Effect()
  doProfile$: Observable<Action> = this.actions$.pipe(
    ofType<actions.DoProfileUpdateAction>(
      actions.ActionTypes.DO_PROFILE
    ),
    switchMap(action =>
        this.authApiClient
	      .profileUpdate(action.payload)
	      .pipe(
	        map( response => { 
            this.notifyService.showNotification('top', 'right', 'Opération réussie', 'success');
            return new actions.DoProfileUpdateSuccessAction( { me : response.data } );
          }),
          catchError( res => {
            this.notifyService.showNotification('top', 'right', 
              'Erreur!!! Veuillez réessayer plutard.', 
              'danger');
            return observableOf(new actions.DoProfileUpdateFailAction({msg: res.msg }))
          })
        )
	  )
  );

  /**
   * Profile effect
   */
  @Effect()
  doPassword$: Observable<Action> = this.actions$.pipe(
    ofType<actions.DoPasswordUpdateAction>(
      actions.ActionTypes.DO_PASSWORD
    ),
    switchMap(action => 
        this.authApiClient
	      .passwordUpdate(action.payload)
	      .pipe(
	        map( response => { 
            
            if( response.code == "200" ) {
              this.notifyService.showNotification('top', 'right', response.msg , 'success');
              return new actions.DoPasswordUpdateSuccessAction( );
            } else {
              this.notifyService.showNotification('top', 'right', response.msg , 'danger');
              return new actions.DoPasswordUpdateFailAction()
            }
          }),
          catchError( () => {
            this.notifyService.showNotification('top', 'center', 
              'Erreur!!! Veuillez réessayer plutard.', 
              'danger');
            return observableOf(new actions.DoPasswordUpdateFailAction())
          })
	      ) 
    )
  );

    /**
   * Logout effect
   */
  @Effect()
  doResetForm$: Observable<Action> = this.actions$.pipe(
    ofType<actions.DoResetForm>(
      actions.ActionTypes.DO_RESET
    ),
    map( () => { 
      return new actions.DoResetFormComplete();
    })
  )


}