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
  LitElement,
} from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './tabs-extended.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSTab from './tab';

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
  private active = 0;

  /**
   * Handler for @slotChange, creates tabs from dds-tab components.
   *
   * @private
   */
  private _handleSlotChange(event: Event) {
    this._tabItems = (event.target as HTMLSlotElement)
      .assignedNodes({ flatten: true })
      .filter(node => (new DDSTab)?.nodeName === node.nodeName);
    this._tabItems.forEach((tab:DDSTab, index) => {
      this.active = tab.selected ? index : this.active;
    });
  }

  private _setActiveTab(index) {
    this.active = index;
  }

  updated() {
    this._tabItems.map((tab:DDSTab, index) => {
      tab.selected = (index === this.active);
      tab.setIndex(index);
    });
  }

  render() {
    const {
      _tabItems: tabs,
    } = this;
    return html`
      <div class="${prefix}--tabs-extended">

        <div class="${prefix}--accordion">
          <ul data-accordion class="bx--accordion">
            ${tabs.map((tab:DDSTab, index) => {
              const classes = [
                index === this.active && `${prefix}--accordion__item--active` || null,
              ];
              return html`
                <li data-accordion-item class="bx--accordion__item ${classes.join(' ')}">
                  <button class="bx--accordion__heading" aria-expanded="${index === this.active}" aria-controls="pane-${index}" @click="${(e) => this._setActiveTab(index)}">
                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--accordion__arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M11 8L6 13 5.3 12.3 9.6 8 5.3 3.7 6 3z"></path></svg>
                    <div class="bx--accordion__title">${tab.label}</div>
                  </button>
                  <div id="pane-${index}" class="bx--accordion__content">
                    ${tab.innerHTML}
                  </div>
                </li>
              `;
            })}
          </ul>
        </div>

        <div data-tabs class="${prefix}--tabs">
          <ul class="${prefix}--tabs__nav ${prefix}--tabs__nav--hidden" role="tablist">
            ${tabs.map((tab:DDSTab, index) => {
              const classes = [
                index === this.active && `${prefix}--tabs__nav-item--selected` || null,
                tab.disabled && `${prefix}--tabs__nav-item--disabled` || null,
              ];
              return html`
                <li
                  class="${prefix}--tabs__nav-item ${classes.join(' ')}"
                  data-target=".tab-${index}-default"
                  role="tab"
                  aria-selected="true"
                  disabled="${tab.disabled}">
                  <a tabindex="${index}" id="tab-link-${index}-default" class="${prefix}--tabs__nav-link" href="javascript:void(0)" role="tab"
                     aria-controls="tab-panel-${index}-default" @click="${(e) => this._setActiveTab(index)}">${tab.label}</a>
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
