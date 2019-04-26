import {
  Injectable,
  Inject,
  forwardRef
}                           from '@angular/core';
import { Post }          from '@shared/models';

@Injectable()
export class PostsService {


  /**
   * Transforms grid data users recieved from the API into array of 'User' instances
   *
   * @param users
   */
  static gridAdapter(posts: any): Array<Post> {
    return posts.map(post => new Post(post));
  }

  /**
   * Transforms user details recieved from the API into instance of 'User'
   *
   * @param user
   */
  static detailsAdapter(post: any): Post {
    return new Post(post);
  }
}