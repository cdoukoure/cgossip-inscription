import { FormGroupState, createFormGroupState } from 'ngrx-forms';

import { 
  LoggedUser, 
  PasswordForm, 
  ProfileForm, 
  Password, 
  ConfigPassword, 
  Profile, 
  ConfigProfile, 
  FirstLogin 
} from '@shared/models';

export const PROFILE_EDIT_FORM = 'PROFILE_EDIT_FORM';
export const PASS_EDIT_FORM = 'PASS_EDIT_FORM';
export const FIRST_EDIT_FORM = 'FIRST_EDIT_FORM';

export interface State {
  me: LoggedUser | null;
  jwt: string | null;
  expireat: any | null;
  authIsLoading: boolean;
  authMessage: string;
  phone: string | null;
  codev: string | null;
  step: number;
  links : any;
  firstLogin: FormGroupState<FirstLogin>;
  passwordEdit: FormGroupState<PasswordForm>;
  profilEdit: FormGroupState<ProfileForm>;
}

const initialFirstLoginFormGroupState = createFormGroupState<FirstLogin>(FIRST_EDIT_FORM,
  new FirstLogin()
);

const initialPasswordFormGroupState = createFormGroupState<PasswordForm>(PASS_EDIT_FORM, {
  password : new Password(),
  config: new ConfigPassword()
});

const initialProfileFormGroupState = createFormGroupState<ProfileForm>(PROFILE_EDIT_FORM, {
  profile: new Profile(),
  config: new ConfigProfile()
});

export const initialState: State = {
  me: null,
  jwt: null,
  expireat: null,
  authIsLoading: false,
  authMessage: null,
  phone: null,
  codev: null,
  step: 1,
  links: null,
  firstLogin: initialFirstLoginFormGroupState,
  passwordEdit: initialPasswordFormGroupState,
  profilEdit: initialProfileFormGroupState
};