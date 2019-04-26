import { 
  createFormStateReducerWithUpdate, 
  updateGroup, 
  validate, 
  formGroupReducer, 
  ValidationErrors,
  setValue, 
  FormControlState, 
  setErrors, 
  FormGroupState, 
  createFormGroupState, 
  AbstractControlState,
  box,
  enable,
  disable,
  DisableAction
} from 'ngrx-forms';

import { 
  required, 
  greaterThanOrEqualTo, 
  greaterThan,
  lessThanOrEqualTo ,
  maxLength,
  minLength,
  notEqualTo,
  equalTo,
} from 'ngrx-forms/validation';

import { Actions, ActionTypes } from './actions';
import { initialState, State, USER_EDIT_FORM, featureAdapter, 
 // createFormState, ControlState 
} from './state';
import { User, IUser, UserForm, ProfileForm, PasswordForm, Password } from '@app/shared/models';
// import { minLenght, maxLenght } from '../utils/utils';

// import { createFormReducer } from '@shared/store/form-management/reducers';
// import { Actions as formActions } from '@shared/store/form-management/actions';


import { Validators } from '@angular/forms';
import { combineReducers, Action, ActionReducerMap } from '@ngrx/store';
import { forEach } from '@angular/router/src/utils/collection';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
// import { FormState } from '../form-management/state';
//import { minLenght as MinLen } from '@shared/store/utils/utils'

/* // Globals
const normalize = normalizr.normalize
const schema = normalizr.schema


// Defines the entity of answers
const answer = new schema.Entity('answers')

// Defines the entity of questions, containing an array of answers
const question = new schema.Entity('questions', {
	answers: [ answer ]
})

// Defines the entity of rounds, containing an array of questions
const round = new schema.Entity('rounds', {
	questions: [ question ]
})

// Define a test dataset to illustrate our schema
// As you can see it has a clear nested structure
const apiData = () => ({
	id: 0,
  title: 'Round #1',
  description: 'This round is all about historical knowledge',
  questions: [
  	{ 
    	id: 0,
      question: 'What year did Columbus arrive in present America?',
      answers: [
       { id: 0, answer: '1492'},
       { id: 1, answer: '1800'},
       { id: 2, answer: '1920'},
      ]
    },
   	{ 
    	id: 1,
      question: 'What year was the eifel tower in Paris built?',
      answers: [
       { id: 3, answer: '1200'},
       { id: 4, answer: '1887'},
       { id: 5, answer: '2007'},
      ]
    },
  ]
})

// Initalize vue with vuex store
Vue.use(Vuex)

// Set initial state, prefill entities you already expect
const state = {
  entities: {
  	answers: {},
    questions: {},
    rounds: {}
  }
}

const mutations = {
  updateEntities (state, {entities}) {
    // Loop over all kinds of entities we received
    for (let type in entities) {
      for (let entity in entities[type]) {
        const oldObj = state.entities[type][entity] || {}
        // Merge the new data in the old object
        const newObj = Object.assign(oldObj, entities[type][entity])
        // Make sure new entities are also reactive
        Vue.set(state.entities[type], entity, newObj)
      }
    }
  }
}
 */

/*********************/
/*  Sort function    */
/*********************/
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function sortStore(sort) {
  return function(a, b) {
    const isAsc = sort.direction === 'asc';
    return compare(a[sort.active], b[sort.active], isAsc);
  }
}
/***********************/
/*  End Sort function  */
/***********************/

/*********************/
/*  Forms function   */
/*********************/
declare type ExprFn<T> = (t: T) => boolean;

export function requiredIf<T>(expr: ExprFn<T>): (value: T | null) => ValidationErrors {
  return (value: T | null): ValidationErrors => {
    if (!expr(value)) {
      return {}
    }
    if (value !== null && (value as any).length !== 0) {
      return {};
    }
    return {
      required: {
        actual: value,
      },
    };
  }
}


// @ts-ignore
declare module 'ngrx-forms/src/state' {
  interface ValidationErrors {
    passwordMatch?: any;
  }
}

function validatePasswordsMatch(value: any): ValidationErrors {
  if (value.passe === value.cpasse) {
    return {};
  }

  return {
    passwordMatch: value,
  };
}

function checkFormValidity(formControlsState) {
  for (const key in formControlsState) {
    /*
    if (formControlsState.hasOwnProperty(key)) {
      const element = formControlsState[key];
    }
    */
   // console.log(key)
  }
  return true
}

/************************/
/*  End forms function  */
/************************/

