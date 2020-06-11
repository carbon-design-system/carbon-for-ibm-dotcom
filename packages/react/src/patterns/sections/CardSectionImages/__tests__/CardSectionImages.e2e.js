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
  beforeAll(() => {
    browser.url(_url + _path);
    browser.setWindowSize(1200, 800);
  });

  afterAll(() => {
    browser.setWindowSize(1200, 800);
  });

  it('should load the g10 theme correctly', () => {
    $('select').selectByAttribute('value', 'g10'); // TODO: can't seem to fetch using $('select[name="theme"])
    const iframe = $('#storybook-preview-iframe');
    browser.switchToFrame(iframe);
    const background = $('.bx--card-group.bx--card-group--g10').getCSSProperty(
      'background'
    );
    expect(background.parsed.hex).toEqual('#f4f4f4');
    browser.switchToParentFrame();
  });

  it('should load the g90 theme correctly', () => {
    $('select').selectByAttribute('value', 'g90'); // TODO: can't seem to fetch using $('select[name="theme"])
    const iframe = $('#storybook-preview-iframe');
    browser.switchToFrame(iframe);
    const background = $('.bx--card-group.bx--card-group--g90').getCSSProperty(
      'background'
    );
    expect(background.parsed.hex).toEqual('#262626');
    browser.switchToParentFrame();
  });
});

/*
time.sleep(4)
selectg90 = Select(driver.find_element_by_xpath("//select[@name='theme']"))
selectg90.select_by_visible_text("g90")
print("g90 selected")
time.sleep(2)
driver.switch_to_frame("storybook-preview-iframe")
CardSection_image2 = driver.find_element_by_css_selector(".bx--card-group.bx--card-group--g90").value_of_css_property("background")
print ("Theme is :" + CardSection_image2)
time.sleep(2)
driver.refresh()
time.sleep(4)
selectg100 = Select(driver.find_element_by_xpath("//select[@name='theme']"))
selectg100.select_by_visible_text("g100")
print("g100 selected")
time.sleep(2)
driver.switch_to_frame("storybook-preview-iframe")
CardSection_image3 = driver.find_element_by_css_selector(".bx--card-group.bx--card-group--g100").value_of_css_property("background")
print ("Theme is :" + CardSection_image3)
time.sleep(2)
driver.refresh()
time.sleep(4)
heading = driver.find_element_by_xpath("//textarea[@id='Heading (required):']")
heading.clear()
heading.send_keys("Serving society ethically in the age of Artificial Intelligence.")
time.sleep(2)
print("heading changed")
driver.switch_to_default_content()
time.sleep(2)
Go_full_screen = driver.find_element_by_xpath("//!*[contains(@title, 'Go full screen')]")
Go_full_screen.click()
print("full screen")
time.sleep(2)
driver.switch_to_frame("storybook-preview-iframe")
time.sleep(2)
Heading1 = driver.find_element_by_xpath("//h2[@class='bx--content-section__heading']")
print("Updated heading is " + Heading1.text)
time.sleep(2)
driver.find_element_by_xpath("(//div[@class='bx--card__wrapper'])[1]").click()
print ("Card clicked")
time.sleep(2)
driver.close()*/
