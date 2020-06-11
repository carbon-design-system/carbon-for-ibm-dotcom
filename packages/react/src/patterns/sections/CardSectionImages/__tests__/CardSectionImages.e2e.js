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
  process?.env.SELENIUM_URL || 'https://ibmdotcom-react-canary.mybluemix.net/';

/**
 * Sets the correct path
 *
 * @type {string}
 * @private
 */
const _path = '?path=/story/patterns-sections-cardsectionimages--default';

describe('CardSectionImages', () => {
  let headingField, themeField, iframe;
  beforeAll(() => {
    browser.url(_url + _path);
    headingField = $('textarea[id="Heading (required):_CardSectionImages"]');
    themeField = $('select[name="theme_CardSectionImages"]');
    iframe = $('#storybook-preview-iframe');
    browser.setWindowSize(1200, 800);
  });

  it('should load the g10 theme correctly', () => {
    themeField.selectByAttribute('value', 'g10');
    browser.switchToFrame(iframe);
    const background = $('.bx--card-group.bx--card-group--g10').getCSSProperty(
      'background'
    );
    expect(background.parsed.hex).toEqual('#f4f4f4');
    browser.switchToParentFrame();
  });

  it('should load the g90 theme correctly', () => {
    themeField.selectByAttribute('value', 'g90'); // TODO: can't seem to fetch using $('select[name="theme"])
    browser.switchToFrame(iframe);
    const background = $('.bx--card-group.bx--card-group--g90').getCSSProperty(
      'background'
    );
    expect(background.parsed.hex).toEqual('#262626');
    browser.switchToParentFrame();
  });

  it('should load the g100 theme correctly', () => {
    themeField.selectByAttribute('value', 'g100'); // TODO: can't seem to fetch using $('select[name="theme"])
    browser.switchToFrame(iframe);
    const background = $('.bx--card-group.bx--card-group--g100').getCSSProperty(
      'background'
    );
    expect(background.parsed.hex).toEqual('#161616');
    browser.switchToParentFrame();
  });

  it('should set the heading correctly', () => {
    const heading =
      'Serving society ethically in the age of Artificial Intelligence.';
    headingField.setValue('');
    headingField.setValue(heading);
    browser.switchToFrame(iframe);
    browser.pause(1000);
    const headingText = $('.bx--content-section__heading').getText();
    expect(headingText).toEqual(heading);

    browser.switchToParentFrame();
  });
});

/*

driver.find_element_by_xpath("(//div[@class='bx--card__wrapper'])[1]").click()
print ("Card clicked")
time.sleep(2)
driver.close()*/
