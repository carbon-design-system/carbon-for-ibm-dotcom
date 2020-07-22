/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Defines the host for testing
 *
 * @type {string | string}
 * @private
 */
const _url =
  process?.env.SELENIUM_HOST || 'https://ibmdotcom-react-canary.mybluemix.net';

/**
 * Sets the correct path
 *
 * @type {string}
 * @private
 */
const _path = '/iframe.html?id=components-cardsectionimages--default';

describe('CardSectionImages', () => {
  beforeAll(() => {
    browser.url(_url + _path);
    browser.setWindowSize(1200, 800);
    $('[data-autoid="dds--card-group-images-group"]').waitForExist();
  });

  it('should open to a different url', () => {
    $('.bx--card__wrapper').click();
    expect(browser.getUrl()).toBe('https://www.example.com/');
  });

  // TODO: Figure out how to pass Carbon theme to full screen mode
  /*it('should load the g10 theme correctly', () => {
    const background = $('.bx--card-group.bx--card-group--g10').getCSSProperty(
      'background'
    );
    expect(background.parsed.hex).toEqual('#f4f4f4');
  });

  it('should load the g90 theme correctly', () => {
    const background = $('.bx--card-group.bx--card-group--g90').getCSSProperty(
      'background'
    );
    expect(background.parsed.hex).toEqual('#262626');
  });

  it('should load the g100 theme correctly', () => {
    const background = $('.bx--card-group.bx--card-group--g100').getCSSProperty(
      'background'
    );
    expect(background.parsed.hex).toEqual('#161616');
  });*/
});

describe('CardSectionImages: Heading', () => {
  beforeAll(() => {
    const query =
      '&knob-Heading%20(heading):_CardSectionImages=Serving%20society%20ethically%20in%20the%20age%20of%20Artificial%20Intelligence.';
    browser.url(_url + _path + query);
    browser.setWindowSize(1200, 800);
    $('[data-autoid="dds--card-group-images-group"]').waitForExist();
  });

  it('should set the heading correctly', () => {
    const expectedHeading =
      'Serving society ethically in the age of Artificial Intelligence.';
    const headingText = $('.bx--content-section__heading').getText();
    expect(headingText).toEqual(expectedHeading);
  });
});
