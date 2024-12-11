/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import ChevronRight16 from '@carbon/web-components/es/icons/chevron--right/16.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import MediaQueryMixin, {
  MQBreakpoints,
  MQDirs,
} from '../../component-mixins/media-query/media-query';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './footer.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Footer nav group.
 *
 * @element c4d-footer-nav-group
 * @csspart nav-group-title - The nav group title. Usage: `c4d-footer-nav::part(nav-group-title)`
 * @csspart accordion-heading - The accordion nav heading. Usage: `c4d-footer-nav::part(accordion-heading)`
 * @csspart accordion-title - The accordion title. Usage: `c4d-footer-nav::part(accordion-title)`
 * @csspart accordion-content - The accordion content. Usage: `c4d-footer-nav::part(accordion-content)`
 * @csspart link-list - The list of links. Usage: `c4d-footer-nav-group::part(link-list)`
 * @slot title - The title content.
 */
@customElement(`${c4dPrefix}-footer-nav-group`)
class C4DFooterNavGroup extends MediaQueryMixin(
  StableSelectorMixin(LitElement),
  {
    [MQBreakpoints.MD]: MQDirs.MIN,
  }
) {
  @state()
  private _isMediumOrGreater = this.carbonBreakpoints.md.matches;

  protected mediaQueryCallbackMD() {
    this._isMediumOrGreater = this.carbonBreakpoints.md.matches;
  }

  /**
   * Handles user-initiated toggle request of this accordion item.
   *
   * @param open The new open state.
   */
  private _handleUserInitiatedToggle(open = !this.open) {
    const { eventBeforeToggle, eventToggle } = this
      .constructor as typeof C4DFooterNavGroup;
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
   * @param event.key The event key.
   */
  private _handleKeydownExpando = ({ key }: KeyboardEvent) => {
    if (this.open && (key === 'Esc' || key === 'Escape')) {
      this._handleUserInitiatedToggle(false);
    }
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
  }

  render() {
    const {
      titleText,
      open,
      _isMediumOrGreater: isMediumOrGreater,
      _handleClickExpando: handleClickExpando,
      _handleKeydownExpando: handleKeydownExpando,
    } = this;

    const heading = isMediumOrGreater
      ? html`
          <h2 part="nav-group-title" class="${prefix}--footer-nav-group__title">
            <slot name="title">${titleText}</slot>
          </h2>
        `
      : html`
          <button
            part="accordion-heading"
            type="button"
            class="${prefix}--accordion__heading"
            aria-controls="content"
            aria-expanded="${String(Boolean(open))}"
            @click="${handleClickExpando}"
            @keydown="${handleKeydownExpando}">
            ${ChevronRight16({
              class: `${prefix}--accordion__arrow`,
            })}
            <div part="accordion-title" class="${prefix}--accordion__title">
              <slot name="title">${titleText}</slot>
            </div>
          </button>
        `;
    return html`
      ${heading}
      <div
        part="accordion-content"
        id="content"
        class="${prefix}--accordion__content">
        <ul part="link-list">
          <slot></slot>
        </ul>
      </div>
    `;
  }

  /**
   * The name of the custom event fired before this accordion item is being toggled upon a user gesture.
   * Cancellation of this event stops the user-initiated action of toggling this accordion item.
   */
  static get eventBeforeToggle() {
    return `${c4dPrefix}-footer-nav-group-beingtoggled`;
  }

  /**
   * The name of the custom event fired after this accordion item is toggled upon a user gesture.
   */
  static get eventToggle() {
    return `${c4dPrefix}-footer-nav-group-toggled`;
  }

  static get stableSelector() {
    return `${c4dPrefix}--footer-nav-group`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default C4DFooterNavGroup;
