import { Injectable }   from '@angular/core';
import { Observable }   from 'rxjs/Observable';
import {
  LoginForm,
  RegisterForm,
  LoggedUser,
  Password, 
  Profile, 
  FirstLogin
}                       from '@shared/models';

import {
  HttpService,
  POST,
  Body,
  Path,
  DefaultHeaders,
  Adapter,
  Headers,
  Produces,
  MediaType
}                       from '@shared/asyncServices/http';

@Injectable()
@DefaultHeaders({
  'Accept': '*/*',
  'Content-Type': 'application/json'
})
export class AuthApiClient extends HttpService {

  /**
   * Submits login form to the server
   * 
   * @param form
   */
  @POST("/user/account/update")
  // @Adapter(this.authAdapter)
  /*@Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  })*/
  // @Produces(MediaType.JSON)
  public firstlogin(@Body form: FirstLogin): Observable<any> { return null };

  /**
   * Submits login form to the server
   * 
   * @param form
   */
  @POST("/user/login")
  // @Adapter(this.authAdapter)
  /*@Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  })*/
  // @Produces(MediaType.JSON)
  public login(@Body form: LoginForm): Observable<any> { return null };

  /**
   * Logs out current user
   */
  @POST("/user/logout")
  public logout(): Observable<any> { return null; };

  /**
   * Submits register form to the server
   * 
   * @param form
   */
  @POST("/user/register")
  // @Adapter(this.authAdapter)
  public register(@Body phone: string): Observable<any> { return null; };

  /**
   * Submits register form to the server
   * 
   * @param form
   */
  @POST("/user/validate")
  // @Adapter(this.authAdapter)
  public validate(@Body form: RegisterForm): Observable<any> { return null; };

  /**
   * Submits register form to the server
   * 
   * @param form
   */
  @POST("/user/apps-download")
  // @Adapter(this.authAdapter)
  public appsDownload(@Path("applink") applink: string): Observable<any> { return null; };

  /**
   * Update loggedin user profile
   * 
   * @param form
   */
  @POST("/user/profile") // envoie en payload
  // @Adapter(UsersService.userDetailsAdapter)
  public profileUpdate(@Body form: Profile): Observable<any> { return null; };

  /**
   * Update loggedin user password 
   * 
   * @param form
   */
  @POST("/user/password") // envoie en payload
  public passwordUpdate(@Body form: Password): Observable<any> { return null; };

}
