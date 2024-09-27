/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TemplateResult as _TemplateResult, html, LitElement } from 'lit';
import { property, query, queryAll, state } from 'lit/decorators.js';
import root from 'window-or-global';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './masthead-l1.scss';
import {
  L1MenuItem as _L1MenuItem,
  L1SubmenuSection as _L1SubmenuSection,
  L1CtaLink,
  L1SubmenuSectionHeading,
  MastheadL1,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import ChevronDown16 from '@carbon/web-components/es/icons/chevron--down/16.js';
import ArrowRight16 from '@carbon/web-components/es/icons/arrow--right/16';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20';
import ArrowLeft16 from '@carbon/web-components/es/icons/arrow--left/16.js';
import ArrowLeft20 from '@carbon/web-components/es/icons/arrow--left/20.js';
import CaretLeft20 from '@carbon/web-components/es/icons/caret--left/20.js';
import CaretRight20 from '@carbon/web-components/es/icons/caret--right/20.js';
import { classMap } from 'lit/directives/class-map.js';
import layoutBreakpoint from './masthead-breakpoint';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

function handleDropdownClose(event: FocusEvent | KeyboardEvent) {
  const { currentTarget } = event;
  const target = currentTarget as HTMLElement | null;
  const openDropdowns = Array.from(target?.querySelectorAll('.is-open') ?? []);

  if (openDropdowns.length) {
    switch (event.type) {
      case 'keydown': {
        const { code } = event as KeyboardEvent;
        if (code === 'Escape') {
          openDropdowns.forEach((el) => {
            el.classList.remove('is-open');
          });

          (target?.firstElementChild as HTMLElement)?.focus();
        }
        break;
      }
      case 'focusout': {
        const { relatedTarget } = event as FocusEvent;
        const hasUnknownTargets = !relatedTarget || !currentTarget;
        let focusHasEscaped = false;

        if (!hasUnknownTargets) {
          const comparison = (relatedTarget as Node).compareDocumentPosition(
            currentTarget as Node
          );

          focusHasEscaped =
            !(comparison & 8) && // relatedTarget is not ancestor of currentTarget
            relatedTarget !== currentTarget;
        }

        if (hasUnknownTargets || focusHasEscaped) {
          openDropdowns.forEach((el) => {
            el.classList.remove('is-open');
          });
        }

        break;
      }
      default:
        break;
    }
  }
}

/**
 * Masthead.
 *
 * @element c4d-masthead-l1
 * @csspart l1-menu-container-inner - The container that wraps the L1 menu items for scrolling purposes. Usage: `c4d-masthead-l1::part(l1-menu-container-inner)`
 * @csspart masthead-l1-menu - The container element for the L1 menu items. Usage: `c4d-masthead-l1::part(masthead-l1-menu)`
 * @csspart l1-menu-first-item - The first item in the L1 menu. Usage: `c4d-masthead-l1::part(l1-menu-first-item)`
 * @csspart l1-menu-last-item - The last item in the L1 menu. Usage: `c4d-masthead-l1::part(l1-menu-last-item)`
 * @csspart l1-menu-container-scroller - The buttons used for scrolling the L1 menu items. Usage: `c4d-masthead-l1::part(l1-menu-container-scroller)`
 * @csspart l1-title-button - The title button in the L1 masthead. Usage: `c4d-masthead-l1::part(l1-title-button)`
 * @csspart l1-dropdown - The dropdown items in the L1 masthead. Usage: `c4d-masthead-l1::part(l1-dropdown)`
 * @csspart l1-dropdown-viewall - The "view all" link in the L1 dropdown. Usage: `c4d-masthead-l1::part(l1-dropdown-viewall)`
 * @csspart l1-dropdown-announcement - The announcement in the L1 dropdown. Usage: `c4d-masthead-l1::part(l1-dropdown-announcement)`
 * @csspart l1-dropdown-section - The sections in the L1 dropdown. Usage: `c4d-masthead-l1::part(l1-dropdown-section)`
 * @csspart l1-dropdown-menu-items - The menu items in the L1 dropdown. Usage: `c4d-masthead-l1::part(l1-dropdown-menu-items)`
 * @csspart l1-dropdown-menu-item - A single menu item in the L1 dropdown. Usage: `c4d-masthead-l1::part(l1-dropdown-menu-item)`
 * @csspart l1-dropdown-item-ul - The item list in the L1 dropdown. Usage: `c4d-masthead-l1::part(l1-dropdown-item-ul)`
 * @csspart l1-dropdown-item-li - The list item in the L1 dropdown. Usage: `c4d-masthead-l1::part(l1-dropdown-item-li)`
 * @csspart l1-dropdown-item-link - The item link in the L1 dropdown. Usage: `c4d-masthead-l1::part(l1-dropdown-item-link)`
 * @csspart l1-dropdown-item-link--heading - The item link in the L1 dropdown that wraps headings. Usage: `c4d-masthead-l1::part(l1-dropdown-item-link--heading)`
 * @csspart l1-dropdown-subsection - The subsection in the L1 dropdown. Usage: `c4d-masthead-l1::part(l1-dropdown-subsection)`
 * @csspart l1-dropdown-item - The dropdown item in the L1 dropdown. Usage: `c4d-masthead-l1::part(l1-dropdown-item)`
 * @csspart l1-dropdown-login-link - The login link in the L1 dropdown. Usage: `c4d-masthead-l1::part(l1-dropdown-login-link)`
 * @csspart l1-dropdown-links - A group of l1 dropdown links. Usage: `c4d-masthead-l1::part(l1-dropdown-links)`
 * @csspart dropdown-item-li - The li element for the dropdown item. Usage: `c4d-masthead-l1::part(dropdown-item-li)`
 * @csspart dropdown-login-link-li - The li element for the login link. Usage: `c4d-masthead-l1::part(dropdown-login-link-li)`
 * @csspart cta-li - The li element for the cta. Usage: `c4d-masthead-l1::part(cta-li)`
 * @csspart dropdown-item-link-li - The li element for the dropdown item link. Usage: `c4d-masthead-l1::part(dropdown-item-link-li)`
 * @csspart dropdown-item-span-li - The li element for the dropdown item span. Usage: `c4d-masthead-l1::part(dropdown-item-span-li)`
 * @csspart dropdown-item-button-li - The li element for the dropdown item button. Usage: `c4d-masthead-l1::part(dropdown-item-button-li)`
 * @csspart dropdown-column - The dropdown column container. Usage: `c4d-masthead-l1::part(dropdown-column)
 * @csspart dropdown-column--narrow - The dropdown column narrow modifier. Usage: `c4d-masthead-l1::part(dropdown-column--narrow)
 * @csspart dropdown-column--wide - The dropdown column wide modifier. Usage: `c4d-masthead-l1::part(dropdown-column--wide)
 * @slot brand - The left hand area.
 * @slot nav - The nav content.
 * @slot profile - The right hand area.
 */
@customElement(`${c4dPrefix}-masthead-l1`)
class C4DMastheadL1 extends StableSelectorMixin(LitElement) {
  /**
   * Whether an L1 menu is open or not.
   */
  @property({ attribute: 'active', reflect: true, type: Boolean })
  active = false;

  /**
   * The L1 menu data, passed from the masthead-composite.
   */
  @property()
  l1Data?: MastheadL1;

  /**
   * The URL path of the current document root.
   */
  @property()
  currentUrlPath?: string = root.location?.href;

  /**
   * The English title of the selected nav item.
   */
  @property({ attribute: 'selected-menu-item' })
  selectedMenuItem?: string;

  /**
   * Whether the current viewport is below 800px or not
   */
  @state()
  isMobileVersion = layoutBreakpoint.matches;

  /**
   * Elements that are currently selected.
   */
  @state()
  selectedElements: Element[] = [];

  /**
   * The translated label for the overview links visible on mobile
   */
  @property({ attribute: 'overview-text' })
  overviewText = 'Overview';

  /**
   * The writing direction of the page
   */
  @property()
  direction = '';

  /**
   * The x-scrolling element wrapping the L1 top-level items
   */
  @query(`.${prefix}--masthead__l1-menu-container-inner`)
  menuContainerInner?: HTMLElement;

  @query(`.${prefix}--masthead__l1-menu`)
  menu?: HTMLElement;

  /**
   * The first top-level menu items
   */
  @query(`.${prefix}--masthead__l1-menu > *:first-child`)
  menuFirstItem?: HTMLElement;

  /**
   * The last top-level menu items
   */
  @query(`.${prefix}--masthead__l1-menu > *:last-child`)
  menuLastItem?: HTMLElement;

  /**
   * The buttons that scroll the top-level menu items
   */
  @queryAll(`.${prefix}--masthead__l1-menu-container-scroller`)
  menuScrollerButtons?: NodeListOf<HTMLButtonElement>;

  protected get Arrow16() {
    const isRTL = document.dir.toLowerCase() === 'rtl';
    return isRTL ? ArrowLeft16 : ArrowRight16;
  }

  protected get Arrow20() {
    const isRTL = document.dir.toLowerCase() === 'rtl';
    return isRTL ? ArrowLeft20 : ArrowRight20;
  }

  /**
   * Resize Observer responsible for show/hiding the scrolling buttons.
   */
  protected scrollObserver?: ResizeObserver;

  /**
   * Prevents resize observer from blocking main thread.
   */
  protected scrollObserverThrottler?: NodeJS.Timeout;

  /**
   * ResizeObserver callback method
   */
  protected toggleScrollButtons() {
    // Resize events happen rapidly. We need to throttle this functionality.
    if (!this.scrollObserverThrottler) {
      const {
        menu,
        menuContainerInner,
        menuFirstItem,
        menuLastItem,
        menuScrollerButtons,
      } = this;

      // Only act if all the needed elements are present.
      const menuItems = this.l1Data?.menuItems ?? [];
      if (menuItems.length === 0) {
        menuScrollerButtons?.forEach((button) => {
          button.setAttribute('hidden', '');
        });
      } else if (
        menuFirstItem &&
        menuLastItem &&
        menuContainerInner &&
        menuScrollerButtons
      ) {
        // Find first & last items, calculate width between outer boundaries.
        const firstItemBox = menuFirstItem.getBoundingClientRect();
        const lastItemBox = menuLastItem.getBoundingClientRect();
        const menuLeft = Math.min(firstItemBox.left, lastItemBox.left);
        const menuRight = Math.max(firstItemBox.right, lastItemBox.right);
        const menuWidth = menuRight - menuLeft;
        const containerWidth =
          menuContainerInner?.getBoundingClientRect().width;

        // If we overflow the container, show buttons.
        if (menuWidth > containerWidth) {
          menuScrollerButtons.forEach((button) => {
            button.removeAttribute('hidden');
          });

          if (menu?.style.translate) {
            const currentScroll = parseInt(menu.style.translate);
            const maxScroll = containerWidth - menuWidth;

            menu.style.translate = `${Math.max(currentScroll, maxScroll)}px`;
          }
        }
        // If we don't, hide the buttons.
        else {
          menuScrollerButtons.forEach((button) => {
            button.setAttribute('hidden', '');
          });

          // Remove any translations we've used to mimic scrolling.
          if (menu) {
            menu.style.translate = '';
          }
        }
      }

      // Prevent this functionality from running again until the time threshold has passed.
      this.scrollObserverThrottler = setTimeout(() => {
        this.scrollObserverThrottler = undefined;
      }, 100);
    }
  }

  /**
   * Creates resize observer on load/update when above mobile breakpoint.
   */
  protected _createScrollObserver() {
    const { menuContainerInner, toggleScrollButtons } = this;
    this.scrollObserver = new ResizeObserver(toggleScrollButtons.bind(this));

    if (menuContainerInner) {
      this.scrollObserver.observe(menuContainerInner);
    }
  }

  /**
   * Scrolls the menu inner container on click.
   *
   * @param event The button click
   */
  protected _scrollL1TopNav(event: PointerEvent) {
    const { currentTarget } = event;
    const { menuContainerInner, menu, direction } = this;

    if (!menu || !menuContainerInner) {
      return;
    }

    // Valid translations will exist between 0 and a some negative value.
    const minTranslationValue =
      (menu.clientWidth - menuContainerInner.clientWidth) * -1;
    const maxTranslationValue = 0;

    // Use a 1/-1 multiplier to account for correct button
    let buttonDirMultiplier;
    switch ((currentTarget as HTMLElement).id) {
      // "Next" button should pull menu toward 0
      case 'scroll-next':
        buttonDirMultiplier = -1;
        break;
      // "Prev" button should push menu away from 0
      case 'scroll-prev':
        buttonDirMultiplier = 1;
        break;
      default:
        buttonDirMultiplier = 0;
        break;
    }

    // Use a 1/-1 multiplier to account for writing direction
    let writingDirMultiplier;
    switch (direction) {
      // LTR is inline with x-axis
      case 'ltr':
        writingDirMultiplier = 1;
        break;
      // RTL must invert x-axis
      case 'rtl':
        writingDirMultiplier = -1;
        break;
      default:
        writingDirMultiplier = 0;
        break;
    }

    // Get current translation value
    const computedScroll = parseInt(window.getComputedStyle(menu).translate);
    const currentScroll = !Number.isNaN(computedScroll) ? computedScroll : 0;

    // Adjust translation value by adding/subtracting the width of the visible menu
    const newScroll =
      currentScroll +
      menuContainerInner.clientWidth *
        buttonDirMultiplier *
        writingDirMultiplier;

    // Cap the value to avoid over-translation to either side
    const cappedValue = Math.max(
      minTranslationValue,
      Math.min(maxTranslationValue, newScroll)
    );

    menu.style.translate = `${cappedValue}px`;
  }

  /**
   * Renders the L1 CTA.
   *
   * @returns {_TemplateResult} A template fragment representing the L1 CTA
   */
  protected _renderCta(): _TemplateResult | '' {
    return html`<slot name="l1-cta"></slot>`;
  }

  /**
   * Renders L1 for desktop screensizes
   *
   * @returns {_TemplateResult} L1 for desktop screensizes
   */
  protected _renderL1TopNav() {
    const { l1Data, direction, _scrollL1TopNav: scrollL1TopNav } = this;
    const { url, title, actions, menuItems } = l1Data ?? {};
    const { login } = actions ?? {};

    return html`
      <div
        part="masthead-l1-menu-container-mask"
        class="${prefix}--masthead__l1-menu-container-mask ${prefix}--masthead__l1-menu-container-mask--start"></div>
      ${!title || !url
        ? undefined
        : html`
            <div
              part="masthead-background-wrapper"
              class="${prefix}--masthead__background-wrapper">
              <a
                part="masthead-l1-title"
                class="${prefix}--masthead__l1-title"
                href="${url}"
                >${title}</a
              >
            </div>
          `}
      <div
        part="masthead-l1-menu-container-outer"
        class="${prefix}--masthead__l1-menu-container-outer">
        <button
          part="l1-menu-container-scroller-button"
          class="${prefix}--masthead__l1-menu-container-scroller"
          id="scroll-prev"
          @click=${scrollL1TopNav}>
          <div
            part="l1-menu-container-scroller-inner"
            class="${prefix}--masthead__l1-menu-container-scroller-inner">
            ${direction === 'ltr' ? CaretLeft20() : CaretRight20()}
          </div>
        </button>
        <div
          part="l1-menu-container-inner"
          class="${prefix}--masthead__l1-menu-container-inner">
          <ul part="l1-menu" class="${prefix}--masthead__l1-menu">
            ${(menuItems ?? []).map((menuItem) =>
              this._renderL1TopNavDropDowns(menuItem)
            )}
          </ul>
        </div>
        <button
          part="l1-menu-container-scroller"
          class="${prefix}--masthead__l1-menu-container-scroller"
          id="scroll-next"
          @click=${scrollL1TopNav}>
          <div
            part="l1-menu-container-scroller-inner"
            class="${prefix}--masthead__l1-menu-container-scroller-inner">
            ${direction === 'ltr' ? CaretRight20() : CaretLeft20()}
          </div>
        </button>
      </div>
      ${login && login.url && login.title
        ? html`
            <div
              part="masthead-background-wrapper"
              class="${prefix}--masthead__background-wrapper">
              <a
                part="masthead-l1-login"
                class="${prefix}--masthead__l1-login"
                href="${ifDefined(login.url)}"
                >${login.title}</a
              >
            </div>
          `
        : ''}
      ${this._renderCta()}
      <div
        part="masthead-l1-menu-container-mask"
        class="${prefix}--masthead__l1-menu-container-mask ${prefix}--masthead__l1-menu-container-mask--end"></div>
    `;
  }

  /**
   * Renders L1MenuItems with subsections containing announcements, headings, links, and footers.
   *
   * @param {_L1MenuItem} menuItem Array of menu items containing subnavs
   * @returns {_TemplateResult} rendered output
   */
  protected _renderL1TopNavDropDowns(menuItem) {
    const {
      _toggleSubsection: toggleSubsection,
      _handleTopNavFocusIn: handleTopNavFocusIn,
    } = this;
    const { title, url, target, submenu } = menuItem;

    if (!submenu && url) {
      return html`
        <li part="masthead-l1-item">
          <a
            part="masthead-l1-item-link"
            class="${prefix}--masthead__l1-item"
            href="${url}"
            target="${target}"
            @focusin=${handleTopNavFocusIn}
            >${title}</a
          >
        </li>
      `;
    } else if (!submenu) {
      return html`
        <li part="masthead-l1-item">
          <span
            part="masthead-l1-item-span"
            class="${prefix}--masthead__l1-item"
            @focusin=${handleTopNavFocusIn}
            >${title}</span
          >
        </li>
      `;
    }

    const { announcement, menuSections, footer, columns } = submenu ?? {};

    // 3-column dropdown has option for 33/66 split.
    const hasWideColumn =
      columns === 3 ? menuSections.some((section) => section.span > 1) : false;

    // Split can be 33/66 or 66/33.
    const wideColumnFirst = menuSections[0].span > 1;

    const wideColumns = menuSections.filter((section) => section.span > 1);
    const normalColumns = menuSections.filter((section) => !(section.span > 1));
    const dropdownClasses = classMap({
      [`${prefix}--masthead__l1-dropdown-links`]: true,
      [`${prefix}--masthead__l1-dropdown--has-column-wide`]: hasWideColumn,
    });

    return html`
      <li
        part="masthead-l1-item"
        @focusout=${handleDropdownClose}
        @keydown=${handleDropdownClose}
        tabindex="-1">
        <button
          part="masthead-l1-item-button"
          class="${prefix}--masthead__l1-item"
          @click=${toggleSubsection}
          @focusin=${handleTopNavFocusIn}>
          ${title}${ChevronDown16()}
        </button>
        <div
          part="l1-dropdown"
          data-dropdown-target
          class="${prefix}--masthead__l1-dropdown ${prefix}--masthead__l1-dropdown__${columns}-col">
          ${announcement
            ? html`<div
                part="l1-dropdown-announcement"
                class="${prefix}--masthead__l1-dropdown-announcement">
                ${unsafeHTML(announcement)}
              </div>`
            : ''}
          <div part="l1-dropdown-links" class="${dropdownClasses}">
            ${hasWideColumn && wideColumnFirst
              ? this._renderL1DropdownSections(wideColumns, hasWideColumn, true)
              : ''}
            ${this._renderL1DropdownSections(
              normalColumns,
              hasWideColumn,
              false
            )}
            ${hasWideColumn && !wideColumnFirst
              ? this._renderL1DropdownSections(wideColumns, hasWideColumn, true)
              : ''}
          </div>
          ${footer
            ? html`<a
                part="l1-dropdown-viewall"
                class="${prefix}--masthead__l1-dropdown-viewall"
                href="${footer.url}"
                >${footer.title}${this.Arrow16()}</a
              >`
            : ''}
        </div>
      </li>
    `;
  }

  /**
   *
   * @param {_L1SubmenuSection[]} sections the sections to render.
   * @param {boolean} hasWide if this column will be rendered as or next to a wide column.
   * @param {boolean} isWide if this column will be rendered as a wide column.
   * @returns rendered markup
   */
  protected _renderL1DropdownSections(sections, hasWide, isWide) {
    const renderedSections = sections.map((section) => {
      const { heading, items } = section;

      return html`
        <div
          part="l1-dropdown-section"
          class="${prefix}--masthead__l1-dropdown-section">
          ${heading ? html`${this._renderL1SubSectionHeading(heading)}` : ''}
          ${items
            ? html` <ul
                part="l1-dropdown-menu-items"
                class="${prefix}--masthead__l1-dropdown-menu-items">
                ${items.map((item) => {
                  const { title, url, target, description } = item;

                  const linkContents = description
                    ? html`
                        <span
                          part="l1-dropdown-item-title-span"
                          class="${prefix}--masthead__l1-dropdown-item-title"
                          >${title}</span
                        >
                        <span
                          part="l1-dropdown-item-description-span"
                          class="${prefix}--masthead__l1-dropdown-item-description"
                          >${description}</span
                        >
                      `
                    : html` ${title} `;

                  return html`
                    <li part="l1-dropdown-menu-item">
                      <a
                        part="l1-dropdown-item-link"
                        class="${prefix}--masthead__l1-dropdown-item"
                        href="${url}"
                        target="${target}">
                        ${linkContents}
                      </a>
                    </li>
                  `;
                })}
              </ul>`
            : ''}
        </div>
      `;
    });

    const classes = classMap({
      [`${prefix}--masthead__l1-dropdown-column-narrow`]: hasWide && !isWide,
      [`${prefix}--masthead__l1-dropdown-column-wide`]: hasWide && isWide,
    });
    return hasWide
      ? html`<div
          class=${classes}
          part="dropdown-column${hasWide && !isWide
            ? ' dropdown-column--narrow'
            : hasWide && isWide
            ? ' dropdown-column--wide'
            : ''}">
          ${renderedSections}
        </div>`
      : html`${renderedSections}`;
  }

  /**
   * Renders L1 for mobile screensizes.
   *
   * @returns {_TemplateResult} L1 for mobile screensizes.
   */
  protected _renderL1MobileNav() {
    const { l1Data, overviewText } = this;
    const { url, title, actions, menuItems } = l1Data ?? {};
    const { cta, login } = actions ?? {};

    const { _toggleSubsection: toggleSubsection } = this;

    return html`
      <button
        part="l1-title-button"
        class="${prefix}--masthead__l1-title"
        @click=${toggleSubsection}>
        ${title}${ChevronDown16()}
      </button>
      <ul
        part="l1-dropdown"
        data-dropdown-target
        class="${prefix}--masthead__l1-dropdown">
        ${url
          ? html` <li part="dropdown-item-li">
              <a
                part="l1-dropdown-item"
                class="${prefix}--masthead__l1-dropdown-item"
                href="${url}">
                ${overviewText}
              </a>
            </li>`
          : ''}
        ${menuItems?.map((menuItem) => this._renderL1MobileSubnav(menuItem))}
        ${login && login.url && login.title
          ? html` <li part="dropdown-login-link-li">
              <a
                part="l1-dropdown-login-link"
                class="${prefix}--masthead__l1-dropdown-login"
                href="${ifDefined(login.url)}">
                ${login.title}${this.Arrow16()}
              </a>
            </li>`
          : ''}
        ${cta ? html`<li part="cta-li">${this._renderCta()}</li>` : ''}
      </ul>
    `;
  }

  /**
   * Renders L1MenuItems with subsections containing announcements, headings, links, and footers.
   *
   * @param {_L1MenuItem} menuItem Array of menu items containing subnavs
   * @returns {_TemplateResult} rendered output
   */
  protected _renderL1MobileSubnav(menuItem) {
    const { _toggleSubsection: toggleSubsection } = this;
    const { title, target, url, submenu } = menuItem;

    if (!submenu && url) {
      return html`
        <li part="dropdown-item-link-li">
          <a
            part="l1-dropdown-item-link"
            class="${prefix}--masthead__l1-dropdown-item"
            target="${target}"
            href="${url}"
            >${title}</a
          >
        </li>
      `;
    } else if (!submenu) {
      return html`
        <li part="dropdown-item-span-li">
          <span
            part="l1-dropdown-item-span"
            class="${prefix}--masthead__l1-dropdown-item"
            >${title}</span
          >
        </li>
      `;
    }

    const { announcement, menuSections, footer } = submenu ?? {};

    return html`
      <li part="dropdown-item-button-li">
        <button
          part="l1-dropdown-item-button"
          class="${prefix}--masthead__l1-dropdown-item"
          @click=${toggleSubsection}>
          ${title}${ChevronDown16()}
        </button>
        <div
          part="l1-dropdown-subsection"
          data-dropdown-target
          class="${prefix}--masthead__l1-dropdown-subsection">
          ${announcement
            ? html`<div
                part="l1-dropdown-announcement"
                class="${prefix}--masthead__l1-dropdown-announcement">
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
                    ? html` <ul part="l1-dropdown-item-ul">
                        ${items.map((item) => {
                          const { title, url, target } = item;

                          return html` <li part="l1-dropdown-item-li">
                            <a
                              part="l1-dropdown-item-link"
                              class="${prefix}--masthead__l1-dropdown-item"
                              target="${target}"
                              href="${url}">
                              ${title}
                            </a>
                          </li>`;
                        })}
                      </ul>`
                    : ''}
                `;
              })
            : ''}
          ${footer
            ? html`
                <a part="l1-dropdown-viewall"
                  class="${prefix}--masthead__l1-dropdown-viewall"
                  href="${footer.url}"
                >
                  ${footer.title}${this.Arrow16()}
                </li>`
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
  protected _toggleSubsection(event: PointerEvent) {
    const { isMobileVersion } = this;
    const { dropDownToggleEvent } = this.constructor as typeof C4DMastheadL1;
    const { currentTarget } = event;
    const button = currentTarget as HTMLElement;
    const dropdown = button.parentNode?.querySelector(
      '[data-dropdown-target]'
    ) as HTMLElement;
    const isOpen = dropdown?.classList.contains('is-open');

    if (!isMobileVersion && dropdown && !isOpen) {
      // Get Button & Dropdown locations & widths
      const buttonRect = button.getBoundingClientRect().toJSON();
      const dropdownRect = dropdown.getBoundingClientRect().toJSON();
      const viewportWidth = window.innerWidth;
      const isLTR =
        window.getComputedStyle(this).direction.toUpperCase() === 'LTR';
      const dirMultiplier = isLTR ? -1 : 1;

      // Set logical bounding client rect properties
      buttonRect.inlineStart = isLTR
        ? buttonRect.left
        : viewportWidth - buttonRect.right;
      buttonRect.inlineEnd = isLTR
        ? buttonRect.right
        : viewportWidth - buttonRect.left;
      dropdownRect.inlineStart = isLTR
        ? dropdownRect.left
        : viewportWidth - dropdownRect.right;
      dropdownRect.inlineEnd = isLTR
        ? dropdownRect.right
        : viewportWidth - dropdownRect.left;

      // What would the left/right boundaries be if we centered the dropdown?
      const startBoundaryIfCentered = (viewportWidth - dropdownRect.width) / 2;
      const endBoundaryIfCentered =
        startBoundaryIfCentered + dropdownRect.width;

      // If start-aligning to button doesn't overflow viewport.
      if (buttonRect.inlineStart + dropdownRect.width < viewportWidth) {
        // Do nothing, the styles are fine.
      }

      // If center-aligning to viewport fully intersects with button.
      else if (
        startBoundaryIfCentered < buttonRect.inlineStart &&
        endBoundaryIfCentered > buttonRect.inlineEnd
      ) {
        const translationAmount =
          (buttonRect.inlineStart - startBoundaryIfCentered) * dirMultiplier;
        dropdown.style.translate = `${translationAmount}px`;
      }

      // Fallback: right align to button.
      else {
        const translationAmount =
          (dropdownRect.width - buttonRect.width) * dirMultiplier;
        dropdown.style.translate = `${translationAmount}px`;
      }

      // Ensure dropdown doesn't overflow viewport vertically.
      const viewportHeight = window.innerHeight;
      const maxHeight = viewportHeight - dropdownRect.top;
      dropdown.style.maxHeight = `calc(${maxHeight}px - 4rem)`;
    }

    this.dispatchEvent(
      new CustomEvent(dropDownToggleEvent, {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          isOpen: !isOpen,
        },
      })
    );

    this.active = !isOpen;
    button.classList.toggle('is-open', !isOpen);
    dropdown.classList.toggle('is-open', !isOpen);
  }

  /**
   * "Scrolls" the top nav in cases where elements are focused but not fully visible.
   *
   * @param event The focus event
   */
  protected _handleTopNavFocusIn(event: FocusEvent) {
    const { menuContainerInner, menu } = this;
    const { target } = event;

    const containerBox = menuContainerInner!.getBoundingClientRect();
    const buttonBox = (target as HTMLElement).getBoundingClientRect();

    const leftOverflow = Math.max(containerBox.left - buttonBox.left, 0);
    const rightOverflow = Math.max(buttonBox.right - containerBox.right, 0);

    if (leftOverflow || rightOverflow) {
      const computedScroll = parseInt(window.getComputedStyle(menu!).translate);
      const currentScroll = !Number.isNaN(computedScroll) ? computedScroll : 0;
      let newScroll = currentScroll;

      if (rightOverflow) {
        newScroll = currentScroll - rightOverflow;
      }

      if (leftOverflow) {
        newScroll = currentScroll + leftOverflow;
      }

      menu!.style.translate = `${newScroll}px`;
    }
  }

  /**
   * Sets active menu item styles.
   */
  protected _handleSelectedMenuItem() {
    const { selectedMenuItem, currentUrlPath } = this;

    const menuItems = Array.from(
      (this.shadowRoot as ShadowRoot).querySelectorAll(
        `.${prefix}--masthead__l1-item, .${prefix}--masthead__l1-dropdown-item`
      )
    );
    const allLinks = Array.from(
      (this.shadowRoot as ShadowRoot).querySelectorAll('a')
    );

    // Reset all selected elements.
    Array.from(
      (this.shadowRoot as ShadowRoot).querySelectorAll('[active]')
    ).forEach((el) => el?.removeAttribute('active'));
    this.selectedElements = [];

    // Check for manually set selected item.
    if (selectedMenuItem) {
      this.selectedElements = [...menuItems, ...allLinks].filter(
        (el) =>
          el.textContent?.trim()?.toLowerCase() ===
          selectedMenuItem.trim().toLowerCase()
      );
    }
    // Fall back to automated selection based on URL.
    else {
      this.selectedElements = allLinks.filter(
        (el) => el.href === currentUrlPath
      );
    }

    if (this.selectedElements.length) {
      // Set active on nearest menu item.
      this.selectedElements.forEach((element) => {
        const parentMenuItem = element.closest(
          `.${prefix}--masthead__l1-dropdown, .${prefix}--masthead__l1-dropdown-subsection`
        )?.previousElementSibling;

        // Set on parent item as long as it's not the dropdown toggle.
        if (
          parentMenuItem &&
          !parentMenuItem?.classList?.contains(`bx--masthead__l1-title`)
        ) {
          parentMenuItem?.setAttribute('active', '');
        } else {
          element.setAttribute('active', '');
        }
      });
    } else {
      // Should default to active section name if no menu links are selected.
      const l1Title = this.shadowRoot?.querySelector(
        `.${prefix}--masthead__l1-title`
      ) as Element;
      l1Title.setAttribute('active', '');
      this.selectedElements.push(l1Title);
    }
  }

  /**
   * Renders a heading object in the proper <H#> element.
   *
   * @param heading The heading object to be rendered.
   * @returns {_TemplateResult} Rendered heading.
   */
  protected _renderL1SubSectionHeading(heading: L1SubmenuSectionHeading) {
    const { isMobileVersion } = this;

    const headingDesc =
      !isMobileVersion && heading.description
        ? html`<span class="${prefix}--masthead__l1-dropdown-heading-desc"
            >${heading.description}</span
          >`
        : '';

    const headingContent = heading.url
      ? html`
          <a
            part="l1-dropdown-item-link l1-dropdown-item-link--heading"
            class="${prefix}--masthead__l1-dropdown-item"
            href="${heading.url}">
            ${heading.title}${isMobileVersion ? this.Arrow16() : this.Arrow20()}
          </a>
        `
      : html` ${heading.title} `;

    const headingClasses = classMap({
      [`${prefix}--masthead__l1-dropdown-heading`]: true,
      [`${prefix}--masthead__l1-dropdown-heading--no-link`]:
        Boolean(heading.url) === false,
    });

    let renderedHeading = headingContent;
    switch (heading.headingLevel) {
      case 2:
        renderedHeading = html`
          <h2 part="masthead-l1-h2-heading" class=${headingClasses}>
            ${headingContent}
          </h2>
          ${headingDesc}
        `;
        break;
      case 3:
        renderedHeading = html`
          <h3 part="masthead-l1-h3-heading" class=${headingClasses}>
            ${headingContent}
          </h3>
          ${headingDesc}
        `;
        break;
      case 4:
        renderedHeading = html`
          <h4 part="masthead-l1-h4-heading" class=${headingClasses}>
            ${headingContent}
          </h4>
          ${headingDesc}
        `;
        break;
      case 5:
        renderedHeading = html`
          <h5 part="masthead-l1-h5-heading" class=${headingClasses}>
            ${headingContent}
          </h5>
          ${headingDesc}
        `;
        break;
      case 6:
        renderedHeading = html`
          <h6 part="masthead-l1-h6-heading" class=${headingClasses}>
            ${headingContent}
          </h6>
          ${headingDesc}
        `;
        break;
      default:
        renderedHeading = headingContent;
    }

    return renderedHeading;
  }

  protected firstUpdated() {
    this.style.setProperty(
      '--scrollbarWidth',
      window.innerWidth - document.documentElement.clientWidth + 'px'
    );

    // Allows component conditions on breakpoint change
    layoutBreakpoint.addEventListener('change', () => {
      this.isMobileVersion = layoutBreakpoint.matches;
    });

    if (this.isMobileVersion) {
      this._createScrollObserver();
    }

    this.direction = window.getComputedStyle(this).direction;
  }

  protected updated(changedProperties) {
    if (changedProperties.has('selectedMenuItem')) {
      this._handleSelectedMenuItem();
    }
    if (changedProperties.has('isMobileVersion')) {
      if (this.isMobileVersion) {
        // Stop observing, delete the observer.
        this.scrollObserver?.disconnect();
        this.scrollObserver = undefined;
      } else {
        // Creat observer, start observing.
        this._createScrollObserver();
      }

      this._handleSelectedMenuItem();
    }
  }

  render() {
    const { isMobileVersion } = this;
    return html`
      <div
        part="masthead-l1-inner-container"
        class="${prefix}--masthead__l1-inner-container">
        ${isMobileVersion
          ? html` ${this._renderL1MobileNav()} `
          : html` ${this._renderL1TopNav()} `}
      </div>
    `;
  }

  /**
   * Creates CTA markup and slots it into the L1.
   *
   * @param {L1CtaLink} cta L1 CTA data object
   * @returns A template fragment representing an L1 CTA or an empty string.
   */
  static renderL1Cta(cta: L1CtaLink): _TemplateResult | string {
    const { url, ctaType } = cta;
    const slottedText = html`<span slot="cta-text">${cta?.title}</span>`;
    if (ctaType) {
      return html`
        <c4d-masthead-l1-cta slot="l1-cta" type="${ctaType}">
          ${slottedText}
        </c4d-masthead-l1-cta>
      `;
    }
    if (url) {
      return html`
        <c4d-masthead-l1-cta slot="l1-cta" href="${url}">
          ${slottedText}
        </c4d-masthead-l1-cta>
      `;
    }
    return '';
  }

  static get stableSelector() {
    return `${c4dPrefix}--masthead__l1`;
  }

  static get dropDownToggleEvent() {
    return `${c4dPrefix}-masthead-l1-dropdown-toggle`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default C4DMastheadL1;
