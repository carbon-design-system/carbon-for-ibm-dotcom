/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { css } from 'lit';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import C4DImage from '../image/image';
import styles from '../image/image.scss';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Image logo.
 *
 * @element c4d-image-logo
 */

@customElement(`${c4dPrefix}-image-logo`)
class C4DImageLogo extends C4DImage {
  static get stableSelector() {
    return `${c4dPrefix}-image-logo`;
  }

  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DImageLogo;
