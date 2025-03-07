/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { FOOTER_SIZE } from './footer';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './footer.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Legal nav.
 *
 * @element c4d-legal-nav
 * @csspart legal-nav - The <nav> container. Usage: `c4d-legal-nav::part(legal-nav)`
 * @csspart legal-nav-list-container - The legal nav list container. Usage: `c4d-legal-nav::part(legal-nav-list-container)`
 * @csspart legal-nav-list - The list of links. Usage: `c4d-legal-nav::part(legal-nav-list)`
 * @csspart adjunct-links-list - The list of adjunct links. Usage: `c4d-legal-nav::part(adjunct-links-list)`
 * @csspart adjunct-links-container - The adjunct links container. Usage: `c4d-legal-nav::part(adjunct-links-container)`
 * @csspart legal-nav-items-container - The legal nav items container. Usage: `c4d-legal-nav::part(legal-nav-items-container)`
 */
@customElement(`${c4dPrefix}-legal-nav`)
class C4DLegalNav extends StableSelectorMixin(LitElement) {
  /**
   * Size property used for applying classes
   */
  @property()
  size = FOOTER_SIZE.REGULAR;

  /**
   * Navigation label for accessibility.
   */
  @property()
  navLabel = 'Legal Navigation';

  /**
   * The adjunct links slot
   */
  @query('[name="adjunct-links"]')
  private _adjunctLinksSlot?: HTMLSlotElement;

  @state()
  protected _hasAdjunctLinks = false;

  /**
   * Returns a class-name based on the type parameter type
   */
  protected _getTypeClass() {
    return classMap({
      [`${c4dPrefix}--legal-nav__list`]: true,
      [`${c4dPrefix}--legal-nav__micro`]: this.size === FOOTER_SIZE.MICRO,
    });
  }

  /**
   * Handles slot change event of adjunct-links slot to track if there are any.
   */
  protected _handleAdjunctLinksVisibility = () => {
    const { _adjunctLinksSlot: adjunctLinksSlot } = this;

    this._hasAdjunctLinks =
      (adjunctLinksSlot?.assignedNodes().length || 0) !== 0;
  };

  /**
   * The shadow slot this legal nav should be in.
   */
  @property({ reflect: true })
  slot = 'legal-nav';

  connectedCallback() {
    if (this.hasAttribute('role')) {
      this.removeAttribute('role');
    }
    super.connectedCallback();
  }

  firstUpdated() {
    const { _adjunctLinksSlot: adjunctLinksSlot } = this;
    this._hasAdjunctLinks =
      (adjunctLinksSlot?.assignedNodes().length || 0) !== 0;
  }

  render() {
    const { navLabel, _hasAdjunctLinks: hasAdjunctLinks } = this;
    return this.size !== FOOTER_SIZE.MICRO
      ? html`
          <nav
            part="legal-nav"
            class="${c4dPrefix}--legal-nav"
            aria-label="${ifDefined(navLabel)}">
            <div
              part="legal-nav-list-container"
              class="${this._getTypeClass()}">
              <ul part="legal-nav-list">
                <slot></slot>
              </ul>
              <slot name="locale"></slot>
            </div>
            <div
              part="adjunct-links-container"
              class="${c4dPrefix}--adjunct-links__container${hasAdjunctLinks
                ? ''
                : ` ${c4dPrefix}--adjunct-links__container--hidden`}">
              <ul part="adjunct-links-list adjunct-links-list">
                <slot
                  name="adjunct-links"
                  @slotchange="${this._handleAdjunctLinksVisibility}"></slot>
              </ul>
            </div>
          </nav>
        `
      : html`
          <nav part="legal-nav" class="${c4dPrefix}--legal-nav">
            <div
              part="legal-nav-list-container"
              class="${this._getTypeClass()}">
              <div part="legal-nav-items-container">
                <slot name="brand"></slot>
                <ul part="legal-nav-list">
                  <slot></slot>
                </ul>
              </div>
              <slot name="locale"></slot>
            </div>
          </nav>
        `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--footer-legal-nav`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default C4DLegalNav;
