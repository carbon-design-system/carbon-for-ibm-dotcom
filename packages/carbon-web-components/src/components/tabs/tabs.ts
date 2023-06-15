/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import { forEach } from '../../globals/internal/collection-helpers';
import ChevronRight16 from '@carbon/icons/lib/chevron--right/16';
import ChevronLeft16 from '@carbon/icons/lib/chevron--left/16';
import CDSContentSwitcher, {
  NAVIGATION_DIRECTION,
} from '../content-switcher/content-switcher';
import { TABS_COLOR_SCHEME, TABS_KEYBOARD_ACTION, TABS_TYPE } from './defs';
import CDSTab from './tab';
import styles from './tabs.scss';

export {
  NAVIGATION_DIRECTION,
  TABS_COLOR_SCHEME,
  TABS_KEYBOARD_ACTION,
  TABS_TYPE,
};

/**
 * Tabs.
 *
 * @element cds-tabs
 * @fires cds-tabs-beingselected
 *   The custom event fired before a tab is selected upon a user gesture.
 *   Cancellation of this event stops changing the user-initiated selection.
 * @fires cds-tabs-selected - The custom event fired after a a tab is selected upon a user gesture.
 */
@customElement(`${prefix}-tabs`)
export default class CDSTabs extends HostListenerMixin(CDSContentSwitcher) {
  /**
   * The latest status of this dropdown, for screen reader to accounce.
   */
  private _assistiveStatusText?: string;

  /**
   * The currently selected index
   */
  private _currentIndex: number = 0;

  /**
   * Total number of tabs in the component
   */
  private _totalTabs: number = 0;

  /**
   * `true` if the tablist is scrollable
   */
  private _isScrollable: boolean = false;

  /**
   * The DOM element for the tablist.
   */
  private tablist: Element | null = null;

  /**
   * The width of the overflow scroll buttons.
   */
  private BUTTON_WIDTH = 44;

  /**
   * Navigates through tabs.
   *
   * @param direction `-1` to navigate backward, `1` to navigate forward.
   * @param [options] The options.
   * @param [options.immediate]
   *   Defaults to `true`
   *   `true` to make it "immediate selection change" mode, which does:
   *
   *   Starts with the selected item
   *   Going prev/next item immediately changes the selection
   */
  protected _navigate(
    direction: number,
    { immediate = true }: { immediate?: boolean } = {}
  ) {
    const { selectorItem, selectorItemHighlighted, selectorItemSelected } = this
      .constructor as typeof CDSTabs;
    const nextItem = this._getNextItem(
      this.querySelector(
        immediate ? selectorItemSelected : selectorItemHighlighted
      ) as CDSTab,
      direction
    );
    if (!nextItem) {
      return;
    }

    if (immediate) {
      this._handleUserInitiatedSelectItem(nextItem as CDSTab);
    } else {
      forEach(this.querySelectorAll(selectorItem), (item) => {
        (item as CDSTab)[immediate ? 'selected' : 'highlighted'] =
          nextItem === item;
      });
    }

    // Using `{ block: 'nearest' }` to prevent scrolling unless scrolling is absolutely necessary.
    // `scrollIntoViewOptions` seems to work in latest Safari despite of MDN/caniuse table.
    // IE falls back to the old behavior.
    nextItem.scrollIntoView({ block: 'nearest', inline: 'nearest' });

    const nextItemText = nextItem.textContent;
    if (nextItemText) {
      this._assistiveStatusText = nextItemText;
    }
    this._currentIndex += direction;
    this.requestUpdate();
  }

  @HostListener('click')
  protected _handleClick(event: MouseEvent) {
    super._handleClick(event);
  }

