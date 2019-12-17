import { HeaderSubmenu } from 'carbon-components';
import {
  globalInit,
  TranslationAPI,
  LocaleAPI,
} from '@carbon/ibmdotcom-services';
import mastheadTemplate from './masthead.template';

/**
 * class to initialize the masthead components
 */
class Masthead {
  /**
   * Initializes the masthead components
   *
   * @param {string} El type of footer in use
   */
  static init(El) {
    globalInit();

    if (El) {
      HeaderSubmenu.create(El);
    }
  }

  /**
   * This fetches the translation data, then returns the footer template
   * with the injected navigation data
   *
   * @param {boolean} hasProfile Determines whether to render Profile component
   * @param {boolean} hasSearch Determines whether to render Search Bar
   * @returns {Promise} Returned HTML content
   */
  static async getMastheadWithData(hasProfile, hasSearch) {
    const lang = LocaleAPI.getLang();
    const response = await TranslationAPI.getTranslation(lang);

    return mastheadTemplate({
      hasProfile,
      hasSearch,
      navigation: response.mastheadNav.links,
      profileData: response.profileMenu,
    });
  }
}

export default Masthead;
