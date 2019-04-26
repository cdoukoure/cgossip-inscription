import { Actions, ActionTypes } from './actions';
import { initialState, State, PASS_EDIT_FORM, PROFILE_EDIT_FORM, FIRST_EDIT_FORM } from './state';
import { createFormStateReducerWithUpdate, updateGroup, validate, createFormGroupState, box } from 'ngrx-forms';
import { PasswordForm, ProfileForm, Password, Profile, FirstLogin } from '@app/shared/models';
import { maxLength, minLength, required, equalTo } from 'ngrx-forms/validation';

export function reducer(state = initialState, actions: Actions): State {
  if (!actions) return state;

  const profilValidateAndUpdateFormState = updateGroup<ProfileForm>(
    { // 
      profile: updateGroup<ProfileForm['profile']>({
        firstname: validate([required, maxLength(150), minLength(2)]),
        lastname: validate([required, maxLength(20), minLength(2)]),
        pseudo: validate([required, maxLength(20), minLength(2)]),
      }),
    }
  ); 

  // #2 create reducer function
  const profileFormReducer = createFormStateReducerWithUpdate<ProfileForm>(profilValidateAndUpdateFormState);
  // #3 - updating store
  const profilEdit = profileFormReducer(state.profilEdit, actions);
  if (profilEdit !== state.profilEdit) {
    state = { 
      ...state, 
      profilEdit:  profilEdit,
    };
  }

  const passwordValidateAndUpdateFormState = updateGroup<PasswordForm>(
    { // Validation part
      password: updateGroup<PasswordForm['password']>({
        passe: validate([required, minLength(6)]),
        cpasse: (cpasse, passwordState) => validate(
          cpasse, 
          [
            required, 
            minLength(6), 
            equalTo(passwordState.value.passe)
          ]
        ),
      })
    },
    { // Update part
      /* password: (
        password: FormGroupState<PasswordForm['password']>, 
        myForm: FormGroupState<PasswordForm>
      ) => updateGroup<PasswordForm['password']>(password, {
        cpasse: (cpasse: FormControlState<string>) => {
          if (cpasse !== myForm.controls.password.controls.passe) {
            // sets the control's value to 1 and clears all errors
            return setErrors(setValue(cpasse, ''), notEqualTo(password.controls.passe));
          }
          return cpasse;
        },
      }), */    
    }
  ); 
  // #2 create reducer function
  const passwordFormReducer = createFormStateReducerWithUpdate<PasswordForm>(passwordValidateAndUpdateFormState);
  // #3 - updating store
  const passwordEdit = passwordFormReducer(state.passwordEdit, actions);
  if (passwordEdit !== state.passwordEdit) {
    state = { 
      ...state, 
      passwordEdit:  passwordEdit,
    };
  }

  const firstLoginValidateAndUpdateFormState = updateGroup<FirstLogin>(
    { // Validation part
      phone: validate([required, minLength(6)]),
      pseudo: validate([required, minLength(2)]),
      passe: validate([required, minLength(6)]),
      cpasse: (cpasse, passwordState) => validate(
        cpasse, 
        [
          required, 
          minLength(6), 
          equalTo(passwordState.value.passe)
        ]
      ),
      groups: validate([required, minLength(1)]),
    },
    { // Update part 
    }
  ); 
  // #2 create reducer function
  const firtLoginReducer = createFormStateReducerWithUpdate<FirstLogin>(firstLoginValidateAndUpdateFormState);
  // #3 - updating store
  const firstLogin = firtLoginReducer(state.firstLogin, actions);
  if (firstLogin !== state.firstLogin) {
    state = { 
      ...state, 
      firstLogin:  firstLogin,
    };
  }

  /*** End NGX-FORMS ***/

  switch (actions.type) {
    case ActionTypes.INIT_FIRSTLOGIN: {
      console.log(actions.payload.me);
      let me = {...actions.payload.me};
      me.passe = "";
      me.cpasse = "";
      me.pseudo = "";
      let formState = createFormGroupState<FirstLogin>(FIRST_EDIT_FORM, new FirstLogin(me));
      console.log(formState);
      return {
        ...state,
        firstLogin: formState,
        step: 5, // To redirect to form
        authMessage:null,
        authIsLoading: false
      };
    }

    case ActionTypes.DO_FIRSTLOGIN:
    case ActionTypes.DO_LOGIN:
    case ActionTypes.DO_LOGOUT:
    case ActionTypes.DO_PROFILE:
    case ActionTypes.DO_REGISTER: {
      return {
        ...state,
        authMessage:null,
        authIsLoading: true
      };
    }

    case ActionTypes.DO_LOGIN_SUCCESS: {
      return {
        ...state,
        step: 1,
        me: actions.payload.me,
        jwt: actions.payload.jwt,
        expireat: actions.payload.expireat, //  JSON.stringify(expireAt.valueOf()),
        authMessage: null,
        authIsLoading: false,
        profilEdit: {
          ...state.profilEdit,
          controls: {
              ...state.profilEdit.controls,
              profile: createFormGroupState<Profile>(PROFILE_EDIT_FORM+".profile", new Profile(actions.payload.me))
          },
        },
      };
    }

    case ActionTypes.DO_PROFILE_SUCCESS: {
      return {
        ...state,
        me: actions.payload.me,
        authMessage:null,
        authIsLoading: false,
        profilEdit: {
          ...state.profilEdit,
          controls: {
              ...state.profilEdit.controls,
              profile: createFormGroupState<Profile>(PROFILE_EDIT_FORM+".profile", new Profile(actions.payload.me))
          },
        },
      };
    }

    case ActionTypes.SET_USER_INFO: {
      let newState = {...state}
      newState[actions.payload.key] = actions.payload.value
      newState.authIsLoading = true;
      if (actions.payload.key === 'me') {
        newState = {
          ...newState,
          profilEdit: {
            ...state.profilEdit,
            controls: {
                ...state.profilEdit.controls,
                profile: createFormGroupState<Profile>(PROFILE_EDIT_FORM+".profile", new Profile(actions.payload.value))
            },
          },
        }
      }

      return newState;
    }

    case ActionTypes.SET_USER_INFO_SUCCESS: {
      return {
        ...state,
        authIsLoading: false
      };
    }

    case ActionTypes.DO_LOGOUT_SUCCESS: {
      if (localStorage.getItem('jwtoken')) localStorage.removeItem('jwtoken');
      if (localStorage.getItem('userInfo')) localStorage.removeItem('userInfo');
      return Object.assign({}, state, initialState);
      // return {...state, ...initialState};
    }

    case ActionTypes.SET_USER_INFO_FAIL: 
    case ActionTypes.DO_LOGIN_FAIL: 
    case ActionTypes.DO_LOGOUT_FAIL: {
      return {
        ...state,
        authMessage:"Pseudo ou mot de passe invalide !!!",
        authIsLoading: false
      };
    }

    case ActionTypes.DO_REGISTER: {
      return {
        ...state,
        me: null,
        authIsLoading: true,
        phone: actions.payload.phone,
        codev: ""
      };
    }

    case ActionTypes.DO_REGISTER_SUCCESS: {
      return {
        ...state,
        authIsLoading: false,
        step : 2
      };
    }

    case ActionTypes.DO_REGISTER_FAIL: {
      return {
        ...state,
        authIsLoading: false,
        authMessage:actions.payload.msg,
      };
    }

    case ActionTypes.DO_VALIDATE: {
      return {
        ...state,
        me: null,
        authIsLoading: true,
        phone: actions.payload.phone,
        codev: actions.payload.codev
      };
    }

    case ActionTypes.DO_VALIDATE_SUCCESS: {
      return {
        ...state,
        authIsLoading: false,
        step : 3,
        links: actions.payload.links
      };
    }

    case ActionTypes.DO_PROFILE_FAIL:
    case ActionTypes.DO_VALIDATE_FAIL: {
      return {
        ...state,
        authIsLoading: false,
        authMessage:actions.payload.msg,
      };
    }

    case ActionTypes.DO_PASSWORD: {
      return {
        ...state,
        authIsLoading: true
      };
    }

    case ActionTypes.DO_PASSWORD_SUCCESS: {
      return {
        ...state,
        authIsLoading: false,
        passwordEdit: {
          ...state.passwordEdit,
          controls: {
              ...state.passwordEdit.controls,
              password: createFormGroupState<Password>(PASS_EDIT_FORM+".password", new Password())
          },
        },
      };
    }

    case ActionTypes.DO_PASSWORD_FAIL: {
      return {
        ...state,
        authIsLoading: false,
        passwordEdit: {
          ...state.passwordEdit,
          controls: {
              ...state.passwordEdit.controls,
              password: createFormGroupState<Password>(PASS_EDIT_FORM+".password", new Password())
          },
        }
      };
    }
    
    case ActionTypes.DO_RESET: {
      // let me : Profile;
      //if (localStorage.getItem('userInfo')) {
        // console.log(JSON.parse(localStorage.getItem('userInfo')));
      let me = new Profile(state.me);
        // console.log(me);
        /* me2 = {
          ...me,
          avatar: "",
          avatarOri: me.avatar
        } */ 
      //}
      return {
        ...state,
        passwordEdit: {
          ...state.passwordEdit,
          controls: {
              ...state.passwordEdit.controls,
              password: createFormGroupState<Password>(PASS_EDIT_FORM+".password", new Password())
          },
        },
        profilEdit: {
          ...state.profilEdit,
          controls: {
              ...state.profilEdit.controls,
              profile: createFormGroupState<Profile>(PROFILE_EDIT_FORM+".profile", me)
          },
        }
      };
    }
    case ActionTypes.DO_RESET_COMPLETE:
    default: {
      return state;
    }
  }
}
