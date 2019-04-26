// import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { FormGroupState, createFormGroupState } from 'ngrx-forms';

import { User, UserForm, ConfigUser, IGroup } from '@shared/models';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { ofType } from '@ngrx/effects';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

export const USER_EDIT_FORM = 'USER_EDIT_FORM';

// export type TValue = any;

// export type ControlState<TValue> = {
//   value: TValue;
//   errors: {};
//   isValid: boolean;
//   isDisable: boolean
// }

// /**
//  * This type represents the child control states of a form group.
//  * take from ngrx-forms
//  * CHRIS SHALOM
//  */
// export type FormControls<Model> = {
//     [control in keyof Model]: ControlState<Model[control]>;
// };


// export type FormState<Model> = {
//   value: Model,
//   controls: FormControls<Model>;
//   isValid: boolean;
//   isDirty: boolean;
// }

// export function createControlState(TValue) : ControlState<TValue> {
//     return {
//       value: TValue,
//       errors: {},
//       isValid: false,
//       isDisable: false
//     }
// }

// export function createFormControlState<Model>(obj: Model):FormControls<Model> {
//   let controlsState = {};
//   for (const key in obj) {
//     controlsState = {...controlsState, ...{[key]: createControlState(obj[key])}}
//   } 
//   return controlsState as FormControls<Model>;
// }


// export function createFormState<Model>(initialValue: Model): FormState<Model> {
//   return {
//     value: initialValue,
//     controls: createFormControlState(initialValue),
//     isValid: false,
//     isDirty: false,
//   }
// }

// export interface State {
//   users: User[];
//   groups: IGroup[];
//   selectedUserId: string | null;
//   selectedUser:  User | null;
//   formState: FormState<User>;
//   viewMode:'edition' | 'readonly';
//   totalCount: number;
//   isLoading: boolean;
//   message: string;
//   selectedUserEdit: FormGroupState<UserForm>;
// }

// const initialUserFormGroupState = createFormGroupState<UserForm>(USER_EDIT_FORM, {
//   user : new User(),
//   config: new ConfigUser()
// });
 
// export const initialState: State = {
//   users: [],
//   groups: [],
//   selectedUserId: null,
//   selectedUser: null,
//   formState: createFormState<User>(new User()),
//   viewMode:'readonly',
//   totalCount: 0,
//   isLoading: false,
//   message: '',
//   selectedUserEdit: initialUserFormGroupState
// };

export const featureAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId : model => model.phone,
  sortComparer: false
});

export interface State extends EntityState<User> {
  isLoading: boolean;
  viewMode: string; // view | creation | update
  message: any;
  formState: FormGroupState<User>;
}

const initialFormGroupState = createFormGroupState<User>(USER_EDIT_FORM, new User());

export const initialState: State = featureAdapter.getInitialState({
  isLoading: false,
  viewMode: 'creation',
  message: null,
  formState: initialFormGroupState
});

