import { WordCloudPage } from './app.po';

describe('word-cloud App', function() {
  let page: WordCloudPage;

  beforeEach(() => {
    page = new WordCloudPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
