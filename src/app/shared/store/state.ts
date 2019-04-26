import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './utils/router-utils';

import { PostState } from './posts-store';
import { NewsState } from './news-store';
import { UsersState } from './users-store';
import { GroupState } from './groups-store';
import { AuthState } from './auth-store';


export interface State {
  router: RouterReducerState<RouterStateUrl>;
  auth: AuthState.State;
  groups: GroupState.State;
  users: UsersState.State;
  posts: PostState.State;
  news: NewsState.State;
}


