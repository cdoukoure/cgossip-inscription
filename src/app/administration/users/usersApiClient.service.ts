import { Injectable }       from '@angular/core';
import {
  HttpService,
  GET,
  POST,
  Body,
  Path,
  Adapter
}                           from '@shared/asyncServices/http';

import { Observable }       from 'rxjs/Observable';

// import { SortDirection } from '@angular/material';

// import { UsersService }  from './users.service';

import { User } from '@app/shared/models';

@Injectable({
  providedIn: "root"
})
export class UsersApiClient extends HttpService {

  /**
   * Retrieves all items
   */
  @GET("/admin/users") // param dans le payload
  public loadItems(
    @Body payload?: { 
      filter: any, // eq [{'key':'firstname', 'value':'Atteke'},{'key':'country', 'value':'civ'}, ...] 
      pindex: number,
      psize: number,
      sort: any // sort for user - role type('fan','celebrity' ), for Posts - my or all
    }
  ): Observable<any> { return null; };

  /**
   * Retrieve single item for details by a given id
   * 
   * @param id
   *
  @GET("/users/")
  @Adapter(UsersService.userDetailsAdapter)
  public getUser(@Body id: number): Observable<any> { return null; };
  */

  /**
   * Retrieve single item for details by a given id
   * @param id
   */
  @POST("/admin/account/create")
  // @Adapter(UsersService.userDetailsAdapter)
  public createItem(@Body form : User): Observable<any> { return null; };

  /**
   * Retrieve single item for details by a given id
   * @param id
   */
  @POST("/admin/account/update")
  // @Adapter(UsersService.userDetailsAdapter)
  public updateItem(@Body form : User): Observable<any> { return null; };

  /**
   * Delete single item for details by a given id
   * 
   * @param id
   */
  @POST("/admin/user/delete") // envoie du phone en payload
  public deleteItem(@Body phone: any): Observable<any> { return null; };

  /**
   * Retrieve single item for details by a given id
   * @param phone
   */
  @POST("/admin/generate") // envoie du phone en payload pour generer un mot de passe par sms
  public adminGenerate(@Body phone : any): Observable<any> { return null; };

}
