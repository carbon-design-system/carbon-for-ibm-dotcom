/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  html,
  property,
  state,
  query,
  customElement,
  LitElement,
} from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import { INPUT_SIZE } from '../../internal/vendor/@carbon/web-components/components/input/input.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import ThrottedInputMixin from '../../globals/mixins/throttled-input';
import { forEach } from '../../globals/internal/collection-helpers';
import DDSSearch, { SEARCH_COLOR_SCHEME } from '../search/search';
import DDSLocaleItem from './locale-item';
import styles from './locale-modal.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * @param target The strings to find the given `searchText` within.
 * @param searchText The search string.
 * @returns `true` if there is a match.
 */
function search(target?: (string | void)[], searchText?: string) {
  const isEmpty = !target || !target.some(Boolean);
  if (isEmpty || !searchText) {
    return true;
  }
  return target!.some(
    (item) => item && item.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
  );
}

/**
 * Locale search box.
 *
 * @element dds-locale-search
 */
@customElement(`${ddsPrefix}-locale-search`)
class DDSLocaleSearch extends ThrottedInputMixin(
  StableSelectorMixin(LitElement)
) {
  /**
   * The container for the locale list.
   */
  @query(`.${prefix}--locale-modal__list`)
  private _listNode?: HTMLElement;

  /**
   * `true` if there is one or more search result.
   */
  @state()
  private _hasAvailableItem = true;

  /**
   * The search box.
   */
  @query(`${ddsPrefix}-search`)
  private _searchNode?: DDSSearch;

  @query('[aria-live]')
  private _liveRegion?: HTMLDivElement;

  /**
   * Updates the search results.
   *
   * @param searchText The search text.
   */
  private _updateSearchResults(searchText: string) {
    const { selectorItem } = this.constructor as typeof DDSLocaleSearch;
    const { region: currentRegion, _liveRegion: liveRegion } = this;
    let hasMatch = false;
    let count = 0;
    forEach(this.querySelectorAll(selectorItem), (item) => {
      const { country, language, region } = item as DDSLocaleItem;
      const matches =
        region === currentRegion && search([country, language], searchText);
      if (matches) {
        hasMatch = true;
        count++;
      }
      (item as HTMLElement).hidden = !matches;
    });
    this._hasAvailableItem = hasMatch;
    if (liveRegion) {
      const announcement = count === 1 ? `${count} result` : `${count} results`;
      liveRegion.innerText = announcement;
    }
  }

  _handleThrottledInput(event: Event) {
    this._updateSearchResults((event as CustomEvent).detail.value);
  }

  /**
   * The text for the label for the UI showing the available locales.
   */
  @property({ attribute: 'availability-label-text' })
  availabilityLabelText =
    'This page is available in the following locations and languages';

  /**
   * The assistive text for the close button in the search box.
   */
  @property({ attribute: 'close-button-assistive-text' })
  closeButtonAssistiveText = '';

  /**
   * The throttle timeout to run query upon user input.
   */
  @property({ type: Number, attribute: 'input-timeout' })
  inputTimeout = 200;

  /**
   * The label text for the search box.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * The placeholder text for the search box.
   */
  @property()
  placeholder = '';

  /**
   * The current region.
   */
  @property()
  region = '';

  /**
   * The shadow slot this locale search box should be in.
   */
  @property({ reflect: true })
  slot = 'locales-selector';

  /**
   * The text for the label for the UI showing no available locale.
   */
  @property({ attribute: 'unavailability-label-text' })
  unavailabilityLabelText =
    'This page is unavailable in your preferred location or language';

  /**
   * Focus on first focusable element in shadow DOM
   */
  focus() {
    // @ts-ignore: Ultil `delegatesFocus` is added to `ShadowRoot` definition
    if (this.shadowRoot!.delegatesFocus) {
      super.focus();
    } else {
      const { selectorTabable } = this.constructor as typeof DDSLocaleSearch;
      const delegateTarget = this.shadowRoot!.querySelector(selectorTabable);
      if (delegateTarget) {
        (delegateTarget as HTMLElement).focus();
      } else {
        super.focus();
      }
    }
  }

  /**
   * Resets the search box and the scroll position.
   */
  reset() {
    const { _listNode: listNode, _searchNode: searchNode } = this;
    if (listNode) {
      listNode.scrollTop = 0;
    }
    if (searchNode) {
      searchNode.value = '';
      this._updateSearchResults('');
    }
  }

  firstUpdated() {
    const { _searchNode: searchNode } = this;
    if (searchNode) {
      this._updateSearchResults(searchNode.value);
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('region')) {
      const { selectorItem } = this.constructor as typeof DDSLocaleSearch;
      const { region } = this;
      forEach(this.querySelectorAll(selectorItem), (item) => {
        (item as HTMLElement).hidden =
          (item as DDSLocaleItem).region !== region;
      });
    }
  }

  render() {
    const {
      availabilityLabelText,
      closeButtonAssistiveText,
      labelText,
      placeholder,
      unavailabilityLabelText,
      _hasAvailableItem: hasAvailableItem,
    } = this;
    return html`
      <div class="${prefix}--locale-modal__filter">
        <div class="${prefix}--locale-modal__search">
          <dds-search
            part="searchbox"
            close-button-assistive-text="${closeButtonAssistiveText}"
            color-scheme="${SEARCH_COLOR_SCHEME.REGULAR}"
            label-text="${labelText}"
            placeholder="${placeholder}"
            size="${INPUT_SIZE.EXTRA_LARGE}"
            data-autoid="${ddsPrefix}--locale-modal__filter">
          </dds-search>
          <div class="${prefix}--visually-hidden" aria-live="polite"></div>
          <p class="${prefix}--locale-modal__search-text">
            ${hasAvailableItem
              ? availabilityLabelText
              : unavailabilityLabelText}
          </p>
        </div>
        <div class="${prefix}--locale-modal__list" role="list">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--locale-search`;
  }

  /**
   * A selector selecting the locale item,
   */
  static get selectorTabable() {
    return `${ddsPrefix}-search`;
  }

  /**
   * A selector selecting the locale items.
   */
  static get selectorItem() {
    return `${ddsPrefix}-locale-item`;
  }

  /**
   * The event that represents the user input gesture.
   */
  static get eventInput() {
    return `${ddsPrefix}-search-input`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLocaleSearch;
