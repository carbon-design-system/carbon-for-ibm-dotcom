/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './callout-quote.scss';
import C4DCalloutMixin from '../../component-mixins/callout/callout';
import C4DQuote from '../quote/quote';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';
import { property } from 'lit/decorators.js';
import { COLOR_SCHEME } from '../../component-mixins/callout/defs';
import C4DCalloutLinkWithIcon from './callout-link-with-icon';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Callout Quote.
 *
 * @element c4d-callout-quote
 */
@customElement(`${c4dPrefix}-callout-quote`)
class C4DCalloutQuote extends C4DCalloutMixin(C4DQuote) {
  /**
   * The color-scheme type.
   */
  @property({ reflect: true, attribute: 'color-scheme' })
  colorScheme = COLOR_SCHEME.REGULAR;

  updated(changedProperties) {
    super.updated(changedProperties);
    const linkWithIcon = this.querySelector(
      (this.constructor as typeof C4DCalloutQuote).selectorLinkWithIcon
    );
    linkWithIcon
      ? ((linkWithIcon as C4DCalloutLinkWithIcon).colorScheme =
          this.colorScheme)
      : '';
  }

  render() {
    return html`
      <div class="${prefix}--callout__column" part="callout__column">
        <div class="${prefix}--callout__content" part="callout__content">
          <div class="${prefix}--quote__container" part="quote__container">
            <div class="${prefix}--quote__wrapper" part="quote__wrapper">
              ${this._renderQuote()}${this._renderSource()}${this._renderFooter()}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * A selector that will return the child link-with-icon.
   */
  static get selectorLinkWithIcon() {
    return `${c4dPrefix}-callout-link-with-icon`;
  }

  static get stableSelector() {
    return `${c4dPrefix}--callout-quote`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DCalloutQuote;
