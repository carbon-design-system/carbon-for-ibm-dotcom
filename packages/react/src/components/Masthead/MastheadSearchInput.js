import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { HeaderGlobalAction } from 'carbon-components-react';
import { Search20 } from '@carbon/icons-react';
import { Close20 } from '@carbon/icons-react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Renders the input bar with the search icon
 *
 * @param {object} props Incoming props
 * @param {object} props.componentInputProps contains the input props
 * @param {boolean} props.isActive flag to determine if the search is active
 * @param {Function} props.searchIconClick executes when the search icon is clicked
 * @param {Function} props.searchCloseClick executes when the close icon is clicked
 * @returns {*} The rendered component
 */
const MastheadSearchInput = ({
  componentInputProps,
  dispatch,
  isActive,
  searchIconClick,
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
      />
      <HeaderGlobalAction
        onClick={searchIconClick}
        aria-label="Search all of IBM"
        className={`${prefix}--header__search--search`}
        data-autoid={`${stablePrefix}--header__search--search`}>
        <Search20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction
        onClick={resetSearch}
        aria-label="Close"
        className={`${prefix}--header__search--close`}
        data-autoid={`${stablePrefix}--header__search--close`}>
        <Close20 />
      </HeaderGlobalAction>
    </>
  );
};

/**
 * @property propTypes
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
 * @property defaultProps
 * @type {{placeHolderText: string, renderValue: number}}
 */
MastheadSearchInput.defaultProps = {
  componentInputProps: {},
  dispatch: () => {},
  searchIconClick: () => {},
};

export default MastheadSearchInput;
