/* import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { User } from '@shared/models';

import { State } from './state';

export const getMessage = (state: State): string => state.message;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getAllItems = (state: State): User[] => state.users;
// export const paginateItems = (state: State, pIndex:number, pSize:number): User[] => state.users.slice(pIndex * pSize, (pIndex + 1) * pSize);
export const getItemsTotalCount = (state: State): number => state.totalCount;
export const getSelectedId = (state: State): string => state.selectedUserId;
export const getSelectedItem = (state: State): User => state.selectedUser;


export const selectState: MemoizedSelector<object, State> = createFeatureSelector<State>('Users');

export const message: MemoizedSelector<object, any> = createSelector(
  selectState,
  getMessage
);

export const isLoading: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoading
);

export const allItems: MemoizedSelector<object, User[]> = createSelector(
  selectState,
  getAllItems
);

export const itemsTotalCount: MemoizedSelector<object, number> = createSelector(
  selectState,
  getItemsTotalCount
);

export const selectedId: MemoizedSelector<object, string> = createSelector(
  selectState,
  getSelectedId
);

export const selectedItem: MemoizedSelector<object, User> = createSelector(
  selectState,
  getSelectedItem
);

 */

import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';


import { featureAdapter, State } from './state';
import { User } from '@app/shared/models';
import { sortStore, RowFilter } from '../utils/store-utils';
import { compareArray } from '@app/shared/utility';

export const getMessage = (state: State): any => state.message;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('users');

export const selectAllItems: (
  state: object
) => User[] = featureAdapter.getSelectors(selectState).selectAll;

export const selectItemsFilterAndSortBy = (filter?:RowFilter[], sort?: any) =>
  createSelector(selectAllItems,
    (allItems: User[]) => {
      if (allItems) {
        let items = {...allItems}; 
        if (filter && filter.length > 0) {
          // console.log("Selector filter");
          filter.forEach(f => {
            // console.log(f);
            if (Array.isArray(f.value)) {
              allItems = allItems.filter(p => compareArray(p[f.key], f.value));
            } else allItems = allItems.filter(p => p[f.key] === f.value);
          })
        }
        if (sort) {
          console.log("Selector sort");
          allItems = allItems.sort(sortStore(sort));
        }
        return allItems;
      } else {
        return null;
      }
    }
  );

export const message: MemoizedSelector<
  object,
  any
> = createSelector(
  selectState,
  getMessage
);

export const isLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectState,
  getIsLoading
); 