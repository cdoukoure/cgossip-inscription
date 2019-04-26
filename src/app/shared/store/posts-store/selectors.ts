import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';


import { State, featureAdapter } from './state';
import { Post } from '@app/shared/models';
import { sortStore, RowFilter } from '../utils/store-utils';

export const getMessage = (state: State): any => state.message;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getFormState = (state: State): any => state.formState;

// export const getAllItems = (state: State): any => state.posts;

export const selectPostState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('posts');

/* export const selectAllItems: MemoizedSelector<
  object,
  any
> = createSelector(
  selectPostState,
  getAllItems
); */

export const selectAllItems: (
  state: object
) => Post[] = featureAdapter.getSelectors(selectPostState).selectAll;

/* export const selectItemsByState = (state: string) =>
  createSelector(selectAllItems,
    (allItems: Post[]) => {
      console.log("selectItemsByState");
      if (allItems) {
        return allItems.filter(p => p.state === state);
      } else {
        return [];
      }
    }
  );
 */

export const selectItemsFilterAndSortBy = (filter?:RowFilter[], sort?: any) =>
  createSelector(selectAllItems,
    (allItems: Post[]) => {
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



/* export const getItemsByState = createSelector(
  selectAllItems,
  (allItems: Post[], props) => allItems.filter(p => p.state === props.state)
);

 */

 export const selectItemById = (id: string) =>
  createSelector(selectAllItems,
    (allItems: Post[]) => {
      console.log("selectItemById");
      if (allItems) {
        return allItems.find(p => p.id === id);
      } else {
        return [];
      }
    }
  );

export const selectMessage: MemoizedSelector<
  object,
  any
> = createSelector(
  selectPostState,
  getMessage
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectPostState,
  getIsLoading
);

export const selectFormState: MemoizedSelector<
  object,
  any
> = createSelector(
  selectPostState,
  getFormState
);