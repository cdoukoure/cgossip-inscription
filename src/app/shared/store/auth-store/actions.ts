import {
  LoginForm,
  RegisterForm,
  LoggedUser,
  Profile,
  Password,
  FirstLogin
}                 from '@shared/models';
import { type, ActionWithPayload }   from '@shared/utility';

export const ActionTypes = {
  DO_REGISTER:                 type('[Auth] Do Register'),
  DO_REGISTER_SUCCESS:         type('[Auth] Do Register Success'),
  DO_REGISTER_FAIL:            type('[Auth] Do Register Fail'),

  DO_VALIDATE:                 type('[Auth] Do Validate'),
  DO_VALIDATE_SUCCESS:         type('[Auth] Do Validate Success'),
  DO_VALIDATE_FAIL:            type('[Auth] Do Validate Fail'),

  DO_LOGIN:                    type('[Auth] Do Login'),
  DO_LOGIN_SUCCESS:            type('[Auth] Do Login Success'),
  DO_LOGIN_FAIL:               type('[Auth] Do Login Fail'),

  SET_USER_INFO:               type('[Auth] Set user info'),
  SET_USER_INFO_SUCCESS:       type('[Auth] Set user info Success'),
  SET_USER_INFO_FAIL:          type('[Auth] Set user info Fail'),

  DO_FIRSTLOGIN:               type('[Auth] Do First Login'),
  INIT_FIRSTLOGIN:             type('[Auth] Init First Login'),

  DO_LOGOUT:                   type('[Auth] Do Logout'),
  DO_LOGOUT_SUCCESS:           type('[Auth] Do Logout Success'),
  DO_LOGOUT_FAIL:              type('[Auth] Do Logout Fail'),
  // Profile update
  DO_PROFILE:                  type('[Auth] Do Profile'),
  DO_PROFILE_SUCCESS:          type('[Auth] Do Profile success'),
  DO_PROFILE_FAIL:             type('[Auth] Do Profile fail'),
  // password Update
  DO_PASSWORD:                 type('[Auth] Do Password'),
  DO_PASSWORD_SUCCESS:         type('[Auth] Do Password success'),
  DO_PASSWORD_FAIL:            type('[Auth] Do Password fail'),
  // Reset all form
  DO_RESET:                    type('[Auth] Do Reset form'),
  DO_RESET_COMPLETE:             type('[Auth] Do Reset form complete'),
};

/**
 * First Login Actions
 */
export class InitFirstLoginAction implements ActionWithPayload {
  readonly type = ActionTypes.INIT_FIRSTLOGIN;

  constructor(public payload: any) {
    // console.log(JSON.stringify(payload))
  }
}

export class DoFirstLoginAction implements ActionWithPayload {
  readonly type = ActionTypes.DO_FIRSTLOGIN;

  constructor(public payload: FirstLogin) {
    // console.log(JSON.stringify(payload))
   }
}

/**
 * Login Actions
 */
export class DoLoginAction implements ActionWithPayload {
  readonly type = ActionTypes.DO_LOGIN;

  constructor(public payload: LoginForm) {
    // console.log(JSON.stringify(payload))
   }
}

export class DoLoginSuccessAction implements ActionWithPayload {
  readonly type = ActionTypes.DO_LOGIN_SUCCESS;

  // constructor(public payload: any) { }
  constructor(public payload: { me: LoggedUser, jwt: string, expireat: string }) {}
}

export class DoLoginFailAction implements ActionWithPayload {
  readonly type = ActionTypes.DO_LOGIN_FAIL;

  // constructor(public payload: any = null) { }
  constructor (public payload: any = null) { }
}

export class SetUserInfo implements ActionWithPayload {
  readonly type = ActionTypes.SET_USER_INFO;
  // constructor(public payload: any = null) { }
  constructor (public payload: any = null) { }
}

export class SetUserInfoSuccess implements ActionWithPayload {
  readonly type = ActionTypes.SET_USER_INFO_SUCCESS;
  // constructor(public payload: any) { }
  constructor(public payload: any = null) {}
}

export class SetUserInfoFail implements ActionWithPayload {
  readonly type = ActionTypes.SET_USER_INFO_FAIL;
  // constructor(public payload: any = null) { }
  constructor (public payload: any = null) { }
}

/**
 * Logout Actions
 */
