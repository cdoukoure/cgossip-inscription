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

@Injectable({
  providedIn: "root"
})
export class NewsApiClient extends HttpService {

  /**
   * Retrieves all items
   */
  @GET("/admin/news") // param dans le payload
  // @Adapter(PostsService.gridAdapter)  
  public loadItems(
    @Body filter : any = null, // eq [{'key':'firstname', 'value':'Atteke'},{'key':'country', 'value':'civ'}, ...]
    @Body pindex : number = 0, 
    @Body psize : number = 3000, 
    @Body sort : any = null, // sort for user - role type('fan','celebrity' ), for Posts - my or all
  ): Observable<any> { 
    // console.log("PostsApiClient loadItems();");
    return null; 
  };

  /**
   * Retrieve single item for details by a given id
   * 
   * @param id
   *
  @GET("/users/")
  @Adapter(PostsService.userDetailsAdapter)
  public getPost(@Body id: number): Observable<any> { return null; };
  */

  /**
   * Retrieve single item for details by a given id
   * 
   * @param id
   */
  @POST("/admin/news/create")
  // @Adapter(PostsService.userDetailsAdapter)
  public createItem(@Body {item : Post, action:string}): Observable<any> { return null; };

  /**
   * Retrieve single item for details by a given id
   * @param payload
   */
  @POST("/admin/news/update")
  // @Adapter(PostsService.userDetailsAdapter)
  public updateItem(@Body {item : Post, action:string}): Observable<any> { return null; };

  /**
   * Delete single item for details by a given id
   * @param payload
   */
  // @POST("/admin/news/delete") // envoie du phone en payload
  @POST("/pub/delete") // envoie du phone en payload
  public deleteItem(@Body payload: any): Observable<any> { return null; };

}
