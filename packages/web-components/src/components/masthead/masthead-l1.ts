/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  html,
  customElement,
  LitElement,
  property,
  TemplateResult as _TemplateResult,
} from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './masthead-l1.scss';
import {
  L1MenuItem as _L1MenuItem,
  L1SubmenuSectionHeading,
  MastheadL1,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI';
import { ifDefined } from 'lit-html/directives/if-defined';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import ChevronDown16 from '../../internal/vendor/@carbon/web-components/icons/chevron--down/16.js';
import ArrowRight16 from '../../internal/vendor/@carbon/web-components/icons/arrow--right/16';
import { classMap } from 'lit-html/directives/class-map';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Masthead.
 *
 * @element dds-masthead-l1
 * @slot brand - The left hand area.
 * @slot nav - The nav content.
 * @slot profile - The right hand area.
 */
@customElement(`${ddsPrefix}-masthead-l1`)
class DDSMastheadL1 extends StableSelectorMixin(LitElement) {
  @property()
  l1Data?: MastheadL1;

  @property()
  isMobileVersion?: boolean;

  /**
   * Renders L1 for desktop screensizes
   *
   * @returns {_TemplateResult} L1 for desktop screensizes
   */
  protected _renderL1TopNav() {
    const { l1Data } = this;
    const { url, title } = l1Data!;

    return html`
      ${!title
        ? undefined
        : html`
            <dds-masthead-l1-name title="${title}" url="${ifDefined(url)}">
            </dds-masthead-l1-name>
          `}
      <dds-top-nav-l1> L1 TOP NAV. </dds-top-nav-l1>
    `;
  }

  /**
   * Renders L1 for mobile screensizes.
   *
   * @returns {_TemplateResult} L1 for mobile screensizes.
   */
  protected _renderL1MobileNav() {
    const { l1Data } = this;
    const { url, title, actions, menuItems } = l1Data ?? {};
    const { cta, login } = actions ?? {};

    const { _toggleMobileSubsection: toggleMobileSubsection } = this
      .constructor as typeof DDSMastheadL1;

    return html`
      <button
        class="${prefix}--masthead__l1-title"
        @click=${toggleMobileSubsection}>
        ${title}${ChevronDown16()}
      </button>
      <ul class="${prefix}--masthead__l1-dropdown" hidden>
        ${url
          ? html`<li>
              <a class="bx--masthead__l1-dropdown-item" href="${url}"
                >Overview</a
              >
            </li>`
          : ''}
        ${menuItems?.map((menuItem) => this._renderL1MobileSubnav(menuItem))}
        ${login && login.url && login.title
          ? html`<li>
              <a
                class="bx--masthead__l1-dropdown-item bx--masthead__l1-dropdown-login"
                href="${ifDefined(login.url)}"
                >${login.title}${ArrowRight16()}</a
              >
            </li>`
          : ''}
        ${cta && cta.url && cta.title
          ? html`<li>
              <a
                class="bx--masthead__l1-dropdown-item bx--masthead__l1-dropdown-cta"
                href="${ifDefined(cta.url)}"
                >${cta.title}${ArrowRight16()}</a
              >
            </li>`
          : ''}
      </ul>
    `;
  }

  /**
   * Renders L1MenuItems with subsections containing announcements, headings, links, and footers.
   *
   * @param {_L1MenuItem[]} menuItem Array of menu items containing subnavs
   * @returns {_TemplateResult} rendered output
   */
  protected _renderL1MobileSubnav(menuItem) {
    const { _toggleMobileSubsection: toggleMobileSubsection } = this
      .constructor as typeof DDSMastheadL1;
    const { title, url, submenu } = menuItem;

    if (!submenu && url) {
      return html`
        <li>
          <a class="bx--masthead__l1-dropdown-item" href="${url}">${title}</a>
        </li>
      `;
    } else if (!submenu) {
      return html`
        <li><span class="bx--masthead__l1-dropdown-item">${title}</span></li>
      `;
    }

    const { announcement, menuSections, footer } = submenu ?? {};

    return html`
      <li>
        <button
          class="bx--masthead__l1-dropdown-item"
          @click=${toggleMobileSubsection}>
          ${title}${ChevronDown16()}
        </button>
        <div class="bx--masthead__l1-dropdown-subsection" hidden>
          ${announcement
            ? html`<div class="bx--masthead__l1-dropdown-announcement">
                ${unsafeHTML(announcement)}
              </div>`
            : ''}
          ${menuSections
            ? menuSections.map((section) => {
                const { heading, items } = section;

                return html`
                  ${heading
                    ? html`${this._renderL1SubSectionHeading(heading)}`
                    : ''}
                  ${items
                    ? html` <ul>
                        ${items.map((item) => {
                          const { title, url } = item;

                          return html`<a
                            class="bx--masthead__l1-dropdown-item"
                            href="${url}"
                            >${title}</a
                          >`;
                        })}
                      </ul>`
                    : ''}
                `;
              })
            : ''}
          ${footer
            ? html`<a
                class="bx--masthead__l1-dropdown-viewall"
                href="${footer.url}"
                >${footer.title}${ArrowRight16()}</a
              >`
            : ''}
        </div>
      </li>
    `;
  }

  /**
   * Toggles the mobile navigation subsection.
   *
   * @param {PointerEvent} event The click event from the user
   */
  protected static _toggleMobileSubsection(event: PointerEvent) {
    const { currentTarget } = event;
    const button = currentTarget as HTMLElement;
    button.classList.toggle('is-open');
    button.nextElementSibling?.toggleAttribute('hidden');
  }

  /**
   * Renders a heading object in the proper <H#> element.
   *
   * @param heading The heading object to be rendered.
   * @returns {_TemplateResult} Rendered heading.
   */
  protected _renderL1SubSectionHeading(heading: L1SubmenuSectionHeading) {
    const { isMobileVersion } = this;

    const headingContent = heading.url
      ? html`<a class="bx--masthead__l1-dropdown-item" href="${heading.url}"
          >${heading.title}${ArrowRight16()}</a
        >`
      : html`${heading.title}`;

    const headingClasses = {
      [`${prefix}--masthead__l1-dropdown-heading`]: !!isMobileVersion,
    };

    let renderedHeading = headingContent;
    switch (heading.headingLevel) {
      case 2:
        renderedHeading = html`<h2 class=${classMap(headingClasses)}>
          ${headingContent}
        </h2>`;
        break;
      case 3:
        renderedHeading = html`<h3 class=${classMap(headingClasses)}>
          ${headingContent}
        </h3>`;
        break;
      case 4:
        renderedHeading = html`<h4 class=${classMap(headingClasses)}>
          ${headingContent}
        </h4>`;
        break;
      case 5:
        renderedHeading = html`<h5 class=${classMap(headingClasses)}>
          ${headingContent}
        </h5>`;
        break;
      case 6:
        renderedHeading = html`<h6 class=${classMap(headingClasses)}>
          ${headingContent}
        </h6>`;
        break;
      default:
        renderedHeading = headingContent;
    }

    return renderedHeading;
  }

  render() {
    const { isMobileVersion } = this;
    return html`
      <div class="${prefix}--masthead__l1-inner-container">
        ${isMobileVersion
          ? html` ${this._renderL1MobileNav()} `
          : html` ${this._renderL1TopNav()} `}
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--masthead__l1`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMastheadL1;
