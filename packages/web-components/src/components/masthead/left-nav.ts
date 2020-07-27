/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import findLast from 'lodash-es/findLast';
import { html, query, property, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import { selectorTabbable } from 'carbon-custom-elements/es/globals/settings';
import on from 'carbon-components/es/globals/js/misc/on';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import HostListener from 'carbon-custom-elements/es/globals/decorators/host-listener';
import HostListenerMixin from 'carbon-custom-elements/es/globals/mixins/host-listener';
import BXSideNav, { SIDE_NAV_USAGE_MODE } from 'carbon-custom-elements/es/components/ui-shell/side-nav';
import { find, forEach } from '../../globals/internal/collection-helpers';
import Handle from '../../globals/internal/handle';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSLeftNavOverlay from './left-nav-overlay';
import styles from './masthead.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

// eslint-disable-next-line no-bitwise
const PRECEDING = Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS;
// eslint-disable-next-line no-bitwise
const FOLLOWING = Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY;

/**
 * Masthead left nav.
 *
 * @element dds-left-nav
 */
@customElement(`${ddsPrefix}-left-nav`)
class DDSLeftNav extends StableSelectorMixin(HostListenerMixin(BXSideNav)) {
  /**
   * The handle for the listener of `${prefix}-header-menu-button-request-focus-wrap` event.
   */
  private _hRequestMenuButtonFocusWrap: Handle | null = null;

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
   * Handles `blur` event on this element.
   *
   * @param event The event.
   */
  @HostListener('shadowRoot:focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleBlur = (event: FocusEvent) => {
    const { target, relatedTarget } = event;
    const { expanded, _startSentinelNode: startSentinelNode, _endSentinelNode: endSentinelNode } = this;
    const oldContains =
      target !== this &&
      (this.contains(target as Node) || this.shadowRoot!.contains(target as Node)) &&
      target !== startSentinelNode &&
      target !== endSentinelNode;
    const currentContains =
      relatedTarget !== this &&
      (this.contains(relatedTarget as Node) || this.shadowRoot!.contains(relatedTarget as Node)) &&
      relatedTarget !== startSentinelNode &&
      relatedTarget !== endSentinelNode;

    // Performs focus wrapping if _all_ of the following is met:
    // * This left nav is expanded
    // * The viewport still has focus
    // * Left nav used to have focus but no longer has focus
    const { selectorButtonToggle } = this.constructor as typeof DDSLeftNav;
    if (expanded && relatedTarget && oldContains && !currentContains) {
      const toggle = (this.getRootNode() as Document).querySelector(selectorButtonToggle);
      if (toggle) {
        (toggle as HTMLElement).focus();
      }
    }
  };

  /**
   * Handles `${prefix}-header-menu-button-request-focus-wrap` event on the document.
   *
   * @param event The event.
   */
  private _handleRequestMenuButtonFocusWrap = (event: CustomEvent) => {
    const { comparisonResult } = event.detail;
    const { selectorTabbable: selectorTabbableForLeftnav } = this.constructor as typeof DDSLeftNav;

    // eslint-disable-next-line no-bitwise
    if (comparisonResult & PRECEDING) {
      const tabbable = findLast(this.querySelectorAll(selectorTabbableForLeftnav), elem =>
        Boolean((elem as HTMLElement).offsetParent)
      );
      if (tabbable) {
        (tabbable as HTMLElement).focus();
      }
    }
    // eslint-disable-next-line no-bitwise
    else if (comparisonResult & FOLLOWING) {
      const tabbable = find(this.querySelectorAll(selectorTabbableForLeftnav), elem =>
        Boolean((elem as HTMLElement).offsetParent)
      );
      if (tabbable) {
        (tabbable as HTMLElement).focus();
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
    // Manually hooks the event listeners on the host element to make the event names configurable
    const { eventButtonRequestFocusWrap } = this.constructor as typeof DDSLeftNav;
    this._hRequestMenuButtonFocusWrap = on(
      this.getRootNode(),
      eventButtonRequestFocusWrap,
      this._handleRequestMenuButtonFocusWrap as EventListener
    );
  }

  disconnectedCallback() {
    if (this._hRequestMenuButtonFocusWrap) {
      this._hRequestMenuButtonFocusWrap = this._hRequestMenuButtonFocusWrap.release();
    }
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    const { usageMode } = this;
    if (changedProperties.has('usageMode') && usageMode !== SIDE_NAV_USAGE_MODE.HEADER_NAV) {
      // eslint-disable-next-line no-console
      console.warn(
        'dds-left-nav supports only `header-nav` for its `usage-mode` attribute or `usageMode` property. The value is ignored:',
        usageMode
      );
    }
    if (changedProperties.has('expanded')) {
      const doc = this.getRootNode() as Document;
      forEach(doc.querySelectorAll((this.constructor as typeof DDSLeftNav).selectorOverlay), item => {
        (item as DDSLeftNavOverlay).active = this.expanded;
      });
    }
  }

  render() {
    return html`
      <a id="start-sentinel" class="${prefix}--visually-hidden" href="javascript:void 0" role="navigation"></a>
      <slot></slot>
      <a id="end-sentinel" class="${prefix}--visually-hidden" href="javascript:void 0" role="navigation"></a>
    `;
  }

  /**
   * A selector that will return the toggle buttons.
   */
  static get selectorButtonToggle() {
    return `${ddsPrefix}-masthead-menu-button`;
  }

  /**
   * A selector selecting tabbable nodes.
   */
  static get selectorTabbable() {
    return [
      selectorTabbable,
      'dds-left-nav-item:not([tabindex="-1"])',
      'dds-left-nav-menu:not([tabindex="-1"])',
      'dds-left-nav-menu-item:not([tabindex="-1"])',
    ].join(',');
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
   * The name of the custom event fired when the masthead menu button in the document requests for focus wrapping.
   */
  static get eventButtonRequestFocusWrap() {
    return `${ddsPrefix}-masthead-menu-button-request-focus-wrap`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLeftNav;
