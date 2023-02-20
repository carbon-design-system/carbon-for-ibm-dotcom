/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useEffect, useRef } from 'react';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import PropTypes from 'prop-types';
import root from 'window-or-global';

const { stablePrefix } = ddsSettings;

/**
 * Renders the input bar with the search icon.
 */
const MastheadSearchInput = ({
  componentInputProps,
  dispatch,
  isActive,
  disableFocus,
}) => {
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

  /**
   * emit custom event for search input enter keypress
   */
  const handleSearchEnter = (event) => {
    if (event.key === 'Enter') {
      const onSearchEnter = new CustomEvent('onSearchEnter', {
        bubbles: true,
        detail: { value: event.target.value },
      });

      event.currentTarget.dispatchEvent(onSearchEnter);
    }
  };

  useEffect(() => {
    if (isActive) {
      if (!disableFocus) {
        searchRef.current && searchRef.current.focus();
      }
      root.document.addEventListener('keyup', handleSearchEnter, true);
      return () => {
        root.document.removeEventListener('keyup', handleSearchEnter, true);
      };
    } else resetSearch();
  }, [isActive, disableFocus, resetSearch]);

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

  /**
   * Boolean to prevent focusing on the input if open on load, focus normally upon reopen.
   */
  disableFocus: PropTypes.bool,
};

MastheadSearchInput.defaultProps = {
  componentInputProps: {},
  dispatch: () => {},
  searchIconClick: () => {},
};

export default MastheadSearchInput;
