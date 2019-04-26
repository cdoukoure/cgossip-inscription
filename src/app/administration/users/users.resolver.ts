import { Injectable }       from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
}                           from '@angular/router';
import { UsersSandbox }  from './users.sandbox';

@Injectable()
export class UsersResolver implements Resolve<any> {

  private usersSubscription;

  constructor(public usersSanbox: UsersSandbox) {}

  /**
   * Triggered when application hits item details route.
   * It subscribes to item list data and finds one with id from the route params.  
   *
   * @param route
   */
  public resolve(route: ActivatedRouteSnapshot) {
    if (this.usersSubscription) return;

    /*
    this.productsSubscription = this.usersSanbox.productDetails$.subscribe(product => {
      if (!product) {
        this.usersSanbox.getUser(parseInt(route.params.id));
        return;
      }

      this.usersSanbox.selectProduct(product);
    });
    */
  }
}