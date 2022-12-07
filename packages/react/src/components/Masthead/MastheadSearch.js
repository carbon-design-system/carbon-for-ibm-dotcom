/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import Autosuggest from 'react-autosuggest';
import Close20 from '@carbon/icons-react/es/close/20';
import cx from 'classnames';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import escapeRegExp from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/escaperegexp/escaperegexp';
import HeaderGlobalAction from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderGlobalAction';
import LocaleAPI from '../../internal/vendor/@carbon/ibmdotcom-services/services/Locale/Locale';
import MastheadSearchInput from './MastheadSearchInput';
import MastheadSearchSuggestion from './MastheadSearchSuggestion';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import Search20 from '@carbon/icons-react/es/search/20';
import SearchTypeaheadAPI from '../../internal/vendor/@carbon/ibmdotcom-services/services/SearchTypeahead/SearchTypeahead';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Sets up the redirect URL when a user selects a search suggestion
 *
 * @type {string}
 * @private
 */
const _redirectUrl =
  process.env.SEARCH_REDIRECT_ENDPOINT ||
  `https://www.ibm.com/search?lnk=mhsrch`;

/**
 * Converts the string to lower case and trims extra white space
 *
 * @param {string} valueString The text field
 * @returns {string} lower cased and trimmed text
 */
const _trimAndLower = (valueString) => valueString.toLowerCase().trim();

/**
 * When a suggestion item is clicked, we populate the input with its name field
 *
 * @param {object} suggestion The individual object or key name from the data
 * @returns {*} The name val
 */
const _getSuggestionValue = (suggestion) => suggestion[0] || suggestion.name;

/**
 * Reducer for the useReducer hook
 *
 * @param {object} state The state
 * @param {object} action contains the type and payload
 * @returns {*} the new state value
 * @private
 */
function _reducer(state, action) {
  switch (action.type) {
    case 'setVal':
      return Object.assign({}, state, { val: action.payload.val });
    case 'emptySuggestions':
      return Object.assign({}, state, { suggestions: [] });
    case 'setPrevSuggestions':
      return Object.assign({}, state, {
        prevSuggestions: action.payload.prevSuggestions,
      });
    case 'setSuggestionsToPrevious':
      return Object.assign({}, state, { suggestions: state.prevSuggestions });
    case 'showSuggestionsContainer':
      return Object.assign({}, state, { suggestionContainerVisible: true });
    case 'hideSuggestionsContainer':
      return Object.assign({}, state, { suggestionContainerVisible: false });
    case 'setSearchOpen':
      return Object.assign({}, state, { isSearchOpen: true });
    case 'setSearchClosed':
      return Object.assign({}, state, { isSearchOpen: false });
    case 'setLc':
      return Object.assign({}, state, { lc: action.payload.lc });
    case 'setCc':
      return Object.assign({}, state, { cc: action.payload.cc });
    default:
      return state;
  }
}

let openOnLoadFocus = true;

/**
 * MastheadSearch component which includes autosuggestion results from the
 * SearchTypeaheadAPI.
 *
 * The search field utilizes "react-autosuggest". Documentation available here:
 * http://react-autosuggest.js.org/
 * https://github.com/moroshko/react-autosuggest
 */
