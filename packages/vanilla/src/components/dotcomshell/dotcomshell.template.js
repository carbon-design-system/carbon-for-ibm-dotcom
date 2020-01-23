/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { settings } from 'carbon-components';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Dotcomshell template literal
 *
 * @param {string} children Dotcomshell content
 * @returns {string} returns DotcomShell component
 */
const dotcomshellTemplate = children => {
  return `
    <div
      data-autoid="${stablePrefix}--dotcom-shell"
      className="${prefix}--dotcom-shell">
      <div
        data-autoid="${stablePrefix}--dotcom-shell__content"
        className="${prefix}--dotcom-shell__content">
        ${children}
      </div>
    </div>
  `;
};

export default dotcomshellTemplate;