export function reducer(state = initialState, actions: Actions): State {
  if (!actions) return state;

  /*********************/
  /*   NGX FORMS       */
  /*********************/
  // #1 - creating update functions
  // const group = createFormGroupState('group ID', { inner: '' });
  // const updatedGroup = setValue({ inner: 'newValue' })(group);
  // const updatedGroupUncurried = setValue(group, { inner: 'newValue' });
  // const updatedGroupViaAction = formStateReducer(group, new SetValueAction(group.id, { inner: 'newValue' }));

  const validateAndUpdateFormState = (mode: any) => updateGroup<User>({
    firstname: validate([required, maxLength(20), minLength(2)]),
    lastname: validate([required, maxLength(20), minLength(2)]),
    country: validate([required, maxLength(5), minLength(2)]),
    /* 
    country: (country) => {
      country = mode === 'creation' ? enable(country) : disable(country);
      return validate(
        country, 
        [required, minLength(2), maxLength(3)]
      )
    },
    */
    phone: validate([required, minLength(6), maxLength(20)]),
  },
  {

  });
  
  var UserFormReducer = createFormStateReducerWithUpdate<User>(validateAndUpdateFormState(state.viewMode));
/*   let fs : any;
  if (actions.type === ActionTypes.GET_ITEM) {
    fs = createFormGroupState<User>(USER_EDIT_FORM, new User())
  } else {
    fs = {...state.formState}
  } 

  // #2 create reducer function
  if (actions.type === ActionTypes.GET_ITEM && actions.payload.id) {
    // console.log("createFormStateReducerWithUpdate update");
    // UserFormReducer = createFormStateReducerWithUpdate<User>(validateAndUpdateFormState('update'));
    fs = createFormGroupState<User>(USER_EDIT_FORM, new User(state.entities[actions.payload.id]))
  } 

 */  // fs = {...state.formState}
  
  // #3 - updating store
  const formState = UserFormReducer(state.formState, actions);
  if (formState !== state.formState) {
    state = { 
      ...state, 
      formState:  formState,
    };
  }


  /*** End NGX-FORMS ***/

  
  switch (actions.type) {

    /* case ActionTypes.FORM_SET_VALUE: {
      console.log("FORM_SET_VALUE");
      // console.log(actions.payload);
      let copyFormControlsState = {...state.formState.controls};
      copyFormControlsState[actions.payload.key] = actions.payload;

      let copyFormValue = {...state.formState.value};
      copyFormValue[actions.payload.key] = actions.payload.value;
      let localState =  {
        ...state,
        formState: {
          ...state.formState,
          value: copyFormValue,
          controls: copyFormControlsState,
          isDirty: true,
        }
      };

      return localState;
    }

    case ActionTypes.FORM_SET_VALIDITY: {
      return {
        ...state,
        formState: {
          ...state.formState,
          isValid: actions.payload.isValid
        }
      };
    } */

    case ActionTypes.SORT_ITEMS_SUCCESS: {
      // console.log(actions.payload.sort);

      const featureAdapter: EntityAdapter<User> = createEntityAdapter<User>({
        selectId : model => model.phone,
        sortComparer: sortStore(actions.payload.sort)
      });
      
      // featureAdapter.sortComparer = sortStore(actions.payload.sort); // Re-Init sort fonction
      
      return featureAdapter.addAll(actions.payload.items, {
        ...state,
        formState: createFormGroupState<User>(USER_EDIT_FORM, new User()),
        isLoading: false,
        message: null
      }); 

      /*let copyStateUsers = [...state.users];
      let usersSorted = copyStateUsers.sort(sortStore(actions.payload.sort));
      return {
        ...state,
        users: usersSorted,
        viewMode: 'readonly',
        isLoading: true
      };*/
    }

    /*case ActionTypes.SORT_ITEMS_SUCCESS: {
      return {
        ...state,
        selectedUserId: null,
        selectedUser: null,
        formState: createFormState<User>(new User()),
        message: null,
        isLoading: false
      };
    } */

    /* case ActionTypes.LOAD_ITEMS: {
      return {
        ...state,
        isLoading: true
      };
    }
    case ActionTypes.LOAD_ITEMS_SUCCESS: {
      return {
        ...state,
        users: actions.payload.users,
        groups: actions.payload.groups,
        selectedUserId: null,
        selectedUser: null,
        formState: createFormState<User>(new User()),
        totalCount: actions.payload.total,
        message: null,
        isLoading: false
      };
    } */
    case ActionTypes.SORT_ITEMS:
    case ActionTypes.LOAD_ITEMS: {
      return {
        ...state,
        viewMode: "view",
        isLoading: true,
        message: null
      };
    }

    case ActionTypes.LOAD_ITEMS_SUCCESS: {
      // console.log('Post reducer LOAD_ITEMS_SUCCESS');
      // console.log(actions.payload.items);
      return featureAdapter.addAll(actions.payload.items, {
        ...state,
        formState: createFormGroupState<User>(USER_EDIT_FORM, new User()),
        isLoading: false,
        message: null
      }); 
    }                 

    /* case ActionTypes.GET_ITEM: {
      return {
        ...state,
        selectedUserId: actions.payload.userid ? actions.payload.userid : null,
        selectedUser: actions.payload.userid ? state.users.filter(item => item.phone === actions.payload.userid)[0] : null,  // [actions.payload.userid]
        viewMode: actions.payload.viewmode ? actions.payload.viewmode : 'readonly',
        formState: actions.payload.userid ? createFormState<User>(
            new User(state.users.filter(item => item.phone === actions.payload.userid)[0])) : 
            createFormState<User>(new User()),
        selectedUserEdit: {
          ...state.selectedUserEdit,
          controls: {
              ...state.selectedUserEdit.controls,
              user: actions.payload.userid ? createFormGroupState<User>(USER_EDIT_FORM+".user", 
                new User(state.users.filter(item => item.phone === actions.payload.userid)[0])) : 
                createFormGroupState<User>(USER_EDIT_FORM+".user", new User())
          },
        },
        /*selectedUserEdit: createFormGroupState<UserForm>(FORM_ID, {
          user : state.users.filter(item => item.phone === actions.payload.userid)[0],
          config: {
            minPseudo: 3,
            maxPseudo: 20,
            minLastname: 3,
            maxLastname: 20,
            minFirstname: 3,
            maxFirstname: 20
          }
        }),//*
        isLoading: true
      };
    } */
    case ActionTypes.GET_ITEM: {   
      // console.log("User GET_ITEM " + actions.payload.id) 

      let fs = actions.payload.id ? createFormGroupState<User>(USER_EDIT_FORM, new User(state.entities[actions.payload.id])) : createFormGroupState<User>(USER_EDIT_FORM, new User());
      
      if (actions.payload.id) { // Disable these controls when item is not new
        // fs = formStateReducer(control, new SetErrorsAction(control.id, { missing: true });
        // fs = formStateReducer(control, new SetValueAction(control.id, 'newValue'));
        fs = formGroupReducer(fs, new DisableAction(fs.controls.phone.id));
        fs = formGroupReducer(fs, new DisableAction(fs.controls.country.id));
      }

      return {
        ...state,
        viewMode:  actions.payload.id ? 'update': 'creation',
        formState: fs,
        isLoading: true,
      };
    }

    case ActionTypes.CREATE_ITEM: 
    case ActionTypes.UPDATE_ITEM: 
    case ActionTypes.DELETE_ITEM: {
      return {
        ...state,
        isLoading: true,
        message: null
      };
    }

    /* case ActionTypes.CREATE_ITEM_SUCCESS: {
      return {
        ...state,
        users: [
            ...state.users, 
            actions.payload.user,
          ],
        selectedUserId: actions.payload.user.id,
        selectedUser: actions.payload.user,
        totalCount: actions.payload.total,
        message: "Opération réussie !!!",
        isLoading: false
      };
    } */
    case ActionTypes.CREATE_ITEM_SUCCESS: {
      let fs = createFormGroupState<User>(USER_EDIT_FORM, new User(actions.payload.item));
      
      fs = formGroupReducer(fs, new DisableAction(fs.controls.phone.id));
      fs = formGroupReducer(fs, new DisableAction(fs.controls.country.id));

      return featureAdapter.addOne(actions.payload.item, {
        ...state,
        viewMode: 'update',
        message: actions.payload.msg,
        isLoading: false,
        formState: fs
      });
    }

    /*case ActionTypes.CREATE_ITEM_FAIL: {
      return {
        ...state,
        selectedUserId: null,
        selectedUser: null,
        message: actions.payload.msg,
        isLoading: false
      };
    }

    /* case ActionTypes.UPDATE_ITEM_SUCCESS:{
      return {
        ...state,
        users: state.users.map(user => user.phone === state.selectedUserId ? actions.payload.user : user),
        selectedUser: actions.payload.user,
        message: "Opération réussie",
        isLoading: false
      };
    } */
    case ActionTypes.UPDATE_ITEM_SUCCESS: {
      return featureAdapter.updateOne(actions.payload.item, {
        ...state,
        message: actions.payload.msg,
        isLoading: false,
        formState: createFormGroupState<User>(USER_EDIT_FORM, new User(actions.payload.item))
      });
    } 

    case ActionTypes.DELETE_ITEM: {
      // console.log(actions.payload)
      return {
        ...state,
        isLoading: true
      };
    }

    /* 
    case ActionTypes.DELETE_ITEM_SUCCESS: {
      return {
        ...state,
        users: state.users.filter(user => user.phone !== actions.payload.userid),
        selectedUserId: null,
        selectedUser: null,
        totalCount: actions.payload.total,
        message: "Operation réussie !!!",
        viewMode: 'readonly',
        isLoading: false
      };
    } 
    */
    case ActionTypes.DELETE_ITEM_SUCCESS: {
      return featureAdapter.removeOne(actions.payload.id, {
        ...state,
        viewMode: "view",
        message: actions.payload.msg,
        formState: createFormGroupState<User>(USER_EDIT_FORM, new User()),
        isLoading: false
      });
    }
    
    case ActionTypes.GET_ITEM_SUCCESS:             
    case ActionTypes.SORT_ITEMS_FAIL:
    case ActionTypes.LOAD_ITEMS_FAIL:
    case ActionTypes.GET_ITEM_FAIL:
    case ActionTypes.CREATE_ITEM_FAIL: 
    case ActionTypes.UPDATE_ITEM_FAIL: 
    case ActionTypes.DELETE_ITEM_FAIL: {
      return {
        ...state,
        isLoading: false,
        message: actions.payload.msg
      };
    }

    default: {
      return state;
    }
  }
}

