import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, forkJoin } from "rxjs";

import moment from 'moment';

import { Sandbox } from '@shared/sandbox/base.sandbox';
import {
  AuthSelectors,
  AuthActions,
  AppState,
} from '@shared/store';

import {
  LoginForm,
  RegisterForm,
  Password,
  Profile,
  FirstLogin
} from '@shared/models';
import { Location } from '@angular/common';
import { SetValueAction } from 'ngrx-forms';
import { UsersSandbox } from '@app/administration/users/users.sandbox';

@Injectable({
  providedIn: "root"
})
export class AuthSandbox extends Sandbox {


  public step$ = this.store$.select(state => state.auth.step);
  public isLoading$ = this.store$.select(state => state.auth.authIsLoading);
  public message$ = this.store$.select(state => state.auth.authMessage);
  public loggedUser$ = this.store$.select(state => state.auth.me);
  public jwt$ = this.store$.select(AuthSelectors.jwt);
  public expiration$ = this.store$.select(state => moment(state.auth.expireat, 'second'));
  // public isLoggedin$ = moment().isBefore(this.expiration$);

  // Profile observables
  public firstLoginFormState$ = this.store$.select(state => state.auth.firstLogin);

  // Profile observables
  public profilFormState$ = this.store$.select(state => state.auth.profilEdit.controls.profile);

  // Password observables
  public passwordFormState$ = this.store$.select(state => state.auth.passwordEdit.controls.password);



  private subscriptions: Array<Subscription> = [];

  constructor(
    private userSandbox: UsersSandbox,
    private router: Router,
    private location: Location,
    protected store$: Store<AppState.State>
  ) {
    super(store$);
    this.registerAuthEvents();
  }

  public formStateSetValue(ControlID:string, value) {
    this.store$.dispatch(new SetValueAction(ControlID, value));
  }

  /**
   * Dispatches login action
   *
   * @param form
   */
  public login(form: any): void {
    this.store$.dispatch(new AuthActions.DoLoginAction(new LoginForm(form)));
  }

  /**
   * Dispatches login action
   *
   * @param form
   */
  public firstlogin(): void {
    // this.store$.dispatch(new AuthActions.DoFirstLoginAction(new FirstLogin(form)));
    let subscription = this.firstLoginFormState$.subscribe(fs => {
      if (fs.isValid) {
        this.store$.dispatch(new AuthActions.DoFirstLoginAction(new FirstLogin(fs.value)))
      }
    });
    subscription.unsubscribe();
  }


  private setUserInfoOnRefresh(key: string, value: any): void {
    // console.log("SetUserInfo " + key + " " + value);
    this.store$.dispatch(new AuthActions.SetUserInfo({ key: key, value: value }))
  }

  /**
   * Dispatches logout action
   *
   * @param form
   */
  public logout(): void {
    this.store$.dispatch(new AuthActions.DoLogoutAction());
  }

  /**
    * Dispatches register action
    *
    * @param form
    */
  public profileUpdate(photo?: any): void {
    let subscription = this.profilFormState$.subscribe(fs => {
      if (fs.isValid) {
        let newItem = { ...fs.value }
        if (photo) {
          newItem.avatar = photo
        } else {
          newItem.avatar = ""
        }
        console.log(newItem);
        this.store$.dispatch(new AuthActions.DoProfileUpdateAction(newItem))
      }
    });
    subscription.unsubscribe();
    /* this.profilFormState$.pipe(
      take(1),
      filter(s => s.isValid),
      map(fs => 
        this.store$.dispatch(new UsersActions.DoProfileUpdateAction( new Profile(fs.value) ))
      ),
    ) */
  }

  /**
   * Dispatches register action
   *
   * @param form
   */
  public passwordUpdate() {
    let subscription = this.passwordFormState$.subscribe(fs => {
      if (fs.isValid) {
        this.store$.dispatch(new AuthActions.DoPasswordUpdateAction(new Password(fs.value)))
      }
    });
    subscription.unsubscribe();
    // TODO : Remove subscrition and work with pipe
    /* this.passwordFormState$.pipe(
      take(1),
      filter(s => s.isValid),
      map(fs => 
        this.store$.dispatch(new UsersActions.DoPasswordUpdateAction( new Password(fs.value) ))
      ),
    ) */
  }

  /**
   * Dispatches register action
   *
   * @param form
   */
  public resetForm() {
    this.store$.dispatch(new AuthActions.DoResetForm())
  }

  /**
   * Dispatches register action
   *
   * @param form
   */
  public register(phone: string): void {
    this.store$.dispatch(new AuthActions.DoRegisterAction({ phone }));
  }

  /**
   * Dispatches register action
   *
   * @param form
   */
  public validate(form: string): void {
    this.store$.dispatch(new AuthActions.DoValidateAction(new RegisterForm(form)));
  }

  /**
   * Unsubscribe from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Registers events
   */
  private registerAuthEvents(): void {

    // Subscribes to login success event and redirects user to home page
    this.subscriptions.push(
      this.jwt$.subscribe((jwt: string) => {
        if (jwt) {
          localStorage.setItem('jwtoken', jwt);
          let currentRoute = localStorage.getItem("currentRoute"); // define in @shared/store/utils/router-utils
          if (currentRoute) {
            if (currentRoute !== '/admin-panel/users/list') {
              this.userSandbox.loadItems();
            }
            this.router.navigate([currentRoute]);
          } else this.router.navigate(['/admin-panel']);
        }
        else if (localStorage.getItem("jwtoken")) {
          let jwt = localStorage.getItem("jwtoken");
          this.setUserInfoOnRefresh("jwt", jwt);
        }
        else this.router.navigate(['/login']);
      })
    );

    this.subscriptions.push(
      this.loggedUser$.subscribe((userInfo: any) => {
        if (userInfo) {
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
        else if (localStorage.getItem("userInfo")) {
          let userInfo = JSON.parse(localStorage.getItem("userInfo"));
          this.setUserInfoOnRefresh("me", userInfo);
        }
      })
    );

    // Subscribes to login step event and redirects user to first login page
    this.subscriptions.push(this.step$.subscribe((step: number) => {
      if (step === 5) {
        // console.log("User logged in !!!");
        this.router.navigate(['/first-login']);
      }
    }));

  }

  /**
   * Uncapitalize response keys
   *
   * @param user
   */
  static authAdapter(user: any): any {
    return Object.assign({}, user, { login: user.Login });
  }
}