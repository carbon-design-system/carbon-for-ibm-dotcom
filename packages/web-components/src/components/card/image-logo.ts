/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { customElement, css } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSImage from '../image/image';
import styles from '../image/image.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Image logo.
 *
 * @element dds-image-logo
 */

@customElement(`${ddsPrefix}-image-logo`)
class DDSImageLogo extends DDSImage {
  static get stableSelector() {
    return `${ddsPrefix}-image-logo`;
  }

  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSImageLogo;