  @HostListener('keydown')
  protected _handleKeydown(event: KeyboardEvent) {
    const { key } = event;
    const action = (this.constructor as typeof CDSTabs).getAction(key);
    const enabledTabs = this.querySelectorAll(`${prefix}-tab:not([disabled])`);
    switch (action) {
      case TABS_KEYBOARD_ACTION.HOME:
        {
          const [firstEnabledTab] = enabledTabs;
          firstEnabledTab.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
          });
          this._handleUserInitiatedSelectItem(firstEnabledTab as CDSTab);
          this.requestUpdate();
        }
        break;
      case TABS_KEYBOARD_ACTION.END:
        {
          const lastEnabledTab = enabledTabs[enabledTabs.length - 1];
          lastEnabledTab.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
          });
          this._handleUserInitiatedSelectItem(lastEnabledTab as CDSTab);
          this.requestUpdate();
        }
        break;
      case TABS_KEYBOARD_ACTION.NAVIGATING:
        {
          const direction = NAVIGATION_DIRECTION[key];
          if (direction) {
            this._navigate(direction);
          }
        }
        break;
      default:
        break;
    }
  }

  @HostListener('resize')
  protected _handleResize = () => {
    // TODO: debounce
    this.requestUpdate();
  };

  @HostListener('scroll')
  protected _handleScroll = () => {
    // TODO: debounce
    this.requestUpdate();
  };

  protected _selectionDidChange(itemToSelect: CDSTab) {
    super._selectionDidChange(itemToSelect);
    this._assistiveStatusText = this.selectedItemAssistiveText;
  }

  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = TABS_COLOR_SCHEME.REGULAR;

  /**
   * An assistive text for screen reader to announce, telling the open state.
   */
  @property({ attribute: 'selecting-items-assistive-text' })
  selectingItemsAssistiveText =
    'Selecting items. Use up and down arrow keys to navigate.';

  /**
   * An assistive text for screen reader to announce, telling that an item is selected.
   */
  @property({ attribute: 'selected-item-assistive-text' })
  selectedItemAssistiveText = 'Selected an item.';

  /**
   * The content of the trigger button for narrow mode.
   */
  @property({ attribute: 'trigger-content' })
  triggerContent = '';

  /**
   * Tabs type.
   */
  @property({ reflect: true })
  type = TABS_TYPE.REGULAR;

  connectedCallback = () => {
    super.connectedCallback();
    window.addEventListener('resize', this._handleResize);
  };

  disconnectedCallback = () => {
    window.removeEventListener('resize', this._handleResize);
    this.tablist?.removeEventListener('scroll', this._handleScroll);
    super.disconnectedCallback();
  };

  shouldUpdate(changedProperties) {
    super.shouldUpdate(changedProperties);
    if (this.tablist) {
      const { clientWidth, scrollWidth } = this.tablist;
      this._isScrollable = scrollWidth > clientWidth;
    }
    const { selectorItem } = this.constructor as typeof CDSTabs;
    if (changedProperties.has('type')) {
      forEach(this.querySelectorAll(selectorItem), (elem) => {
        this._totalTabs++;
        (elem as CDSTab).type = this.type;
      });
    }
    return true;
  }

  firstUpdated() {
    const { selectorTablist } = this.constructor as typeof CDSTabs;
    const tablist = this.shadowRoot!.querySelector(selectorTablist)!;
    this.tablist = tablist;
    this.tablist.addEventListener('scroll', this._handleScroll);
    this.requestUpdate();
  }

  render() {
    const { _assistiveStatusText: assistiveStatusText } = this;
    const { scrollLeft, clientWidth, scrollWidth } = this.tablist ?? {};
    /**
     * Previous Button
     * VISIBLE IF:
     *   - SCROLLABLE
     *   - AND SCROLL_LEFT > 0
     */
    const isPreviousButtonVisible = this.tablist
      ? this._isScrollable && scrollLeft! > 0
      : false;
    /**
     * Next Button
     * VISIBLE IF:
     *   - SCROLLABLE
     *   - AND SCROLL_LEFT + CLIENT_WIDTH < SCROLL_WIDTH
     */
    const isNextButtonVisible = this.tablist
      ? scrollLeft! + this.BUTTON_WIDTH + clientWidth! < scrollWidth!
      : false;
    const previousButtonClasses = classMap({
      [`${prefix}--tab--overflow-nav-button`]: true,
      [`${prefix}--tab--overflow-nav-button--previous`]: true,
      [`${prefix}--tab--overflow-nav-button--hidden`]: !isPreviousButtonVisible,
    });
    const nextButtonClasses = classMap({
      [`${prefix}--tab--overflow-nav-button`]: true,
      [`${prefix}--tab--overflow-nav-button--next`]: true,
      [`${prefix}--tab--overflow-nav-button--hidden`]: !isNextButtonVisible,
    });
    return html`
      <button
        aria-hidden="true"
        aria-label="Scroll left"
        type="button"
        class="${previousButtonClasses}">
        ${ChevronLeft16()}
      </button>
      <div id="tablist" role="tablist" class="${prefix}--tab--list">
        <slot></slot>
      </div>
      <button
        aria-hidden="true"
        aria-label="Scroll right"
        type="button"
        class="${nextButtonClasses}">
        ${ChevronRight16()}
      </button>
      <div
        class="${prefix}--assistive-text"
        role="status"
        aria-live="assertive"
        aria-relevant="additions text">
        ${assistiveStatusText}
      </div>
    `;
  }

  /**
   * Symbols of keys that triggers opening/closing menu and selecting/deselecting menu item.
   */
  static TRIGGER_KEYS = new Set([' ', 'Enter']);

  /**
   * A selector that will return tabs.
   */
  static get selectorItem() {
    return `${prefix}-tab`;
  }

  /**
   * A selector that will return enabled tabs.
   */
  static get selectorItemEnabled() {
    return `${prefix}-tab:not([disabled])`;
  }

  /**
   * A selector that will return highlighted tabs.
   */
  static get selectorItemHighlighted() {
    return `${prefix}-tab[highlighted]`;
  }

  /**
   * A selector that will return selected tabs.
   */
  static get selectorItemSelected() {
    return `${prefix}-tab[selected]`;
  }

  /**
   * A selector that returns the tablist
   */
  static get selectorTablist() {
    return `.${prefix}--tab--list`;
  }

  /**
   * The name of the custom event fired before a tab is selected upon a user gesture.
   * Cancellation of this event stops changing the user-initiated selection.
   */
  static get eventBeforeSelect() {
    return `${prefix}-tabs-beingselected`;
  }

  /**
   * The name of the custom event fired after a a tab is selected upon a user gesture.
   */
  static get eventSelect() {
    return `${prefix}-tabs-selected`;
  }

  static styles = styles;

  /**
   * @param key The key symbol.
   * @returns A action for dropdown for the given key symbol.
   */
  static getAction(key: string) {
    if (key === 'Home') {
      return TABS_KEYBOARD_ACTION.HOME;
    }
    if (key === 'End') {
      return TABS_KEYBOARD_ACTION.END;
    }
    if (key in NAVIGATION_DIRECTION) {
      return TABS_KEYBOARD_ACTION.NAVIGATING;
    }
    return TABS_KEYBOARD_ACTION.NONE;
  }
}
