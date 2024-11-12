/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { state, queryAssignedNodes } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import { baseFontSize, breakpoints } from '@carbon/layout';
import styles from './promo-banner.scss';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import CTAMixin, {
  icons as ctaIcons,
  CTAMixinImpl,
} from '../../component-mixins/cta/cta';
import ifNonEmpty from '@carbon/web-components/es/globals/directives/if-non-empty';
import { CTA_TYPE } from '../cta/defs';

const { stablePrefix: c4dPrefix, prefix } = settings;

const breakpoint = parseFloat(breakpoints.lg.width) * baseFontSize;
const layoutBreakpoint = window.matchMedia(`(min-width: ${breakpoint}px)`);

/**
 * The Promo Banner component.
 * @element c4d-promo-banner
 */
@customElement(`${c4dPrefix}-promo-banner`)
class C4DPromoBanner extends CTAMixin(LitElement) {
  @state()
  isDesktopVersion = layoutBreakpoint.matches;

  @queryAssignedNodes('image', false)
  slottedImage;

  @queryAssignedNodes('cta', false)
  slottedCta;

  handleSlotChange(e) {
    this.requestUpdate();

    const slotname = e?.target?.name ?? '';

    if (slotname === 'cta') {
      this.harvestCtaProps();
    }
  }

  firstUpdated() {
    layoutBreakpoint.addEventListener('change', (e) => {
      this.isDesktopVersion = e.matches;
    });
    this.harvestCtaProps();
  }

  harvestCtaProps() {
    const slotted_cta = this.querySelector('[slot="cta"]');

    if (slotted_cta) {
      const { _linkNode, ctaType, disabled, download, href, target } =
        slotted_cta as CTAMixinImpl;

      this._linkNode = _linkNode;
      this.ctaType = ctaType;
      this.disabled = disabled;
      this.download = download;
      this.href = href;
      this.target = target;
      this.requestUpdate();
      return;
    }

    this._linkNode = undefined;
    this.ctaType = '' as CTA_TYPE;
    this.disabled = false;
    this.download = '';
    this.href = '';
    this.target = '';
    this.requestUpdate();
  }

  /**
   * @inheritdoc
   */
  _renderIcon() {
    const { ctaType } = this;
    return html`
      <slot name="icon">
        ${ctaIcons[ctaType]?.({
          class: `${prefix}--card__cta ${c4dPrefix}-ce--cta__icon`,
        })}
      </slot>
    `;
  }

  _renderMobileLayout() {
    const { href, disabled, target, download, innerText } = this;

    const classes = {
      'banner-wrapper': true,
      'no-cta': !href,
    };

    return html`
      <div class="${classMap(classes)}" part="wrapper">
        <div class="banner-content" aria-hidden=${true} part="content">
          <slot></slot>
        </div>
        ${href
          ? html`
              <a
                class="banner-cta"
                href=${href}
                ?disabled=${ifNonEmpty(disabled)}
                target=${ifNonEmpty(target)}
                download=${ifNonEmpty(download)}
                aria-label=${innerText}
                part="cta">
                <span class="banner-cta-icon" part="icon">
                  ${this._renderIcon()}
                </span>
              </a>
            `
          : ''}
      </div>
    `;
  }

  _renderDesktopLayout() {
    const { slottedImage, slottedCta, handleSlotChange } = this;
    return html`
      <div
        class="banner-wrapper"
        @slotchange=${handleSlotChange}
        part="wrapper">
        <div class="banner-image" ?hidden=${!slottedImage?.length} part="image">
          <slot name="image"></slot>
        </div>
        <div class="banner-content" part="content">
          <slot></slot>
        </div>
        <div class="banner-cta" ?hidden=${!slottedCta?.length} part="cta">
          <slot name="cta"></slot>
        </div>
      </div>
    `;
  }

  render() {
    const { isDesktopVersion } = this;

    return isDesktopVersion
      ? this._renderDesktopLayout()
      : this._renderMobileLayout();
  }

  static get styles() {
    return styles;
  }
}

export default C4DPromoBanner;
