/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Dotcomshell template literal
 *
 * @param {string} masthead Masthead html
 * @param {string} children Dotcomshell content
 * @param {string} footer Footer html
 * @returns {string} returns DotcomShell component
 */
const dotcomshellTemplate = (masthead, children, footer) => {
  return `
    ${masthead}
    <div
      data-autoid="${stablePrefix}--dotcom-shell"
      class="${prefix}--dotcom-shell">
      <div
        data-autoid="${stablePrefix}--dotcom-shell__content"
        class="${prefix}--dotcom-shell__content">
        ${children}
      </div>
    </div>
    ${footer}
  `;
};

export default dotcomshellTemplate;
