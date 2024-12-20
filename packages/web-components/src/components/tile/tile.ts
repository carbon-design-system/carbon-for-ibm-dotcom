/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import CTAMixin from '../../component-mixins/cta/cta';
import VideoCTAMixin from '../../component-mixins/cta/video';
import { CTA_TYPE } from '../cta/defs';

import styles from './tile.scss?lit';

const { stablePrefix: c4dPrefix } = settings;

/**
 * The Tile component.
 *
 * @element c4d-tile
 */
@customElement(`${c4dPrefix}-tile`)
class C4DTile extends VideoCTAMixin(CTAMixin(LitElement)) {
  /**
   * The label text.
   */
  @property({ attribute: 'label' })
  label?: string;

  @property({ attribute: 'cta-type', reflect: true })
  ctaType = CTA_TYPE['LOCAL'];

  @property({ attribute: 'href' })
  href?: string;

  @state()
  slottedImages = false;

  @state()
  slottedPictogram = false;

  @state()
  slotName = '';

  @state()
  slotContent: Element[] = [];

  @property({ type: Boolean, reflect: true, attribute: 'align-with-content' })
  alignWithContent = false;

  @property({ type: Boolean, reflect: true, attribute: 'double-tile' })
  doubleTile = false;

  @property({ attribute: 'target', reflect: true })
  target?: string | undefined;

  @query(`.${c4dPrefix}-tile__action`)
  _linkNode!: HTMLAnchorElement;

  _handleSlotChange(event: Event) {
    const { target } = event;
    this.slotName = (target as HTMLSlotElement).name;
    this.slotContent = (target as HTMLSlotElement).assignedElements();

    if (this.slotName === 'image' && this.slotContent.length === 1) {
      this.slottedImages = true;
    } else if (this.slotName === 'image' && this.slotContent.length === 0) {
      this.slottedImages = false;
    }

    if (this.slotName === 'pictogram' && this.slotContent.length === 1) {
      this.slottedPictogram = true;
    } else if (this.slotName === 'pictogram' && this.slotContent.length === 0) {
      this.slottedPictogram = false;
    }
  }

  render() {
    const {
      label,
      href,
      _handleSlotChange: handleSlotChange,
      _handleClick: handleClick,
      slottedPictogram,
      slottedImages,
      alignWithContent,
      doubleTile,
    } = this;

    const ctaClasses = classMap({
      [`${c4dPrefix}-tile__footer-placement`]: alignWithContent,
      [`${c4dPrefix}-tile__action`]: true,
    });

    const imgClasses = classMap({
      [`${c4dPrefix}-tile__image-double`]: doubleTile,
      [`${c4dPrefix}-tile__image`]: true,
    });

    return html`
      <div class="${c4dPrefix}-tile__outer" part="outer">
        <div class="${c4dPrefix}-tile__wrapper" part="wrapper">
          <div class="${imgClasses}" part="image" ?hidden=${!slottedImages}>
            <slot name="image" @slotchange=${handleSlotChange}></slot>
          </div>

          <div class="${c4dPrefix}-tile__content" part="content">
            <div
              class="${c4dPrefix}-tile__pictogram"
              part="pictogram"
              ?hidden=${!slottedPictogram}>
              <slot name="pictogram" @slotchange="${handleSlotChange}"></slot>
            </div>

            ${label
              ? html`
                  <span class="${c4dPrefix}-tile__label" part="label"
                    >${label}</span
                  >
                `
              : ''}

            <div class="${c4dPrefix}-tile__text" part="text">
              <slot></slot>
            </div>

            <a
              href=${ifDefined(href)}
              @click="${handleClick}"
              class="${ctaClasses} cds--link cds--link--lg cds--link-with-icon cds--link-with-icon__icon-right cds--link-with-icon--inline-icon"
              part="cta">
              <slot name="cta"></slot>
              ${this._renderIcon()}
            </a>
          </div>
        </div>
      </div>
    `;
  }
  static styles = styles;
}

export default C4DTile;
