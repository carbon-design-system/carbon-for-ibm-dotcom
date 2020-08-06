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
import { selectorTabbable } from 'carbon-web-components/es/globals/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener';
import BXSideNav, { SIDE_NAV_USAGE_MODE } from 'carbon-web-components/es/components/ui-shell/side-nav';
import focuswrap from '@carbon/ibmdotcom-utilities/es/utilities/focuswrap/focuswrap';
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
    if (event.target === this) {
      const toggle = (this.getRootNode() as Document).querySelector(selectorButtonToggle);
      if (toggle) {
        (toggle as HTMLElement).focus();
      }
    } else if ((event.target as HTMLElement).matches?.(selectorButtonToggle)) {
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
    }
  };

  /**
   * Usage mode of the side nav.
   */
  @property({ reflect: true, attribute: 'usage-mode' })
  usageMode = SIDE_NAV_USAGE_MODE.HEADER_NAV;

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
      const { expanded, _startSentinelNode: startSentinelNode, _endSentinelNode: endSentinelNode } = this;
      if (expanded) {
        this._hFocusWrap = focuswrap(this.shadowRoot!, [startSentinelNode, endSentinelNode]);
      } else if (this._hFocusWrap) {
        this._hFocusWrap = this._hFocusWrap.release();
      }
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

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLeftNav;
