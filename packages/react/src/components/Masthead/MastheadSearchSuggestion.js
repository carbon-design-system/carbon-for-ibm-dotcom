import classNames from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

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
  const matches = match(suggestionValue, query);
  const parts = parse(suggestionValue, matches);

  return (
    <div
      className={classNames(`${prefix}--container-class`, {
        [`${prefix}--container-highlight-class`]: isHighlighted,
      })}
      tabIndex="-1"
      data-autoid={`${stablePrefix}--masthead__searchresults--suggestion`}>
      {parts.map((part, index) => (
        <span
          key={index}
          style={{
            fontWeight: part.highlight ? 600 : 400, // TODO: switch to final styles
          }}>
          {part.text.replace(' ', '\u00A0')}
        </span>
      ))}
    </div>
  );
};

/**
 * @property {object} propTypes MastheadSearchSuggestion propTypes
 * @description Defined property types for component
 * @type {{isHighlighted: boolean, suggestion: Array, query: string, getSuggestionValue: Function}}
 */
MastheadSearchSuggestion.propTypes = {
  suggestion: PropTypes.array,
  query: PropTypes.string,
  isHighlighted: PropTypes.bool,
  getSuggestionValue: PropTypes.func,
};

/**
 * @property {object} defaultProps default MastheadSearchSuggestion props
 * @type {{isHighlighted: boolean, suggestion: {}, query: string, getSuggestionValue: MastheadSearchSuggestion.defaultProps.getSuggestionValue}}
 */
MastheadSearchSuggestion.defaultProps = {
  suggestion: [],
  query: '',
  isHighlighted: false,
  getSuggestionValue: () => {},
};

export default MastheadSearchSuggestion;
