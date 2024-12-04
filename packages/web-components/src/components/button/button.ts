/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './button.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import CTAMixin, { ariaLabels, icons } from '../../component-mixins/cta/cta';
import CDSButton from '@carbon/web-components/es/components/button/button.js';
import { CTA_TYPE } from '../cta/defs';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Button.
 *
 * @element c4d-button
 * @csspart button - The button. Usage: `c4d-button::part(button)`
 * @csspart hidden-paragraph - The hidden paragraph that contains the link. Usage: `c4d-button::part(hidden-paragraph)`
 * @csspart hidden-icon-span - The span element inside the hidden paragraph. Usage: `c4d-button::part(hidden-icon-span)`
 * @csspart visually-hidden-span - The visually hidden span element for accessibility. Usage: `c4d-button::part(visually-hidden-span)`
 */
@customElement(`${c4dPrefix}-button`)
// @ts-ignore
class C4DButton extends CTAMixin(StableSelectorMixin(CDSButton)) {
  @query('a')
  _linkNode;

  @property()
  iconDiv;

  @property()
  span;

  /**
   * `true` if expressive theme enabled.
   */
  @property({ type: Boolean, reflect: true })
  isExpressive = true;

  _handleDisabledClick(event: Event) {
    super._handleClick(event as any);
  }

  /**
   * TODO: Due to the new render() logic coming from the CWC v2 button,
   * this function is currently unused. We'd need to dynamically add it.
   *
   * @returns The icon for the print styles
   */
  _renderIconPrintStyles() {
    return html`
      <p
        class="${prefix}--btn--hidden"
        aria-hidden="true"
        part="hidden-paragraph">
        <span part="hidden-icon-span">:</span> ${this.href}
      </p>
      <slot name="icon"></slot>
    `;
  }

  /**
   * @returns The template for the icon.
   */
  _renderButtonIcon() {
    const { ctaType } = this;
    const icon = icons[`${ctaType}-${document.dir}`] ?? icons[ctaType];
    return `
        <span class="${prefix}--visually-hidden" part="visually-hidden-span">${
      ariaLabels[ctaType]
    }</span>
        ${icon?.()?.strings?.join()}
      `;
  }

  /**
   * Handles button video title
   *
   * @param event The event.
   */
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleVideoTitleUpdate = async (event) => {
    if (
      event &&
      this.ctaType === CTA_TYPE.VIDEO &&
      this.href === event.detail?.videoId
    ) {
      const { videoDuration, videoName } = event.detail as any;
      const { formatVideoDuration, formatVideoCaption } = this;
      const formattedVideoDuration = formatVideoDuration({
        duration: !videoDuration ? videoDuration : videoDuration * 1000,
      });
      this.videoDuration ? null : (this.videoDuration = formattedVideoDuration);

      this.videoTitle = formatVideoCaption({
        duration: formattedVideoDuration,
        name: videoName,
      });

      if (this.textContent?.trim() === '') {
        const title = document.createTextNode(this.videoTitle);
        this.appendChild(title);
      }
    }
  };

  connectedCallback() {
    super.connectedCallback();
    const { eventRequestAdditionalVideoData } = this
      .constructor as typeof C4DButton;
    document.addEventListener(
      eventRequestAdditionalVideoData,
      this._handleVideoTitleUpdate
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    const { eventRequestAdditionalVideoData } = this
      .constructor as typeof C4DButton;
    document.removeEventListener(
      eventRequestAdditionalVideoData,
      this._handleVideoTitleUpdate
    );
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('ctaType')) {
      if (!this.iconDiv) {
        this.iconDiv = this.shadowRoot?.querySelector("slot[name='icon']");
      }

      const { iconDiv } = this;

      iconDiv.querySelector('svg')?.remove();
      iconDiv.innerHTML = this._renderButtonIcon();
      iconDiv
        ?.querySelector('svg')
        ?.classList.add(`${prefix}--card__cta`, `${c4dPrefix}-ce--cta__icon`);
    }
  }

  static get stableSelector() {
    return `${c4dPrefix}--button`;
  }

  /**
   * The name of the custom event fired when there is a user gesture to run the action.
   */
  static get eventRequestAdditionalVideoData() {
    return `${c4dPrefix}-cta-request-additional-video-data`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DButton;
