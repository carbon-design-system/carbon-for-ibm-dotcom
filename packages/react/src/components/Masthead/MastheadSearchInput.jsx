import React from 'react';
import classNames from 'classnames';

/**
 * Renders the input bar with the search icon
 *
 * @param {object} componentInputProps contains the input props
 * @param {Function} dispatch for component reducer
 * @returns {*} The rendered component
 */
export const MastheadSearchInput = (
  componentInputProps,
  dispatch
) => (
  <div>
    <input
      {...componentInputProps}
      /*className={styles.input}*/
    />
    <button
      type="button"
      className={styles.closeButton}
      onClick={() => dispatch({type: 'setVal', payload: {val: ''}})}
    >
      <CloseButtonIcon className={styles.closeIcon}/>
    </button>
  </div>
);
