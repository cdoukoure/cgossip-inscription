import { UsersStoreModule } from './users-store.module';

describe('UsersModule', () => {
  let usersModule: UsersStoreModule;

  beforeEach(() => {
    usersModule = new UsersStoreModule();
  });

  it('should create an instance', () => {
    expect(usersModule).toBeTruthy();
  });
});
