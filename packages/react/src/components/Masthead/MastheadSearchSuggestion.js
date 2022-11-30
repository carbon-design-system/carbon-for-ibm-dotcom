/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * The rendered suggestion in the suggestion list.
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
      data-autoid={`${stablePrefix}--masthead__searchresults--suggestion`}
      {...(suggestion.href ? { 'data-href': suggestion.href } : {})}
    >
      {parts.map((part, index) => (
        <span
          key={index}
          style={{
            // TODO: switch to final styles
            fontWeight: part.highlight ? 600 : 400,
          }}
        >
          {part.text.replace(' ', '\u00A0')}
        </span>
      ))}
    </div>
  );
};

MastheadSearchSuggestion.propTypes = {
  /**
   * The individual object from the data.
   */
  suggestion: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object,
  ]),

  /**
   * The query being searched for.
   */
  query: PropTypes.string,

  /**
   * `true` to make the suggestion currently highlighted by the user.
   */
  isHighlighted: PropTypes.bool,

  /**
   * A funciton ot get the suggestion value.
   */
  getSuggestionValue: PropTypes.func,
};

MastheadSearchSuggestion.defaultProps = {
  suggestion: [],
  query: '',
  isHighlighted: false,
  getSuggestionValue: () => {},
};

export default MastheadSearchSuggestion;
