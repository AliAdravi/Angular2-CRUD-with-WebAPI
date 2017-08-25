import { CrudWebapiPage } from './app.po';

describe('crud-webapi App', () => {
  let page: CrudWebapiPage;

  beforeEach(() => {
    page = new CrudWebapiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
