import {
  createFormStateReducerWithUpdate,
  updateGroup,
  validate,
  createFormGroupState,
  enable,
  FormGroupState,
  FormControlState,
  setErrors,
  setValue,
} from 'ngrx-forms';

import {
  required,
  maxLength,
  minLength,
  pattern,
} from 'ngrx-forms/validation';

import { Actions, ActionTypes } from './actions';
import { initialState, State, NEWS_EDIT_FORM, featureAdapter } from './state';
import { Post, Comment, Media } from '@app/shared/models';
import { sortStore } from '../utils/store-utils';

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


/***********************/
/*  End Sort function  */
/***********************/


export function reducer(state = initialState, actions: Actions): State {
  if (!actions) return state;

  const postValidateAndUpdateFormState = updateGroup<Post>(
    { // Validation part
      // id: validate(required),
      author: validate(required),
      media: (state, parentState) => {
        if (state.value.type === 'video') {
          return updateGroup<Media>(state, {
            url: validate(pattern(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)),
            type: validate(required)
          })
        } else {
          return updateGroup<Media>(state, {
            type: validate(required)
          })
        }
      },
      title: validate([required, maxLength(200), minLength(2)]),
      description: validate(required, minLength(2)),
      content: validate(required, minLength(2)),
      delay: validate(required),
      state: validate(required)
    },
    { // Update part
      // note that the parent form state is provided as the second argument to update functions;
      // type annotations for parameters added for clarity but are inferred correctly otherwise
      /* media: (media: FormGroupState<Post['media']>, myForm: FormGroupState<Post>) =>
        updateGroup<Post['media']>(media, {
          url: (url: FormControlState<string>) => {
            if (media.value.type === 'video') {
              // sets the control's value to 1 and clears all errors 57 49 97 04
              return setErrors(setValue(url, ''), {});
            }

            return url;
          },
        }),  */
    }
  );
  // #2 create reducer function
  const formReducer = createFormStateReducerWithUpdate<Post>(postValidateAndUpdateFormState);
  // #3 - updating store
  const formState = formReducer(state.formState, actions);
  if (formState !== state.formState) {
    state = {
      ...state,
      formState: formState,
    };
  }


  /*** End NGX-FORMS ***/


  switch (actions.type) {

    /* case ActionTypes.SORT_ITEMS: {
      let stateCopy = [...state.posts];
      let sorted = stateCopy.sort(sortStore(actions.payload.sort));
      return {
        ...state,
        posts: sorted,
        isLoading: true
      };
    } */

    /* case ActionTypes.SORT_ITEMS_SUCCESS: {
      return {
        ...state,
        formState: createFormGroupState<Post>(NEWS_EDIT_FORM, new Post()),
        message: null,
        isLoading: false
      };
    } */

    case ActionTypes.LOAD_ITEMS: {
      return {
        ...state,
        isLoading: true,
        message: null,
        viewMode: 'view'
      };
    }

    case ActionTypes.LOAD_ITEMS_SUCCESS: {
      // console.log('Post reducer LOAD_ITEMS_SUCCESS');
      // console.log(actions.payload.items);
      return featureAdapter.addAll(actions.payload.items, {
        ...state,
        formState: createFormGroupState<Post>(NEWS_EDIT_FORM, new Post()),
        isLoading: false,
        message: null
      });
      /*return {
        ...state,
        posts: actions.payload.items,
        formState: createFormGroupState<Post>(NEWS_EDIT_FORM, new Post()),
        isLoading: false,
        message: null
      };*/
    }

    case ActionTypes.GET_ITEM: {
      // console.log("GET_ITEM: " + actions.payload.id);               
      return {
        ...state,
        formState: actions.payload.id ? createFormGroupState<Post>(NEWS_EDIT_FORM, new Post(state.entities[actions.payload.id])) : createFormGroupState<Post>(NEWS_EDIT_FORM, new Post()),
        isLoading: true,
        viewMode: actions.payload.viewMode ? actions.payload.viewMode : 'view'
      };
    }

    /* 
    case ActionTypes.GET_ITEM: {
      return {
        ...state,
        formState: actions.payload.id ? createFormGroupState<Post>(NEWS_EDIT_FORM, 
          new Post(state.posts.filter(item => item.id === actions.payload.id)[0])) : 
          createFormGroupState<Post>(NEWS_EDIT_FORM, new Post()),
        isLoading: true
      };
    } 
    */

    case ActionTypes.CREATE_ITEM:
    case ActionTypes.UPDATE_ITEM:
    case ActionTypes.DELETE_ITEM: {
      return {
        ...state,
        isLoading: true,
        message: null
      };
    }

    case ActionTypes.CREATE_ITEM_SUCCESS: {
      let viewmode;
      if (actions.payload.item.state === 'validated' || actions.payload.item.state === 'refused') {
        viewmode = 'view'
      } else viewmode = 'edition'

      return featureAdapter.addOne(actions.payload.item, {
        ...state,
        formState: createFormGroupState<Post>(NEWS_EDIT_FORM, new Post(actions.payload.item)),
        viewMode: viewmode,
        isLoading: false,
        message: actions.payload.msg
      });
    }
    /* case ActionTypes.CREATE_ITEM_SUCCESS: {
      return {
        ...state,
        posts: [
            ...state.posts, 
            actions.payload.item,
          ],
        message: actions.payload.msg,
        isLoading: false
      };
    } */

    case ActionTypes.UPDATE_ITEM_SUCCESS: {

      // if ((actions.payload.action === 'validation' || actions.payload.action === 'refusal') && actions.payload.id) {
      //   // console.log("Post reducer UPDATE_ITEM_SUCCESS validation")
      //   let itemToValidate: any;
      //   itemToValidate = { ...state.entities[actions.payload.id] }

      //   switch (actions.payload.action) {
      //     case 'refusal':
      //       itemToValidate.state = 'refused'
      //       break;
      //     case 'validation':
      //       itemToValidate.state = 'validated'
      //       break;
      //     default:
      //       break;
      //   }
      //   return {
      //     ...state,
      //     entities: {
      //       ...state.entities,
      //       [actions.payload.id]: itemToValidate
      //     },
      //     formState: state.formState.value.id ? createFormGroupState<Post>(NEWS_EDIT_FORM, new Post(itemToValidate)) : state.formState,
      //     isLoading: false,
      //     message: actions.payload.msg
      //   }

      //   /* return featureAdapter.updateOne(itemToValidate, {
      //     ...state,
      //     message: actions.payload.msg
      //   }); */

      // } else {

      let viewmode;
      if (actions.payload.item.state === 'validated' || actions.payload.item.state === 'refused') {
        viewmode = 'view'
      } else viewmode = 'edition'

      return featureAdapter.updateOne(actions.payload.item, {
        ...state,
        formState: createFormGroupState<Post>(NEWS_EDIT_FORM, new Post(actions.payload.item)),
        isLoading: false,
        viewMode: viewmode,
        message: actions.payload.msg
      });

      // }
    }
    /* case ActionTypes.UPDATE_ITEM_SUCCESS:{
      return {
        ...state,
        posts: state.posts.map(item => item.id === state.formState.value.id ? actions.payload.item : item),
        message: actions.payload.msg,
        isLoading: false
      };
    } */

    case ActionTypes.DELETE_ITEM_SUCCESS: {
      return featureAdapter.removeOne(actions.payload.id, {
        ...state,
        message: actions.payload.msg,
        formState: createFormGroupState<Post>(NEWS_EDIT_FORM, new Post()),
        isLoading: false,
        viewMode: 'view'
      });
    }
    /* case ActionTypes.DELETE_ITEM_SUCCESS: {
      return {
        ...state,
        posts: state.posts.filter(item => item.id !== actions.payload.id),
        formState: createFormGroupState<Post>(NEWS_EDIT_FORM, new Post()),
        message: actions.payload.msg,
        isLoading: false
      };
    } */

    case ActionTypes.SORT_ITEMS_FAIL:
    case ActionTypes.LOAD_ITEMS_FAIL:
    case ActionTypes.GET_ITEM_SUCCESS:
    case ActionTypes.GET_ITEM_FAIL:
    case ActionTypes.CREATE_ITEM_FAIL:
    case ActionTypes.UPDATE_ITEM_FAIL:
    case ActionTypes.DELETE_ITEM_FAIL: {
      return {
        ...state,
        isLoading: false,
        // message: actions.payload.msg ? actions.payload.msg : null
      };
    }


    default: {
      return state;
    }
  }
}


