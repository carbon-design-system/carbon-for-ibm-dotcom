/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, property, query, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import Close20 from 'carbon-custom-elements/es/icons/close/20';
import Search20 from 'carbon-custom-elements/es/icons/search/20';
import BXDropdown, { DROPDOWN_KEYBOARD_ACTION } from 'carbon-custom-elements/es/components/dropdown/dropdown';
import BXDropdownItem from 'carbon-custom-elements/es/components/dropdown/dropdown-item';
import DDSMastheadSearchItem from './masthead-search-item';
import styles from './masthead.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The search UI in the masthead.
 *
 * @element dds-masthead-search
 * @fires dds-masthead-search-beingredirected
 *   The custom event fired before the page is being redirected to the search result page.
 *   Cancellation of this event stops the user-initiated action of redirection.
 */
@customElement(`${ddsPrefix}-masthead-search`)
class DDSMastheadSearch extends BXDropdown {
  /**
   * The `<button>` to open the search box.
   */
  @query(`.${prefix}--header__search--search`)
  private _searchButtonNode!: HTMLButtonElement;

  /**
   * The `<input>` of the search box.
   */
  @query(`.${prefix}--header__search--input`)
  private _searchInputNode!: HTMLInputElement;

  /**
   * Handles `click` event on the close button.
   */
  private async _handleClickCloseButton() {
    const { _searchInputNode: searchInputNode } = this;
    searchInputNode.value = '';
    this.active = false;
    await this.updateComplete;
    const { _searchButtonNode: searchButtonNode } = this;
    searchButtonNode?.focus();
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof DDSMastheadSearch).eventToggle, {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          active: this.active,
        },
      })
    );
  }

  /**
   * Handles `click` event on the search button.
   */
  private async _handleClickSearchButton() {
    const { active } = this;
    if (active) {
      this._handleUserInitiatedRedirect();
    } else {
      this.active = true;
      await this.updateComplete;
      const { _searchInputNode: searchInputNode } = this;
      searchInputNode?.focus();
      this.dispatchEvent(
        new CustomEvent((this.constructor as typeof DDSMastheadSearch).eventToggle, {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            active: this.active,
          },
        })
      );
    }
  }

  /**
   * Prevents key types in the `<input>` causing other keyboard shortcuts in application UI.
   *
   * @param event The event.
   */
  // eslint-disable-next-line class-methods-use-this
  private _handleKeyInput(event: KeyboardEvent) {
    if ((this.constructor as typeof DDSMastheadSearch).getAction(event.key) === DROPDOWN_KEYBOARD_ACTION.NONE) {
      event.stopPropagation();
    }
  }

  /**
   * Handles user-initiated redirect to the search query page.
   *
   * @param [options] The options.
   * @param [options.targetQuery] The query string the search query page should be of.
   */
  private _handleUserInitiatedRedirect({ targetQuery }: { targetQuery?: string } = {}) {
    const { eventBeforeRedirect } = this.constructor as typeof DDSMastheadSearch;
    const { language, redirectUrl } = this;
    const [primary, country] = language.split('-');
    const tokens = redirectUrl.split('?');
    const base = tokens.shift();
    const searchParams = new URLSearchParams(tokens.join('?'));
    // Setting `this._searchInputNode?.value` as the default value of `targetQuery` seems to cause a Babel bug
    searchParams.append('q', targetQuery ?? this._searchInputNode?.value);
    searchParams.append('lang', primary);
    searchParams.append('cc', country);
    const redirectUrlWithSearch = `${base}?${searchParams.toString()}`;
    if (
      this.dispatchEvent(
        new CustomEvent(eventBeforeRedirect, {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            redirectUrl: redirectUrlWithSearch,
          },
        })
      )
    ) {
      this._redirect(redirectUrlWithSearch);
    }
  }

  /**
   * Prevents form submission if there is a highlighted item.
   * In such case, `._handleUserInitiatedRedirect()` should have navigated the user to the search result page.
   *
   * @param event The event.
   */
  private _handleSubmit(event: Event) {
    const { selectorItemHighlighted } = this.constructor as typeof BXDropdown;
    const highlightedItem = this.querySelector(selectorItemHighlighted) as BXDropdownItem;
    if (highlightedItem) {
      event.preventDefault();
    }
  }

  protected _handleUserInitiatedSelectItem(item?: BXDropdownItem) {
    if (item) {
      this._handleUserInitiatedRedirect({ targetQuery: ((item as unknown) as DDSMastheadSearchItem).text });
    }
  }

  /**
   * Redirects the page to the given target.
   *
   * @param target The target URL.
   */
  private _redirect(target) {
    this.ownerDocument!.defaultView!.location.assign(target);
  }

  /**
   * @returns The main content of the trigger button.
   */
  protected _renderTriggerContent() {
    const { placeholder, _handleKeyInput: handleKeyInput } = this;
    return html`
      <input
        type="text"
        class="${prefix}--header__search--input"
        name="q"
        placeholder="${placeholder}"
        autocomplete="off"
        aria-controls="result-list"
        aria-autocomplete="list"
        @keydown="${handleKeyInput}"
        @keypress="${handleKeyInput}"
      />
    `;
  }

  /**
   * @returns The content of the search box.
   */
  private _renderForm() {
    const {
      active,
      language,
      open,
      redirectUrl,
      _handleClickInner: handleClickInner,
      _handleKeydownInner: handleKeydownInner,
      _handleKeypressInner: handleKeypressInner,
      _handleSubmit: handleSubmit,
    } = this;
    if (!active) {
      return undefined;
    }
    const [primary, country] = language.split('-');
    const classes = classMap({
      'react-autosuggest__container': true,
      'react-autosuggest__suggestions-container--open': open,
    });
    return html`
      <form method="get" action="${redirectUrl}" @submit="${handleSubmit}">
        <input type="hidden" name="lang" value="${primary}" />
        <input type="hidden" name="cc" value="${country}" />
        <input type="hidden" name="lnk" value="mhsrch" />
        <div
          role="combobox"
          class="${classes}"
          aria-haspopup="listbox"
          aria-owns="result-list"
          aria-expanded="${Boolean(open)}"
          @click=${handleClickInner}
          @keydown="${handleKeydownInner}"
          @keypress="${handleKeypressInner}"
        >
          ${this._renderTriggerContent()}
          <div id="result-list" class="react-autosuggest__suggestions-container">
            <ul role="listbox" class="react-autosuggest__suggestions-list">
              <slot></slot>
            </ul>
          </div>
        </div>
      </form>
    `;
  }

  /**
   * @returns `true` if the selection of this dropdown should change if the given item is selected upon user interaction.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _selectionShouldChange() {
    return true;
  }

  /**
   * `true` if this the search box should represent its active state.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * The assistive text for the button to close the search box.
   */
  @property({ attribute: 'close-search-button-assistive-text' })
  closeSearchButtonAssistiveText = 'Close';

  /**
   * The language embedded in the inner form.
   */
  @property()
  language = 'en-US';

  /**
   * The assistive text for the button to open the search box.
   */
  @property({ attribute: 'open-search-button-assistive-text' })
  openSearchButtonAssistiveText = 'Open IBM search field';

  /**
   * The assistive text for the button to perform search.
   */
  @property({ attribute: 'perform-search-button-assistive-text' })
  performSearchButtonAssistiveText = 'Search all of IBM';

  /**
   * Value to display when the input has an empty `value`.
   */
  @property({ reflect: true })
  placeholder = '';

  /**
   * The redirect URL when a user selects a search suggestion.
   */
  @property({ attribute: 'redirect-url' })
  redirectUrl = 'https://www.ibm.com/search?lnk=mhsrch';

  /**
   * The shadow slot this search UI should be in.
   */
  @property({ reflect: true })
  slot = 'search';

  /**
   * The input value.
   */
  get searchQueryString() {
    return this._searchInputNode?.value ?? '';
  }

  render() {
    const {
      active,
      closeSearchButtonAssistiveText,
      openSearchButtonAssistiveText,
      performSearchButtonAssistiveText,
      _handleClickCloseButton: handleClickCloseButton,
      _handleClickSearchButton: handleClickSearchButton,
    } = this;
    const searchButtonAssistiveText = !active ? openSearchButtonAssistiveText : performSearchButtonAssistiveText;
    return html`
      ${this._renderForm()}
      <div class="${prefix}--header__search--actions">
        <button
          type="button"
          class="${prefix}--header__action ${prefix}--header__search--search"
          aria-label="${searchButtonAssistiveText}"
          @click="${handleClickSearchButton}"
        >
          ${Search20()}
        </button>
        <button
          type="button"
          class="${prefix}--header__action ${prefix}--header__search--close"
          aria-label="${closeSearchButtonAssistiveText}"
          @click="${handleClickCloseButton}"
        >
          ${Close20()}
        </button>
      </div>
    `;
  }

  /**
   * A selector that will return highlighted search result items.
   */
  static get selectorItemHighlighted() {
    return `${ddsPrefix}-masthead-search-item[highlighted]`;
  }

  /**
   * A selector that will return search result items.
   */
  static get selectorItem() {
    return `${ddsPrefix}-masthead-search-item`;
  }

  /**
   * The name of the custom event fired before the page is being redirected to the search result page.
   * Cancellation of this event stops the user-initiated action of redirection.
   */
  static get eventBeforeRedirect() {
    return `${ddsPrefix}-masthead-search-beingredirected`;
  }

  /**
   * The name of the custom event fired after this search box is toggled upon a user gesture.
   */
  static get eventToggle() {
    return `${ddsPrefix}-masthead-search-toggled`;
  }

  static styles = styles;
}

export default DDSMastheadSearch;
