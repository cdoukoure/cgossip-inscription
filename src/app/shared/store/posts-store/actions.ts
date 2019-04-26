import { 
  Post
} from '@shared/models';

import { type, ActionWithPayload }   from '@shared/utility';

export const ActionTypes = {
  // Posts list
  SORT_ITEMS:                  type('[Posts] Sort posts'),
  SORT_ITEMS_SUCCESS:          type('[Posts] Sort posts success'),
  SORT_ITEMS_FAIL:             type('[Posts] Sort posts fail'),
  // Posts list
  LOAD_ITEMS:                  type('[Posts] Load posts'),
  LOAD_ITEMS_SUCCESS:          type('[Posts] Load posts success'),
  LOAD_ITEMS_FAIL:             type('[Posts] Load posts fail'),
  // Post details
  GET_ITEM:                    type('[Posts] Get post'),
  GET_ITEM_SUCCESS:            type('[Posts] Get post success'),
  GET_ITEM_FAIL:               type('[Posts] Get post fail'),
  // New post
  CREATE_ITEM:                 type('[Posts] Create post'),
  CREATE_ITEM_SUCCESS:         type('[Posts] Create post success'),
  CREATE_ITEM_FAIL:            type('[Posts] Create post fail'),
  // Edit post
  UPDATE_ITEM:                 type('[Posts] Update post'),
  UPDATE_ITEM_SUCCESS:         type('[Posts] Update post success'),
  UPDATE_ITEM_FAIL:            type('[Posts] Update post fail'),
  // Delete post
  DELETE_ITEM:                 type('[Posts] Delete post'),
  DELETE_ITEM_SUCCESS:         type('[Posts] Delete post success'),
  DELETE_ITEM_FAIL:            type('[Posts] Delete post fail'),
  // password Update
  DO_TREATMENT:                type('[Posts] Do Treatment //Validation task'),
  // Delete post
  COMMENT_ITEM:                 type('[Posts] Comment post'),
  COMMENT_ITEM_SUCCESS:         type('[Posts] Comment post success'),
  COMMENT_ITEM_FAIL:            type('[Posts] Comment post fail'),
};

/**
 * Posts list Actions
 */
export class LoadPostsAction implements ActionWithPayload {
  readonly type = ActionTypes.LOAD_ITEMS;
  constructor(public payload: any = null) {
    console.log("Dispatch LoadPostsAction");
  }
} // api: admin/posts

export class LoadPostsSuccessAction implements ActionWithPayload {
  readonly type = ActionTypes.LOAD_ITEMS_SUCCESS;
  constructor(public payload: {  items: Post[] }) {}
} // api: 

export class LoadPostsFailAction implements ActionWithPayload {
  readonly type = ActionTypes.LOAD_ITEMS_FAIL;
  constructor(public payload: { msg: string }) {}
}

/**
 * Sort list Actions
 */
export class SortPostsAction implements ActionWithPayload {
  readonly type = ActionTypes.SORT_ITEMS;
  constructor(public payload: any = null) {}
}

export class SortPostsSuccessAction implements ActionWithPayload {
  readonly type = ActionTypes.SORT_ITEMS_SUCCESS;
  constructor(public payload: any = null ) {}
}

export class SortPostsFailAction implements ActionWithPayload {
  readonly type = ActionTypes.SORT_ITEMS_FAIL;
  constructor(public payload: any = null) {}
}

/**
 * Add posts Actions
 */
export class CreatePostAction implements ActionWithPayload {
  type = ActionTypes.CREATE_ITEM;

  constructor(public payload: { item :Post }) { }
}

export class CreatePostSuccessAction implements ActionWithPayload {
  type = ActionTypes.CREATE_ITEM_SUCCESS;

  constructor(public payload: { item: Post, msg: string }) { }
}

export class CreatePostFailAction implements ActionWithPayload {
  type = ActionTypes.CREATE_ITEM_FAIL;

  constructor(public payload: { msg: string }) { }
}

/**
 * Get post Actions
 */
export class GetPostAction implements ActionWithPayload {
  type = ActionTypes.GET_ITEM;

  constructor(public payload: { id? : any }) {
    // console.log(payload);
  }
}

export class GetPostSuccessAction implements ActionWithPayload {
  type = ActionTypes.GET_ITEM_SUCCESS;

  constructor(public payload: any = null ) { }
}

export class GetPostFailAction implements ActionWithPayload {
  type = ActionTypes.GET_ITEM_FAIL;

  constructor(public payload: { msg: string }) { }
}

/**
 * Edit post Actions
 */
export class UpdatePostAction implements ActionWithPayload {
  type = ActionTypes.UPDATE_ITEM;
  constructor(public payload: { item: Post }) { }
}

export class UpdatePostSuccessAction implements ActionWithPayload {
  type = ActionTypes.UPDATE_ITEM_SUCCESS;
  constructor(public payload: any=null) { }
}

export class UpdatePostFailAction implements ActionWithPayload {
  type = ActionTypes.UPDATE_ITEM_FAIL;
  constructor(public payload: { msg: string }) { }
}

/**
 * Delete post Actions
 */
export class DeletePostAction implements ActionWithPayload {
  type = ActionTypes.DELETE_ITEM;
  constructor(public payload: { id : any }) { }
}

export class DeletePostSuccessAction implements ActionWithPayload {
  type = ActionTypes.DELETE_ITEM_SUCCESS;
  constructor(public payload: { id : any, msg: string }) { }
}

export class DeletePostFailAction implements ActionWithPayload {
  type = ActionTypes.DELETE_ITEM_FAIL;
  constructor(public payload: { msg: string }) { }
}

export class DoPostTreatment implements ActionWithPayload {
  type = ActionTypes.DO_TREATMENT;
  constructor(public payload: { id: any, action:any,  }) { }
} // action:'creation', 'modification', 'submission', 'validation', 'refusal', 'deletion'

/**
 * Delete post Actions
 */
export class DoPostComment implements ActionWithPayload {
  type = ActionTypes.COMMENT_ITEM;
  constructor(public payload: any = null) { }
}

export class DoPostCommentSuccess implements ActionWithPayload {
  type = ActionTypes.COMMENT_ITEM_SUCCESS;
  constructor(public payload: any = null) { }
}

export class DoPostCommentFail implements ActionWithPayload {
  type = ActionTypes.COMMENT_ITEM_FAIL;
  constructor(public payload: { msg: string }) { }
}


export type Actions
  = LoadPostsAction
  | LoadPostsSuccessAction
  | LoadPostsFailAction
  | SortPostsAction
  | SortPostsSuccessAction
  | SortPostsFailAction
  | CreatePostAction
  | CreatePostSuccessAction
  | CreatePostFailAction
  | GetPostAction
  | GetPostSuccessAction
  | GetPostFailAction
  | UpdatePostAction
  | UpdatePostSuccessAction
  | UpdatePostFailAction
  | DeletePostAction
  | DeletePostSuccessAction
  | DeletePostFailAction
  | DoPostTreatment
  | DoPostComment
  | DoPostCommentSuccess
  | DoPostCommentFail
  ;
