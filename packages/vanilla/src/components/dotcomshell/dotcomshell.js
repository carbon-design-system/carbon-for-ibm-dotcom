/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import dotcomshellTemplate from './dotcomshell.template';
import { Masthead } from '../masthead';
import { Footer } from '../footer';

/**
 * class to initialize Dotcomshell component
 *
 */
class DotcomShell {
  /**
   * Initialize the dotcom shell
   *
   * @param {string} el Element to initialize with Carbon create()
   */
  static init(el) {
    Masthead.init();
    Footer.init(el);
  }

  /**
   * renders the masthead
   *
   * @param {object} mastheadProps Masthead properties
   * @returns {string} string
   */
  static async _getMasthead(mastheadProps) {
    const template = await Masthead.getMastheadWithData(
      mastheadProps.navigation,
      mastheadProps.platform,
      mastheadProps.hasNavigation,
      mastheadProps.hasProfile,
      mastheadProps.searchProps
    );

    return template;
  }

  /**
   * renders either short or the tall footer
   *
   * @param {object} footerProps Footer properties
   * @returns {string} string
   */
  static async _getFooter(footerProps) {
    const template = await Footer.getFooterWithData(footerProps);

    return template;
  }

  /**
   * This creates the DotcomShell with masthead, footer, and content
   *
   * @param {string} content User content
   * @returns {Promise} Returned HTML content
   */
  static async getDotcomShellWithData({ content, ...dotcomShellProps }) {
    const masthead = await this._getMasthead(dotcomShellProps.masthead);
    const footer = await this._getFooter(dotcomShellProps.footer);

    return dotcomshellTemplate(masthead, content, footer);
  }
}

export default DotcomShell;
