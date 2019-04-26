import { NewsStoreModule } from './news-store.module';

describe('NewsStoreModule', () => {
  let newsStoreModule: NewsStoreModule;

  beforeEach(() => {
    newsStoreModule = new NewsStoreModule();
  });

  it('should create an instance', () => {
    expect(newsStoreModule).toBeTruthy();
  });
});
