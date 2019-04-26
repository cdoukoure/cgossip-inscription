import { AuthStoreModule } from './auth-store.module';

describe('AuthStoreModule', () => {
  let authModule: AuthStoreModule;

  beforeEach(() => {
    authModule = new AuthStoreModule();
  });

  it('should create an instance', () => {
    expect(authModule).toBeTruthy();
  });
});
