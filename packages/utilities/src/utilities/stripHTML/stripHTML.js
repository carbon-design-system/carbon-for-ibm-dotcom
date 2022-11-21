/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Utility returns the text stripping all html tags from it.
 *
 * @example
 * import { stripHTML } from '@carbon/ibmdotcom-utilities';
 *
 * content = stripHTML(this.innerHtml);
 *
 * @param {string} content with html tags
 * @returns {null} content without html tags
 */
const stripHTML = (content) => {
  const component = document.createElement('textarea');
  component.innerHTML = content;

  return component.childNodes[0]
    ? component.childNodes[0].nodeValue.replace(/(<([^>]+)>)/gi, '')
    : content;
};

export default stripHTML;
