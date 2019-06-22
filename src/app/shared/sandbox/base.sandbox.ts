import { Injectable } 	    from '@angular/core';
import { Store }            from '@ngrx/store';
import { Observable }       from 'rxjs/Observable';
import { localeDateString } from '@shared/utility';

import {
  AppState,
  AuthSelectors,
  AuthActions,
  SettingsStoreSelectors
} from '@shared/store';

export abstract class Sandbox {

  public loggedUser$: Observable<any> = this.store$.select(AuthSelectors.loggedInUser);
  public culture$:    Observable<any> = this.store$.select(SettingsStoreSelectors.settingsCulture);
  public culture:     string;

  constructor(
    protected store$: Store<AppState.State>
    ) {}

  /**
   * Pulls user from local storage and saves it to the store
   *
  public loadUser(): void {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    this.store$.dispatch(new AuthActions.AddUserAction(new User(user)));

    this.store$.dispatch(new AuthActions.LoadRequestAction());
  }
  */

  /**
   * Formats date string based on selected culture
   * 
   * @param value
   */
  public formatDate(value: string) {
    return localeDateString(value, this.culture);
  }
}