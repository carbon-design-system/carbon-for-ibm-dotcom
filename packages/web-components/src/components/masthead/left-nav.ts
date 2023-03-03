/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import findLast from 'lodash-es/findLast.js';
import { html, query, property, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import { selectorTabbable } from '../../internal/vendor/@carbon/web-components/globals/settings.js';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import BXSideNav, {
  SIDE_NAV_USAGE_MODE,
} from '../../internal/vendor/@carbon/web-components/components/ui-shell/side-nav.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import focuswrap from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/focuswrap/focuswrap';
import { find, forEach } from '../../globals/internal/collection-helpers';
import Handle from '../../globals/internal/handle';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSLeftNavOverlay from './left-nav-overlay';
import styles from './masthead.scss';
import DDSLeftNavMenuSection from './left-nav-menu-section';
import DDSMasthead from './masthead';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

// eslint-disable-next-line no-bitwise
const PRECEDING =
  Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS;
// eslint-disable-next-line no-bitwise
const FOLLOWING =
  Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY;

/**
 * Masthead left nav.
 *
 * @element dds-left-nav
 */
@customElement(`${ddsPrefix}-left-nav`)
class DDSLeftNav extends StableSelectorMixin(BXSideNav) {
  /**
   * The handle for focus wrapping.
   */
  private _hFocusWrap: Handle | null = null;

  /**
   * Node to track focus going outside of modal content.
   */
  @query('#start-sentinel')
  private _startSentinelNode!: HTMLAnchorElement;

  /**
   * Node to track focus going outside of modal content.
   */
  @query('#end-sentinel')
  private _endSentinelNode!: HTMLAnchorElement;

  /**
   * Handles `dds-request-focus-wrap` event on the document.
   *
   * @param event The event.
   */
  @HostListener('document:dds-request-focus-wrap')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleRequestMenuButtonFocusWrap = (event: CustomEvent) => {
    const { selectorButtonToggle } = this.constructor as typeof DDSLeftNav;
    /**
     * If focus leaves this element, send focus to the menu toggle.
     * Else if focus leaves the menu toggle, bring it back to this element.
     */
    if (event.target === this) {
      const toggle = (this.getRootNode() as Document).querySelector(
        selectorButtonToggle
      );
      if (toggle) {
        (toggle as HTMLElement).focus();
      }
    } else if ((event.target as HTMLElement).matches?.(selectorButtonToggle)) {
      const { comparisonResult } = event.detail;
      const {
        selectorExpandedMenuSection,
        selectorTabbable: selectorTabbableForLeftnav,
      } = this.constructor as typeof DDSLeftNav;
      const expandedMenuSection = this.querySelector(
        selectorExpandedMenuSection
      );

      // focus on first tabbable element when expanding left-nav
      if (comparisonResult === -1) {
        const tabbable = find(
          this.querySelectorAll(selectorTabbableForLeftnav),
          (elem) => Boolean((elem as HTMLElement).offsetParent)
        );

        if (tabbable) {
          (tabbable as HTMLElement).focus();
        }
      }
      // wrap focus to last tabbable element focusing out of first tabbable element
      // eslint-disable-next-line no-bitwise
      else if (comparisonResult & PRECEDING) {
        const tabbable = findLast(
          expandedMenuSection?.querySelectorAll(selectorTabbableForLeftnav),
          (elem) => Boolean((elem as HTMLElement).offsetParent)
        );
        if (tabbable) {
          (tabbable as HTMLElement).focus();
        }
      }
      // wrap focus to first tabbable element focusing out of last tabbable element
      // eslint-disable-next-line no-bitwise
      else if (comparisonResult & FOLLOWING) {
        const allTabbable = [
          ...Array.from(
            expandedMenuSection?.shadowRoot?.querySelectorAll(
              selectorTabbableForLeftnav
            ) || []
          ),
          ...Array.from(
            expandedMenuSection?.querySelectorAll(selectorTabbableForLeftnav) ||
              []
          ),
        ];

        if (allTabbable.length) {
          (allTabbable[0] as HTMLElement).focus();
        }
      }
    }
  };

  private _handleClickOut(event: MouseEvent) {
    const { target } = event;
    const { selectorButtonToggle } = this.constructor as typeof DDSLeftNav;
    const toggleButton: HTMLElement | null = (
      this.getRootNode() as Document
    ).querySelector(selectorButtonToggle);

    if (
      this.expanded &&
      target instanceof Element &&
      target.closest(selectorButtonToggle) === null &&
      target.closest(this.tagName) === null
    ) {
      this.expanded = false;
      toggleButton?.focus();
    }
  }

  @HostListener('keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown(event: KeyboardEvent) {
    const { selectorButtonToggle } = this.constructor as typeof DDSLeftNav;
    const toggleButton: HTMLElement | null = (
      this.getRootNode() as Document
    ).querySelector(selectorButtonToggle);
    if (event.key === 'Escape') {
      this.expanded = false;
      toggleButton?.focus();
    }
  }

  @HostListener('parentRoot:eventToggle')
  protected _handleContentStateChangeDocument = (event: CustomEvent) => {
    const { selectorMenuSections } = this.constructor as typeof DDSLeftNav;
    const { panelId }: { panelId: string } = event.detail;

    const menuSections: DDSLeftNavMenuSection[] = Array.from(
      this.querySelectorAll(selectorMenuSections)
    );
    const expandedSection = menuSections
      .filter((section) => section.matches('[expanded]'))
      .shift();
    const requestedSection = menuSections
      .filter((section) => section.matches(`[section-id="${panelId}"]`))
      .shift();

    if (
      expandedSection !== undefined &&
      requestedSection !== undefined &&
      expandedSection !== requestedSection
    ) {
      const id = panelId.split(', ');
      requestedSection.expanded = true;
      requestedSection.ariaHidden = 'false';
      requestedSection.transition = false;

      expandedSection.expanded = false;
      expandedSection.ariaHidden = 'true';

      /**
       * if next menu section expanded is a level 2 menu section and current expanded
       * menu section is a level 1 menu section, add transition attribute for proper animation
       */
      if (
        id[0] !== '-1' &&
        id[1] !== '-1' &&
        !requestedSection.matches('[section-id*=" -1"]')
      ) {
        expandedSection.transition = true;
      }
    }
  };

  /**
   * Usage mode of the side nav.
   */
  @property({ reflect: true, attribute: 'usage-mode' })
  usageMode = SIDE_NAV_USAGE_MODE.HEADER_NAV;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleClickOut.bind(this));
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    const { usageMode } = this;
    if (
      changedProperties.has('usageMode') &&
      usageMode !== SIDE_NAV_USAGE_MODE.HEADER_NAV
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        'dds-left-nav supports only `header-nav` for its `usage-mode` attribute or `usageMode` property. The value is ignored:',
        usageMode
      );
    }
    if (changedProperties.has('expanded')) {
      const doc = this.getRootNode() as Document;
      forEach(
        doc.querySelectorAll(
          (this.constructor as typeof DDSLeftNav).selectorOverlay
        ),
        (item) => {
          (item as DDSLeftNavOverlay).active = this.expanded;
        }
      );
      const {
        expanded,
        _startSentinelNode: startSentinelNode,
        _endSentinelNode: endSentinelNode,
      } = this;

      const masthead: DDSMasthead | null | undefined = document
        ?.querySelector(
          `${ddsPrefix}-cloud-masthead-container, ${ddsPrefix}-masthead-container`
        )
        ?.querySelector(`${ddsPrefix}-masthead`);
      if (expanded && masthead) {
        this._hFocusWrap = focuswrap(this.shadowRoot!, [
          startSentinelNode,
          endSentinelNode,
        ]);
        document.body.style.overflow = 'hidden';

        // TODO: remove this logic once masthead can account for banners.
        // set masthead position to `fixed` when left-nav is open for cloud-mastead
        masthead.style.position = 'fixed';
      } else {
        const { selectorMenuSections, selectorFirstMenuSection } = this
          .constructor as typeof DDSLeftNav;

        // TODO: remove this logic once masthead can account for banners.
        // remove set position from mastead when left-nav is closed for cloud-mastead
        if (masthead) {
          document.body.style.overflow = 'auto';
          masthead.style.position = '';
        }

        this.querySelectorAll(selectorMenuSections).forEach(
          (ddsLeftNavMenuSection) => {
            (ddsLeftNavMenuSection as DDSLeftNavMenuSection).expanded = false;
            (ddsLeftNavMenuSection as DDSLeftNavMenuSection).transition = false;
          }
        );

        // reset to first menu section
        this.querySelectorAll(selectorFirstMenuSection).forEach(
          (ddsLeftNavMenuSection) => {
            (ddsLeftNavMenuSection as DDSLeftNavMenuSection).expanded = true;
          }
        );

        if (this._hFocusWrap) {
          this._hFocusWrap = this._hFocusWrap.release();
        }
      }
    }
  }

  private _renderSentinel = (side: String) => {
    return html`
      <button
        id="${side}-sentinel"
        type="button"
        class="${prefix}--visually-hidden"></button>
    `;
  };

  render() {
    const { _renderSentinel: renderSentinel } = this;
    return html`
      <div class="${prefix}--side-nav__wrapper">
        ${renderSentinel('start')}
        <div class="${prefix}--side-nav__platform-name">
          <slot name="platform-id"></slot>
        </div>
        <div class="${prefix}--side-nav__menu-sections">
          <slot></slot>
        </div>
        ${renderSentinel('end')}
      </div>
    `;
  }

  /**
   * A selector that will return the toggle buttons.
   */
  static get selectorButtonToggle() {
    return `${ddsPrefix}-masthead-menu-button`;
  }

  /**
   * A selector that will return side nav focusable items.
   */
  static get selectorNavItems() {
    return [
      `${ddsPrefix}-left-nav-item`,
      `${ddsPrefix}-left-nav-menu`,
      `${ddsPrefix}-left-nav-menu-item`,
      `${ddsPrefix}-left-nav-name`,
    ].join(', ');
  }

  /**
   * A selector that will return menu sections.
   */
  static get selectorMenuSections() {
    return `${ddsPrefix}-left-nav-menu-section`;
  }

  /**
   * A selector that will return expanded menu section.
   */
  static get selectorExpandedMenuSection() {
    return `${ddsPrefix}-left-nav-menu-section[expanded]`;
  }

  /**
   * A selector that will return first main visible menu section.
   */
  static get selectorFirstMenuSection() {
    return `${ddsPrefix}-left-nav-menu-section[section-id='-1, -1']`;
  }

  /**
   * A selector selecting tabbable nodes.
   */
  static get selectorTabbable() {
    return [
      selectorTabbable,
      `${ddsPrefix}-left-nav-item`,
      `${ddsPrefix}-left-nav-menu`,
      `${ddsPrefix}-left-nav-menu-item`,
      `${ddsPrefix}-left-nav-name`,
    ].join(', ');
  }

  /**
   * A selector that will return the overlays.
   */
  static get selectorOverlay() {
    return `${ddsPrefix}-left-nav-overlay`;
  }

  static get stableSelector() {
    return `${ddsPrefix}--masthead__l0-sidenav`;
  }

  /**
   * The name of the custom event fired after this side nav menu is toggled upon a user gesture.
   */
  static get eventToggle() {
    return `${ddsPrefix}-left-nav-menu-toggled`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLeftNav;
