import { PostsModule } from './posts.module';

describe('UsersModule', () => {
  let postsModulde: PostsModule;

  beforeEach(() => {
    postsModulde = new PostsModule();
  });

  it('should create an instance', () => {
    expect(postsModulde).toBeTruthy();
  });
});
