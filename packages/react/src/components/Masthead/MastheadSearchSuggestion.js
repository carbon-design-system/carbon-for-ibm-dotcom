import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import parse from 'autosuggest-highlight/parse';

/**
 * Matches a suggestion name with the query
 *
 * @param {*}regexp The regex expression containg the query and the global match flag
 * @param {string} haystack The suggestion
 * @returns {Array} Array of matches
 * @private
 */
function _matchAll(regexp, haystack) {
  const matches = [];
  let match = regexp.exec(haystack);
  while (match) {
    matches.push([match.index, match.index + match[0].length]);
    match = regexp.exec(haystack);
  }
  return matches;
}

/**
 * The rendered suggestion in the suggestion list
 *
 * @param {object} props Incoming props
 * @param {object} props.suggestion The individual object from the data
 * @param {string} props.query The query being searched for
 * @param {boolean} props.isHighlighted Whether the suggestion is currently highlighted by the user
 * @param {Function} props.getSuggestionValue Gets the suggestion value
 * @returns {*} The individual suggested item with styles
 * @class
 */
const MastheadSearchSuggestion = ({
  suggestion,
  query,
  isHighlighted,
  getSuggestionValue,
}) => {
  const suggestionValue = getSuggestionValue(suggestion);
  const matches = _matchAll(new RegExp(query, 'gi'), suggestionValue);
  const parts = parse(suggestionValue, matches);

  return (
    <div
      className={classNames('container-class', {
        ['container-highlight-class']: isHighlighted,
      })}
      data-autoid={`masthead__searchresults--suggestion`}>
      {parts.map((part, index) => (
        <span
          key={index}
          style={{
            fontWeight: part.highlight ? 600 : 400, // TODO: switch to final styles
          }}>
          {part.text}
        </span>
      ))}
    </div>
  );
};

/**
 * @property propTypes
 * @description Defined property types for component
 * @type {{isHighlighted: shim, suggestion: shim, query: shim, getSuggestionValue: shim}}
 */
MastheadSearchSuggestion.propTypes = {
  suggestion: PropTypes.object,
  query: PropTypes.string,
  isHighlighted: PropTypes.bool,
  getSuggestionValue: PropTypes.func,
};

/**
 * @property defaultProps
 * @type {{isHighlighted: boolean, suggestion: {}, query: string, getSuggestionValue: MastheadSearchSuggestion.defaultProps.getSuggestionValue}}
 */
MastheadSearchSuggestion.defaultProps = {
  suggestion: {},
  query: '',
  isHighlighted: false,
  getSuggestionValue: () => {},
};

export default MastheadSearchSuggestion;
