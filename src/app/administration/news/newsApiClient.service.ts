import { Injectable } from '@angular/core';
import {
  HttpService,
  GET,
  POST,
  Body,
  Path,
  Adapter,
  SpecialBaseUrl,
  Produces,
  MediaType,
  DefaultHeaders
} from '@shared/asyncServices/http';

import { Observable } from 'rxjs/Observable';
import { LoadItems } from '@app/shared/models';

@Injectable({
  providedIn: "root"
})
@DefaultHeaders({
  'Accept': '*/*',
  'Content-Type': 'application/json'
})
export class NewsApiClient extends HttpService {

  /**
   * Retrieves all items
   */
  @POST("/admin/news") // param dans le payload
  // @Adapter(PostsService.gridAdapter)  
  public loadItems(
    @Body payload?: LoadItems
  ): Observable<any> { return null; };

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
   * @rchanges_2019
   * @param id
   */
  @POST("/admin/news/create")
  // @Adapter(PostsService.userDetailsAdapter)
  public createItem(@Body { item: Post, action: string }): Observable<any> { return null; };

  /**
   * Retrieve single item for details by a given id
   * @param payload
   */
  @POST("/admin/news/update")
  // @Adapter(PostsService.userDetailsAdapter)
  public updateItem(@Body { item: Post, action: string }): Observable<any> { return null; };

  /**
   * Delete single item for details by a given id
   * @param payload
   */
  // @POST("/admin/news/delete") // envoie du phone en payload
  @POST("/pub/delete") // envoie du phone en payload
  public deleteItem(@Body payload: any): Observable<any> { return null; };

  @POST("/admin/post/validate") // 
  public treatment(@Body payload: any): Observable<any> { return null; };

  @POST("/upload")
  @SpecialBaseUrl("https://stream.aldizconsulting.com:8443")
  @Produces(MediaType.FORM_DATA)
  public upload(@Body payload: any): Observable<any> { return null; };

}
