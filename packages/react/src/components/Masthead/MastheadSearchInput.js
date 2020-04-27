import React, { useCallback, useEffect, useRef } from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';

const { stablePrefix } = ddsSettings;

/**
 * Renders the input bar with the search icon
 *
 * @param {object} props Incoming props
 * @param {object} props.componentInputProps contains the input props
 * @param {boolean} props.isActive flag to determine if the search is active
 * @param {Function} props.searchIconClick executes when the search icon is clicked
 * @returns {*} The rendered component
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

/**
 * @property {object} propTypes MastheadSearchInput propTypes
 * @description Defined property types for component
 * @type {{dispatch: Function, componentInputProps: object, isActive: boolean}}
 */
MastheadSearchInput.propTypes = {
  componentInputProps: PropTypes.object,
  dispatch: PropTypes.func,
  isActive: PropTypes.bool,
  searchIconClick: PropTypes.func,
};

/**
 * @property {object} defaultProps default MastheadSearchInput props
 * @type {{placeHolderText: string, renderValue: number}}
 */
MastheadSearchInput.defaultProps = {
  componentInputProps: {},
  dispatch: () => {},
  searchIconClick: () => {},
};

export default MastheadSearchInput;
