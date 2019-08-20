import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';

/**
 * Renders the input bar with the search icon
 *
 * @param {object} props Incoming props
 * @param {object} props.componentInputProps contains the input props
 * @param {Function} props.dispatch for component reducer
 * @returns {*} The rendered component
 */
const MastheadSearchInput = ({ componentInputProps, dispatch }) => (
  <div>
    <input {...componentInputProps} data-autoid="masthead__search--input" />
    <button
      type="button"
      onClick={() => dispatch({ type: 'setVal', payload: { val: '' } })}
    />
  </div>
);

/**
 * @property propTypes
 * @description Defined property types for component
 * @type {{placeHolderText: shim, renderValue: shim}}
 */
MastheadSearchInput.propTypes = {
  componentInputProps: PropTypes.object,
  dispatch: PropTypes.func,
};

/**
 * @property defaultProps
 * @type {{placeHolderText: string, renderValue: number}}
 */
MastheadSearchInput.defaultProps = {
  componentInputProps: {},
  dispatch: () => {},
};

export default MastheadSearchInput;
