import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { FormGroupState, createFormGroupState } from 'ngrx-forms';

import { Post } from '@shared/models';
import { AsyncItem } from '@shared/utility';

export const NEWS_EDIT_FORM = 'NEWS_EDIT_FORM';


export const featureAdapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  selectId : model => model.id,
  sortComparer: false
});

export interface State extends EntityState<Post> {
  isLoading: boolean;
  message: any;
  viewMode: string;
  formState: FormGroupState<Post>;
}


const initialFormGroupState = createFormGroupState<Post>(NEWS_EDIT_FORM, new Post());

export const initialState: State = featureAdapter.getInitialState({
  isLoading: false,
  message: null,
  viewMode: 'view',
  formState: initialFormGroupState
});

