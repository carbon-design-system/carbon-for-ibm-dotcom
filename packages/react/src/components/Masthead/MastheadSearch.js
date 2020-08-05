/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import Autosuggest from 'react-autosuggest';
import Close20 from '@carbon/icons-react/es/close/20';
import cx from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import escapeRegExp from '@carbon/ibmdotcom-utilities/es/utilities/escaperegexp/escaperegexp';
import HeaderGlobalAction from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderGlobalAction';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale';
import MastheadSearchInput from './MastheadSearchInput';
import MastheadSearchSuggestion from './MastheadSearchSuggestion';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import Search20 from '@carbon/icons-react/es/search/20';
import SearchTypeaheadAPI from '@carbon/ibmdotcom-services/es/services/SearchTypeahead/SearchTypeahead';
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
const _trimAndLower = valueString => valueString.toLowerCase().trim();

/**
 * When a suggestion item is clicked, we populate the input with its name field
 *
 * @param {object} suggestion The individual object from the data
 * @returns {*} The name val
 */
const _getSuggestionValue = suggestion => suggestion[0];

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

/**
 * MastheadSearch component which includes autosuggestion results from the
 * SearchTypeaheadAPI.
 *
 * The search field utilizes "react-autosuggest". Documentation available here:
 * http://react-autosuggest.js.org/
 * https://github.com/moroshko/react-autosuggest
 */
const MastheadSearch = ({ placeHolderText, renderValue, searchOpenOnload }) => {
  const { ref } = useSearchVisible(false);

  /**
   * Initial state of the autocomplete component
   *
   * @type {{val: string, prevSuggestions: Array, suggestions: Array, suggestionContainerVisible: boolean}}
   * @private
   */
  const _initialState = {
    val: '',
    suggestions: [],
    prevSuggestions: [],
    suggestionContainerVisible: false,
    isSearchOpen: searchOpenOnload,
    lc: 'en',
    cc: 'us',
  };

  const [state, dispatch] = useReducer(_reducer, _initialState);

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
      if (!abortController.signal.aborted && response) {
        dispatch({ type: 'setLc', payload: { lc: response.lc } });
        dispatch({ type: 'setCc', payload: { cc: response.cc } });
      }
    })();
    return () => {
      abortController.abort();
    };
  }, []);

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
    const handleHideSearch = event => {
      if (event.key === 'Escape') {
        if (!state.suggestionContainerVisible) {
          dispatch({ type: 'setSearchClosed' });
        }
      }
    };

    /**
     * Close search when click detected outside of component.
     * This is necessary otherwise search stays open even when
     * elements other than the close button are clicked.
     *
     * @param {*} event Click event outside search component
     */
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch({ type: 'setSearchClosed' });
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
    [`${prefix}--masthead__search--active`]: state.isSearchOpen,
  });

  /**
   * When the input field changes, we set the new val to our state
   *
   * @param {event} event The callback event
   * @param {string} newValue The new val of the input
   */
  function onChange(event, { newValue }) {
    dispatch({ type: 'setVal', payload: { val: newValue } });
  }

  /**
   * Autosuggest will pass through all these props to the input.
   *
   * @type {{placeholder: string, value: string, onChange: Function, className: string}}
   */
  const inputProps = {
    placeholder: placeHolderText,
    value: state.val,
    onChange,
    className: `${prefix}--header__search--input`,
  };

  /**
   * Executes the logic for the search icon depending on search input state.
   * This will execute the search if the search is open, or will open the
   * search field if closed.
   *
   */
  function searchIconClick() {
    if (state.isSearchOpen) {
      root.parent.location.href = getRedirect(state.val);
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
  function closeBtnAction() {
    resetSearch();
    const searchIconRef = root.document.querySelectorAll(
      `[data-autoid="${stablePrefix}--header__search--search"]`
    );
    searchIconRef && searchIconRef[0].focus();
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
        isActive={state.isSearchOpen}
        searchIconClick={searchIconClick}
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
      let response = await SearchTypeaheadAPI.getResults(searchValue);

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
   */
  function onSuggestionSelected(event, { suggestionValue }) {
    root.parent.location.href = getRedirect(suggestionValue);
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

  return (
    <div
      data-autoid={`${stablePrefix}--masthead__search`}
      className={className}
      ref={ref}>
      {state.isSearchOpen && (
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
            onSuggestionSelected={onSuggestionSelected} // When a suggestion is selected
            highlightFirstSuggestion // First suggestion is highlighted by default
            inputProps={inputProps}
            renderInputComponent={renderInputComponent}
            shouldRenderSuggestions={shouldRenderSuggestions}
          />
        </form>
      )}
      <div className={`${prefix}--header__search--actions`}>
        <HeaderGlobalAction
          onClick={searchIconClick}
          aria-label={
            state.isSearchOpen ? 'Search all of IBM' : 'Open IBM search field'
          }
          className={`${prefix}--header__search--search`}
          data-autoid={`${stablePrefix}--header__search--search`}
          tabIndex="0">
          <Search20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          onClick={closeBtnAction}
          aria-label="Close"
          className={`${prefix}--header__search--close`}
          data-autoid={`${stablePrefix}--header__search--close`}>
          <Close20 />
        </HeaderGlobalAction>
      </div>
    </div>
  );
};

MastheadSearch.propTypes = {
  /**
   * Placeholder text for the search field.
   */
  placeHolderText: PropTypes.string,

  /**
   * Number of characters to begin showing suggestions.
   */
  renderValue: PropTypes.number,

  /**
   * `true` to make the search field open in the initial state.
   */
  searchOpenOnload: PropTypes.bool,
};

MastheadSearch.defaultProps = {
  placeHolderText: 'Search all of IBM',
  renderValue: 3,
  searchOpenOnload: false,
};

// Export the react component
export default MastheadSearch;
