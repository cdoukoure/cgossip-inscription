import { 
 Post
} from '@shared/models';

import { type, ActionWithPayload }   from '@shared/utility';

export const ActionTypes = {
  // News list
  SORT_ITEMS:                  type('[News] Sort news'),
  SORT_ITEMS_SUCCESS:          type('[News] Sort news success'),
  SORT_ITEMS_FAIL:             type('[News] Sort news fail'),
  // News list
  LOAD_ITEMS:                  type('[News] Load news'),
  LOAD_ITEMS_SUCCESS:          type('[News] Load news success'),
  LOAD_ITEMS_FAIL:             type('[News] Load news fail'),
  // News details
  GET_ITEM:                    type('[News] Get new'),
  GET_ITEM_SUCCESS:            type('[News] Get new success'),
  GET_ITEM_FAIL:               type('[News] Get new fail'),
  // New new
  CREATE_ITEM:                 type('[News] Create new'),
  CREATE_ITEM_SUCCESS:         type('[News] Create new success'),
  CREATE_ITEM_FAIL:            type('[News] Create new fail'),
  // Edit new
  UPDATE_ITEM:                 type('[News] Update new'),
  UPDATE_ITEM_SUCCESS:         type('[News] Update new success'),
  UPDATE_ITEM_FAIL:            type('[News] Update new fail'),
  // Delete new
  DELETE_ITEM:                 type('[News] Delete new'),
  DELETE_ITEM_SUCCESS:         type('[News] Delete new success'),
  DELETE_ITEM_FAIL:            type('[News] Delete new fail'),
  // password Update
  DO_TREATMENT:                     type('[News] Do Treatment //Validation task'),
};

/**
 * News list Actions
 */
export class LoadNewsAction implements ActionWithPayload {
  readonly type = ActionTypes.LOAD_ITEMS;
  constructor(public payload: any = null) {
    // console.log("Dispatch LoadNewsAction");
  }
} // api: admin/news

export class LoadNewsSuccessAction implements ActionWithPayload {
  readonly type = ActionTypes.LOAD_ITEMS_SUCCESS;
  constructor(public payload: {  items: Post[] }) {}
} // api: 

export class LoadNewsFailAction implements ActionWithPayload {
  readonly type = ActionTypes.LOAD_ITEMS_FAIL;
  constructor(public payload: { msg: string }) {}
}

/**
 * Sort list Actions
 */
export class SortNewsAction implements ActionWithPayload {
  readonly type = ActionTypes.SORT_ITEMS;
  constructor(public payload: {sort: any}) {}
}

export class SortNewsSuccessAction implements ActionWithPayload {
  readonly type = ActionTypes.SORT_ITEMS_SUCCESS;
  constructor(public payload: {items: Post[], sort:any } ) {}
}

export class SortNewsFailAction implements ActionWithPayload {
  readonly type = ActionTypes.SORT_ITEMS_FAIL;
  constructor(public payload: any = null) {}
}


/**
 * Add news Actions
 */
export class CreateNewsAction implements ActionWithPayload {
  type = ActionTypes.CREATE_ITEM;

  constructor(public payload: { item :Post, action:string }) { }
}

export class CreateNewsSuccessAction implements ActionWithPayload {
  type = ActionTypes.CREATE_ITEM_SUCCESS;

  constructor(public payload: { item: Post, msg: string }) { }
}

export class CreateNewsFailAction implements ActionWithPayload {
  type = ActionTypes.CREATE_ITEM_FAIL;

  constructor(public payload: { msg: string }) { }
}

/**
 * Get new Actions
 */
export class GetNewsAction implements ActionWithPayload {
  type = ActionTypes.GET_ITEM;

  constructor(public payload: { id?:any, viewMode?:any }) {
    // console.log(payload);
  }
}

export class GetNewsSuccessAction implements ActionWithPayload {
  type = ActionTypes.GET_ITEM_SUCCESS;

  constructor(public payload: any = null ) { }
}

export class GetNewsFailAction implements ActionWithPayload {
  type = ActionTypes.GET_ITEM_FAIL;

  constructor(public payload: { msg: string }) { }
}

/**
 * Edit new Actions
 */
export class UpdateNewsAction implements ActionWithPayload {
  type = ActionTypes.UPDATE_ITEM;
  constructor(public payload: { item: Post, action:string }) { }
}

export class UpdateNewsSuccessAction implements ActionWithPayload {
  type = ActionTypes.UPDATE_ITEM_SUCCESS;
  constructor(public payload: any=null) { }
}

export class UpdateNewsFailAction implements ActionWithPayload {
  type = ActionTypes.UPDATE_ITEM_FAIL;
  constructor(public payload: { msg: string }) { }
}

/**
 * Delete new Actions
 */
export class DeleteNewsAction implements ActionWithPayload {
  type = ActionTypes.DELETE_ITEM;
  constructor(public payload: { id : any }) { }
}

export class DeleteNewsSuccessAction implements ActionWithPayload {
  type = ActionTypes.DELETE_ITEM_SUCCESS;
  constructor(public payload: { id : any, msg: string }) { }
}

export class DeleteNewsFailAction implements ActionWithPayload {
  type = ActionTypes.DELETE_ITEM_FAIL;
  constructor(public payload: { msg: string }) { }
}

export class DoNewsTreatment implements ActionWithPayload {
  type = ActionTypes.DO_TREATMENT;
  constructor(public payload: { id: any, action:any,  }) { }
} // action:'creation', 'modification', 'submission', 'validation', 'refusal', 'deletion'



export type Actions
  = LoadNewsAction
  | LoadNewsSuccessAction
  | LoadNewsFailAction
  | SortNewsAction
  | SortNewsSuccessAction
  | SortNewsFailAction
  | CreateNewsAction
  | CreateNewsSuccessAction
  | CreateNewsFailAction
  | GetNewsAction
  | GetNewsSuccessAction
  | GetNewsFailAction
  | UpdateNewsAction
  | UpdateNewsSuccessAction
  | UpdateNewsFailAction
  | DeleteNewsAction
  | DeleteNewsSuccessAction
  | DeleteNewsFailAction
  | DoNewsTreatment
  ;
