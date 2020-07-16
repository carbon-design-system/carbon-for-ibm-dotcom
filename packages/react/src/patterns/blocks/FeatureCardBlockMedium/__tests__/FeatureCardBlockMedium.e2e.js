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
const _path = '/iframe.html?id=patterns-blocks-featurecardblockmedium--default';

describe('FeatureCardBlockMedium', () => {
  beforeAll(() => {
    browser.url(_url + _path);
    browser.setWindowSize(1200, 800);
  });

  it('should have the correct top margin', () => {
    const content = $('[data-autoid="dds--feature-card-block-medium"]');
    const contentPaddingTop = content.getCSSProperty('margin-top').value;
    expect(contentPaddingTop).toEqual('96px');
  });

  it('should have the correct bottom margin', () => {
    const content = $('[data-autoid="dds--feature-card-block-medium"]');
    const contentPaddingTop = content.getCSSProperty('margin-bottom').value;
    expect(contentPaddingTop).toEqual('96px');
  });

  it('should have the correct spacing between heading and feature card', () => {
    const content = $('.bx--feature-card-block-medium__heading');
    const contentPaddingTop = content.getCSSProperty('margin-bottom').value;
    expect(contentPaddingTop).toEqual('32px');
  });

  it('should load the correct URL when clicking the card', () => {
    $('[data-autoid="dds--feature-card"]').click();
    expect(browser.getUrl()).toBe('https://www.example.com/');
    browser.back();
  });
});

// TODO: Reactivate once passing query params works, still passing JSON data
xdescribe('FeatureCardBlockMedium: Heading', () => {
  beforeAll(() => {
    const query =
      '&knob-Pattern%20heading(required):_FeatureCardBlockMedium=Explore%20AI%20use%20cases%20in%20all%20industries%20Curabitur%20malesuada%20varius%20mi%20eu%20posuere&knob-Card%20Heading:_FeatureCardBlockMedium=Explore%20AI%20use%20cases%20in%20all%20industries&knob-Card%20href:_FeatureCardBlockMedium=https://www.example.com&knob-card%20image_FeatureCardBlockMedium={%22defaultSrc%22:%22https://dummyimage.com/672x672/ee5396/161616&text=1x1%22,%22alt%22:%22Image%20alt%20text%22}';
    browser.url(_url + _path + query);
    browser.setWindowSize(1200, 800);
  });

  it('should set the heading correctly', () => {
    const expectedHeading =
      'Explore AI use cases in all industries Curabitur malesuada varius mi eu posuere';
    const headingText = $('.bx--card__heading').getText();
    expect(headingText).toEqual(expectedHeading);
  });
});
