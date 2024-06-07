/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import Close20 from '../../internal/vendor/@carbon/web-components/icons/close/20.js';
import Search20 from '../../internal/vendor/@carbon/web-components/icons/search/20.js';
import CDSDropdown, {
  DROPDOWN_KEYBOARD_ACTION,
} from '../../internal/vendor/@carbon/web-components/components/dropdown/dropdown.js';
import CDSDropdownItem from '../../internal/vendor/@carbon/web-components/components/dropdown/dropdown-item.js';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import { baseFontSize, breakpoints } from '@carbon/layout';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import SearchTypeaheadAPI from '../../internal/vendor/@carbon/ibmdotcom-services/services/SearchTypeahead/SearchTypeahead';
import { forEach, indexOf } from '../../globals/internal/collection-helpers';
import styles from './search-with-typeahead.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import './search-with-typeahead-item';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';
import C4DSearchWithTypeaheadItem from './search-with-typeahead-item';

const { prefix, stablePrefix: c4dPrefix } = settings;
const gridBreakpoint = parseFloat(breakpoints.lg.width) * baseFontSize;

/**
 * Search with Typeahead
 *
 * @element c4d-search-with-typeahead
 * @csspart search-input - The input box for search. Usage `c4d-search-with-typeahead::part(search-input)`
 * @csspart search-form - The search form. Usage `c4d-search-with-typeahead::part(search-form)`
 * @csspart combobox-form - The combobox search form. Usage `c4d-search-with-typeahead::part(combobox-form)`
 * @csspart search-dropdown - The search dropdown. Usage `c4d-search-with-typeahead::part(search-dropdown)`
 * @csspart dropdown-item - The search dropdown item. Usage `c4d-search-with-typeahead::part(dropdown-item)`
 * @csspart search-dropdown-mobile - The search dropdown for mobile. Usage `c4d-search-with-typeahead::part(search-dropdown-mobile)`
 * @csspart select-item - The item selector. Usage `c4d-search-with-typeahead::part(select-item)`
 * @csspart suggestions-container - The suggestions container. Usage `c4d-search-with-typeahead::part(suggestions-container)`
 * @csspart suggestions-list - The suggestions list. Usage `c4d-search-with-typeahead::part(suggestions-list)`
 * @csspart search-with-typeahead-item - The search item. Usage `c4d-search-with-typeahead::part(search-with-typeahead-item`
 * @csspart open-button - The button to show the search box. Usage `c4d-search-with-typeahead::part(open-button)`
 * @csspart close-button - The button to hide the search box. Usage `c4d-search-with-typeahead::part(close-button)`
 * @csspart header-search-actions - The container for the search bar. Usage `c4d-search-with-typeahead::part(header-search-actions)`
 * @fires c4d-search-with-typeahead-beingredirected
 *   The custom event fired before the page is being redirected to the search result page.
 *   Cancellation of this event stops the user-initiated action of redirection.
 * @fires c4d-search-with-typeahead-input
 *   The name of the custom event fired after the search content is changed upon a user gesture.
 * @fires c4d-search-with-typeahead-toggled
 *   The name of the custom event fired after this search box is toggled upon a user gesture.
 */
