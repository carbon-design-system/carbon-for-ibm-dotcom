/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings.js';
import { customElement, html, state, LitElement, TemplateResult, property } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { classMap } from 'lit-html/directives/class-map.js';
import ChevronRight20 from 'carbon-web-components/es/icons/chevron--right/20.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSTab from './tab';
import styles from './tabs-extended.scss';
import { ORIENTATION } from './defs';

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
  @state()
  private _tabItems: DDSTab[] = [];

  /**
   * Defines the active tab index.
   */
  @state()
  private _activeTabIndex: number = 0;

  @state()
  private _isLTR: boolean = true;

  @property({ attribute: 'active-tab', reflect: true })
  _activeTab: string = '0';

  /**
   * Handler for @slotChange, creates tabs from dds-tab components.
   *
   * @private
   */
  protected _handleSlotChange(event: Event) {
    const slottedNodes = (event.target as HTMLSlotElement).assignedNodes({ flatten: true });
    this._tabItems = slottedNodes.filter(node => node instanceof DDSTab) as DDSTab[];
    this._tabItems.forEach((tab, index) => {
      this._activeTabIndex = (tab as DDSTab).selected ? index : this._activeTabIndex;
    });
  }

  private _handleClick(index, e) {
    e.preventDefault();
    this._setActiveItem(index);
  }

  private _setActiveItem(index: number) {
    this._activeTabIndex = index;
    this._activeTab = index.toString();
    const newTabLink = this.shadowRoot?.querySelector(`
    [role="tablist"] li[role="tab"]:nth-child(${index + 1}) .bx--tabs__nav-link`);
    if (newTabLink instanceof HTMLElement) {
      newTabLink.focus();
    }
  }

  private _handleTabListKeyDown(event: KeyboardEvent) {
    const { key } = event;
    const { _activeTabIndex: activeTab, _tabItems: tabItems, _isLTR: isLTR } = this;
    switch (key) {
      case 'ArrowRight':
        if (isLTR) {
          this._setActiveItem(this._getNextTab(activeTab));
        } else {
          this._setActiveItem(this._getPrevTab(activeTab));
        }
        break;
      case 'ArrowLeft':
        if (isLTR) {
          this._setActiveItem(this._getPrevTab(activeTab));
        } else {
          this._setActiveItem(this._getNextTab(activeTab));
        }
        break;
      case 'ArrowUp':
        this._setActiveItem(this._getPrevTab(activeTab));
        break;
      case 'ArrowDown':
        this._setActiveItem(this._getNextTab(activeTab));
        break;
      case 'Home':
        this._setActiveItem(this._getNextTab(-1));
        break;
      case 'End':
        this._setActiveItem(this._getPrevTab(tabItems.length));
        break;
      default:
        break;
    }
  }

  private _getNextTab(activeIndex) {
    let tabItems: DDSTab[];

    if (activeIndex > -1 && activeIndex < this._tabItems.length) {
      tabItems = this._reorderTabsFrom(activeIndex);
    } else {
      tabItems = Array.from(this._tabItems);
    }

    const queuedItem = tabItems.find(tabItem => !tabItem.disabled);

    return this._tabItems.findIndex(tabItem => tabItem === queuedItem);
  }

  private _getPrevTab(activeIndex) {
    let tabItems: DDSTab[];

    if (activeIndex > 0 && activeIndex < this._tabItems.length) {
      tabItems = this._reorderTabsFrom(activeIndex - 1);
    } else {
      tabItems = Array.from(this._tabItems);
    }

    const queuedItem = tabItems.reverse().find(tabItem => !tabItem.disabled);

    return this._tabItems.findIndex(tabItem => tabItem === queuedItem);
  }

  private _reorderTabsFrom(activeIndex) {
    const tabItems = Array.from(this._tabItems);

    tabItems.forEach((_tabItem, i) => {
      if (i <= activeIndex) {
        tabItems.push(tabItems.shift() as DDSTab);
      }
    });

    return tabItems;
  }

  updated() {
    this._isLTR = window.getComputedStyle(this).direction === 'ltr';
    this._activeTabIndex = parseInt(this._activeTab, 10);

    this._tabItems.map((tab, index) => {
      (tab as DDSTab).selected = index === this._activeTabIndex;
      (tab as DDSTab).setIndex(index);
      const navLink = this.shadowRoot!.querySelectorAll(`.${prefix}--tabs__nav-link`)[index];
      const navText = navLink!.querySelector('div p');
      if (navText!.scrollHeight > navText!.clientHeight) {
        const label = (tab as DDSTab).getAttribute('label');
        if (label) {
          navLink!.setAttribute('aria-label', label);
          navLink!.setAttribute('hasTooltip', label);
        }
      }
      return tab;
    });
  }

  protected _renderAccordion(): TemplateResult | string | void {
    const { _tabItems: tabs } = this;
    return html`
      <ul class="${prefix}--accordion">
        ${tabs.map((tab, index) => {
          const { disabled } = tab as DDSTab;
          const active = index === this._activeTabIndex;
          const label = (tab as DDSTab).getAttribute('label');
          const classes = classMap({
            'bx--accordion__item': true,
            'bx--accordion__item--active': active,
            'bx--accordion__item--disabled': disabled,
          });
          return html`
            <li class="${classes}">
              <button
                class="${prefix}--accordion__heading"
                aria-expanded="${active}"
                aria-controls="pane-${index}"
                @click="${e => this._handleClick(index, e)}"
                tabindex="${index + 1}"
                ?disabled="${disabled}"
              >
                ${ChevronRight20({
                  part: 'expando-icon',
                  class: `${prefix}--accordion__arrow`,
                })}
                <div class="${prefix}--accordion__title">${label}</div>
              </button>
              <div id="pane-${index}" class="${prefix}--accordion__content">
                ${unsafeHTML((tab as DDSTab).innerHTML)}
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
      <div class="${prefix}--tabs">
        <ul class="${prefix}--tabs__nav ${prefix}--tabs__nav--hidden" role="tablist" @keydown="${this._handleTabListKeyDown}">
          ${tabs.map((tab, index) => {
            const { disabled } = tab as DDSTab;
            const active = index === this._activeTabIndex;
            const label = (tab as DDSTab).getAttribute('label');
            const classes = classMap({
              'bx--tabs__nav-item': true,
              'bx--tabs__nav-item--selected': active,
              'bx--tabs__nav-item--disabled': disabled,
            });
            return html`
              <li class="${classes}" data-target=".tab-${index}-default" role="tab" ?disabled="${disabled}">
                <button
                  tabindex="${active ? '0' : '-1'}"
                  id="tab-link-${index}-default"
                  class="${prefix}--tabs__nav-link"
                  type="button"
                  aria-controls="tab-panel-${index}-default"
                  aria-selected="${active}"
                  @click="${e => this._handleClick(index, e)}"
                >
                  <div><p>${label}</p></div>
                </button>
              </li>
            `;
          })}
        </ul>
      </div>
    `;
  }

  /**
   * Returns a class-name based on the defined Orientation value
   */
  protected _getOrientationClass() {
    return classMap({
      [`${prefix}--tabs-extended`]: true,
      [`${prefix}--tabs-extended--${this.orientation}`]: this.orientation,
    });
  }

  /**
   * Orientation (horizontal (default) | vertical)
   */
  @property({ attribute: 'orientation', reflect: true })
  orientation = ORIENTATION.HORIZONTAL;

  render() {
    return html`
      <div class="${this._getOrientationClass()}">
        ${this._renderAccordion()} ${this._renderTabs()}
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

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSTabsExtended;
