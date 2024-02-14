/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { COLOR_OPTIONS } from './defs';
import C4DContentItem from '../content-item/content-item';
import styles from './pictogram-item.scss?lit';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Pictogram item.
 *
 * @element c4d-pictogram-item
 * @slot pictogram - The pictogram content.
 * @slot heading - The heading content.
 * @slot footer - The footer (CTA) content.
 */
@customElement(`${c4dPrefix}-pictogram-item`)
class C4DPictogramItem extends StableSelectorMixin(C4DContentItem) {
  /**
   * The pictogram color.
   *
   * Color scheme options are: "Black (Default)" and "Blue 50"
   */
  @property({ attribute: 'color', reflect: true })
  colorOption = COLOR_OPTIONS.DEFAULT;

  render() {
    return html`
      <div class="${prefix}--pictogram-item__row">
        <div class="${prefix}--pictogram-item__wrapper">
          <slot
            class="${prefix}--pictogram-item__pictogram"
            name="pictogram"></slot>
        </div>
        <div class="${prefix}--pictogram-item__content">
          <div class="${prefix}--content-item">${super.render()}</div>
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--pictogram-item`;
  }

  static styles = styles;
}

console.warn(
  'The pictogram-item component has been deprecated in favor of the content-item (pictogram variation) component. ' +
    'See content-item documentation for more information.'
);

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DPictogramItem;
