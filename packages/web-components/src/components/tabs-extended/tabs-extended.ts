/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import MediaQueryMixin, {
  MQBreakpoints,
  MQDirs,
} from '../../component-mixins/media-query/media-query';
import C4DTab from './tab';
import styles from './tabs-extended.scss';
import { ORIENTATION } from './defs';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * A component to present content inside a tabbed layout.
 *
 * @element c4d-tabs-extended
 */
@customElement(`${c4dPrefix}-tabs-extended`)
class C4DTabsExtended extends MediaQueryMixin(StableSelectorMixin(LitElement), {
  [MQBreakpoints.LG]: MQDirs.MAX,
}) {
  /**
   * Whether we're viewing smaller or larger window.
   */
  @state()
  _isMobileVersion = this.carbonBreakpoints.lg.matches;

  mediaQueryCallbackMaxLG() {
    this._isMobileVersion = this.carbonBreakpoints.lg.matches;
  }

  /**
   * Child tab components.
   */
  @state()
  private _tabItems: C4DTab[] = [];

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
   * Handler for @slotChange, creates tabs from c4d-tab components.
   *
   * @private
   */
  protected _handleSlotChange(event: Event) {
    const slottedNodes = (event.target as HTMLSlotElement).assignedNodes({
      flatten: true,
    });
    this._tabItems = slottedNodes.filter(
      (node) => node instanceof C4DTab
    ) as C4DTab[];
    this._tabItems.forEach((tab, index) => {
      this._activeTabIndex = (tab as C4DTab).selected
        ? index
        : this._activeTabIndex;
    });
  }

  private _handleClick(index, e) {
    e.preventDefault();
    this._setActiveItem(index);
  }

  private _handleAccordionClick(e) {
    const tab = e.target.closest('c4d-tab');
    this._handleClick(tab.getIndex(), e);
  }

  private _setActiveItem(index: number) {
    this._activeTabIndex = index;
    this._activeTab = index.toString();
    const newTabLink = this.shadowRoot?.querySelector(`
    [role="tablist"] li[role="tab"]:nth-child(${
      index + 1
    }) .cds--tabs__nav-link`);
    if (newTabLink instanceof HTMLElement) {
      newTabLink.focus();
    }
  }

  private _handleTabListKeyDown(event: KeyboardEvent) {
    const { key } = event;
    const {
      _activeTabIndex: activeTab,
      _tabItems: tabItems,
      _isLTR: isLTR,
    } = this;
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
    let tabItems: C4DTab[];

    if (activeIndex > -1 && activeIndex < this._tabItems.length) {
      tabItems = this._reorderTabsFrom(activeIndex);
    } else {
      tabItems = Array.from(this._tabItems);
    }

    const queuedItem = tabItems.find((tabItem) => !tabItem.disabled);

    return this._tabItems.findIndex((tabItem) => tabItem === queuedItem);
  }

  private _getPrevTab(activeIndex) {
    let tabItems: C4DTab[];

    if (activeIndex > 0 && activeIndex < this._tabItems.length) {
      tabItems = this._reorderTabsFrom(activeIndex - 1);
    } else {
      tabItems = Array.from(this._tabItems);
    }

    const queuedItem = tabItems.reverse().find((tabItem) => !tabItem.disabled);

    return this._tabItems.findIndex((tabItem) => tabItem === queuedItem);
  }

  private _reorderTabsFrom(activeIndex) {
    const tabItems = Array.from(this._tabItems);

    tabItems.forEach((_tabItem, i) => {
      if (i <= activeIndex) {
        tabItems.push(tabItems.shift() as C4DTab);
      }
    });

    return tabItems;
  }

  updated(changedProperties) {
    const { _isMobileVersion, _tabItems } = this;
    this._isLTR = window.getComputedStyle(this).direction === 'ltr';
    this._activeTabIndex = parseInt(this._activeTab, 10);

    if (changedProperties.has('_tabItems')) {
      _tabItems.forEach((tab, index) => {
        (tab as C4DTab).setIndex(index);

        if (_isMobileVersion) {
          tab.addEventListener('click', this._handleAccordionClick.bind(this));
        }
      });
    }

    if (
      changedProperties.has('_activeTabIndex') ||
      changedProperties.has('_tabItems')
    ) {
      _tabItems.forEach((tab, index) => {
        (tab as C4DTab).selected = index === this._activeTabIndex;
      });
    }

    if (
      (changedProperties.has('_isMobileVersion') && !_isMobileVersion) ||
      (changedProperties.has('_tabItems') && !_isMobileVersion)
    ) {
      // Set aria-label on tabs for desktop.
      _tabItems.forEach((tab, index) => {
        const navLink = this.shadowRoot!.querySelectorAll(
          `.${prefix}--tabs__nav-link`
        )[index];
        const navText = navLink!.querySelector('div p');
        if (navText!.scrollHeight > navText!.clientHeight) {
          const label = (tab as C4DTab).getAttribute('label');
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
            const { disabled } = tab as C4DTab;
            const active = index === this._activeTabIndex;
            const label = (tab as C4DTab).getAttribute('label');
            const classes = classMap({
              'cds--tabs__nav-item': true,
              'cds--tabs__nav-item--selected': active,
              'cds--tabs__nav-item--disabled': disabled,
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
   *
   * @deprecated will only have horizontal variant
   */
  @property({ attribute: 'orientation', reflect: true })
  orientation = ORIENTATION.HORIZONTAL;

  render() {
    const { _isMobileVersion: isMobileVersion } = this;
    return html`
      <div class="${this._getOrientationClass()}">
        ${isMobileVersion ? this._renderAccordion() : this._renderTabs()}
      </div>
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--tabs-extended`;
  }

  static styles = styles;
}

console.warn(
  'The tabs-extended orientation prop has been deprecated in favor for only horizontal variations. ' +
    'See tabs-extended documentation for more information.'
);

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DTabsExtended;
