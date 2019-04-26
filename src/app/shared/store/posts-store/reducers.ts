import {
  createFormStateReducerWithUpdate,
  updateGroup,
  validate,
  createFormGroupState,
  enable,
} from 'ngrx-forms';

import {
  required,
  maxLength,
  minLength,
} from 'ngrx-forms/validation';

import { Actions, ActionTypes } from './actions';
import { initialState, State, POST_EDIT_FORM, featureAdapter, COMMENT_FORM } from './state';
import { Post, Comment, Media } from '@app/shared/models';

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
      id: validate(required),
      author: validate(required),
      media: (state, parentState) => {
        /*
        if (!parentState.value.createAccount) {
          return disable(state);
        }
        */
        state = enable(state);
        return updateGroup<Media>(state, {
          url: validate(required),
          type: validate(required),
        });
      },
      title: validate([required, maxLength(200), minLength(2)]),
      description: validate([required, minLength(2)]),
      content: validate([required, minLength(2)]),
      lastmodified: validate(required),
      state: validate(required)
    },
    { // Update part

    }
  );
  // #2 create reducer function
  const PostFormReducer = createFormStateReducerWithUpdate<Post>(postValidateAndUpdateFormState);
  // #3 - updating store
  const formState = PostFormReducer(state.formState, actions);
  if (formState !== state.formState) {
    state = {
      ...state,
      formState: formState,
    };
  }

  const commentValidateAndUpdateFormState = updateGroup<Comment>(
    { // Validation part
      pubid: validate(required),
      text: validate(required)
    },
    { // Update part

    }
  );
  // #2 create reducer function
  const CommentFormReducer = createFormStateReducerWithUpdate<Comment>(commentValidateAndUpdateFormState);
  // #3 - updating store
  const commentState = CommentFormReducer(state.commentState, actions);
  if (commentState !== state.commentState) {
    state = {
      ...state,
      commentState: commentState,
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

    case ActionTypes.SORT_ITEMS_SUCCESS: {
      return {
        ...state,
        formState: createFormGroupState<Post>(POST_EDIT_FORM, new Post()),
        message: null,
        isLoading: false
      };
    }

    case ActionTypes.LOAD_ITEMS: {
      return {
        ...state,
        formState: createFormGroupState<Post>(POST_EDIT_FORM, new Post()),
        isLoading: true,
        message: null
      };
    }

    case ActionTypes.LOAD_ITEMS_SUCCESS: {
      // console.log('Post reducer LOAD_ITEMS_SUCCESS');
      // console.log(actions.payload.items);
      return featureAdapter.addAll(actions.payload.items, {
        ...state,
        formState: createFormGroupState<Post>(POST_EDIT_FORM, new Post()),
        isLoading: false,
        message: null
      });
      /*
      return {
        ...state,
        posts: actions.payload.items,
        formState: createFormGroupState<Post>(POST_EDIT_FORM, new Post()),
        isLoading: false,
        message: null
      };
      */
    }

    case ActionTypes.GET_ITEM: {
      return {
        ...state,
        formState: actions.payload.id ? createFormGroupState<Post>(POST_EDIT_FORM, new Post(state.entities[actions.payload.id])) : createFormGroupState<Post>(POST_EDIT_FORM, new Post()),
        commentState: actions.payload.id ? createFormGroupState<Comment>(COMMENT_FORM, new Comment({pubid: actions.payload.id, text: ''})) : createFormGroupState<Comment>(COMMENT_FORM, new Comment()),
        isLoading: true
      };
    }

    case ActionTypes.GET_ITEM_SUCCESS: {
      // console.log("actions.payload.item " + actions.payload.item)
      if(actions.payload.item) {
        return {
          ...state,
          formState: createFormGroupState<Post>(POST_EDIT_FORM, new Post(actions.payload.item)),
          isLoading: false
        };  
      } else {
        return {
          ...state,
          formState: createFormGroupState<Post>(POST_EDIT_FORM, new Post()),
          isLoading: false
        };  
      }
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

    case ActionTypes.CREATE_ITEM_SUCCESS: {
      return featureAdapter.addOne(actions.payload.item, {
        ...state,
        isLoading: false,
        message: actions.payload.msg
      });
    }
    /* 
    case ActionTypes.CREATE_ITEM_SUCCESS: {
      return {
        ...state,
        posts: [
            ...state.posts, 
            actions.payload.item,
          ],
        message: actions.payload.msg,
        isLoading: false
      };
    } 
    */

    case ActionTypes.UPDATE_ITEM_SUCCESS: {
      
      if (actions.payload.action && actions.payload.id) {
        let itemToValidate: any;
        itemToValidate = { ...state.entities[actions.payload.id] }

        switch (actions.payload.action) {
          case 'refusal':
            itemToValidate.state = 'refused'
            break;
          case 'validation':
            itemToValidate.state = 'validated'
            break;
          default:
            break;
        }

        return {
          ...state,
          entities: {
            ...state.entities,
            [actions.payload.id]: itemToValidate
          },
          formState: state.formState.value.id ? createFormGroupState<Post>(POST_EDIT_FORM, new Post(itemToValidate)) : state.formState,
          message: actions.payload.msg,
          isLoading: false
        }

      } else {
        return featureAdapter.updateOne(actions.payload.item, {
          ...state,
          message: actions.payload.msg,
          isLoading: false
        });
      }
    }
    /* 
    case ActionTypes.UPDATE_ITEM_SUCCESS:{
      return {
        ...state,
        posts: state.posts.map(item => item.id === state.formState.value.id ? actions.payload.item : item),
        message: actions.payload.msg,
        isLoading: false
      };
    } 
    */

    case ActionTypes.DELETE_ITEM_SUCCESS: {
      return featureAdapter.removeOne(actions.payload.id, {
        ...state,
        message: actions.payload.msg,
        formState: createFormGroupState<Post>(POST_EDIT_FORM, new Post()),
        isLoading: false
      });
    }
    /* 
    case ActionTypes.DELETE_ITEM_SUCCESS: {
      return {
        ...state,
        posts: state.posts.filter(item => item.id !== actions.payload.id),
        formState: createFormGroupState<Post>(POST_EDIT_FORM, new Post()),
        message: actions.payload.msg,
        isLoading: false
      };
    } 
    */

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


