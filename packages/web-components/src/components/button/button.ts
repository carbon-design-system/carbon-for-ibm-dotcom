/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import FocusMixin from '@carbon/web-components/es/globals/mixins/focus.js';
import {
  BUTTON_ICON_LAYOUT,
  BUTTON_KIND,
  BUTTON_SIZE,
} from '@carbon/web-components/es/components/button/button.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './button.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

export { BUTTON_KIND, BUTTON_SIZE };

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Expressive button.
 *
 * @element dds-button-expressive
 * @csspart button The button.
 */
@customElement(`${ddsPrefix}-button-expressive`)
class DDSButtonExpressive extends FocusMixin(StableSelectorMixin(LitElement)) {
  /**
   * `true` if there is an icon.
   */
  @state()
  protected _hasIcon = false;

  /**
   * `true` if there is a non-icon content.
   */
  @state()
  protected _hasMainContent = false;

  /**
   * The CSS class list for the button/link node.
   */
  protected get _classes() {
    const {
      disabled,
      kind,
      size,
      _hasIcon: hasIcon,
      _hasMainContent: hasMainContent,
    } = this;
    return classMap({
      [`${prefix}--btn`]: true,
      [`${prefix}--btn--${kind}`]: kind,
      [`${prefix}--btn--disabled`]: disabled,
      [`${prefix}--btn--icon-only`]: hasIcon && !hasMainContent,
      [`${prefix}--btn--expressive`]: true,
      [`${prefix}--btn--${size}`]: size,
      [`${prefix}-ce--btn--has-icon`]: hasIcon,
    });
  }

  /**
   * Handles `click` event on the button.
   */
  protected _handleClick() {} // eslint-disable-line class-methods-use-this

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
    this[name === 'icon' ? '_hasIcon' : '_hasMainContent'] = hasContent;
    this.requestUpdate();
  }

  /**
   * @returns The disabled link content.
   */
  protected _renderDisabledLink() {
    const { _classes: classes } = this;
    return html`
      <p id="button" part="button" class="${classes}">${this._renderInner()}</p>
    `;
  }

  /**
   * @returns The inner content.
   */
  protected _renderInner() {
    const { _handleSlotChange: handleSlotChange } = this;
    return html`
      <slot @slotchange="${handleSlotChange}"></slot>
      <p class="${prefix}--btn--hidden" aria-hidden="true">
        <span>:</span> ${this.href}
      </p>
      <slot name="icon" @slotchange="${handleSlotChange}"></slot>
    `;
  }

  /**
   * `true` if the button should have input focus when the page loads.
   */
  @property({ type: Boolean, reflect: true })
  autofocus = false;

  /**
   * `true` if the button should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The default file name, used if this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  download!: string;

  /**
   * Link `href`. If present, this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  href!: string;

  /**
   * The language of what `href` points to, if this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  hreflang!: string;

  /**
   * Button icon layout.
   */
  @property({ reflect: true, attribute: 'icon-layout' })
  iconLayout = BUTTON_ICON_LAYOUT.REGULAR;

  /**
   * Button kind.
   */
  @property({ reflect: true })
  kind = BUTTON_KIND.PRIMARY;

  /**
   * The a11y role for `<a>`.
   */
  @property({ attribute: 'link-role' })
  linkRole = 'button';

  /**
   * URLs to ping, if this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  ping!: string;

  /**
   * The link type, if this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  rel!: string;

  /**
   * Button size.
   */
  @property({ reflect: true })
  size = BUTTON_SIZE.REGULAR;

  /**
   * The link target, if this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  target!: string;

  /**
   * The default behavior if the button is rendered as `<button>`. MIME type of the `target`if this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  type!: string;

  render() {
    const {
      autofocus,
      disabled,
      download,
      href,
      hreflang,
      linkRole,
      ping,
      rel,
      target,
      type,
      _classes: classes,
      _handleClick: handleClick,
    } = this;
    if (href) {
      return disabled
        ? this._renderDisabledLink()
        : html`
            <a
              id="button"
              part="button"
              role="${ifDefined(linkRole)}"
              class="${classes}"
              download="${ifDefined(download)}"
              href="${ifDefined(href)}"
              hreflang="${ifDefined(hreflang)}"
              ping="${ifDefined(ping)}"
              rel="${ifDefined(rel)}"
              target="${ifDefined(target)}"
              type="${ifDefined(type)}"
              @click="${handleClick}">
              ${this._renderInner()}
            </a>
          `;
    }
    return html`
      <button
        id="button"
        part="button"
        class="${classes}"
        ?autofocus="${autofocus}"
        ?disabled="${disabled}"
        type="${ifDefined(type)}"
        @click="${handleClick}">
        ${this._renderInner()}
      </button>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--button-expressive`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSButtonExpressive;
