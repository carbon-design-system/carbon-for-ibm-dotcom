/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { LocaleAPI } from '@carbon/ibmdotcom-services';
import { settings } from 'carbon-components';
import Autosuggest from 'react-autosuggest';
import root from 'window-or-global';
import { SearchTypeaheadAPI } from '@carbon/ibmdotcom-services';
import { escapeRegExp } from '@carbon/ibmdotcom-utilities';
import MastheadSearchInput from './MastheadSearchInput';
import MastheadSearchSuggestion from './MastheadSearchSuggestion';
import cx from 'classnames';

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
  isSearchOpen: false,
  lc: 'en',
  cc: 'us',
};

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
      return Object.assign({}, state, { val: action.payload.lc });
    case 'setCc':
      return Object.assign({}, state, { val: action.payload.cc });
    default:
      return state;
  }
}

/**
 * MastheadSearch component which includes autosuggestion results from the
 * SearchTypeaheadAPI
 *
 * The search field utilizes "react-autosuggest". Documentation available here:
 * http://react-autosuggest.js.org/
 * https://github.com/moroshko/react-autosuggest
 *
 * @param {object} props Incoming props
 * @param {string} props.placeHolderText Placeholder text for the search field
 * @param {number} props.renderValue Number of characters to begin showing suggestions
 * @class
 */
const MastheadSearch = ({ placeHolderText, renderValue, searchOpenOnload }) => {
  if (searchOpenOnload) {
    _initialState.isSearchOpen = true;
  }
  const [state, dispatch] = useReducer(_reducer, _initialState);

  useEffect(() => {
    (async () => {
      const response = await LocaleAPI.getLang();
      if (response) {
        dispatch({ type: 'setLc', payload: { lc: response.lc } });
        dispatch({ type: 'setLc', payload: { cc: response.cc } });
      }
    })();
  }, []);

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
   * Close search and suggestions only when search container blurs
   *
   * @param {event} event The callback event
   */
  function onBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      dispatch({ type: 'setSearchClosed' });
    }
  }

  /**
   * Autosuggest will pass through all these props to the input.
   *
   * @type {{placeholder: string, value: string, onChange: Function, className: string, onKeyDown: Function}}
   */
  const inputProps = {
    placeholder: placeHolderText,
    value: state.val,
    onChange,
    className: `${prefix}--header__search--input`,
    onKeyDown: event => {
      switch (event.key) {
        case 'Escape':
          return dispatch({ type: 'setSearchClosed' });
        default:
          break;
      }
    },
  };

  /**
   * Executes the logic for the search icon depending on search input state.
   * This will execute the search if the search is open, or will open the
   * search field if closed.
   */
  function searchIconClick() {
    if (state.isSearchOpen) {
      root.parent.location.href = getRedirect(state.val);
    } else {
      dispatch({ type: 'setSearchOpen' });
    }
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
      onBlur={onBlur}>
      <form action={_redirectUrl} method="get">
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
    </div>
  );
};

/**
 * @property propTypes
 * @description Defined property types for component
 * @type {{placeHolderText: string, renderValue: number}}
 */
MastheadSearch.propTypes = {
  placeHolderText: PropTypes.string,
  renderValue: PropTypes.number,
  searchOpenOnload: PropTypes.bool,
};

/**
 * @property defaultProps
 * @type {{placeHolderText: string, renderValue: number}}
 */
MastheadSearch.defaultProps = {
  placeHolderText: 'Search all of IBM',
  renderValue: 3,
  searchOpenOnload: false,
};

// Export the react component
export default MastheadSearch;
