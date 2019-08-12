/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import root from 'window-or-global';
import { SearchTypeaheadAPI } from '@ibmdotcom/services';
import { escapeRegExp } from '@ibmdotcom/utilities';
import MastheadSearchInput from './MastheadSearchInput';
import MastheadSearchSuggestion from './MastheadSearchSuggestion';

/**
 * Sets up the redirect URL when a user selects a search suggestion
 *
 * @type {string}
 * @private
 */
const _redirectUrl = `https://www.ibm.com/search?lnk=mhsrch`;

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
const MastheadSearch = ({ placeHolderText, renderValue }) => {
  const [state, dispatch] = useReducer(_reducer, _initialState);

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
   * @type {{onBlur: onBlur, onChange: onChange, placeholder: *, value: *, onFocus: onFocus}}
   */
  const inputProps = {
    placeholder: placeHolderText,
    value: state.val,
    onChange,
    onFocus: e => {
      e.target.placeholder = '';
    },
    onBlur: e => {
      e.target.placeholder = placeHolderText;
    },
  };

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
      />
    );
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
    const lang = 'en'; // TODO: pull lang from locale selector
    const cc = 'us'; // TODO: pull cc from the locale selector
    root.location.href = `${_redirectUrl}&q=${encodeURIComponent(
      suggestionValue
    )}&lang=${lang}&cc=${cc}`;
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
    <div data-autoid="masthead__search">
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
    </div>
  );
};

/**
 * @property propTypes
 * @description Defined property types for component
 * @type {{placeHolderText: shim, renderValue: shim}}
 */
MastheadSearch.propTypes = {
  placeHolderText: PropTypes.string,
  renderValue: PropTypes.number,
};

/**
 * @property defaultProps
 * @type {{placeHolderText: string, renderValue: number}}
 */
MastheadSearch.defaultProps = {
  placeHolderText: '',
  renderValue: 3,
};

// Export the react component
export default MastheadSearch;
