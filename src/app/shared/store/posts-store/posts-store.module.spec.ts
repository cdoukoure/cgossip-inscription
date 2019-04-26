import { PostsStoreModule } from './posts-store.module';

describe('PostsStoreModule', () => {
  let postsStoreModule: PostsStoreModule;

  beforeEach(() => {
    postsStoreModule = new PostsStoreModule();
  });

  it('should create an instance', () => {
    expect(postsStoreModule).toBeTruthy();
  });
});
