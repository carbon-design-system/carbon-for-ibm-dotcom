/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useEffect, useRef } from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';

const { stablePrefix } = ddsSettings;

/**
 * Renders the input bar with the search icon.
 */
const MastheadSearchInput = ({ componentInputProps, dispatch, isActive }) => {
  const searchRef = useRef();

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

  useEffect(() => {
    if (isActive) {
      searchRef.current && searchRef.current.focus();
    } else resetSearch();
  }, [isActive, resetSearch]);

  return (
    <>
      <input
        {...componentInputProps}
        data-autoid={`${stablePrefix}--header__search--input`}
        ref={searchRef}
        name="q"
        tabIndex={isActive ? null : '-1'}
      />
    </>
  );
};

MastheadSearchInput.propTypes = {
  /**
   * The input props.
   */
  componentInputProps: PropTypes.object,

  /**
   * The Redux action dispatcher to control `<MastheadSearch>`.
   */
  dispatch: PropTypes.func,

  /**
   * `true` to make the search active.
   */
  isActive: PropTypes.bool,

  /**
   * Executes when the search icon is clicked.
   */
  searchIconClick: PropTypes.func,
};

MastheadSearchInput.defaultProps = {
  componentInputProps: {},
  dispatch: () => {},
  searchIconClick: () => {},
};

export default MastheadSearchInput;
