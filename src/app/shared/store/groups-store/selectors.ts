import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';


import { State, featureAdapter } from './state';
import { Group } from '@app/shared/models';
import { RowFilter, sortStore } from '../utils/store-utils';

export const getMessage = (state: State): any => state.message;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getFormState = (state: State): any => state.formState;

// export const getAllItems = (state: State): any => state.posts;

export const selectState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('groups');

/* export const selectAllItems: MemoizedSelector<
  object,
  any
> = createSelector(
  selectState,
  getAllItems
); */

export const selectAllItems: (
  state: object
) => Group[] = featureAdapter.getSelectors(selectState).selectAll;

export const selectItemsFilterAndSortBy = (filter?:RowFilter[], sort?: any) =>
  createSelector(selectAllItems,
    (allItems: Group[]) => {
      if (allItems) {
        let items = {...allItems}; 
        if (filter && filter.length > 0) {
          // console.log("Selector filter");
          filter.forEach(f => {
            allItems = allItems.filter(p => p[f.key] === f.value);
          })
        }
        if (sort) {
          // console.log("Selector sort");
          allItems = allItems.sort(sortStore(sort));
        }
        return allItems;
      } else {
        return null;
      }
    }
  );

export const itemBy = (key: string, value) =>
  createSelector(
    this.allItems,
    (allItems: Group[]) => {
      if (allItems) {
        return allItems.find(p => p[key] === value);
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

export const formState: MemoizedSelector<
  object,
  any
> = createSelector(
  selectState,
  getFormState
);