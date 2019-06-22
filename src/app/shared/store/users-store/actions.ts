import { 
  User, 
  IGroup
} from '@shared/models';

import { type, ActionWithPayload }   from '@shared/utility';

export const ActionTypes = {
  // Users list
  SORT_ITEMS:                  type('[Users] Sort users'),
  SORT_ITEMS_SUCCESS:          type('[Users] Sort users success'),
  SORT_ITEMS_FAIL:             type('[Users] Sort users fail'),
  // Users list
  LOAD_ITEMS:                  type('[Users] Load users'),
  LOAD_ITEMS_SUCCESS:          type('[Users] Load users success'),
  LOAD_ITEMS_FAIL:             type('[Users] Load users fail'),
  // User details
  GET_ITEM:                    type('[Users] Get user'),
  GET_ITEM_SUCCESS:            type('[Users] Get user success'),
  GET_ITEM_FAIL:               type('[Users] Get user fail'),
  // New user
  CREATE_ITEM:                 type('[Users] Create user'),
  CREATE_ITEM_SUCCESS:         type('[Users] Create user success'),
  CREATE_ITEM_FAIL:            type('[Users] Create user fail'),
  // Edit user
  UPDATE_ITEM:                 type('[Users] Update user'),
  UPDATE_ITEM_SUCCESS:         type('[Users] Update user success'),
  UPDATE_ITEM_FAIL:            type('[Users] Update user fail'),
  // Delete user
  DELETE_ITEM:                 type('[Users] Delete user'),
  DELETE_ITEM_SUCCESS:         type('[Users] Delete user success'),
  DELETE_ITEM_FAIL:            type('[Users] Delete user fail'),
  // password Update
  DO_GENERATE:                 type('[Users] Do Generate Password'),
  DO_GENERATE_SUCCESS:         type('[Users] Do Generate Password success'),
  DO_GENERATE_FAIL:            type('[Users] Do Generate Password fail'),
  // Form state Management
  FORM_SET_VALUE:              type('[Users] Form field set value'),
  FORM_SET_VALIDITY:           type('[Users] Form set validity')
};

export class FormSetValueAction implements ActionWithPayload {
  readonly type = ActionTypes.FORM_SET_VALUE;
  constructor(public payload: {key: string, value: any}) {}
}

export class FormSetValidityAction implements ActionWithPayload {
  readonly type = ActionTypes.FORM_SET_VALIDITY;
  constructor(public payload: { isValid: boolean }) {}
}

/**
 * Users list Actions
 */
export class LoadUsersAction implements ActionWithPayload {
  readonly type = ActionTypes.LOAD_ITEMS;
  constructor(public payload: any = null) {}
}

export class LoadUsersSuccessAction implements ActionWithPayload {
  readonly type = ActionTypes.LOAD_ITEMS_SUCCESS;
  // constructor(public payload: {  users: User[], total: number, groups: IGroup[] }) {}
  constructor(public payload: {  items: User[] }) {}
}

export class LoadUsersFailAction implements ActionWithPayload {
  readonly type = ActionTypes.LOAD_ITEMS_FAIL;
  //constructor(public payload: { msg: string }) {}
  constructor(public payload: { msg: string }) {}
}

/**
 * Sort list Actions
 */
export class SortUsersAction implements ActionWithPayload {
  type = ActionTypes.SORT_ITEMS;
  constructor(public payload: any = null) {}
}

export class SortUsersSuccessAction implements ActionWithPayload {
  type = ActionTypes.SORT_ITEMS_SUCCESS;
  constructor(public payload: {items: User[], sort:any } ) {}
}

export class SortUsersFailAction implements ActionWithPayload {
  type = ActionTypes.SORT_ITEMS_FAIL;
  constructor(public payload: any = null) {}
}

/**
 * Add users Actions
 */
export class CreateUserAction implements ActionWithPayload {
  type = ActionTypes.CREATE_ITEM;

  constructor(public payload: { item :any }) { }
}

export class CreateUserSuccessAction implements ActionWithPayload {
  type = ActionTypes.CREATE_ITEM_SUCCESS;

  constructor(public payload: { item: User, msg: string }) { }
}

export class CreateUserFailAction implements ActionWithPayload {
  type = ActionTypes.CREATE_ITEM_FAIL;

  constructor(public payload: { msg: string }) { }
}

/**
 * Get user Actions
 */
export class GetUserAction implements ActionWithPayload {
  type = ActionTypes.GET_ITEM;

  constructor(public payload: { id? : any }) {
    // console.log(payload);
  }
}

export class GetUserSuccessAction implements ActionWithPayload {
  type = ActionTypes.GET_ITEM_SUCCESS;

  constructor(public payload: any = null ) { }
}

export class GetUserFailAction implements ActionWithPayload {
  type = ActionTypes.GET_ITEM_FAIL;

  constructor(public payload: { msg: string }) { }
}

/**
 * Edit user Actions
 */
export class UpdateUserAction implements ActionWithPayload {
  type = ActionTypes.UPDATE_ITEM;
  constructor(public payload: { item: any }) { }
}

export class UpdateUserSuccessAction implements ActionWithPayload {
  type = ActionTypes.UPDATE_ITEM_SUCCESS;
  constructor(public payload: any=null) { }
}

export class UpdateUserFailAction implements ActionWithPayload {
  type = ActionTypes.UPDATE_ITEM_FAIL;
  constructor(public payload: { msg: string }) { }
}

/**
 * Delete user Actions
 */
export class DeleteUserAction implements ActionWithPayload {
  type = ActionTypes.DELETE_ITEM;
  constructor(public payload: { id : any }) { }
}

export class DeleteUserSuccessAction implements ActionWithPayload {
  type = ActionTypes.DELETE_ITEM_SUCCESS;
  constructor(public payload: { id : any, msg: string }) { }
}

export class DeleteUserFailAction implements ActionWithPayload {
  type = ActionTypes.DELETE_ITEM_FAIL;
  constructor(public payload: { msg: string }) { }
}


/**
 * Password Actions
 */
export class DoGeneratePassword implements ActionWithPayload {
  type = ActionTypes.DO_GENERATE;
  constructor(public payload: { phone: any }) { 
    // console.log("Action DoPasswordAction payload: " + JSON.stringify(payload));
  }
}

export class DoGeneratePasswordSuccess implements ActionWithPayload {
  type = ActionTypes.DO_GENERATE_SUCCESS;
  
  constructor(public payload: any = null) { }
}

export class DoGeneratePasswordFail implements ActionWithPayload {
  type = ActionTypes.DO_GENERATE_FAIL;
  
  constructor(public payload: any = null) { }
}

export type Actions
  = LoadUsersAction
  | LoadUsersSuccessAction
  | LoadUsersFailAction
  | SortUsersAction
  | SortUsersSuccessAction
  | SortUsersFailAction
  | CreateUserAction
  | CreateUserSuccessAction
  | CreateUserFailAction
  | GetUserAction
  | GetUserSuccessAction
  | GetUserFailAction
  | UpdateUserAction
  | UpdateUserSuccessAction
  | UpdateUserFailAction
  | DeleteUserAction
  | DeleteUserSuccessAction
  | DeleteUserFailAction
  | DoGeneratePassword
  | DoGeneratePasswordSuccess
  | DoGeneratePasswordFail
  | FormSetValueAction
  | FormSetValidityAction
  ;
