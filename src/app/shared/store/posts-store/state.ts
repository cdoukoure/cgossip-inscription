import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { FormGroupState, createFormGroupState } from 'ngrx-forms';

import { Post, Comment } from '@shared/models';

export const POST_EDIT_FORM = 'POST_EDIT_FORM';
export const COMMENT_FORM = 'COMMENT_FORM';

export const featureAdapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  selectId : model => model.id,
  sortComparer: false
});

export interface State extends EntityState<Post> {
  isLoading: boolean;
  message: any;
  formState: FormGroupState<Post>;
  commentState: FormGroupState<Comment>
}

const initialFormGroupState = createFormGroupState<Post>(POST_EDIT_FORM, new Post());
const initialCommentState = createFormGroupState<Comment>(COMMENT_FORM, new Comment());

export const initialState: State = featureAdapter.getInitialState({
  isLoading: false,
  message: null,
  formState: initialFormGroupState, 
  commentState: initialCommentState
});


