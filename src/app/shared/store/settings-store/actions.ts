import { ActionWithPayload }   from '@shared/utility';

export enum ActionTypes {
  SET_LANGUAGE ='[Settings] SetLanguage',
  SET_CULTURE  ='[Settings] SetCulture'
};

/**
 * Settings Actions
 */
export class SetLanguageAction implements ActionWithPayload {
  readonly type = ActionTypes.SET_LANGUAGE;

  constructor(public payload: string) { }
}

export class SetCultureAction implements ActionWithPayload {
  readonly type = ActionTypes.SET_CULTURE;

  constructor(public payload: string) { }
}

export type Actions
  = SetLanguageAction
  | SetCultureAction;