@customElement(`${c4dPrefix}-search-with-typeahead`)
class C4DSearchWithTypeahead extends HostListenerMixin(
  StableSelectorMixin(CDSDropdown)
) {
  // eslint-disable-next-line class-methods-use-this
  async getResults(searchQuery) {
    const response = await SearchTypeaheadAPI.getResults(
      searchQuery,
      this.appId
    );
    return response.map((res) => res[0]);
  }

  /**
   * The formatter for the placeholder text on the search box.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  placeholderFormatter = ({ appId }) => `Search in ${appId}`;

  @property({ attribute: 'leadspace-search', type: Boolean })
  leadspaceSearch = false;

  @property({ attribute: 'custom-typeahead-api', type: Boolean })
  customTypeaheadAPI = false;

  @property()
  currentSearchResults;

  @property()
  searchResults;

  @property()
  groupedResults;

  @property({ attribute: 'initial-search-term', reflect: true })
  initialSearchTerm?: string;

  @property({ attribute: 'scope-parameters' })
  scopeParameters;

  @property({ attribute: 'should-remain-open', type: Boolean })
  shouldRemainOpen = false;

  @property({ attribute: 'appid', reflect: true })
  appId;

  @property({ attribute: 'scope-label', reflect: true })
  scopeLabel;

  @property({ attribute: 'scope-value', reflect: true })
  scopeValue;

  @state()
  userHasInputSearch = false;

  /**
   * The `<button>` to open the search box.
   */
  @query(`.${prefix}--header__search--search`)
  private _searchButtonNode!: HTMLButtonElement;

  /**
   * The `<button>` to open the search box.
   */
  @query(`.${prefix}--header__search--close`)
  private _closeButtonNode!: HTMLButtonElement;

  /**
   * The `<input>` of the search box.
   */
  @query(`.${prefix}--header__search--input`)
  private _searchInputNode!: HTMLInputElement;

  /**
   * The `<ul>` containing the search suggestions.
   */
  @query(`.react-autosuggest__suggestions-list`)
  private _searchSuggestions!: HTMLElement;

  /**
   * Handles hiding search suggestions if focusing on other buttons.
   *
   * @param event The event.
   * @param event.target The event target.
   */
  @HostListener('shadowRoot:focusin')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleFocus = async ({ target }: FocusEvent) => {
    if (!this._searchSuggestions) {
      return;
    }

    if (target === this._searchInputNode) {
      this._searchSuggestions.removeAttribute('hidden');
    } else if (target === (this._searchButtonNode || this._closeButtonNode)) {
      this._searchSuggestions.setAttribute('hidden', '');
    }

    if (target === this._closeButtonNode) {
      this.setAttribute('unfocused', '');
    } else {
      this.removeAttribute('unfocused');
    }
  };

  /**
   * Handles `click` event on the close button.
   */
  private async _handleClickCloseButton() {
    if (this.leadspaceSearch) {
      this._closeButtonNode?.classList.add(`${prefix}--header__search--hide`);
    }
    this._handleUserInitiatedToggleActiveState(false);
  }

  /**
   * @inheritdoc
   */
  protected _handleClickInner(event: MouseEvent) {
    if (
      (event.target as HTMLElement).closest('.cds--header__search--input') ===
      event.target
    ) {
      this._handleUserInitiatedToggle();
      if (this.searchQueryString && this.leadspaceSearch) {
        this._closeButtonNode?.classList.remove(
          `${prefix}--header__search--hide`
        );
      }
    } else {
      const item = (event.target as Element).closest(
        (this.constructor as typeof CDSDropdown).selectorItem
      ) as CDSDropdownItem;
      if (this.shadowRoot!.contains(item) && !item.hasAttribute('groupTitle')) {
        this._handleUserInitiatedSelectItem(item);
      }
    }
  }

  /**
   * Handles `click` event on the search button.
   */
  private async _handleClickSearchButton() {
    const { active } = this;

    if (active) {
      if (this.searchQueryString) {
        this._handleUserInitiatedRedirect();
      }
    } else {
      this._handleUserInitiatedToggleActiveState(true);
    }
  }

  /**
   * Handles user-initiated toggling of activated state of the search box.
   *
   * @param active `true` to activate the search box.
   * @param moveFocus
   *   `true` to move focus upon toggling, to the input box when activated, to the trigger button when deactivated.
   */
  private async _handleUserInitiatedToggleActiveState(
    active,
    moveFocus = true
  ) {
    if (active === this.active) {
      return;
    }
    const { _searchInputNode: searchInputNode } = this;
    const { eventInput, eventToggle } = this
      .constructor as typeof C4DSearchWithTypeahead;
    if (!active && searchInputNode.value) {
      searchInputNode.value = '';
      this.dispatchEvent(
        new CustomEvent(eventInput, {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: {
            value: '',
          },
        })
      );
    }
    this.active = this.shouldRemainOpen ? true : !this.active;
    this.searchResults = [];
    this.groupedResults = [];

    this.dispatchEvent(
      new CustomEvent(eventToggle, {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          active,
        },
      })
    );
    await this.updateComplete;
    if (moveFocus) {
      // Does not reuse destructed `searchInputNode` given it's `null` before expanded
      (this.active ? this._searchInputNode : this._searchButtonNode).focus();
    }
  }

  /**
   * Prevents key types in the `<input>` causing other keyboard shortcuts in application UI.
   *
   * @param event The event.
   */
  private _handleKeyInput(event: KeyboardEvent) {
    if (
      (this.constructor as typeof C4DSearchWithTypeahead).getAction(
        event.key
      ) === DROPDOWN_KEYBOARD_ACTION.NONE
    ) {
      event.stopPropagation();
    }
  }

  /**
   * Builds a redirect href string with appropriate query params. Emulates what
   * would be generated by the form action.
   *
   * @param targetQuery An optional query string value.
   * @returns {string} An href string.
   */
  private _buildRedirect(targetQuery: string = this.searchQueryString) {
    const [primary, country] = this.language.split('-');
    const tokens = this.redirectUrl.split('?');
    const base = tokens.shift();
    const searchParams = new URLSearchParams(tokens.join('?'));
    // Setting `this.searchQueryString` as the default value of `targetQuery` seems to cause a Babel bug
    searchParams.append('q', targetQuery);
    searchParams.append('lang', primary);
    searchParams.append('cc', country);

    if (this.appId) {
      searchParams.append('scope-domain', 'scope');
      searchParams.append('scope-value', this.scopeValue);
      searchParams.append('scope-type', this.appId);

      if (this.scopeLabel) {
        searchParams.append('scope-label', this.scopeLabel ?? '');
      }
    }

    return `${base}?${searchParams.toString()}`;
  }

  /**
   * Handles user-initiated redirect to the search query page.
   *
   * @param [options] The options.
   * @param [options.targetQuery] The query string the search query page should be of.
   * @param [options.targetHref] The href string to be redirected to.
   */
  private _handleUserInitiatedRedirect({
    targetQuery,
    targetHref,
  }: { targetQuery?: string; targetHref?: string } = {}) {
    const { eventBeforeRedirect, eventInput } = this
      .constructor as typeof C4DSearchWithTypeahead;

    this.dispatchEvent(
      new CustomEvent(eventInput, {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          value: targetQuery,
        },
      })
    );

    const query = targetQuery ?? this.searchQueryString;

    const redirectUrlWithSearch = targetHref || this._buildRedirect(query);
    if (
      this.dispatchEvent(
        new CustomEvent(eventBeforeRedirect, {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            redirectUrl: redirectUrlWithSearch,
            searchQueryString: query,
          },
        })
      )
    ) {
      this._redirect(redirectUrlWithSearch);
    }
  }

  /**
   * @inheritdoc
   */
  @HostListener('focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  protected _handleFocusOut(event: FocusEvent) {
    super._handleFocusOut(event);
  }

  /**
   * Handles search results when using a custom API.
   *
   * @param event The event.
   */
  @HostListener('document:eventCustomResults')
  protected _handleCustomResults = (event: CustomEvent) => {
    if (this.customTypeaheadAPI) {
      [this.searchResults] = event.detail;
      this.groupedResults = event.detail.slice(1);
    }
  };

  /**
   * Queries scoped search suggestions.
   *
   * @param event The event.
   */
  @HostListener('document:eventSelectScope')
  protected _handleScopeSelect = (event: CustomEvent) => {
    this.appId = event.detail.appId;
    let targetScope;
    this.scopeParameters.forEach((scope) => {
      if (scope.appId === this.appId) {
        targetScope = scope;
      }
    });

    this.scopeValue = Array.isArray(targetScope?.value)
      ? `[${targetScope.value
          .toString()
          .split(',')
          .map((word) => `"${word.trim()}"`)
          .join(',')}]`
      : targetScope.value;
    this.scopeLabel = targetScope.label ?? '';
  };

  /**
   * Handles `input` event in the search input.
   */
  private _handleInput(event: InputEvent) {
    const { userHasInputSearch } = this;
    const { target } = event;
    const { value } = target as HTMLInputElement;
    this.removeAttribute('unfocused');

    const items = this.shadowRoot!.querySelectorAll(
      (this.constructor as typeof CDSDropdown).selectorItem
    );
    items.forEach((e) => {
      if (this.leadspaceSearch) {
        e.setAttribute('alternate', '');
      }

      if (e.hasAttribute('highlighted')) {
        this.setAttribute('unfocused', '');
      }
    });

    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof C4DSearchWithTypeahead).eventInput,
        {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: {
            value,
          },
        }
      )
    );
    this.value = value;

    if (!this.customTypeaheadAPI) {
      this.getResults(value).then((res) => {
        this.searchResults = res;
      });
    }

    if (value) {
      this.open = true;
      if (this.leadspaceSearch) {
        this._closeButtonNode?.classList.remove(
          `${prefix}--header__search--hide`
        );
      }
    }

    if (!userHasInputSearch) {
      this.userHasInputSearch = true;
    }

    // accomodate search results box's width with the scope dropdown
    if (
      gridBreakpoint < document.body.clientWidth &&
      this._searchSuggestions &&
      this.scopeParameters
    ) {
      const scopeBarWidth = (
        this.shadowRoot?.querySelector(
          'c4d-scoped-search-dropdown'
        ) as HTMLElement
      ).offsetWidth;
      (this._searchSuggestions?.parentElement as HTMLElement)?.setAttribute(
        'style',
        `left: ${scopeBarWidth}px; width: calc(100% - ${scopeBarWidth}px);`
      );
    } else {
      (this._searchSuggestions?.parentElement as HTMLElement)?.removeAttribute(
        'style'
      );
    }
  }

  /**
   * Handles search form submission and cancels event execution in circumstances
   * where user action is handled elsewhere.
   *
   * @param event The form submission event.
   */
  private _handleSubmit(event: Event) {
    const { searchQueryString, redirectUrl } = this;
    const { eventBeforeRedirect } = this
      .constructor as typeof C4DSearchWithTypeahead;
    const { selectorItemHighlighted } = this.constructor as typeof CDSDropdown;
    const highlightedItem = this.shadowRoot!.querySelector(
      selectorItemHighlighted
    ) as CDSDropdownItem;

    // Prevents form submission in certain circumstances. In the case where there
    // is a highlighted item, `._handleUserInitiatedRedirect()` should have navigated
    // the user to the search result page.
    // Otherwise, gives users an opportunity to react to the event before
    // executing the form's action.
    if (highlightedItem || !searchQueryString) {
      event.preventDefault();
    } else if (
      !this.dispatchEvent(
        new CustomEvent(eventBeforeRedirect, {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            redirectUrl,
            searchQueryString,
          },
        })
      )
    ) {
      event.preventDefault();
    }
  }

  /**
   * @inheritdoc
   */
  protected _handleUserInitiatedSelectItem(
    item?: CDSDropdownItem | C4DSearchWithTypeaheadItem
  ) {
    if (item && item instanceof C4DSearchWithTypeaheadItem) {
      this._searchInputNode.value = item.text;
      this._handleUserInitiatedRedirect({
        targetQuery: item.text,
        targetHref: item.href,
      });
    }
  }

  /**
   * @inheritdoc
   */
  protected _handleKeypressInner(event: KeyboardEvent) {
    const { key } = event;
    const action = (this.constructor as typeof CDSDropdown).getAction(key);
    if (!this.open) {
      switch (action) {
        case DROPDOWN_KEYBOARD_ACTION.TRIGGERING:
          this._handleUserInitiatedToggle(true);
          break;
        default:
          break;
      }
    } else {
      switch (action) {
        case DROPDOWN_KEYBOARD_ACTION.TRIGGERING:
          {
            const { selectorItemHighlighted } = this
              .constructor as typeof CDSDropdown;
            const highlightedItem = this.shadowRoot!.querySelector(
              selectorItemHighlighted
            ) as CDSDropdownItem;
            if (highlightedItem) {
              this._handleUserInitiatedSelectItem(highlightedItem);
            } else {
              this._handleUserInitiatedToggle(false);
            }
          }
          break;
        default:
          break;
      }
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
   * Navigate through dropdown items.
   *
   * @param direction `-1` to navigate backward, `1` to navigate forward.
   */
  protected _navigate(direction: number) {
    const constructor = this.constructor as typeof C4DSearchWithTypeahead;
    const items = this.shadowRoot!.querySelectorAll(constructor.selectorItem);
    const highlightedItem = this.shadowRoot!.querySelector(
      constructor.selectorItemHighlighted
    );
    const highlightedIndex = indexOf(items, highlightedItem!);
    let nextIndex = highlightedIndex + direction;

    if (items[nextIndex] && items[nextIndex].hasAttribute('groupTitle')) {
      nextIndex += direction;
    }

    if (nextIndex < 0) {
      nextIndex = items.length - 1;
    }
    if (nextIndex >= items.length) {
      nextIndex = 0;
    }
    forEach(items, (item, i) => {
      (item as CDSDropdownItem).highlighted = i === nextIndex;
    });

    this.setAttribute('unfocused', '');

    const nextItem = items[nextIndex];
    // Using `{ block: 'nearest' }` to prevent scrolling unless scrolling is absolutely necessary.
    // `scrollIntoViewOptions` seems to work in latest Safari despite of MDN/caniuse table.
    // IE falls back to the old behavior.
    nextItem.scrollIntoView({ block: 'nearest' });

    this.requestUpdate();
  }

  /**
   * @returns The main content of the trigger button.
   */
  protected _renderTriggerContent() {
    const {
      initialSearchTerm,
      searchPlaceholder,
      searchLabel,
      userHasInputSearch,
      _handleInput: handleInput,
      _handleKeyInput: handleKeyInput,
    } = this;
    return html`
      <input
        type="text"
        part="search-input"
        class="${prefix}--header__search--input"
        name="q"
        placeholder="${searchPlaceholder}"
        value="${!userHasInputSearch ? initialSearchTerm : ''}"
        autocomplete="off"
        aria-controls="result-list"
        aria-autocomplete="list"
        aria-label="${ifDefined(searchLabel)}"
        @input="${handleInput}"
        @keydown="${handleKeyInput}"
        @keypress="${handleKeyInput}" />
    `;
  }

  /**
   * Handles `click` event to redirect based on selected item.
   *
   * @param event The event.
   */
  protected _handleClickItem(event: MouseEvent) {
    const { selectorItem } = this.constructor as typeof CDSDropdown;
    const item = (event.target as Element).closest(
      selectorItem
    ) as CDSDropdownItem;
    if (this.shadowRoot!.contains(item)) {
      this._handleUserInitiatedSelectItem(item);
    }
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
      searchLabel,
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
      <form
        role="search"
        part="search-form"
        method="get"
        action="${redirectUrl}"
        @submit="${handleSubmit}">
        <input type="hidden" name="lang" value="${primary}" />
        <input type="hidden" name="cc" value="${country}" />
        <input type="hidden" name="lnk" value="mhsrch" />
        ${this.scopeParameters
          ? html`
              <input type="hidden" name="scope-domain" value="scope" />
              <input type="hidden" name="scope-type" value="${this.appId}" />
              <input
                type="hidden"
                name="scope-value"
                value="${this.scopeValue}" />
              <input
                type="hidden"
                name="scope-label"
                value="${this.scopeLabel}" />
            `
          : ''}
        <div
          role="combobox"
          class="${classes}"
          part="container"
          aria-haspopup="listbox"
          aria-owns="result-list"
          aria-expanded="${Boolean(this.active)}"
          aria-label="${ifDefined(searchLabel)}"
          @click=${handleClickInner}
          @keydown="${handleKeydownInner}"
          @keypress="${handleKeypressInner}">
          ${this.scopeParameters
            ? html`
                <c4d-scoped-search-dropdown
                  part="dropdown"
                  value="${this.appId}">
                  ${this.scopeParameters.map(
                    (scope) => html`
                      <cds-dropdown-item
                        part="dropdown-item"
                        value="${scope.appId}"
                        >${scope.name}</cds-dropdown-item
                      >
                    `
                  )}
                </c4d-scoped-search-dropdown>
                <c4d-scoped-search-dropdown-mobile
                  part="dropdown-mobile"
                  value="${this.appId}">
                  ${this.scopeParameters.map(
                    (scope) => html`
                      <cds-select-item
                        part="select-item"
                        label="${scope.name}"
                        value="${scope.appId}"
                        >${scope.name}</cds-select-item
                      >
                    `
                  )}
                </c4d-scoped-search-dropdown-mobile>
              `
            : ``}
          ${this._renderTriggerContent()}
          ${!this.leadspaceSearch
            ? html`
                <div
                  id="result-list"
                  class="react-autosuggest__suggestions-container"
                  part="suggestions-container">
                  <ul
                    role="listbox"
                    class="${c4dPrefix}-ce__search__list react-autosuggest__suggestions-list"
                    part="suggestions-list">
                    ${this.searchResults &&
                    this.searchResults.map(
                      (item) =>
                        html`
                          <c4d-search-with-typeahead-item
                            part="suggestion-item"
                            text="${item}"></c4d-search-with-typeahead-item>
                        `
                    )}
                    ${this.groupedResults &&
                    this.groupedResults.map(
                      (group) =>
                        html`
                          <c4d-search-with-typeahead-item
                            part="suggestion-item"
                            groupTitle
                            text="${group.title}"></c4d-search-with-typeahead-item>
                          ${group.items.map(
                            (item) =>
                              html`
                                <c4d-search-with-typeahead-item
                                  part="suggestion-item"
                                  text="${item.name}"
                                  href="${item.href}"></c4d-search-with-typeahead-item>
                              `
                          )}
                        `
                    )}
                  </ul>
                </div>
              `
            : ``}
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
  closeSearchButtonAssistiveText = 'Clear input';

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
  @property({ attribute: 'placeholder', reflect: true })
  searchPlaceholder = 'Search all of IBM';

  /**
   * The redirect URL when a user selects a search suggestion.
   */
  @property({ attribute: 'redirect-url' })
  redirectUrl = 'https://www.ibm.com/search?lnk=mhsrch';

  /**
   * The `aria-label` attribute for the search input.
   */
  @property({ attribute: 'search-label' })
  searchLabel = 'IBM search field';

  /**
   * The shadow slot this search UI should be in.
   */
  @property({ reflect: true })
  slot = 'search';

  /**
   * `true` to activate the search box on page load.
   */
  @property({ type: Boolean, attribute: 'search-open-on-load' })
  searchOpenOnload = false;

  /**
   * The input value.
   */
  get searchQueryString() {
    return this._searchInputNode?.value ?? '';
  }

  /**
   * Returns query param `q` for search input if exists. Only available when searchOpenOnload is `true`
   */
  private _setSearchParam() {
    const { _searchInputNode: searchInputNode } = this;
    const URLParams = new URLSearchParams(
      this.ownerDocument!.defaultView!.location.search
    );
    const searchParam: any = this.searchOpenOnload ? URLParams.get('q') : '';
    if (searchParam) {
      searchInputNode.value = searchParam;
    }
  }

  firstUpdated() {
    this._setSearchParam();
    if (this.leadspaceSearch) {
      this.setAttribute('should-remain-open', '');
      this.setAttribute('active', '');
    }

    if (!this.appId && this.scopeParameters) {
      this.appId = 'all';
      this.redirectUrl = 'https://www.ibm.com/search/scoped';
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('searchResults')) {
      const titleElements = this.shadowRoot?.querySelectorAll(
        'c4d-search-with-typeahead-item[groupTitle]'
      );
      titleElements?.forEach((e) => {
        e.previousElementSibling?.setAttribute('lastBeforeGroup', '');
      });
    }

    if (changedProperties.has('appId')) {
      if (
        gridBreakpoint < document.body.clientWidth &&
        this._searchSuggestions &&
        this.scopeParameters
      ) {
        const scopeBarWidth = (
          this.shadowRoot?.querySelector(
            'c4d-scoped-search-dropdown'
          ) as HTMLElement
        ).offsetWidth;
        (this._searchSuggestions?.parentElement as HTMLElement)?.setAttribute(
          'style',
          `left: ${scopeBarWidth}px; width: calc(100% - ${scopeBarWidth}px);`
        );
      } else {
        (
          this._searchSuggestions?.parentElement as HTMLElement
        )?.removeAttribute('style');
      }

      if (!this.customTypeaheadAPI) {
        this.getResults(this.value).then((res) => {
          this.searchResults = res;
        });
      }

      const newPlaceholder = this.placeholderFormatter({
        appId: this.scopeParameters.filter(
          (e) => e.value === `${this.appId}`
        )[0]?.name,
      });
      this.setAttribute('placeholder', newPlaceholder);
      this.performSearchButtonAssistiveText = newPlaceholder;
    }
  }

  render() {
    const {
      active,
      closeSearchButtonAssistiveText,
      openSearchButtonAssistiveText,
      performSearchButtonAssistiveText,
      _handleClickCloseButton: handleClickCloseButton,
      _handleClickSearchButton: handleClickSearchButton,
      _handleClickItem: handleClickItem,
    } = this;
    const searchButtonAssistiveText = !active
      ? openSearchButtonAssistiveText
      : performSearchButtonAssistiveText;
    return html`
      ${!this.leadspaceSearch
        ? html`
            ${this._renderForm()}
            <div
              part="header-search-actions"
              class="${prefix}--header__search--actions">
              <button
                type="button"
                part="open-button"
                class="${prefix}--header__action ${prefix}--header__search--search"
                aria-label="${searchButtonAssistiveText}"
                @click="${handleClickSearchButton}">
                ${Search20()}
              </button>
              <button
                type="button"
                part="close-button"
                class="${prefix}--header__action ${prefix}--header__search--close"
                aria-label="${closeSearchButtonAssistiveText}"
                @click="${handleClickCloseButton}">
                ${Close20()}
              </button>
            </div>
          `
        : html`
            <div
              part="header-search-actions"
              class="${prefix}--header__search--actions">
              ${Search20({
                part: 'search-icon',
                class: `${prefix}--search-magnifier-icon`,
                role: 'img',
              })}
              ${this._renderForm()}
              <button
                type="button"
                part="close-button"
                class="${prefix}--header__action ${prefix}--header__search--close ${this
                  .value.length === 0
                  ? `${prefix}--header__search--hide`
                  : ''}"
                aria-label="${closeSearchButtonAssistiveText}"
                @click="${handleClickCloseButton}">
                ${Close20()}
              </button>
            </div>
            <div
              id="result-list"
              class="react-autosuggest__suggestions-container"
              part="suggestions-container">
              <ul
                role="listbox"
                class="${c4dPrefix}-ce__search__list react-autosuggest__suggestions-list"
                part="suggestions-list">
                ${this.searchResults &&
                this.searchResults.map(
                  (item) =>
                    html`
                      <c4d-search-with-typeahead-item
                        part="suggestion-item"
                        text="${item}"
                        @click=${handleClickItem}></c4d-search-with-typeahead-item>
                    `
                )}
              </ul>
            </div>
          `}
    `;
  }

  /**
   * A selector that will return highlighted search result items.
   */
  static get selectorItemHighlighted() {
    return `${c4dPrefix}-search-with-typeahead-item[highlighted]`;
  }

  /**
   * A selector that will return search result items.
   */
  static get selectorItem() {
    return `${c4dPrefix}-search-with-typeahead-item`;
  }

  /**
   * The name of the custom event fired before the page is being redirected to the search result page.
   * Cancellation of this event stops the user-initiated action of redirection.
   */
  static get eventBeforeRedirect() {
    return `${c4dPrefix}-search-with-typeahead-beingredirected`;
  }

  /**
   * The name of the custom event fired after the search content is changed upon a user gesture.
   */
  static get eventInput() {
    return `${c4dPrefix}-search-with-typeahead-input`;
  }

  /**
   * The name of the custom event captured to retrieve the new search scope.
   */
  static get eventSelectScope() {
    return `${prefix}-select-selected`;
  }

  /**
   * The name of the custom event captured to retrieve the custom typeahead API results.
   */
  static get eventCustomResults() {
    return `${c4dPrefix}-custom-typeahead-api-results`;
  }

  /**
   * The name of the custom event fired after this search box is toggled upon a user gesture.
   */
  static get eventToggle() {
    return `${c4dPrefix}-search-with-typeahead-toggled`;
  }

  static get stableSelector() {
    return `${c4dPrefix}--search-with-typeahead`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DSearchWithTypeahead;
