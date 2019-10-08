import { ipcinfoCookie } from '../';

describe('ipcinfo cookie utility', () => {
  beforeEach(() => {
    const document = {
      cookie: 'ipcInfo=cc%253DUS%253Blc%253Den',
    };
    global.document = document;
  });

  // it('should return undefined if cookie is not there', () => {
  //   const ipcinfo = ipcinfoCookie.get();
  //   expect(ipcinfo).toBe(undefined);
  // });

  it('should fetch the ipcInfo cookie and return a neat object', () => {
    const info = {
      cc: 'US',
      lc: 'en',
    };

    const ipcinfo = ipcinfoCookie.get();
    expect(ipcinfo).toBe(info);
  });

  // it('should set the ipcInfo cookie', () => {
  //   const output = ipcinfoCookie.set('US', 'en');
  // });
});
