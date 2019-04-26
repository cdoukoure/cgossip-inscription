import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
  } from '@ngrx/store';

  import { State } from './state';

export const getSelectedLanguage   = (state: State) => state.selectedLanguage;
export const getSelectedCulture    = (state: State) => state.selectedCulture;
export const getAvailableLanguages = (state: State) => state.availableLanguages;

export const selectSettingsState: MemoizedSelector<object, State> = createFeatureSelector<State>('settings');

export const settingsLanguage: MemoizedSelector<object, string> = createSelector(
  selectSettingsState,
  getSelectedLanguage
);

export const settingsCulture: MemoizedSelector<object, string> = createSelector(
    selectSettingsState,
    getSelectedCulture
  );
  
export const settingsAvailableLanguages: MemoizedSelector<object, any[]> = createSelector(
    selectSettingsState,
    getAvailableLanguages
);
  
    