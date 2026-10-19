/**
 * @license
 *
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, queryAssignedNodes, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseFontSize, breakpoints } from '@carbon/layout';
import styles from './promo-banner.scss';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import CTAMixin, { CTAMixinImpl } from '../../component-mixins/cta/cta';
import ifNonEmpty from '@carbon/web-components/es/globals/directives/if-non-empty';
import { CTA_TYPE } from '../cta/defs';

const { stablePrefix: c4dPrefix } = settings;

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

  @queryAssignedNodes({ slot: 'image', flatten: false })
  slottedImage;

  @queryAssignedNodes({ slot: 'cta', flatten: false })
  slottedCta;

  handleSlotChange = (e) => {
    // Needed for a real reason: `_renderDesktopLayout()` reads the slotted
    // image/CTA through `queryAssignedNodes` and `querySelector`, which are not
    // reactive fields, so a slot change does not schedule a render on its own.
    this.requestUpdate();

    const slotname = e?.target?.name ?? '';

    if (slotname === 'cta') {
      this.harvestCtaProps();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this.harvestCtaProps();
  }

  firstUpdated() {
    layoutBreakpoint.addEventListener('change', (e) => {
      this.isDesktopVersion = e.matches;
      this.harvestCtaProps();
    });
    this.harvestCtaProps();
  }

  harvestCtaProps() {
    const slotted_cta = this.querySelector('[slot="cta"]');

    if (slotted_cta) {
      const { _linkNode, ctaType, disabled, download, href, target } =
        slotted_cta as CTAMixinImpl;

      this._linkNode = _linkNode;
      this.ctaType =
        ctaType ||
        (slotted_cta.getAttribute('cta-type') as CTA_TYPE) ||
        CTA_TYPE.REGULAR;
      this.disabled = disabled ?? slotted_cta.hasAttribute('disabled');
      this.download = download || slotted_cta.getAttribute('download') || '';
      this.href = href || slotted_cta.getAttribute('href') || '';
      this.target = target || slotted_cta.getAttribute('target') || '';
      return;
    }

    this._linkNode = undefined;
    this.ctaType = '' as CTA_TYPE;
    this.disabled = false;
    this.download = '';
    this.href = '';
    this.target = '';
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
    const hasImage = Boolean(
      this.slottedImage?.length || this.querySelector('[slot="image"]')
    );
    const hasCta = Boolean(
      this.slottedCta?.length || this.querySelector('[slot="cta"]')
    );

    return html`
      <div
        class="banner-wrapper"
        @slotchange=${this.handleSlotChange}
        part="wrapper">
        <div class="banner-image" ?hidden=${!hasImage} part="image">
          <slot name="image"></slot>
        </div>
        <div class="banner-content" part="content">
          <slot></slot>
        </div>
        <div class="banner-cta" ?hidden=${!hasCta} part="cta">
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
