/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import '@carbon/web-components/es/components/tooltip/tooltip.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import Star16 from '@carbon/web-components/es/icons/star/16.js';
import StarHalf16 from '@carbon/web-components/es/icons/star--half/16.js';
import StarFilled16 from '@carbon/web-components/es/icons/star--filled/16.js';
import styles from './star-rating.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';

const { stablePrefix: c4dPrefix, prefix } = settings;

/**
 * The Star Rating component.
 * @element c4d-star-rating
 */
@customElement(`${c4dPrefix}-star-rating`)
class C4DStarRating extends StableSelectorMixin(LitElement) {
  /**
   * Maximum number of stars that may be in a rating.
   */
  protected maxStarCount = 10;

  /**
   * Internal store for rating value.
   */
  private _rating = 0;

  /**
   * Internal store for star count value.
   */
  private _starCount = 5;

  /**
   * Internal store for custom tooltip text.
   */
  private _tooltip: string | null = null;

  /**
   * The rating that will inform the number of stars to display.
   */
  @property({ attribute: 'rating', reflect: true, type: Number })
  set rating(value: number) {
    const oldValue = this._rating;
    // Place boundaries to avoid out-of-memory issues.
    this._rating = Math.min(Math.max(value, 0), this.starCount);
    this.requestUpdate('rating', oldValue);
  }
  get rating() {
    return this._rating;
  }

  /**
   * The text to display beside the rating.
   */
  @property({ attribute: 'label', reflect: true })
  label?: string;

  /**
   * An optional href for the label.
   */
  @property({ attribute: 'label-href', reflect: true })
  labelHref?: string;

  /**
   * The number of stars to display.
   */
  @property({ attribute: 'star-count', reflect: true, type: Number })
  set starCount(value: number) {
    const oldValue = this._starCount;
    // Place boundaries to avoid out-of-memory issues.
    this._starCount = Math.min(Math.max(value, 0), this.maxStarCount);
    this.requestUpdate('starCount', oldValue);
  }
  get starCount() {
    return this._starCount;
  }

  /**
   * The tooltip text that appears when hovering over the stars. Also used as an
   * accessible label for the stars.
   */
  @property({ attribute: 'tooltip', reflect: true })
  set tooltip(value: string | null) {
    const oldValue = this._tooltip;
    this._tooltip = value;
    this.requestUpdate('tooltip', oldValue);
  }
  get tooltip() {
    return !this._tooltip
      ? `${this.rating} out of ${this.starCount} stars`
      : this._tooltip;
  }

  /**
   * Disables the visible tooltip without removing accessibility text.
   */
  @property({ reflect: true, type: Boolean })
  disableTooltip = false;

  /**
   * Renders the label.
   *
   * @returns {TemplateResult} A template fragment representing the label.
   */
  protected _renderLabel() {
    const { label, labelHref } = this;
    if (!label) {
      return '';
    }
    return html`
      <div class="${prefix}-star-rating__label" part="label">
        ${labelHref ? html` <a href="${labelHref}">${label}</a> ` : label}
      </div>
    `;
  }

  /**
   * Renders the rating as a series of stars.
   *
   * @returns {TemplateResult} A template fragment representing a series of stars.
   */
  protected _renderStars() {
    const { disableTooltip, tooltip, rating, starCount } = this;
    const { renderStar } = this.constructor as typeof C4DStarRating;
    const integer = Math.floor(rating);
    const decimal = rating - integer;

    const fillValues = Array(starCount)
      .fill(1, 0, integer)
      .fill(0, integer, starCount);

    if (decimal) {
      fillValues[integer] = decimal;
    }

    return html`
      <figure
        aria-label="${tooltip}"
        class="${prefix}-star-rating__stars"
        ?disableTooltip="${disableTooltip}"
        part="stars">
        ${fillValues.map((fillValue) => renderStar(fillValue))}
      </figure>
    `;
  }

  shouldUpdate() {
    if (isNaN(this.rating) || isNaN(this.starCount)) {
      return false;
    }
    return true;
  }

  render() {
    return html`
      <div class="${prefix}-star-rating" part="wrapper">
        ${this._renderStars()} ${this._renderLabel()}
      </div>
    `;
  }

  /**
   * Renders an individual star at a given fill value.
   *
   * @param {number} fill The star's fill value.
   * @returns {TemplateResult} A template fragment representing a single star.
   */
  static renderStar(fill) {
    let markup, classModifier;
    if (fill >= 0.75) {
      markup = StarFilled16();
      classModifier = 'filled';
    } else if (fill >= 0.25) {
      markup = html` ${Star16()}${StarHalf16()} `;
      classModifier = 'half';
    } else {
      markup = Star16();
      classModifier = 'empty';
    }
    return html`
      <div
        class="${prefix}-star-count__star ${prefix}-star-count__star--${classModifier}"
        part="star">
        ${markup}
      </div>
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--star-rating`;
  }

  static styles = styles;
}

export default C4DStarRating;
