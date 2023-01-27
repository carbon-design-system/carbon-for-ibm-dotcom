/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { DDSCardBase } from '../card/card';
import styles from './card-link.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Card Link.
 *
 * @element dds-card-link
 */
@customElement(`${ddsPrefix}-card-link`)
class DDSCardLink extends DDSCardBase {
  /**
   * `true` to disable the card link.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  updated(changedProperties) {
    super.updated(changedProperties);
    const { _linkNode: linkNode } = this;
    if (linkNode) {
      linkNode.classList.add(`${prefix}--card__CTA`);
      if (changedProperties.has('disabled')) {
        const { disabled } = this;
        linkNode.classList.toggle(`${prefix}--card__CTA--disabled`, disabled);
      }
    }
  }

  static get stableSelector() {
    return `${ddsPrefix}--card-link`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCardLink;
