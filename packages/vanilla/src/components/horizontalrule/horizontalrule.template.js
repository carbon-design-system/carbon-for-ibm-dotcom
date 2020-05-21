/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Available size options
 *
 * @type {string[]}
 * @private
 */
const _sizeOptions = ['small', 'medium', 'large'];

/**
 * Available contrast options
 *
 * @type {string[]}
 * @private
 */
const _contrastOptions = ['low', 'high'];

/**
 * Horizontal Rule template literal
 *
 * @param {object} props Property object passed into the template
 * @param {string} props.style solid vs dashed [''|'dashed']
 * @param {string} props.size size of the hr [''|'small'|'medium'|'large']
 * @param {string} props.contrast color of the rule [''|'low'|'high']
 * @param {string} props.weight weight of the rule [''|'thick']
 * @returns {string} ES6 template literal of the horizontal rule
 *
 * @example
 * import { horizontalruleTemplate } from '@carbon/ibmdotcom-vanilla';
 * import '@carbon/ibmdotcom-styles/scss/components/horizontalrule/index.scss';
 *
 * console.log(
 *   horizontalruleTemplate({
 *     style: '', // dashed | default
 *     size: '', // small | medium | large | fluid (default)
 *     contrast: '', // low | large | medium (default)
 *     weight: '', // thick | thin (default)
 *   })
 * ); // <hr data-autoid="dds--hr" class="bx--hr" />
 *
 */
const horizontalruleTemplate = ({ style, size, contrast, weight }) => {
  const hrStyle = style === 'dashed' ? 'bx--hr--dashed' : '';
  const hrSize = _sizeOptions.indexOf(size) !== -1 ? `bx--hr--${size}` : '';
  const hrContrast =
    _contrastOptions.indexOf(contrast) !== -1
      ? `bx--hr--${contrast}-contrast`
      : '';
  const hrWeight = weight === 'thick' ? 'bx--hr--thick' : '';

  return `<hr
    data-autoid="${stablePrefix}--hr"
    class="${prefix}--hr ${hrStyle} ${hrSize} ${hrContrast} ${hrWeight}"
    />`;
};

export default horizontalruleTemplate;
