import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import moment from 'moment';

import { LoggedUser } from '@shared/models';

import { State } from './state';

const getAuthMessage = (state: State): any => state.authMessage;

const getAuthIsLoading = (state: State): boolean => state.authIsLoading;

const getLoggedIn = (state: State): any => state.me;

const getJwt = (state: State): string => state.jwt;

const getExpiration = (state: State): moment.Moment => {
  // const expiration = state.expireat;
  // const expiresAt = JSON.parse(expiration);
  // moment().add(state.expireat,'second');
  return moment(state.expireat,'second');
}    

const getIsLoggedIn = (state: State): boolean => moment().isBefore(getExpiration(state));

export const selectorState: MemoizedSelector<object, State> = createFeatureSelector<State>('auth');

export const message: MemoizedSelector<object, any> = createSelector(
  selectorState,
  getAuthMessage
);

export const isLoading: MemoizedSelector<object, boolean> = createSelector(
  selectorState,
  getAuthIsLoading
);

export const loggedInUser: MemoizedSelector<object, LoggedUser> = createSelector(
  selectorState,
  getLoggedIn
);

export const jwt: MemoizedSelector<object, string> = createSelector(
  selectorState,
  getJwt
);

export const sessionExpiration: MemoizedSelector<object, any> = createSelector(
  selectorState,
  getExpiration
);

export const isLoggedIn: MemoizedSelector<object, boolean> = createSelector(
  selectorState,
  getIsLoggedIn
);

