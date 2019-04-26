import { GroupsStoreModule } from './groups-store.module';

describe('GroupsStoreModule', () => {
  let storeModule: GroupsStoreModule;

  beforeEach(() => {
    storeModule = new GroupsStoreModule();
  });

  it('should create an instance', () => {
    expect(storeModule).toBeTruthy();
  });
});
