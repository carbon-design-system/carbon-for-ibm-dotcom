/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import ChevronRight16 from '@carbon/web-components/es/icons/chevron--right/16.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import Handle from '../../globals/internal/handle';
import styles from './footer.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Footer nav group.
 *
 * @element dds-footer-nav-group
 * @slot title - The title content.
 */
@customElement(`${ddsPrefix}-footer-nav-group`)
class DDSFooterNavGroup extends StableSelectorMixin(LitElement) {
  /**
   * The handle for observing match of the media query for making the accordion item stick expanded.
   */
  private _hChangeMediaQuery: Handle | null = null;

  /**
   * `true` to make the accordion item stick expanded.
   */
  @state()
  private _shouldStickExpanded = false;

  /**
   * Handles user-initiated toggle request of this accordion item.
   *
   * @param open The new open state.
   */
  private _handleUserInitiatedToggle(open = !this.open) {
    const { eventBeforeToggle, eventToggle } = this
      .constructor as typeof DDSFooterNavGroup;
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        open,
      },
    };
    if (this.dispatchEvent(new CustomEvent(eventBeforeToggle, init))) {
      this.open = open;
      this.dispatchEvent(new CustomEvent(eventToggle, init));
    }
  }

  /**
   * Handles the `click` event on the expando button.
   */
  private _handleClickExpando() {
    this._handleUserInitiatedToggle();
  }

  /**
   * Handles the `keydown` event on the expando button.
   *
   * @param event The event.
   */
  private _handleKeydownExpando = ({ key }: KeyboardEvent) => {
    if (this.open && (key === 'Esc' || key === 'Escape')) {
      this._handleUserInitiatedToggle(false);
    }
  };

  /**
   * Handles `change` event on the media query list for making the accordion item stick expanded.
   *
   * @param event The event.
   */
  private _handleChangeMediaQuery = (event: MediaQueryListEvent) => {
    this._shouldStickExpanded = event.matches;
  };

  /**
   * `true` if the check box should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * The title text.
   */
  @property({ attribute: 'title-text' })
  titleText = '';

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
    if (this._hChangeMediaQuery) {
      this._hChangeMediaQuery = this._hChangeMediaQuery.release();
    }
    const { mediaStickExpanded } = this.constructor as typeof DDSFooterNavGroup;
    const mediaQueryList =
      this.ownerDocument!.defaultView!.matchMedia(mediaStickExpanded);
    this._shouldStickExpanded = mediaQueryList.matches;
    const { _handleChangeMediaQuery: handleChangeMediaQuery } = this;
    mediaQueryList.addListener(handleChangeMediaQuery);
    this._hChangeMediaQuery = {
      release() {
        mediaQueryList.removeListener(handleChangeMediaQuery);
      },
    } as Handle;
  }

  disconnectedCallback() {
    if (this._hChangeMediaQuery) {
      this._hChangeMediaQuery = this._hChangeMediaQuery.release();
    }
  }

  render() {
    const {
      titleText,
      open,
      _shouldStickExpanded: shouldStickExpanded,
      _handleClickExpando: handleClickExpando,
      _handleKeydownExpando: handleKeydownExpando,
    } = this;
    const heading = shouldStickExpanded
      ? html`
          <h2 class="${prefix}--footer-nav-group__title">
            <slot name="title">${titleText}</slot>
          </h2>
        `
      : html`
          <button
            type="button"
            class="${prefix}--accordion__heading"
            aria-controls="content"
            aria-expanded="${String(Boolean(open))}"
            @click="${handleClickExpando}"
            @keydown="${handleKeydownExpando}">
            ${ChevronRight16({
              class: `${prefix}--accordion__arrow`,
            })}
            <div class="${prefix}--accordion__title">
              <slot name="title">${titleText}</slot>
            </div>
          </button>
        `;
    return html`
      ${heading}
      <div id="content" class="${prefix}--accordion__content">
        <ul>
          <slot></slot>
        </ul>
      </div>
    `;
  }

  /**
   * The media query to make the accordion item stick expaned.
   */
  static get mediaStickExpanded() {
    return '(min-width: 42rem)';
  }

  /**
   * The name of the custom event fired before this accordion item is being toggled upon a user gesture.
   * Cancellation of this event stops the user-initiated action of toggling this accordion item.
   */
  static get eventBeforeToggle() {
    return `${ddsPrefix}-footer-nav-group-beingtoggled`;
  }

  /**
   * The name of the custom event fired after this accordion item is toggled upon a user gesture.
   */
  static get eventToggle() {
    return `${ddsPrefix}-footer-nav-group-toggled`;
  }

  static get stableSelector() {
    return `${ddsPrefix}--footer-nav-group`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSFooterNavGroup;
