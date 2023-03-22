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
  state,
  query,
  queryAll,
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
import ArrowRight20 from '../../internal/vendor/@carbon/web-components/icons/arrow--right/20';
import CaretLeft20 from '../../internal/vendor/@carbon/web-components/icons/caret--left/20.js';
import CaretRight20 from '../../internal/vendor/@carbon/web-components/icons/caret--right/20.js';
import { classMap } from 'lit-html/directives/class-map';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

// Magic Number: 799px matches masthead.scss's `$breakpoint--desktop-nav`.
const layoutBreakpoint = window.matchMedia(`(max-width: 799px)`);

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
  /**
   * The L1 menu data, passed from the masthead-composite.
   */
  @property()
  l1Data?: MastheadL1;

  /**
   * Whether the current viewport is below 800px or not
   */
  @state()
  isMobileVersion = layoutBreakpoint.matches;

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
   * The first and last top-level menu items
   */
  @queryAll(`.${prefix}--masthead__l1-menu > *:is(:first-child, :last-child)`)
  menuFirstLastItems?: NodeListOf<HTMLElement>;

  /**
   * The buttons that scroll the top-level menu items
   */
  @queryAll(`.${prefix}--masthead__l1-menu-container-scroller`)
  menuScrollerButtons?: NodeListOf<HTMLButtonElement>;

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
      const { menuContainerInner, menuFirstLastItems, menuScrollerButtons } =
        this;
      const [menuFirstItem, menuLastItem] = Array.from(
        menuFirstLastItems ?? []
      );

      // Only act if all the needed elements are present.
      if (
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
        }
        // If we don't, hide the buttons.
        else {
          menuScrollerButtons.forEach((button) => {
            button.setAttribute('hidden', '');
          });
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
   * Renders L1 for desktop screensizes
   *
   * @returns {_TemplateResult} L1 for desktop screensizes
   */
  protected _renderL1TopNav() {
    const { l1Data, direction, _scrollL1TopNav: scrollL1TopNav } = this;
    const { url, title, actions, menuItems } = l1Data ?? {};
    const { cta, login } = actions ?? {};

    return html`
      ${!title || !url
        ? undefined
        : html`
            <a class="${prefix}--masthead__l1-title" href="${url}">${title}</a>
          `}
      <div class="${prefix}--masthead__l1-menu-container-outer">
        <button
          class="${prefix}--masthead__l1-menu-container-scroller"
          id="scroll-prev"
          @click=${scrollL1TopNav}>
          ${direction === 'ltr' ? CaretLeft20() : CaretRight20()}
        </button>
        <div class="${prefix}--masthead__l1-menu-container-inner">
          <ul class="${prefix}--masthead__l1-menu">
            ${(menuItems ?? []).map((menuItem) =>
              this._renderL1TopNavDropDowns(menuItem)
            )}
          </ul>
        </div>
        <button
          class="${prefix}--masthead__l1-menu-container-scroller"
          id="scroll-next"
          @click=${scrollL1TopNav}>
          ${direction === 'ltr' ? CaretRight20() : CaretLeft20()}
        </button>
      </div>
      ${login && login.url && login.title
        ? html`
            <a class="bx--masthead__l1-login" href="${ifDefined(login.url)}"
              >${login.title}</a
            >
          `
        : ''}
      ${cta && cta.url && cta.title
        ? html`
            <a class="bx--masthead__l1-cta" href="${ifDefined(cta.url)}"
              >${cta.title}</a
            >
          `
        : ''}
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
      _toggleMobileSubsection: toggleMobileSubsection,
      _handleTopNavFocusIn: handleTopNavFocusIn,
      _handleDropdownClose: handleDropdownClose,
    } = this;
    const { title, url, submenu } = menuItem;

    if (!submenu && url) {
      return html`
        <li>
          <a
            class="${prefix}--masthead__l1-item"
            href="${url}"
            @focusin=${handleTopNavFocusIn}
            >${title}</a
          >
        </li>
      `;
    } else if (!submenu) {
      return html`
        <li>
          <span
            class="${prefix}--masthead__l1-item"
            @focusin=${handleTopNavFocusIn}
            >${title}</span
          >
        </li>
      `;
    }

    const { announcement, menuSections, footer, columns } = submenu ?? {};
    const total = menuSections.length;

    return html`
      <li @focusout=${handleDropdownClose} @keydown=${handleDropdownClose}>
        <button
          class="${prefix}--masthead__l1-item"
          @click=${toggleMobileSubsection}
          @focusin=${handleTopNavFocusIn}>
          ${title}${ChevronDown16()}
        </button>
        <div
          class="${prefix}--masthead__l1-dropdown ${prefix}--masthead__l1-dropdown__${columns}-col">
          ${announcement
            ? html`<div class="${prefix}--masthead__l1-dropdown-announcement">
                ${unsafeHTML(announcement)}
              </div>`
            : ''}
          <div>
            ${menuSections
              ? menuSections.map((section) => {
                  const index = menuSections.indexOf(section);

                  const { heading, items } = section;

                  return html`
                    <div>
                      ${heading
                        ? html`${this._renderL1SubSectionHeading(heading)}`
                        : ''}
                      ${items
                        ? html` <ul
                            class="${prefix}--masthead__l1-dropdown-menu-items">
                            ${items.map((item) => {
                              const { title, url } = item;

                              return html`<li>
                                <a
                                  class="${prefix}--masthead__l1-dropdown-item"
                                  href="${url}"
                                  >${title}</a
                                >
                              </li>`;
                            })}
                          </ul>`
                        : ''}
                    </div>
                  `;
                })
              : ''}
          </div>
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
   * Renders L1 for mobile screensizes.
   *
   * @returns {_TemplateResult} L1 for mobile screensizes.
   */
  protected _renderL1MobileNav() {
    const { l1Data, overviewText } = this;
    const { url, title, actions, menuItems } = l1Data ?? {};
    const { cta, login } = actions ?? {};

    const { _toggleMobileSubsection: toggleMobileSubsection } = this;

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
                >${overviewText}</a
              >
            </li>`
          : ''}
        ${menuItems?.map((menuItem) => this._renderL1MobileSubnav(menuItem))}
        ${login && login.url && login.title
          ? html`<li>
              <a
                class="bx--masthead__l1-dropdown-login"
                href="${ifDefined(login.url)}"
                >${login.title}${ArrowRight16()}</a
              >
            </li>`
          : ''}
        ${cta && cta.url && cta.title
          ? html`<li>
              <a
                class="bx--masthead__l1-dropdown-cta"
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
   * @param {_L1MenuItem} menuItem Array of menu items containing subnavs
   * @returns {_TemplateResult} rendered output
   */
  protected _renderL1MobileSubnav(menuItem) {
    const { _toggleMobileSubsection: toggleMobileSubsection } = this;
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
  protected _toggleMobileSubsection(event: PointerEvent) {
    const { isMobileVersion } = this;
    const { currentTarget } = event;
    const button = currentTarget as HTMLElement;
    const dropdown = button.nextElementSibling as HTMLElement;
    const isOpen = dropdown.classList.contains('is-open');

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
    }

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
      console.log(leftOverflow, rightOverflow);
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

  protected _handleDropdownClose(event: FocusEvent | KeyboardEvent) {
    console.log(this);

    const { currentTarget } = event;
    const isOpen =
      Array.from((currentTarget as HTMLElement)!.querySelectorAll('.is-open'))
        .length > 0;

    if (isOpen) {
      switch (event.type) {
        case 'keydown': {
          const { code } = event as KeyboardEvent;
          if (code === 'Escape') {
            currentTarget.querySelectorAll('.is-open').forEach((el) => {
              el.classList.remove('is-open');
            });

            currentTarget.firstElementChild.focus();
          }
          break;
        }
        case 'focusout': {
          const { relatedTarget } = event as FocusEvent;
          if (
            !relatedTarget ||
            !currentTarget ||
            !(
              (relatedTarget as Node).compareDocumentPosition(
                currentTarget as Node
              ) & 8
            )
          ) {
            currentTarget.querySelectorAll('.is-open').forEach((el) => {
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
   * Renders a heading object in the proper <H#> element.
   *
   * @param heading The heading object to be rendered.
   * @returns {_TemplateResult} Rendered heading.
   */
  protected _renderL1SubSectionHeading(heading: L1SubmenuSectionHeading) {
    const { isMobileVersion } = this;

    const headingContent = heading.url
      ? html`<a class="bx--masthead__l1-dropdown-item" href="${heading.url}"
          >${heading.title}${isMobileVersion
            ? ArrowRight16()
            : ArrowRight20()}</a
        >`
      : html`${heading.title}`;

    const headingClasses = classMap({
      [`${prefix}--masthead__l1-dropdown-heading`]: true,
    });

    let renderedHeading = headingContent;
    switch (heading.headingLevel) {
      case 2:
        renderedHeading = html`<h2 class=${headingClasses}>
          ${headingContent}
        </h2>`;
        break;
      case 3:
        renderedHeading = html`<h3 class=${headingClasses}>
          ${headingContent}
        </h3>`;
        break;
      case 4:
        renderedHeading = html`<h4 class=${headingClasses}>
          ${headingContent}
        </h4>`;
        break;
      case 5:
        renderedHeading = html`<h5 class=${headingClasses}>
          ${headingContent}
        </h5>`;
        break;
      case 6:
        renderedHeading = html`<h6 class=${headingClasses}>
          ${headingContent}
        </h6>`;
        break;
      default:
        renderedHeading = headingContent;
    }

    return renderedHeading;
  }

  protected firstUpdated() {
    setTimeout(() => {
      console.clear();
      console.log(this.l1Data);
    }, 500);

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
    if (changedProperties.has('isMobileVersion')) {
      if (this.isMobileVersion) {
        // Stop observing, delete the observer.
        this.scrollObserver?.disconnect();
        this.scrollObserver = undefined;
      } else {
        // Creat observer, start observing.
        this._createScrollObserver();
      }
    }
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