export class DoLogoutAction implements ActionWithPayload {
  type = ActionTypes.DO_LOGOUT;

  constructor(public payload: any = null) { }
}

export class DoLogoutSuccessAction implements ActionWithPayload {
  type = ActionTypes.DO_LOGOUT_SUCCESS;

  constructor(public payload: any = null) { }
}

export class DoLogoutFailAction implements ActionWithPayload {
  type = ActionTypes.DO_LOGOUT_FAIL;

  constructor(public payload: any = null) { }
}

/**
 * Register Actions
 */
export class DoRegisterAction implements ActionWithPayload {
  type = ActionTypes.DO_REGISTER;
  constructor(public payload: {phone: string}) { 
    // console.log("Action DoRegisterAction payload: " + JSON.stringify(payload));
  }
}

export class DoRegisterSuccessAction implements ActionWithPayload {
  type = ActionTypes.DO_REGISTER_SUCCESS;
  
  constructor(public payload: any = null) { }
}

export class DoRegisterFailAction implements ActionWithPayload {
  type = ActionTypes.DO_REGISTER_FAIL;
  
  constructor(public payload: any = null) { }
}

/**
 * Register Actions
 */
export class DoValidateAction implements ActionWithPayload {
  type = ActionTypes.DO_VALIDATE;
  constructor(public payload: RegisterForm) { 
    // console.log("Action DoRegisterAction payload: " + JSON.stringify(payload));
  }
}

export class DoValidateSuccessAction implements ActionWithPayload {
  type = ActionTypes.DO_VALIDATE_SUCCESS;
  
  constructor(public payload: {links: any}) { }
}

export class DoValidateFailAction implements ActionWithPayload {
  type = ActionTypes.DO_VALIDATE_FAIL;
  
  constructor(public payload: any = null) { }
}

/**
 * profile Actions
 */
export class DoProfileUpdateAction implements ActionWithPayload {
  type = ActionTypes.DO_PROFILE;
  constructor(public payload: Profile) { 
    // console.log("Action DoRegisterAction payload: " + JSON.stringify(payload));
  }
}

export class DoProfileUpdateSuccessAction implements ActionWithPayload {
  type = ActionTypes.DO_PROFILE_SUCCESS;
  
  constructor(public payload: { me: any }) { }
}

export class DoProfileUpdateFailAction implements ActionWithPayload {
  type = ActionTypes.DO_PROFILE_FAIL;
  
  constructor(public payload: any = null) { }
}


/**
 * Password Actions
 */
export class DoPasswordUpdateAction implements ActionWithPayload {
  type = ActionTypes.DO_PASSWORD;
  constructor(public payload: Password) { 
    console.log("Action DoPasswordAction payload: " + JSON.stringify(payload));
  }
}

export class DoPasswordUpdateSuccessAction implements ActionWithPayload {
  type = ActionTypes.DO_PASSWORD_SUCCESS;
  
  constructor(public payload: any = null) { }
}

export class DoPasswordUpdateFailAction implements ActionWithPayload {
  type = ActionTypes.DO_PASSWORD_FAIL;
  
  constructor(public payload: any = null) { }
}

export class DoResetForm implements ActionWithPayload {
  type = ActionTypes.DO_RESET;
  
  constructor(public payload: any = null) { }
}

export class DoResetFormComplete implements ActionWithPayload {
  type = ActionTypes.DO_RESET_COMPLETE;
  
  constructor(public payload: any = null) { }
}


export type Actions
  = 
  InitFirstLoginAction
  | DoFirstLoginAction
  | DoLoginAction
  | DoLoginSuccessAction
  | DoLoginFailAction
  | DoLogoutAction
  | DoLogoutSuccessAction
  | DoLogoutFailAction
  | DoRegisterAction
  | DoRegisterSuccessAction
  | DoRegisterFailAction
  | DoValidateAction
  | DoValidateSuccessAction
  | DoValidateFailAction
  | DoProfileUpdateAction
  | DoProfileUpdateSuccessAction
  | DoProfileUpdateFailAction
  | DoPasswordUpdateAction
  | DoPasswordUpdateSuccessAction
  | DoPasswordUpdateFailAction
  | DoResetForm
  | DoResetFormComplete
  | SetUserInfo
  | SetUserInfoSuccess
  | SetUserInfoFail
  ;
