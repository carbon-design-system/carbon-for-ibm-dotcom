/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  customElement,
  html,
  internalProperty,
  LitElement, property,
  TemplateResult,
} from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './tabs-extended.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSTab from './tab';
import { LINK_LIST_ITEM_TYPE, LINK_LIST_TYPE } from '../link-list/defs';
import DDSLinkListItem from '../link-list/link-list-item';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * A component to present content inside a tabbed layout.
 *
 * @element dds-tabs-extended
 */
@customElement(`${ddsPrefix}-tabs-extended`)
class DDSTabsExtended extends StableSelectorMixin(LitElement) {
  /**
   * Child items
   */
  @internalProperty()
  private _tabItems: DDSTab[] = [];

  /**
   * Defines the disabled state of the tab.
   */
  @property({ reflect: true })
  active = 0;

  /**
   * Handler for @slotChange, creates tabs from dds-tab components.
   *
   * @private
   */
  private _handleSlotChange(event: Event) {
    this._tabItems = (event.target as HTMLSlotElement)
      .assignedNodes({ flatten: true })
      .filter(node => (new DDSTab)?.nodeName === node.nodeName);
  }

  private _setActiveTab(index) {
    this.active = index;
  }

  updated() {
    this._tabItems.map((tab, index) => {
      tab.active = (index === this.active);
      tab.index = index;
    })
  }

  render() {
    const {
      _tabItems: tabs,
    } = this;
    return html`
      <div class="${prefix}--tabs-extended">
        <div data-tabs class="${prefix}--tabs">
          <ul class="${prefix}--tabs__nav ${prefix}--tabs__nav--hidden" role="tablist">
            ${tabs.map((tab, index) => {
              const active = (index === this.active) ? `${prefix}--tabs__nav-item--selected` : ``;
              return html`
                <li
                  class="${prefix}--tabs__nav-item ${active}"
                  data-target=".tab-${index}-default" role="tab" aria-selected="true">
                  <a tabindex="${index}" id="tab-link-${index}-default" class="${prefix}--tabs__nav-link" href="javascript:void(0)" role="tab"
                     aria-controls="tab-panel-${index}-default" @click="${(e) => this._setActiveTab(index)}" >${tab.label}</a>
                </li>
              `;
            })}
          </ul>
        </div>
        <div class="${prefix}--tab-content">
          <slot @slotchange="${this._handleSlotChange}"></slot>
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--tabs-extended`;
  }

  static styles = styles;
}

export default DDSTabsExtended;
