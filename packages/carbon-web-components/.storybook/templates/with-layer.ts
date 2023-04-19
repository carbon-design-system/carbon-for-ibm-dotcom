/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import Layers from '@carbon/icons/lib/layers/16';
import { prefix } from '../../src/globals/settings';

import styles from './with-layer.scss';

/**
 * Basic layer
 *
 * @element cds-layer
 * @slot children - The elements contained within the component.
 */
@customElement(`sb-template-layers`)
class CDSLayer extends LitElement {
  render() {
    return html`
      <div class="${prefix}--with-layer">
        <div class="${prefix}--with-layer__layer">
          <div class="${prefix}--with-layer__label">${Layers()} Layer 1</div>
          <div class="${prefix}--with-layer__content">
            <cds-layer>
              <slot name="layer-1"></slot>

              <div class="${prefix}--with-layer__layer">
                <div class="${prefix}--with-layer__label">
                  ${Layers()} Layer 2
                </div>
                <div class="${prefix}--with-layer__content">
                  <cds-layer>
                    <slot name="layer-2"></slot>

                    <div class="${prefix}--with-layer__layer">
                      <div class="${prefix}--with-layer__label">
                        ${Layers()} Layer 3
                      </div>
                      <div class="${prefix}--with-layer__content">
                        <cds-layer>
                          <slot name="layer-3"></slot>
                        </cds-layer>
                      </div>
                    </div>
                  </cds-layer>
                </div>
              </div>
            </cds-layer>
          </div>
        </div>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSLayer;
