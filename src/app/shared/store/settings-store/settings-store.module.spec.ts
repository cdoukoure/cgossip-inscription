import { SettingsStoreModule } from './settings-store.module';

describe('SettingsModule', () => {
  let settingsModule: SettingsStoreModule;

  beforeEach(() => {
    settingsModule = new SettingsStoreModule();
  });

  it('should create an instance', () => {
    expect(settingsModule).toBeTruthy();
  });
});
