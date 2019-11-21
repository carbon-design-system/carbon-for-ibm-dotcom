import { Accordion } from 'carbon-components';

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
    if (El) {
      Accordion.create(El);
    }
  }
}

export default Footer;
