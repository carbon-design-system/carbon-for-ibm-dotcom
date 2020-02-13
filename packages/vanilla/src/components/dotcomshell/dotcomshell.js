/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import dotcomshellTemplate from './dotcomshell.template';
import { Footer } from '../footer';
import { Masthead } from '../masthead';

/**
 * renders the masthead
 *
 * @param {object} mastheadProps Masthead properties
 * @returns {string} string
 * @private
 */
async function _getMasthead(mastheadProps) {
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
 * @private
 */
async function _getFooter(footerProps) {
  const template = await Footer.getFooterWithData(footerProps);

  return template;
}

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
   * This creates the DotcomShell with masthead, footer, and content
   *
   * @param {string} content User content
   * @returns {Promise} Returned HTML content
   */
  static async getDotcomShellWithData({ content, ...dotcomShellProps }) {
    const masthead = await _getMasthead(dotcomShellProps.masthead);
    const footer = await _getFooter(dotcomShellProps.footer.footerType);

    return dotcomshellTemplate(masthead, content, footer);
  }
}

export default DotcomShell;
