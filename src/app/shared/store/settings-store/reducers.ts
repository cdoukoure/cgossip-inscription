import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

export function reducer(state = initialState, settings: Actions): State {
  if (!settings) return state;

  switch (settings.type) {
    case ActionTypes.SET_LANGUAGE: {
      return {
        ...state,
        selectedLanguage: settings.payload
      };
    }

    case ActionTypes.SET_CULTURE: {
      return {
        ...state,
        selectedCulture: settings.payload
      };
    }

    default: {
      return state;
    }
  }
}

