import { globalInit, TranslationAPI } from '@carbon/ibmdotcom-services';

import mastheadTemplate from './masthead.template';

/**
 * class to initialize the accordion component
 */
class Masthead {
  /**
   * initialize global execution calls
   *
   */
  static init() {
    globalInit();
  }

  /**
   *
   * @param {*} el HTML element that will hold the masthead
   * @param {object} options Options passed into masthead template
   * @param {Array} options.navigation Array with custom navigation
   * @param {object} options.hasProfile Inidicates if will have Profile
   * @param {object} options.hasSearch Inidicates if will have Search
   * @returns {string} ES6 template literal of the Masthead
   *
   */
  static async create(el, options = {}) {
    const { navigation: customNavigation, hasProfile, hasSearch } = options;

    const navigation =
      typeof customNavigation === typeof [] ? customNavigation : false;

    const html = await this.getMasthead({
      navigation,
      hasProfile: !!hasProfile,
      hasSearch: !!hasSearch,
    });

    el.innerHTML = html;

    return el;
  }

  /**
   *
   * @param {object} props Property object
   * @param {Array|boolean} props.navigation Array with custom navigation or false boolean
   * @param {boolean} props.hasProfile Inidicates if will have Profile
   * @param {boolean} props.hasSearch Inidicates if will have Search
   *
   * @example
   * import { Masthead } from '@carbon/ibmdotcom';
   *
   * const element = getElementById('yourMastheadDiv');
   * const options = {
   *  hasProfile: true,
   *  hasSearch: true
   * };
   *
   * Masthead.create(element, options);
   */
  static async getMasthead({
    navigation: customNavigation,
    hasProfile,
    hasSearch,
  } = {}) {
    const { mastheadNav } = await TranslationAPI.getTranslation();

    const navigation = customNavigation || mastheadNav.links;

    return mastheadTemplate({
      navigation,
      hasProfile,
      hasSearch,
    });
  }
}

export default Masthead;
