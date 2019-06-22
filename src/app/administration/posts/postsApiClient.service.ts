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

import { Post, LoadItems } from '@app/shared/models';

@Injectable({
  providedIn: "root"
})
export class PostsApiClient extends HttpService {

  /**
   * Retrieves all items
   */
  @POST("/admin/posts") 
  public loadItems(@Body payload: LoadItems): Observable<any> { return null; };

  /**
   * Retrieve single item for details by a given id
   * 
   * @param id
   */
  @POST("/pub/details")
  // @Adapter(PostsService.userDetailsAdapter)
  public getItem(@Body payload: any): Observable<any> { return null; };


  /**
   * Retrieve single item for details by a given id
   * 
   * @param id
   */
  @POST("/admin/posts/create")
  // @Adapter(PostsService.userDetailsAdapter)
  public createItem(@Body form : Post): Observable<any> { return null; };

  /**
   * Retrieve single item for details by a given id
   * 
   * @param id
   */
  @POST("/admin/posts/update")
  // @Adapter(PostsService.userDetailsAdapter)
  public updateItem(@Body form : Post): Observable<any> { return null; };

  /**
   * Delete single item for details by a given id
   * 
   * @param id
   */
  @POST("/admin/posts/delete") // envoie du phone en payload
  public deleteItem(@Body id: any): Observable<any> { return null; };

  /**
   * 
   * @param id
   */
  @POST("/admin/post/validate") // envoie du phone en payload
  public treatment(@Body {id, action}): Observable<any> { return null; };

  /**
   * 
   * @param pubid, text 
   */
  @POST("/comment/new") // envoie du phone en payload
  public postComment(@Body payload: any): Observable<any> { return null; };

}