const MastheadSearch = forwardRef(
  (
    {
      placeHolderText,
      initialSearchTerm,
      renderValue,
      searchOpenOnload,
      navType,
      isSearchActive: propIsSearchActive,
      onChangeSearchActive,
      ...rest
    },
    searchIconButton
  ) => {
    const { ref } = useSearchVisible(false);

    /**
     * Initial state of the autocomplete component
     *
     * @type {{val: string, prevSuggestions: Array, suggestions: Array, suggestionContainerVisible: boolean}}
     * @private
     */
    const _initialState = {
      val: initialSearchTerm || getValueFromQueryString() || '',
      suggestions: [],
      prevSuggestions: [],
      suggestionContainerVisible: false,
      isSearchOpen: searchOpenOnload,
      lc: 'en',
      cc: 'us',
    };

    const [state, dispatch] = useReducer(_reducer, _initialState);

    const [isSearchActive, setIsSearchActive] = useState(searchOpenOnload);
    useEffect(() => {
      setIsSearchActive(propIsSearchActive);
    }, [propIsSearchActive]);

    const handleChangeSearchActive = useCallback(
      (event) => {
        const newisSearchActive = !isSearchActive;
        setIsSearchActive(newisSearchActive);
        openOnLoadFocus = false;
        onChangeSearchActive(event, { isOpen: newisSearchActive });
      },
      [isSearchActive, onChangeSearchActive]
    );

    // Sets aria-labelledby to suggestions list to suppress a11y errors.
    // Autosuggest package does not provide method to add attribute to this element.
    useEffect(() => {
      const suggestionsListContainer = document.getElementById(
        'react-autowhatever-1'
      );

      suggestionsListContainer &&
        suggestionsListContainer.setAttribute(
          'aria-labelledby',
          `${prefix}--header__search--input`
        );
    });

    useEffect(() => {
      const abortController =
        typeof AbortController !== 'undefined'
          ? new AbortController()
          : {
              signal: {},
              abort() {
                this.signal.aborted = true;
              },
            };
      abortController.abort();
      (async () => {
        const response = await LocaleAPI.getLang();
        state.lc = response.lc;
        state.cc = response.cc;

        if (!abortController.signal.aborted && response) {
          dispatch({ type: 'setLc', payload: { lc: response.lc } });
          dispatch({ type: 'setCc', payload: { cc: response.cc } });
        }
      })();
      return () => {
        abortController.abort();
      };
    }, [state]);

    /**
     * Event handlers to toggle visiblity of search
     *
     * @returns {*} search ref
     */
    function useSearchVisible() {
      const ref = useRef(null);
      /**
       * Close search entirely if autosuggestions collapsed
       *
       * @param {*} event Escape keypress
       */
      const handleHideSearch = (event) => {
        if (event.key === 'Escape') {
          if (!state.suggestionContainerVisible) {
            dispatch({ type: 'setSearchClosed' });
            resetSearch();
          }
        }
      };

      /**
       * Close search when click detected outside of component.
       * This is necessary otherwise search stays open even when
       * elements other than the close button and the
       * profile button are clicked.
       *
       * @param {*} event Click event outside masthead component
       */
      const handleClickOutside = (event) => {
        if (!searchOpenOnload) {
          const mastheadRef = ref.current?.closest(`.${prefix}--masthead`);
          if (mastheadRef && !mastheadRef.contains(event.target)) {
            // If a click was detected outside the Search ref but there is a text value in state, don't hide the Search.
            if (state.val.length === 0 && isSearchActive) {
              handleChangeSearchActive();
              resetSearch();
            }
          }
        }
      };

      useEffect(() => {
        root.document.addEventListener('keydown', handleHideSearch, true);
        root.document.addEventListener('click', handleClickOutside, true);
        return () => {
          root.document.removeEventListener('keydown', handleHideSearch, true);
          root.document.removeEventListener('click', handleClickOutside, true);
        };
      });

      return { ref };
    }

    const className = cx({
      [`${prefix}--masthead__search`]: true,
      [`${prefix}--masthead__search--active`]: isSearchActive,
    });

    /**
     * Custom event emitted when search does not redirect to default url
     *
     * @param {event} event The callback event
     * @param {object} params Custom event parameters
     * @param {object} params.suggestion the selected suggestion in `react-autosuggest`
     * @param {string} params.suggestionValue The new val of the input
     * @param {string} params.method String describing how the change has occurred (data from `react-autosuggest`)
     */
    function onSearchNoRedirect(
      event,
      { suggestion, suggestionValue, method }
    ) {
      const onSearchNoRedirect = new CustomEvent('onSearchNoRedirect', {
        bubbles: true,
        detail: {
          method,
          suggestion,
          value: suggestionValue,
        },
      });

      event.currentTarget.dispatchEvent(onSearchNoRedirect);
    }

    /**
     * Custom onKeyDown event handlers
     *
     * @param {event} event The callback event
     */
    function onKeyDown(event) {
      switch (event.key) {
        case 'Enter': {
          // Disables Enter key if searchNoRirect is true
          if (rest.searchNoRedirect) {
            onSearchNoRedirect(event, state.val);
            event.preventDefault();
          }
          // Disable search on enter key if the search field is empty
          if (!state.val) {
            event.preventDefault();
          }
        }
      }
    }

    /**
     * When the input field changes, we set the new val to our state
     *
     * @param {event} event The callback event
     * @param {string} newValue The new val of the input
     */
    function onChange(event, { newValue }) {
      // emit custom event for search input onchange
      const onSearchValueChanged = new CustomEvent('onSearchValueChanged', {
        bubbles: true,
        detail: { value: newValue },
      });

      event.currentTarget.dispatchEvent(onSearchValueChanged);
      dispatch({ type: 'setVal', payload: { val: newValue } });
    }

    /**
     * Autosuggest will pass through all these props to the input.
     *
     * @type {{placeholder: string, value: string, onChange: Function, className: string, 'aria-labelledby': string, role: string, 'aria-expanded': string}}
     */
    const inputProps = {
      placeholder: placeHolderText,
      value: state.val,
      onChange,
      onKeyDown,
      className: `${prefix}--header__search--input`,
      'aria-label': placeHolderText,
      role: 'combobox',
      'aria-expanded': isSearchActive,
      id: `${prefix}--header__search--input`,
    };

    /**
     * Autosuggest will pass through all these props to the container.
     * Set WAI-ARIA attributes to null to override default container
     * which is following outdated 1.1 specifications.
     *
     */
    const containerProps = {
      role: null,
      'aria-haspopup': null,
      'aria-owns': null,
      'aria-expanded': null,
      'aria-label': null,
    };

    /**
     * Executes the logic for the search icon depending on search input state.
     * This will execute the search if the search is open, or will open the
     * search field if closed.
     *
     */
    function searchIconClick(event) {
      // emit custom event for search icon click when search is closed
      if (!isSearchActive) {
        const onOpenSearch = new CustomEvent('onOpenSearch', {
          bubbles: true,
        });

        event.currentTarget.dispatchEvent(onOpenSearch);

        dispatch({ type: 'setSearchOpen' });
        handleChangeSearchActive();
      }

      // emit custom event for search icon click when search is open
      if (isSearchActive) {
        const onSearchButtonClicked = new CustomEvent('onSearchButtonClicked', {
          bubbles: true,
          detail: { value: state.val },
        });

        event.currentTarget.dispatchEvent(onSearchButtonClicked);
      }

      if (isSearchActive && state.val.length) {
        if (rest.searchNoRedirect) {
          onSearchNoRedirect(event, { suggestionValue: state.val });
        } else {
          root.parent.location.href = getRedirect(state.val);
        }
      } else {
        dispatch({ type: 'setSearchOpen' });
      }
    }

    /**
     * Clear search and clear input when called
     */
    const resetSearch = useCallback(() => {
      dispatch({ type: 'setSearchClosed' });
      dispatch({
        type: 'setVal',
        payload: { val: '' },
      });
    }, [dispatch]);

    /**
     * closeBtnAction resets and sets focus after search is closed
     */
    function closeBtnAction(event) {
      // emit custom event for search close button click
      const onSearchCloseClicked = new CustomEvent('onSearchCloseClicked', {
        bubbles: true,
      });

      event.currentTarget.dispatchEvent(onSearchCloseClicked);

      resetSearch();
      handleChangeSearchActive();
    }

    /**
     * Renders the input bar with the search icon
     *
     * @param {object} componentInputProps contains the input props
     * @returns {*} The rendered component
     */
    function renderInputComponent(componentInputProps) {
      return (
        <MastheadSearchInput
          componentInputProps={componentInputProps}
          dispatch={dispatch}
          isActive={isSearchActive}
          disableFocus={openOnLoadFocus}
        />
      );
    }

    /**
     * Returns the action/redirect value
     *
     * @param {string} value string value from the input or suggestions list
     * @returns {string} final redirect string
     */
    function getRedirect(value) {
      return `${_redirectUrl}&q=${encodeURIComponent(value)}&lang=${
        state.lc
      }&cc=${state.cc}`;
    }

    /**
     * Renders the Suggestion Value with the function for the adding the suggestion
     *
     * @param {object} suggestion The suggestion to render
     * @param {object} properties The property object of the incoming suggestion
     * @param {string} properties.query The query being searched for
     * @param {boolean} properties.isHighlighted Whether the suggestion is currently highlighted by the user
     * @returns {*} The suggestion value
     */
    function renderSuggestion(suggestion, { query, isHighlighted }) {
      return (
        <MastheadSearchSuggestion
          suggestion={suggestion}
          query={query}
          isHighlighted={isHighlighted}
          getSuggestionValue={_getSuggestionValue}
        />
      );
    }

    /**
     * This function is called everytime we need new suggestions. If input has
     * changed, we fetch for new suggestions else we return the previous
     * suggestions
     *
     * Available reason values:
     * https://github.com/moroshko/react-autosuggest#onsuggestionsfetchrequested-required
     *
     * @param {object} request Object response from when onSuggestionsFetchRequested is called
     * @param {string} request.value the current value of the input
     * @param {string} request.reason string describing why onSuggestionsFetchRequested was called
     */
    async function onSuggestionsFetchRequest(request) {
      const searchValue = _trimAndLower(escapeRegExp(request.value));

      if (request.reason === 'input-changed') {
        // if the search input has changed
        let response = rest.customTypeaheadApi
          ? await rest.customTypeaheadApi(searchValue)
          : await SearchTypeaheadAPI.getResults(searchValue);

        if (response !== undefined) {
          dispatch({
            type: 'setPrevSuggestions',
            payload: { prevSuggestions: response },
          });
          dispatch({ type: 'setSuggestionsToPrevious' });
          dispatch({ type: 'showSuggestionsContainer' });
        }
      } else if (request.reason === 'escape-pressed') {
        onSuggestionsClearedRequested();
      } else {
        dispatch({ type: 'setSuggestionsToPrevious' });
        dispatch({ type: 'showSuggestionsContainer' });
      }
    }

    /**
     * Called every time we clear suggestions
     */
    function onSuggestionsClearedRequested() {
      dispatch({ type: 'emptySuggestions' });
      dispatch({ type: 'hideSuggestionsContainer' });
    }

    /**
     * Sends the user to the search results page when a suggestion is selected
     *
     * @param {object} event The event object
     * @param {object} params Param object coming from react-autosuggest
     * @param {string} params.suggestionValue Suggestion value
     * @param {string} params.method Method of selection ("click" or "enter")
     */
    function onSuggestionSelected(
      event,
      { suggestion, suggestionValue, method }
    ) {
      if (rest.searchNoRedirect) {
        onSearchNoRedirect(event, { suggestion, suggestionValue, method });
        event.preventDefault();
      } else {
        root.parent.location.href = getRedirect(suggestionValue);
      }
    }

    /**
     * Only render suggestions if we have more than the renderValue
     *
     * @param {string} value Name of the suggestion
     * @returns {boolean} Whether or not to display the value
     */
    function shouldRenderSuggestions(value) {
      return value.trim().length >= renderValue;
    }

    /**
     * Render section title
     *
     * @param {Array} section Array of section results
     * @returns {string} Section title
     */
    function renderSectionTitle(section) {
      return section.items.length > 0 && section.title ? (
        <span>{section.title}</span>
      ) : null;
    }

    /**
     * Render section results
     *
     * @param {Array} section Array of section results
     * @returns {object} Section items
     */
    function getSectionSuggestions(section) {
      return section.items;
    }

    /**
     * Get inital search term from query string
     *
     * @returns {string} Search term
     */
    function getValueFromQueryString() {
      try {
        return new URLSearchParams(root.location.search).get('q');
      } catch (e) {
        return '';
      }
    }

    /* eslint-disable react/prop-types */
    const renderSuggestionsContainer = ({ containerProps, children }) => (
      <div {...containerProps}>{children}</div>
    );

    return (
      <div
        data-autoid={`${stablePrefix}--masthead__search`}
        className={className}
        ref={ref}>
        {isSearchActive && (
          <form
            id={`${prefix}--masthead__search--form`}
            action={_redirectUrl}
            method="get">
            <input type="hidden" name="lang" value={state.lc} />
            <input type="hidden" name="cc" value={state.cc} />
            <input type="hidden" name="lnk" value="mhsrch" />
            <Autosuggest
              suggestions={state.suggestions} // The state value of suggestion
              onSuggestionsFetchRequested={onSuggestionsFetchRequest} // Method to fetch data (should be async call)
              onSuggestionsClearRequested={onSuggestionsClearedRequested} // When input bar loses focus
              getSuggestionValue={_getSuggestionValue} // Name of suggestion
              renderSuggestion={renderSuggestion} // How to display a suggestion
              renderSuggestionsContainer={renderSuggestionsContainer}
              onSuggestionSelected={onSuggestionSelected} // When a suggestion is selected
              focusInputOnSuggestionClick={false}
              inputProps={inputProps}
              containerProps={containerProps}
              renderInputComponent={renderInputComponent}
              shouldRenderSuggestions={shouldRenderSuggestions}
              {...(rest.multiSection
                ? {
                    multiSection: true,
                    renderSectionTitle,
                    getSectionSuggestions,
                  }
                : {})}
            />
          </form>
        )}
        <div className={`${prefix}--header__search--actions`}>
          <HeaderGlobalAction
            onClick={searchIconClick}
            aria-label={
              isSearchActive ? 'Search all of IBM' : 'Open IBM search field'
            }
            className={`${prefix}--header__search--search`}
            data-autoid={`${stablePrefix}--masthead-${navType}__l0-search`}
            tabIndex={0}
            ref={searchIconButton}>
            <Search20 />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            onClick={closeBtnAction}
            aria-label="Close"
            className={`${prefix}--header__search--close`}
            data-autoid={`${stablePrefix}--masthead-${navType}__l0-search--close`}>
            <Close20 />
          </HeaderGlobalAction>
        </div>
      </div>
    );
  }
);

MastheadSearch.propTypes = {
  /**
   * Placeholder text for the search field.
   */
  placeHolderText: PropTypes.string,

  /**
   * Initial value for the search field.
   */
  initialSearchTerm: PropTypes.string,

  /**
   * Current <MastheadSearch /> state returned to <Masthead />
   */
  isSearchActive: PropTypes.bool,

  /**
   * Hook to toggle active state back to <Masthead />
   */
  onChangeSearchActive: PropTypes.func,

  /**
   * Number of characters to begin showing suggestions.
   */
  renderValue: PropTypes.number,

  /**
   * `true` to make the search field open in the initial state.
   */
  searchOpenOnload: PropTypes.bool,

  /**
   * navigation type for autoids
   */
  navType: PropTypes.oneOf(['default', 'alt', 'eco']),
};

MastheadSearch.defaultProps = {
  placeHolderText: 'Search all of IBM',
  initialSearchTerm: '',
  renderValue: 3,
  searchOpenOnload: false,
};

// Export the react component
export default MastheadSearch;
