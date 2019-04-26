import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { FormGroupState, createFormGroupState } from 'ngrx-forms';

import { IGroup, Group } from '@shared/models';
import { AsyncItem } from '@shared/utility';

export const GROUP_EDIT_FORM = 'GROUP_EDIT_FORM';


export const featureAdapter: EntityAdapter<Group> = createEntityAdapter<Group>({
  selectId : model => model.id,
  sortComparer: false
});

export interface State extends EntityState<Group> {
  isLoading: boolean;
  message: any;
  formState: FormGroupState<Group>;
}

const initialFormGroupState = createFormGroupState<Group>(GROUP_EDIT_FORM, new Group());

export const initialState: State = featureAdapter.getInitialState({
  isLoading: false,
  message: null,
  formState: initialFormGroupState
});
