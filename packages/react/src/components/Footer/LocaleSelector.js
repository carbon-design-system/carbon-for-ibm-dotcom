import React from 'react';
import PropTypes from 'prop-types';
import { localeSelector } from '../../internal/FeatureFlags';

/**
 * EXPERIMENTAL: Renders the locale selector
 *
 * @param {object} props Incoming props
 * @param {string} props.text Sample string
 * @returns {*} The rendered component
 * @private
 * @class
 */
const LocaleSelector = ({ text }) => <div>{text}</div>;

/**
 * @property propTypes
 * @description Defined property types for component
 * @type {{text: shim}}
 */
LocaleSelector.propTypes = {
  text: PropTypes.string,
};

/**
 * @property defaultProps
 * @type {{placeHolderText: string, renderValue: number}}
 */
LocaleSelector.defaultProps = {
  text: 'This is the Locale Selector',
};

export default localeSelector ? LocaleSelector : null;
