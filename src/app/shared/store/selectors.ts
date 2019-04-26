import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AuthSelectors } from './auth-store';
import { UsersSelectors } from './users-store';

// import { MyOtherFeatureStoreSelectors } from './my-other-feature-store';

export { AuthSelectors, UsersSelectors } 

/*
export const selectError: MemoizedSelector<object, string> = createSelector(
  AuthSelectors.message,
  // MyOtherFeatureStoreSelectors.selectMyOtherFeatureError,
  // (authMessage: string, myOtherFeatureError: string) => {
  (authMessage: string) => {
    return authMessage || '';
  }
);

/***
export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  MyFeatureStoreSelectors.selectMyFeatureIsLoading,
  MyOtherFeatureStoreSelectors.selectMyOtherFeatureIsLoading,
  (myFeature: boolean, myOtherFeature: boolean) => {
    return myFeature || myOtherFeature;
  }
);
**/