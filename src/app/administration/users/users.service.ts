import {
  Injectable,
  Inject,
  forwardRef
}                           from '@angular/core';
import { User }          from '@shared/models';

@Injectable()
export class UsersService {

  private usersSubscription;

  /**
   * Transforms grid data users recieved from the API into array of 'User' instances
   *
   * @param users
   */
  static gridAdapter(users: any): Array<User> {
    return users.map(user => new User(user));
  }

  /**
   * Transforms user details recieved from the API into instance of 'User'
   *
   * @param user
   */
  static userDetailsAdapter(user: any): User {
    return new User(user);
  }
}