import {
  LocaleAPI,
  TranslationAPI,
  globalInit,
} from '@carbon/ibmdotcom-services';
import { Accordion } from 'carbon-components';
import footerTemplate from './footer.template';

/**
 * class to initialize the accordion component
 */
class Footer {
  /**
   * Initializes the footer component
   *
   * @param {string} El type of footer in use
   */
  static init(El) {
    globalInit();

    if (El) {
      Accordion.create(El);
    }
  }

  /**
   * This fetches the translation data, then returns the footer template
   * with the injected navigation data
   *
   * @param {string} type Footer type [tall|short]
   * @returns {Promise} Returned HTML content
   */
  static async getFooterWithData(type) {
    const lang = LocaleAPI.getLang();
    const response = await TranslationAPI.getTranslation(lang);

    return footerTemplate({
      type,
      footerMenu: response.footerMenu,
      footerThin: response.footerThin,
    });
  }
}

export default Footer;
