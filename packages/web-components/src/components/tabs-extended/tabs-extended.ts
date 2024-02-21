/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings.js';
import { html, state, LitElement, TemplateResult, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import MediaQueryMixin, {
  MQBreakpoints,
  MQDirs,
} from '../../component-mixins/media-query/media-query';
import DDSTab from './tab';
import styles from './tabs-extended.scss';
import { ORIENTATION } from './defs';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * A component to present content inside a tabbed layout.
 *
 * @element dds-tabs-extended
 */
@customElement(`${ddsPrefix}-tabs-extended`)
class DDSTabsExtended extends MediaQueryMixin(
  HostListenerMixin(StableSelectorMixin(LitElement)),
  {
    [MQBreakpoints.LG]: MQDirs.MIN,
  }
) {
  /**
   * Whether we're viewing smaller or larger window.
   */
  @state()
  _isLargeOrGreater = this.carbonBreakpoints.lg.matches;

  mediaQueryCallbackLG() {
    this._isLargeOrGreater = this.carbonBreakpoints.lg.matches;
  }

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
   * Handles default slot's slotchange events.
   */
  protected _handleSlotChange(event: Event) {
    const slottedNodes = (event.target as HTMLSlotElement).assignedNodes({
      flatten: true,
    });
    this._tabItems = slottedNodes.filter(
      (node) => node instanceof DDSTab
    ) as DDSTab[];
    this._activeTabIndex = this._tabItems.findIndex(
      (tab) => (tab as DDSTab).selected
    );
  }

  private _handleClick(index, e) {
    e.preventDefault();
    this._setActiveItem(index);
  }

  private _handleAccordionClick(e) {
    const tab = e.target.closest(`${ddsPrefix}-tab`);
    this._handleClick(tab.getIndex(), e);
  }

  private _setActiveItem(index: number) {
    this._activeTabIndex = index;
    this._activeTab = index.toString();
  }

  private _handleTabListKeyDown(event: KeyboardEvent) {
    const { key } = event;
    const {
      _activeTabIndex: activeTabIndex,
      _tabItems: tabItems,
      _isLTR: isLTR,
    } = this;
    switch (key) {
      case 'ArrowRight':
        if (isLTR) {
          this._setActiveItem(this._getNextTab(activeTabIndex));
        } else {
          this._setActiveItem(this._getPrevTab(activeTabIndex));
        }
        break;
      case 'ArrowLeft':
        if (isLTR) {
          this._setActiveItem(this._getPrevTab(activeTabIndex));
        } else {
          this._setActiveItem(this._getNextTab(activeTabIndex));
        }
        break;
      case 'ArrowUp':
        this._setActiveItem(this._getPrevTab(activeTabIndex));
        break;
      case 'ArrowDown':
        this._setActiveItem(this._getNextTab(activeTabIndex));
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

  /**
   * Gets the index of the tab that comes after the provided one.
   *
   * @param index The index of the current tab.
   * @returns The index of the next tab.
   */
  private _getNextTab(index: number) {
    let tabItems: DDSTab[];

    if (index > -1 && index < this._tabItems.length) {
      tabItems = this._getTabsReorderedFrom(index);
    } else {
      tabItems = Array.from(this._tabItems);
    }

    // Find first item that isn't disabled.
    const queuedItem = tabItems.find((tabItem) => !tabItem.disabled);

    // Return the index of the found item.
    return this._tabItems.findIndex((tabItem) => tabItem === queuedItem);
  }

  /**
   * Gets the index of the tab that comes before the provided one.
   *
   * @param index The index of the current tab.
   * @returns The index of the previous tab.
   */
  private _getPrevTab(index: number) {
    let tabItems: DDSTab[];

    if (index > 0 && index < this._tabItems.length) {
      tabItems = this._getTabsReorderedFrom(index - 1);
    } else {
      tabItems = Array.from(this._tabItems);
    }

    const queuedItem = tabItems.reverse().find((tabItem) => !tabItem.disabled);

    return this._tabItems.findIndex((tabItem) => tabItem === queuedItem);
  }

  /**
   * Makes a copy of the stored tabs and reorders them putting the supplied tab first.
   *
   * @param index The index of the tab to reorder from.
   * @returns An array of tabs ordered with the provided tab first.
   */
  private _getTabsReorderedFrom(index: number) {
    const tabItems = Array.from(this._tabItems);

    tabItems.forEach((_tabItem, i) => {
      if (i <= index) {
        tabItems.push(tabItems.shift() as DDSTab);
      }
    });

    return tabItems;
  }

  @HostListener(DDSTab.eventTabSelected)
  protected _handleTabSelected = () => {
    const { _activeTabIndex, _isLargeOrGreater: isLargeOrGreater } = this;
    const activeItemControl = isLargeOrGreater
      ? this.shadowRoot?.querySelector(
          `li[role="tab"]:nth-child(${
            _activeTabIndex + 1
          }) .${prefix}--tabs__nav-link`
        )
      : this.querySelector(
          `${ddsPrefix}-tab:nth-of-type(${_activeTabIndex + 1})`
        )?.shadowRoot?.querySelector(`.${prefix}--accordion__heading`);

    if (activeItemControl instanceof HTMLElement) {
      if (!isLargeOrGreater) {
        // Unset focus so that when element is focused programmatically, the
        // browser scrolls element into view.
        activeItemControl.blur();
      }
      activeItemControl.focus();
    }
  };

  updated(changedProperties) {
    const { _isLargeOrGreater, _tabItems } = this;
    this._isLTR = window.getComputedStyle(this).direction === 'ltr';
    this._activeTabIndex = parseInt(this._activeTab, 10);

    if (changedProperties.has('_tabItems')) {
      _tabItems.forEach((tab, index) => {
        (tab as DDSTab).setIndex(index);

        if (!_isLargeOrGreater) {
          tab.addEventListener('click', this._handleAccordionClick.bind(this));
        }
      });
    }

    if (
      changedProperties.has('_activeTabIndex') ||
      changedProperties.has('_tabItems')
    ) {
      _tabItems.forEach((tab, index) => {
        (tab as DDSTab).selected = index === this._activeTabIndex;
      });
    }

    if (
      (changedProperties.has('_isLargeOrGreater') && _isLargeOrGreater) ||
      (changedProperties.has('_tabItems') && _isLargeOrGreater)
    ) {
      // Set aria-label on tabs for desktop.
      _tabItems.forEach((tab, index) => {
        const navLink = this.shadowRoot!.querySelectorAll(
          `.${prefix}--tabs__nav-link`
        )[index];
        const navText = navLink!.querySelector('div p');
        if (navText!.scrollHeight > navText!.clientHeight) {
          const label = (tab as DDSTab).getAttribute('label');
          if (label) {
            navLink!.setAttribute('aria-label', label);
            navLink!.setAttribute('hasTooltip', label);
          }
        }
      });
    }
  }

  protected _renderAccordion(): TemplateResult {
    return html`
      <ul class="${prefix}--accordion">
        <slot @slotchange="${this._handleSlotChange}"></slot>
      </ul>
    `;
  }

  protected _renderTabs(): TemplateResult {
    const { _tabItems: tabs } = this;
    return html`
      <div class="${prefix}--tabs">
        <ul
          class="${prefix}--tabs__nav ${prefix}--tabs__nav--hidden"
          role="tablist"
          @keydown="${this._handleTabListKeyDown}">
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
              <li
                class="${classes}"
                aria-selected="${active}"
                data-target=".tab-${index}-default"
                role="tab"
                ?disabled="${disabled}">
                <button
                  tabindex="${active ? '0' : '-1'}"
                  id="tab-link-${index}-default"
                  class="${prefix}--tabs__nav-link"
                  type="button"
                  aria-controls="tab-panel-${index}-default"
                  @click="${(e) => this._handleClick(index, e)}">
                  <div><p>${label}</p></div>
                </button>
              </li>
            `;
          })}
        </ul>
      </div>
      <div class="${prefix}--tab-content">
        <slot @slotchange="${this._handleSlotChange}"></slot>
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
    const { _isLargeOrGreater: isLargeOrGreater } = this;
    return html`
      <div class="${this._getOrientationClass()}">
        ${isLargeOrGreater ? this._renderTabs() : this._renderAccordion()}
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
