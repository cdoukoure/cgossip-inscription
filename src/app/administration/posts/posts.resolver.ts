import { Injectable }       from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
}                           from '@angular/router';
import { PostsSandbox }  from './posts.sandbox';

@Injectable()
export class PostsResolver implements Resolve<any> {

  private postsSubscription;

  constructor(protected sandBox: PostsSandbox) {}

  /**
   * Triggered when application hits item details route.
   * It subscribes to item list data and finds one with id from the route params.  
   *
   * @param route
   */
  public resolve(route: ActivatedRouteSnapshot) {
    if (this.postsSubscription) return;

    /*
    this.postsSubscription = this.sandBox.productDetails$.subscribe(product => {
      if (!product) {
        this.usersSanbox.getUser(parseInt(route.params.id));
        return;
      }

      this.usersSanbox.selectProduct(product);
    });
    */
  }
}