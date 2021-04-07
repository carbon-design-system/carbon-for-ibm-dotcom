/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { customElement, html, internalProperty, LitElement, TemplateResult } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import ChevronRight16 from 'carbon-web-components/es/icons/chevron--right/16.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSTab from './tab';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './tabs-extended.scss';

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
   * Child tab components.
   */
  @internalProperty()
  private _tabItems: Node[] = [];

  /**
   * Defines the active tab index.
   */
  @internalProperty()
  private _activeTab: Number = 0;

  /**
   * Handler for @slotChange, creates tabs from dds-tab components.
   *
   * @private
   */
  private _handleSlotChange(event: Event) {
    this._tabItems = (event.target as HTMLSlotElement)
      .assignedNodes({ flatten: true })
      .filter(node => new DDSTab()?.nodeName === node.nodeName);
    this._tabItems.forEach((tab: DDSTab, index) => {
      this._activeTab = tab.selected ? index : this._activeTab;
    });
  }

  private _setActiveItem(index) {
    this._activeTab = index;
  }

  updated() {
    this._tabItems.map((tab: DDSTab, index) => {
      tab.selected = index === this._activeTab;
      tab.setIndex(index);
    });
  }

  protected _renderAccordionItems(): TemplateResult | string | void {
    const { _tabItems: tabs } = this;
    return html`
      <ul class="${prefix}--accordion">
        ${tabs.map((tab: DDSTab, index) => {
          const classes = classMap({
            'bx--accordion__item': true,
            'bx--accordion__item--active': index === this._activeTab,
          });
          return html`
            <li class="${classes}">
              <button
                class="${prefix}--accordion__heading"
                aria-expanded="${index === this._activeTab}"
                aria-controls="pane-${index}"
                @click="${e => this._setActiveItem(index)}"
              >
                ${ChevronRight16({
                  part: 'expando-icon',
                  class: `${prefix}--accordion__arrow`,
                })}
                <div class="${prefix}--accordion__title">${tab.label}</div>
              </button>
              <div id="pane-${index}" class="${prefix}--accordion__content">
                ${tab.innerHTML}
              </div>
            </li>
          `;
        })}
      </ul>
    `;
  }

  protected _renderTabs(): TemplateResult | string | void {
    const { _tabItems: tabs } = this;
    return html`
      <ul class="${prefix}--tabs__nav ${prefix}--tabs__nav--hidden" role="tablist">
        ${tabs.map((tab: DDSTab, index) => {
          const classes = classMap({
            'bx--tabs__nav-item': true,
            'bx--tabs__nav-item--selected': index === this._activeTab,
            'bx--tabs__nav-item--disabled': tab.disabled,
          });
          return html`
            <li class="${classes}" data-target=".tab-${index}-default" role="tab" aria-selected="true" disabled="${tab.disabled}">
              <a
                tabindex="${index}"
                id="tab-link-${index}-default"
                class="${prefix}--tabs__nav-link"
                href="javascript:void(0)"
                role="tab"
                aria-controls="tab-panel-${index}-default"
                @click="${e => this._setActiveItem(index)}"
                >${tab.label}</a
              >
            </li>
          `;
        })}
      </ul>
    `;
  }

  render() {
    return html`
      <div class="${prefix}--tabs-extended">
        <div class="${prefix}--accordion">
          ${this._renderAccordionItems()}
        </div>
        <div class="${prefix}--tabs">
          ${this._renderTabs()}
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
