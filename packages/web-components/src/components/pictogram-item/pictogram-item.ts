/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './pictogram-item.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 *  Pictogram item.
 *
 * @element dds-pictogram-item
 */
@customElement(`${ddsPrefix}-pictogram-item`)
class DDSPictogramItem extends LitElement {
  render() {
    return html`
      <div>
        Hey there Tim!
      </div>
    `;
  }

  static styles = styles;
}

export default DDSPictogramItem;
