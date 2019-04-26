import { NewsModule } from './news.module';

describe('NewsModule', () => {
  let newsModulde: NewsModule;

  beforeEach(() => {
    newsModulde = new NewsModule();
  });

  it('should create an instance', () => {
    expect(newsModulde).toBeTruthy();
  });
});
