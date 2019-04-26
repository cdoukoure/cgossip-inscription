import { 
  Group
} from '@shared/models';

import { type, ActionWithPayload }   from '@shared/utility';

export const ActionTypes = {
  // Groups list
  SORT_ITEMS:                  type('[Groups] Sort groups'),
  SORT_ITEMS_SUCCESS:          type('[Groups] Sort groups success'),
  SORT_ITEMS_FAIL:             type('[Groups] Sort groups fail'),
  // Groups list
  LOAD_ITEMS:                  type('[Groups] Load groups'),
  LOAD_ITEMS_SUCCESS:          type('[Groups] Load groups success'),
  LOAD_ITEMS_FAIL:             type('[Groups] Load groups fail'),
  // Group details
  SET_ITEMS:                   type('[Groups] Set group'),
  SET_ITEMS_SUCCESS:           type('[Groups] Set group success'),
  SET_ITEMS_FAIL:              type('[Groups] Set group fail'),
  // Group details
  GET_ITEM:                    type('[Groups] Get group'),
  GET_ITEM_SUCCESS:            type('[Groups] Get group success'),
  GET_ITEM_FAIL:               type('[Groups] Get group fail'),
  // New group
  CREATE_ITEM:                 type('[Groups] Create group'),
  CREATE_ITEM_SUCCESS:         type('[Groups] Create group success'),
  CREATE_ITEM_FAIL:            type('[Groups] Create group fail'),
  // Edit group
  UPDATE_ITEM:                 type('[Groups] Update group'),
  UPDATE_ITEM_SUCCESS:         type('[Groups] Update group success'),
  UPDATE_ITEM_FAIL:            type('[Groups] Update group fail'),
  // Delete group
  DELETE_ITEM:                 type('[Groups] Delete group'),
  DELETE_ITEM_SUCCESS:         type('[Groups] Delete group success'),
  DELETE_ITEM_FAIL:            type('[Groups] Delete group fail'),
  // password Update
  DO_TREATMENT:                     type('[Groups] Do Treatment //Validation task'),
};

/**
 * Groups list Actions
 */
export class LoadGroupsAction implements ActionWithPayload {
  readonly type = ActionTypes.LOAD_ITEMS;
  constructor(public payload: any = null) {
    //console.log("Dispatch LoadGroupsAction");
  }
} // api: admin/groups

export class LoadGroupsSuccessAction implements ActionWithPayload {
  readonly type = ActionTypes.LOAD_ITEMS_SUCCESS;
  constructor(public payload: {  items: Group[] }) {}
} // api: 

export class LoadGroupsFailAction implements ActionWithPayload {
  readonly type = ActionTypes.LOAD_ITEMS_FAIL;
  constructor(public payload: { msg: string }) {}
}

/**
 * Sort list Actions
 */
export class SortGroupsAction implements ActionWithPayload {
  readonly type = ActionTypes.SORT_ITEMS;
  constructor(public payload: any = null) {}
}

export class SortGroupsSuccessAction implements ActionWithPayload {
  readonly type = ActionTypes.SORT_ITEMS_SUCCESS;
  constructor(public payload: any = null ) {}
}

export class SortGroupsFailAction implements ActionWithPayload {
  readonly type = ActionTypes.SORT_ITEMS_FAIL;
  constructor(public payload: any = null) {}
}

/**
 * Add groups Actions
 */
export class CreateGroupAction implements ActionWithPayload {
  type = ActionTypes.CREATE_ITEM;

  constructor(public payload: { item :Group }) { }
}

export class CreateGroupSuccessAction implements ActionWithPayload {
  type = ActionTypes.CREATE_ITEM_SUCCESS;

  constructor(public payload: { item: Group, msg: string }) { }
}

export class CreateGroupFailAction implements ActionWithPayload {
  type = ActionTypes.CREATE_ITEM_FAIL;

  constructor(public payload: { msg: string }) { }
}

/**
 * Set group Actions
 */
export class SetGroupsAction implements ActionWithPayload {
  type = ActionTypes.SET_ITEMS;

  constructor(public payload: { items : Group[] }) {
    console.log("Groups Action SetGroupsAction")
    console.log(payload);
  }
}

export class SetGroupSuccessAction implements ActionWithPayload {
  type = ActionTypes.SET_ITEMS_SUCCESS;

  constructor(public payload: any = null ) { }
}

export class SetGroupFailAction implements ActionWithPayload {
  type = ActionTypes.SET_ITEMS_FAIL;

  constructor(public payload: { msg: string }) { }
}

/**
 * Get group Actions
 */
export class GetGroupAction implements ActionWithPayload {
  type = ActionTypes.GET_ITEM;

  constructor(public payload: { id? : any }) {
    // console.log(payload);
  }
}

export class GetGroupSuccessAction implements ActionWithPayload {
  type = ActionTypes.GET_ITEM_SUCCESS;

  constructor(public payload: any = null ) { }
}

export class GetGroupFailAction implements ActionWithPayload {
  type = ActionTypes.GET_ITEM_FAIL;

  constructor(public payload: { msg: string }) { }
}

/**
 * Edit group Actions
 */
export class UpdateGroupAction implements ActionWithPayload {
  type = ActionTypes.UPDATE_ITEM;
  constructor(public payload: { item: Group }) { }
}

export class UpdateGroupSuccessAction implements ActionWithPayload {
  type = ActionTypes.UPDATE_ITEM_SUCCESS;
  constructor(public payload: any=null) { }
}

export class UpdateGroupFailAction implements ActionWithPayload {
  type = ActionTypes.UPDATE_ITEM_FAIL;
  constructor(public payload: { msg: string }) { }
}

/**
 * Delete group Actions
 */
export class DeleteGroupAction implements ActionWithPayload {
  type = ActionTypes.DELETE_ITEM;
  constructor(public payload: { id : any }) { }
}

export class DeleteGroupSuccessAction implements ActionWithPayload {
  type = ActionTypes.DELETE_ITEM_SUCCESS;
  constructor(public payload: { id : any, msg: string }) { }
}

export class DeleteGroupFailAction implements ActionWithPayload {
  type = ActionTypes.DELETE_ITEM_FAIL;
  constructor(public payload: { msg: string }) { }
}

export class DoGroupTreatment implements ActionWithPayload {
  type = ActionTypes.DO_TREATMENT;
  constructor(public payload: { id: any, action:any,  }) { }
} // action:'creation', 'modification', 'Submission', 'validation', 'refusal', 'deletion'



export type Actions
  = LoadGroupsAction
  | LoadGroupsSuccessAction
  | LoadGroupsFailAction
  | SortGroupsAction
  | SortGroupsSuccessAction
  | SortGroupsFailAction
  | CreateGroupAction
  | CreateGroupSuccessAction
  | CreateGroupFailAction
  | GetGroupAction
  | GetGroupSuccessAction
  | GetGroupFailAction
  | UpdateGroupAction
  | UpdateGroupSuccessAction
  | UpdateGroupFailAction
  | DeleteGroupAction
  | DeleteGroupSuccessAction
  | DeleteGroupFailAction
  | SetGroupsAction
  | SetGroupSuccessAction
  | SetGroupFailAction
  ;
