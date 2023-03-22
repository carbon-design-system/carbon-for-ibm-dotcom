/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { css } from 'lit-element/lit-element';
import { carbonElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings.js';
import DDSImage from '../image/image';
import styles from '../image/image.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Image logo.
 *
 * @element dds-image-logo
 */

@carbonElement(`${ddsPrefix}-image-logo`)
class DDSImageLogo extends DDSImage {
  static get stableSelector() {
    return `${ddsPrefix}-image-logo`;
  }

  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSImageLogo;
